#!/bin/bash

# Post-deployment health check script for Global Edge Platform
# Usage: ./scripts/post_deploy_check.sh [environment]

set -e

ENVIRONMENT=${1:-dev}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🔍 Starting post-deployment health checks for environment: $ENVIRONMENT"

# Load environment variables
if [ -f "$PROJECT_ROOT/.env.$ENVIRONMENT" ]; then
    echo "📄 Loading environment variables from .env.$ENVIRONMENT"
    export $(cat "$PROJECT_ROOT/.env.$ENVIRONMENT" | grep -v '^#' | xargs)
fi

# Check if we're using Azure Developer CLI
if command -v azd &> /dev/null; then
    echo "🔧 Using Azure Developer CLI for health checks"
    
    # Get deployment URLs from Azure
    if [ "$ENVIRONMENT" != "local" ]; then
        echo "📡 Fetching deployment URLs from Azure..."
        WEB_URL=$(azd env get-values --environment "$ENVIRONMENT" --output json | jq -r '.WEB_URL // empty')
        API_URL=$(azd env get-values --environment "$ENVIRONMENT" --output json | jq -r '.API_URL // empty')
        
        if [ -z "$WEB_URL" ] && [ -z "$API_URL" ]; then
            echo "❌ Could not retrieve deployment URLs from Azure environment"
            exit 1
        fi
    fi
fi

# Health check functions
check_http_endpoint() {
    local url=$1
    local name=$2
    local max_attempts=30
    local attempt=1
    
    echo "🔍 Checking $name at $url"
    
    while [ $attempt -le $max_attempts ]; do
        if curl -f -s -o /dev/null -w "%{http_code}" "$url" | grep -q "200\|301\|302"; then
            echo "✅ $name is healthy (attempt $attempt/$max_attempts)"
            return 0
        else
            echo "⏳ $name not ready yet (attempt $attempt/$max_attempts) - waiting 10 seconds..."
            sleep 10
            attempt=$((attempt + 1))
        fi
    done
    
    echo "❌ $name failed health check after $max_attempts attempts"
    return 1
}

check_database_connection() {
    echo "🔍 Checking database connection..."
    
    if [ -z "$DATABASE_URL" ]; then
        echo "⚠️ DATABASE_URL not set - skipping database health check"
        return 0
    fi
    
    # Test database connection
    if psql "$DATABASE_URL" -c "SELECT 1;" > /dev/null 2>&1; then
        echo "✅ Database connection is healthy"
        return 0
    else
        echo "❌ Database connection failed"
        return 1
    fi
}

check_api_endpoints() {
    local api_url=$1
    
    if [ -z "$api_url" ]; then
        echo "⚠️ API URL not set - skipping API health checks"
        return 0
    fi
    
    echo "🔍 Checking API endpoints..."
    
    # Check health endpoint
    if curl -f -s "$api_url/health" > /dev/null; then
        echo "✅ API health endpoint is responding"
    else
        echo "❌ API health endpoint failed"
        return 1
    fi
    
    # Check API version endpoint
    if curl -f -s "$api_url/api/version" > /dev/null; then
        echo "✅ API version endpoint is responding"
    else
        echo "⚠️ API version endpoint not available (this might be expected)"
    fi
    
    return 0
}

# Run health checks
echo "🚀 Running comprehensive health checks..."

# Check web application
if [ -n "$WEB_URL" ]; then
    check_http_endpoint "$WEB_URL" "Web Application"
    WEB_HEALTHY=$?
else
    echo "⚠️ Web URL not set - skipping web health check"
    WEB_HEALTHY=0
fi

# Check API application
if [ -n "$API_URL" ]; then
    check_http_endpoint "$API_URL" "API Application"
    API_HEALTHY=$?
    
    if [ $API_HEALTHY -eq 0 ]; then
        check_api_endpoints "$API_URL"
        API_ENDPOINTS_HEALTHY=$?
    else
        API_ENDPOINTS_HEALTHY=1
    fi
else
    echo "⚠️ API URL not set - skipping API health check"
    API_HEALTHY=0
    API_ENDPOINTS_HEALTHY=0
fi

# Check database
check_database_connection
DB_HEALTHY=$?

# Summary
echo ""
echo "📊 Health Check Summary:"
echo "========================"
echo "🌐 Web Application: $([ $WEB_HEALTHY -eq 0 ] && echo "✅ Healthy" || echo "❌ Unhealthy")"
echo "🔌 API Application: $([ $API_HEALTHY -eq 0 ] && echo "✅ Healthy" || echo "❌ Unhealthy")"
echo "🔌 API Endpoints: $([ $API_ENDPOINTS_HEALTHY -eq 0 ] && echo "✅ Healthy" || echo "❌ Unhealthy")"
echo "🗄️ Database: $([ $DB_HEALTHY -eq 0 ] && echo "✅ Healthy" || echo "❌ Unhealthy")"

# Overall health status
if [ $WEB_HEALTHY -eq 0 ] && [ $API_HEALTHY -eq 0 ] && [ $API_ENDPOINTS_HEALTHY -eq 0 ] && [ $DB_HEALTHY -eq 0 ]; then
    echo ""
    echo "🎉 All health checks passed! Deployment is healthy."
    exit 0
else
    echo ""
    echo "❌ Some health checks failed. Please investigate the issues above."
    exit 1
fi

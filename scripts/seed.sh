#!/bin/bash

# Database seeding script for Global Edge Platform
# Usage: ./scripts/seed.sh [environment]

set -e

ENVIRONMENT=${1:-dev}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🌱 Starting database seeding for environment: $ENVIRONMENT"

# Load environment variables
if [ -f "$PROJECT_ROOT/.env.$ENVIRONMENT" ]; then
    echo "📄 Loading environment variables from .env.$ENVIRONMENT"
    export $(cat "$PROJECT_ROOT/.env.$ENVIRONMENT" | grep -v '^#' | xargs)
fi

# Check if we're using Azure Developer CLI
if command -v azd &> /dev/null; then
    echo "🔧 Using Azure Developer CLI for database connection"
    
    # Get database connection string from Azure
    if [ "$ENVIRONMENT" != "local" ]; then
        echo "📡 Fetching database connection string from Azure..."
        DATABASE_URL=$(azd env get-values --environment "$ENVIRONMENT" --output json | jq -r '.DATABASE_URL // empty')
        
        if [ -z "$DATABASE_URL" ]; then
            echo "❌ Could not retrieve DATABASE_URL from Azure environment"
            exit 1
        fi
        
        export DATABASE_URL
    fi
fi

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ DATABASE_URL is not set. Please configure your database connection."
    exit 1
fi

echo "🗄️ Database URL: ${DATABASE_URL:0:20}..."

# Check if we're using Prisma
if [ -f "$PROJECT_ROOT/prisma/schema.prisma" ]; then
    echo "🔍 Detected Prisma - running Prisma seed"
    npx prisma db seed
else
    echo "📋 Seeding database with sample data..."
    
    # Seed data based on environment
    case "$ENVIRONMENT" in
        "dev"|"development")
            echo "🔧 Seeding development data..."
            cat << 'EOF' | psql "$DATABASE_URL"
-- Insert sample users
INSERT INTO users (email, password_hash, first_name, last_name, role, status) VALUES
('admin@theglobaledge.io', '$2b$10$example.hash', 'Admin', 'User', 'admin', 'active'),
('investor@example.com', '$2b$10$example.hash', 'John', 'Investor', 'investor', 'active'),
('issuer@example.com', '$2b$10$example.hash', 'Jane', 'Issuer', 'issuer', 'active')
ON CONFLICT (email) DO NOTHING;

-- Insert sample assets
INSERT INTO assets (asset_key, name, description, asset_type, status, apr, total_value, current_value) VALUES
('CONTAINER-001', 'Hamburg to Singapore Container', '40ft container with electronics', 'container', 'active', 8.5, 150000.00, 108750.00),
('PROPERTY-001', 'Commercial Building NYC', 'Office building in Manhattan', 'property', 'active', 12.0, 5000000.00, 5000000.00),
('TRADE-001', 'Coffee Futures Contract', 'Brazilian coffee futures', 'trade', 'active', 15.0, 100000.00, 100000.00),
('VAULT-001', 'Precious Metals Vault', 'Gold and silver storage', 'vault', 'active', 6.0, 2000000.00, 2000000.00)
ON CONFLICT (asset_key) DO NOTHING;

-- Insert sample investments
INSERT INTO investments (user_id, asset_id, amount, status) VALUES
((SELECT id FROM users WHERE email = 'investor@example.com'), (SELECT id FROM assets WHERE asset_key = 'CONTAINER-001'), 5000.00, 'active'),
((SELECT id FROM users WHERE email = 'investor@example.com'), (SELECT id FROM assets WHERE asset_key = 'PROPERTY-001'), 25000.00, 'active')
ON CONFLICT DO NOTHING;
EOF
            ;;
        "staging")
            echo "🔧 Seeding staging data..."
            cat << 'EOF' | psql "$DATABASE_URL"
-- Insert staging users
INSERT INTO users (email, password_hash, first_name, last_name, role, status) VALUES
('admin@theglobaledge.io', '$2b$10$example.hash', 'Admin', 'User', 'admin', 'active'),
('test-investor@example.com', '$2b$10$example.hash', 'Test', 'Investor', 'investor', 'active'),
('test-issuer@example.com', '$2b$10$example.hash', 'Test', 'Issuer', 'issuer', 'active')
ON CONFLICT (email) DO NOTHING;

-- Insert staging assets
INSERT INTO assets (asset_key, name, description, asset_type, status, apr, total_value, current_value) VALUES
('TEST-CONTAINER-001', 'Test Container Shipment', 'Test container for staging', 'container', 'active', 8.0, 100000.00, 100000.00),
('TEST-PROPERTY-001', 'Test Property', 'Test property for staging', 'property', 'active', 10.0, 1000000.00, 1000000.00)
ON CONFLICT (asset_key) DO NOTHING;
EOF
            ;;
        "prod"|"production")
            echo "🔧 Seeding production data (minimal)..."
            cat << 'EOF' | psql "$DATABASE_URL"
-- Insert production admin user
INSERT INTO users (email, password_hash, first_name, last_name, role, status) VALUES
('admin@theglobaledge.io', '$2b$10$example.hash', 'Admin', 'User', 'admin', 'active')
ON CONFLICT (email) DO NOTHING;
EOF
            ;;
        *)
            echo "⚠️ Unknown environment: $ENVIRONMENT. Skipping seeding."
            exit 0
            ;;
    esac

    if [ $? -eq 0 ]; then
        echo "✅ Database seeded successfully"
    else
        echo "❌ Failed to seed database"
        exit 1
    fi
fi

echo "🎉 Database seeding completed for environment: $ENVIRONMENT"

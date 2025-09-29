#!/bin/bash

# Database migration script for Global Edge Platform
# Usage: ./scripts/migrate.sh [environment]

set -e

ENVIRONMENT=${1:-dev}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🔄 Starting database migration for environment: $ENVIRONMENT"

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
    echo "   For local development: Set DATABASE_URL in .env.local"
    echo "   For Azure environments: Ensure azd is configured and environment exists"
    exit 1
fi

echo "🗄️ Database URL: ${DATABASE_URL:0:20}..."

# Check if we're using Prisma
if [ -f "$PROJECT_ROOT/prisma/schema.prisma" ]; then
    echo "🔍 Detected Prisma - running Prisma migrations"
    
    # Install dependencies if needed
    if [ ! -d "$PROJECT_ROOT/node_modules" ]; then
        echo "📦 Installing dependencies..."
        npm install
    fi
    
    # Generate Prisma client
    echo "🔧 Generating Prisma client..."
    npx prisma generate
    
    # Run migrations
    echo "🚀 Running Prisma migrations..."
    npx prisma migrate deploy
    
    # Optional: Seed database
    if [ -f "$PROJECT_ROOT/prisma/seed.js" ] || [ -f "$PROJECT_ROOT/prisma/seed.ts" ]; then
        echo "🌱 Seeding database..."
        npx prisma db seed
    fi
    
elif [ -f "$PROJECT_ROOT/src/lib/database/migrations" ]; then
    echo "🔍 Detected custom migration system"
    
    # Run custom migrations
    echo "🚀 Running custom migrations..."
    node "$PROJECT_ROOT/src/lib/database/migrate.js" "$ENVIRONMENT"
    
else
    echo "⚠️ No migration system detected. Creating basic schema..."
    
    # Create basic tables if they don't exist
    echo "📋 Creating basic database schema..."
    
    # This is a placeholder - you would implement your actual schema creation here
    cat << 'EOF' | psql "$DATABASE_URL"
-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(50) DEFAULT 'user',
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create assets table
CREATE TABLE IF NOT EXISTS assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_key VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    asset_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'active',
    apr DECIMAL(5,2),
    total_value DECIMAL(15,2),
    current_value DECIMAL(15,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create investments table
CREATE TABLE IF NOT EXISTS investments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    asset_id UUID REFERENCES assets(id),
    amount DECIMAL(15,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_assets_key ON assets(asset_key);
CREATE INDEX IF NOT EXISTS idx_investments_user ON investments(user_id);
CREATE INDEX IF NOT EXISTS idx_investments_asset ON investments(asset_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply triggers
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_assets_updated_at ON assets;
CREATE TRIGGER update_assets_updated_at BEFORE UPDATE ON assets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_investments_updated_at ON investments;
CREATE TRIGGER update_investments_updated_at BEFORE UPDATE ON investments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EOF

    if [ $? -eq 0 ]; then
        echo "✅ Database schema created successfully"
    else
        echo "❌ Failed to create database schema"
        exit 1
    fi
fi

echo "✅ Database migration completed successfully for environment: $ENVIRONMENT"

# Run additional post-migration tasks
if [ -f "$PROJECT_ROOT/scripts/seed.sh" ]; then
    echo "🌱 Running database seeding..."
    "$PROJECT_ROOT/scripts/seed.sh" "$ENVIRONMENT"
fi

echo "🎉 Migration process completed!"

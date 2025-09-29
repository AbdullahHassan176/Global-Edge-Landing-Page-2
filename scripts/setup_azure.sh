#!/bin/bash

# Azure setup script for Global Edge Platform
# This script initializes Azure Developer CLI and sets up OIDC authentication

set -e

echo "🚀 Setting up Azure deployment management for Global Edge Platform"
echo "=================================================================="

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo "❌ Azure CLI is not installed. Please install it first:"
    echo "   Windows: winget install Microsoft.AzureCLI"
    echo "   macOS: brew install azure-cli"
    echo "   Linux: curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash"
    exit 1
fi

# Check if Azure Developer CLI is installed
if ! command -v azd &> /dev/null; then
    echo "❌ Azure Developer CLI is not installed. Installing now..."
    
    # Install Azure Developer CLI
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        brew install azure/azd/azd
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        curl -fsSL https://aka.ms/install-azd.sh | bash
    else
        echo "❌ Unsupported operating system. Please install Azure Developer CLI manually:"
        echo "   https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/install-azd"
        exit 1
    fi
fi

echo "✅ Azure Developer CLI is installed"

# Login to Azure
echo "🔐 Logging into Azure..."
az login

# Set default subscription (if multiple subscriptions)
echo "📋 Available subscriptions:"
az account list --output table

read -p "Enter your Azure subscription ID (or press Enter to use default): " subscription_id

if [ -n "$subscription_id" ]; then
    echo "🔧 Setting subscription to: $subscription_id"
    az account set --subscription "$subscription_id"
fi

# Initialize Azure Developer CLI
echo "🔧 Initializing Azure Developer CLI..."
azd init --template custom

# Set up OIDC authentication for GitHub Actions
echo "🔐 Setting up OIDC authentication for GitHub Actions..."

# Get current directory name for resource naming
PROJECT_NAME=$(basename "$(pwd)")
RESOURCE_GROUP_NAME="${PROJECT_NAME}-rg"

# Create resource group if it doesn't exist
echo "📦 Creating resource group: $RESOURCE_GROUP_NAME"
az group create --name "$RESOURCE_GROUP_NAME" --location "East US" || echo "Resource group already exists"

# Set up federated identity for GitHub Actions
echo "🔗 Setting up federated identity for GitHub Actions..."

# Get GitHub repository information
GITHUB_REPO=$(git config --get remote.origin.url | sed 's/.*github.com[:/]\([^.]*\).*/\1/')
GITHUB_ORG=$(echo "$GITHUB_REPO" | cut -d'/' -f1)
GITHUB_REPO_NAME=$(echo "$GITHUB_REPO" | cut -d'/' -f2)

echo "📋 GitHub repository: $GITHUB_ORG/$GITHUB_REPO_NAME"

# Create service principal for GitHub Actions
echo "👤 Creating service principal for GitHub Actions..."
SERVICE_PRINCIPAL_NAME="${PROJECT_NAME}-github-actions"

# Create service principal
SP_OUTPUT=$(az ad sp create-for-rbac --name "$SERVICE_PRINCIPAL_NAME" --role contributor --scopes "/subscriptions/$(az account show --query id -o tsv)" --output json)
CLIENT_ID=$(echo "$SP_OUTPUT" | jq -r '.appId')
CLIENT_SECRET=$(echo "$SP_OUTPUT" | jq -r '.password')
TENANT_ID=$(az account show --query tenantId -o tsv)
SUBSCRIPTION_ID=$(az account show --query id -o tsv)

echo "✅ Service principal created: $CLIENT_ID"

# Create federated credential for GitHub Actions
echo "🔗 Creating federated credential for GitHub Actions..."

FEDERATED_CREDENTIAL_NAME="${PROJECT_NAME}-github-actions-federated"

az ad app federated-credential create \
    --id "$CLIENT_ID" \
    --parameters '{
        "name": "'"$FEDERATED_CREDENTIAL_NAME"'",
        "issuer": "https://token.actions.githubusercontent.com",
        "subject": "repo:'"$GITHUB_ORG/$GITHUB_REPO_NAME"':ref:refs/heads/main",
        "description": "GitHub Actions for '"$PROJECT_NAME"'",
        "audiences": ["api://AzureADTokenExchange"]
    }'

# Create federated credential for develop branch
az ad app federated-credential create \
    --id "$CLIENT_ID" \
    --parameters '{
        "name": "'"$FEDERATED_CREDENTIAL_NAME"'-develop",
        "issuer": "https://token.actions.githubusercontent.com",
        "subject": "repo:'"$GITHUB_ORG/$GITHUB_REPO_NAME"':ref:refs/heads/develop",
        "description": "GitHub Actions for '"$PROJECT_NAME"' develop branch",
        "audiences": ["api://AzureADTokenExchange"]
    }'

echo "✅ Federated credentials created"

# Create GitHub secrets
echo "🔐 Setting up GitHub repository secrets..."

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "⚠️ GitHub CLI is not installed. Please install it and run the following commands manually:"
    echo ""
    echo "gh secret set AZURE_CLIENT_ID --body \"$CLIENT_ID\""
    echo "gh secret set AZURE_TENANT_ID --body \"$TENANT_ID\""
    echo "gh secret set AZURE_SUBSCRIPTION_ID --body \"$SUBSCRIPTION_ID\""
    echo ""
    echo "Or set these secrets in your GitHub repository settings:"
    echo "Repository → Settings → Secrets and variables → Actions"
else
    echo "🔐 Setting GitHub repository secrets..."
    gh secret set AZURE_CLIENT_ID --body "$CLIENT_ID"
    gh secret set AZURE_TENANT_ID --body "$TENANT_ID"
    gh secret set AZURE_SUBSCRIPTION_ID --body "$SUBSCRIPTION_ID"
    echo "✅ GitHub secrets configured"
fi

# Create environments
echo "🌍 Creating Azure environments..."
azd env new dev
azd env new staging
azd env new prod

# Set environment variables
echo "🔧 Configuring environment variables..."

# Development environment
azd env set AZURE_SUBSCRIPTION_ID "$SUBSCRIPTION_ID" --environment dev
azd env set AZURE_LOCATION "East US" --environment dev

# Staging environment
azd env set AZURE_SUBSCRIPTION_ID "$SUBSCRIPTION_ID" --environment staging
azd env set AZURE_LOCATION "East US" --environment staging

# Production environment
azd env set AZURE_SUBSCRIPTION_ID "$SUBSCRIPTION_ID" --environment prod
azd env set AZURE_LOCATION "East US" --environment prod

echo "✅ Environment variables configured"

# Make scripts executable
echo "🔧 Making scripts executable..."
chmod +x scripts/*.sh

echo ""
echo "🎉 Azure setup completed successfully!"
echo "======================================"
echo ""
echo "📋 Next steps:"
echo "1. Review and customize the infrastructure in ./infra/main.bicep"
echo "2. Update environment-specific parameters in ./infra/parameters.*.json"
echo "3. Test the deployment with: azd up --environment dev"
echo "4. Push to GitHub to trigger automated deployments"
echo ""
echo "🔐 Azure credentials:"
echo "   Client ID: $CLIENT_ID"
echo "   Tenant ID: $TENANT_ID"
echo "   Subscription ID: $SUBSCRIPTION_ID"
echo ""
echo "🌍 Available environments:"
echo "   - dev (development)"
echo "   - staging (staging)"
echo "   - prod (production)"
echo ""
echo "🚀 Ready to deploy! Run 'azd up --environment dev' to get started."

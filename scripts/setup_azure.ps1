# Azure setup script for Global Edge Platform (PowerShell)
# This script initializes Azure Developer CLI and sets up OIDC authentication

Write-Host "🚀 Setting up Azure deployment management for Global Edge Platform" -ForegroundColor Green
Write-Host "==================================================================" -ForegroundColor Green

# Check if Azure CLI is installed
if (-not (Get-Command az -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Azure CLI is not installed. Please install it first:" -ForegroundColor Red
    Write-Host "   Windows: winget install Microsoft.AzureCLI" -ForegroundColor Yellow
    Write-Host "   Or download from: https://aka.ms/installazurecliwindows" -ForegroundColor Yellow
    exit 1
}

# Check if Azure Developer CLI is installed
if (-not (Get-Command azd -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Azure Developer CLI is not installed. Installing now..." -ForegroundColor Red
    
    # Install Azure Developer CLI
    try {
        Invoke-WebRequest -Uri "https://aka.ms/install-azd.ps1" -OutFile "install-azd.ps1"
        Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force
        .\install-azd.ps1
        Remove-Item "install-azd.ps1"
    }
    catch {
        Write-Host "❌ Failed to install Azure Developer CLI. Please install manually:" -ForegroundColor Red
        Write-Host "   https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/install-azd" -ForegroundColor Yellow
        exit 1
    }
}

Write-Host "✅ Azure Developer CLI is installed" -ForegroundColor Green

# Login to Azure
Write-Host "🔐 Logging into Azure..." -ForegroundColor Blue
az login

# Set default subscription (if multiple subscriptions)
Write-Host "📋 Available subscriptions:" -ForegroundColor Blue
az account list --output table

$subscription_id = Read-Host "Enter your Azure subscription ID (or press Enter to use default)"
if ($subscription_id) {
    Write-Host "🔧 Setting subscription to: $subscription_id" -ForegroundColor Blue
    az account set --subscription $subscription_id
}

# Initialize Azure Developer CLI
Write-Host "🔧 Initializing Azure Developer CLI..." -ForegroundColor Blue
azd init --template custom

# Set up OIDC authentication for GitHub Actions
Write-Host "🔐 Setting up OIDC authentication for GitHub Actions..." -ForegroundColor Blue

# Get current directory name for resource naming
$PROJECT_NAME = Split-Path -Leaf (Get-Location)
$RESOURCE_GROUP_NAME = "$PROJECT_NAME-rg"

# Create resource group if it doesn't exist
Write-Host "📦 Creating resource group: $RESOURCE_GROUP_NAME" -ForegroundColor Blue
az group create --name $RESOURCE_GROUP_NAME --location "East US" 2>$null

# Set up federated identity for GitHub Actions
Write-Host "🔗 Setting up federated identity for GitHub Actions..." -ForegroundColor Blue

# Get GitHub repository information
$GITHUB_REPO = git config --get remote.origin.url
$GITHUB_REPO = $GITHUB_REPO -replace '.*github.com[:/]', '' -replace '\.git$', ''
$GITHUB_ORG = $GITHUB_REPO.Split('/')[0]
$GITHUB_REPO_NAME = $GITHUB_REPO.Split('/')[1]

Write-Host "📋 GitHub repository: $GITHUB_ORG/$GITHUB_REPO_NAME" -ForegroundColor Blue

# Create service principal for GitHub Actions
Write-Host "👤 Creating service principal for GitHub Actions..." -ForegroundColor Blue
$SERVICE_PRINCIPAL_NAME = "$PROJECT_NAME-github-actions"

# Create service principal
$SP_OUTPUT = az ad sp create-for-rbac --name $SERVICE_PRINCIPAL_NAME --role contributor --scopes "/subscriptions/$(az account show --query id -o tsv)" --output json | ConvertFrom-Json
$CLIENT_ID = $SP_OUTPUT.appId
$CLIENT_SECRET = $SP_OUTPUT.password
$TENANT_ID = az account show --query tenantId -o tsv
$SUBSCRIPTION_ID = az account show --query id -o tsv

Write-Host "✅ Service principal created: $CLIENT_ID" -ForegroundColor Green

# Create federated credential for GitHub Actions
Write-Host "🔗 Creating federated credential for GitHub Actions..." -ForegroundColor Blue

$FEDERATED_CREDENTIAL_NAME = "$PROJECT_NAME-github-actions-federated"

# Create federated credential for main branch
$federatedCredential = @{
    name = "$FEDERATED_CREDENTIAL_NAME"
    issuer = "https://token.actions.githubusercontent.com"
    subject = "repo:$GITHUB_ORG/$GITHUB_REPO_NAME`:ref:refs/heads/main"
    description = "GitHub Actions for $PROJECT_NAME"
    audiences = @("api://AzureADTokenExchange")
} | ConvertTo-Json

az ad app federated-credential create --id $CLIENT_ID --parameters $federatedCredential

# Create federated credential for develop branch
$federatedCredentialDevelop = @{
    name = "$FEDERATED_CREDENTIAL_NAME-develop"
    issuer = "https://token.actions.githubusercontent.com"
    subject = "repo:$GITHUB_ORG/$GITHUB_REPO_NAME`:ref:refs/heads/develop"
    description = "GitHub Actions for $PROJECT_NAME develop branch"
    audiences = @("api://AzureADTokenExchange")
} | ConvertTo-Json

az ad app federated-credential create --id $CLIENT_ID --parameters $federatedCredentialDevelop

Write-Host "✅ Federated credentials created" -ForegroundColor Green

# Create GitHub secrets
Write-Host "🔐 Setting up GitHub repository secrets..." -ForegroundColor Blue

# Check if GitHub CLI is installed
if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️ GitHub CLI is not installed. Please install it and run the following commands manually:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "gh secret set AZURE_CLIENT_ID --body `"$CLIENT_ID`"" -ForegroundColor Cyan
    Write-Host "gh secret set AZURE_TENANT_ID --body `"$TENANT_ID`"" -ForegroundColor Cyan
    Write-Host "gh secret set AZURE_SUBSCRIPTION_ID --body `"$SUBSCRIPTION_ID`"" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Or set these secrets in your GitHub repository settings:" -ForegroundColor Yellow
    Write-Host "Repository → Settings → Secrets and variables → Actions" -ForegroundColor Yellow
}
else {
    Write-Host "🔐 Setting GitHub repository secrets..." -ForegroundColor Blue
    gh secret set AZURE_CLIENT_ID --body $CLIENT_ID
    gh secret set AZURE_TENANT_ID --body $TENANT_ID
    gh secret set AZURE_SUBSCRIPTION_ID --body $SUBSCRIPTION_ID
    Write-Host "✅ GitHub secrets configured" -ForegroundColor Green
}

# Create environments
Write-Host "🌍 Creating Azure environments..." -ForegroundColor Blue
azd env new dev
azd env new staging
azd env new prod

# Set environment variables
Write-Host "🔧 Configuring environment variables..." -ForegroundColor Blue

# Development environment
azd env set AZURE_SUBSCRIPTION_ID $SUBSCRIPTION_ID --environment dev
azd env set AZURE_LOCATION "East US" --environment dev

# Staging environment
azd env set AZURE_SUBSCRIPTION_ID $SUBSCRIPTION_ID --environment staging
azd env set AZURE_LOCATION "East US" --environment staging

# Production environment
azd env set AZURE_SUBSCRIPTION_ID $SUBSCRIPTION_ID --environment prod
azd env set AZURE_LOCATION "East US" --environment prod

Write-Host "✅ Environment variables configured" -ForegroundColor Green

Write-Host ""
Write-Host "🎉 Azure setup completed successfully!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Next steps:" -ForegroundColor Blue
Write-Host "1. Review and customize the infrastructure in ./infra/main.bicep" -ForegroundColor White
Write-Host "2. Update environment-specific parameters in ./infra/parameters.*.json" -ForegroundColor White
Write-Host "3. Test the deployment with: azd up --environment dev" -ForegroundColor White
Write-Host "4. Push to GitHub to trigger automated deployments" -ForegroundColor White
Write-Host ""
Write-Host "🔐 Azure credentials:" -ForegroundColor Blue
Write-Host "   Client ID: $CLIENT_ID" -ForegroundColor White
Write-Host "   Tenant ID: $TENANT_ID" -ForegroundColor White
Write-Host "   Subscription ID: $SUBSCRIPTION_ID" -ForegroundColor White
Write-Host ""
Write-Host "🌍 Available environments:" -ForegroundColor Blue
Write-Host "   - dev (development)" -ForegroundColor White
Write-Host "   - staging (staging)" -ForegroundColor White
Write-Host "   - prod (production)" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Ready to deploy! Run 'azd up --environment dev' to get started." -ForegroundColor Green

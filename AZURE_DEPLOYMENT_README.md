# 🚀 Azure Deployment Management for Global Edge Platform

This repository now includes complete Azure deployment management capabilities, allowing you to manage your entire infrastructure, databases, and deployments directly from Cursor IDE.

## 🎯 What This Gives You

- **🏗️ Infrastructure as Code**: Complete Azure resource management via Bicep templates
- **🔄 Automated CI/CD**: GitHub Actions with OIDC authentication (no secrets needed)
- **🗄️ Database Management**: PostgreSQL with automated migrations and seeding
- **📦 Container Deployment**: Azure Container Apps for scalable applications
- **🔐 Security**: Key Vault integration for secrets management
- **📊 Monitoring**: Application Insights and Log Analytics
- **🌍 Multi-Environment**: Dev, Staging, and Production environments

## 🚀 Quick Start

### 1. One-Time Setup

Run the setup script to initialize everything:

```bash
# Make scripts executable
chmod +x scripts/*.sh

# Run the Azure setup script
./scripts/setup_azure.sh
```

This will:
- Install Azure Developer CLI (if needed)
- Set up OIDC authentication for GitHub Actions
- Create service principals and federated credentials
- Configure GitHub repository secrets
- Create dev, staging, and prod environments

### 2. Deploy Your First Environment

```bash
# Deploy to development
azd up --environment dev

# Deploy to staging
azd up --environment staging

# Deploy to production
azd up --environment prod
```

### 3. Deploy Only Application Changes

```bash
# Deploy app changes without infrastructure changes
azd deploy --environment dev
```

## 🏗️ Infrastructure Components

### Core Services
- **🌐 Web Application**: Next.js app on Azure Container Apps
- **🔌 API Application**: Node.js API on Azure Container Apps
- **🗄️ Database**: PostgreSQL Flexible Server
- **📦 Storage**: Azure Blob Storage for files and assets
- **🔐 Security**: Azure Key Vault for secrets management
- **📊 Monitoring**: Application Insights and Log Analytics

### Environment-Specific Configuration

| Environment | Database SKU | Container Apps SKU | Storage SKU | Public Access |
|-------------|--------------|-------------------|-------------|---------------|
| **Dev** | GP_Standard_D2s_v3 | Consumption | Standard_LRS | ✅ Enabled |
| **Staging** | GP_Standard_D4s_v3 | Consumption | Standard_GRS | ❌ Disabled |
| **Prod** | GP_Standard_D8s_v3 | Premium | Standard_GRS | ❌ Disabled |

## 🔄 CI/CD Pipeline

### Automatic Deployments
- **`main` branch** → Production environment
- **`develop` branch** → Staging environment
- **Other branches** → Development environment

### Manual Deployments
Use GitHub Actions workflow dispatch to deploy to any environment:

1. Go to **Actions** tab in GitHub
2. Select **Deploy Global Edge Platform**
3. Click **Run workflow**
4. Choose environment and options

### Pipeline Steps
1. **Build & Test**: Lint, type-check, test, and build
2. **Security Scan**: Audit dependencies and scan for secrets
3. **Infrastructure**: Provision Azure resources (idempotent)
4. **Deploy**: Deploy applications to Container Apps
5. **Database**: Run migrations and seeding
6. **Health Checks**: Verify deployment health

## 🗄️ Database Management

### Migrations
```bash
# Run migrations for specific environment
./scripts/migrate.sh dev
./scripts/migrate.sh staging
./scripts/migrate.sh prod
```

### Seeding
```bash
# Seed database with sample data
./scripts/seed.sh dev
./scripts/seed.sh staging
./scripts/seed.sh prod
```

### Database Features
- **🔄 Automatic Migrations**: Run on every deployment
- **🌱 Environment-Specific Seeding**: Different data per environment
- **🔐 Secure Connections**: Connection strings stored in Key Vault
- **📊 Monitoring**: Database performance and health monitoring

## 🔐 Security & Secrets

### Key Vault Integration
- **🔑 Connection Strings**: Database and storage connections
- **🔐 API Keys**: Application and service keys
- **🌐 Environment Variables**: Application configuration
- **🔄 Automatic Rotation**: Secrets managed by Azure

### OIDC Authentication
- **🔐 No Client Secrets**: Uses OpenID Connect
- **🛡️ Secure Access**: GitHub Actions assume Azure identity
- **🔄 Automatic Renewal**: No manual secret rotation needed

## 📊 Monitoring & Observability

### Application Insights
- **📈 Performance**: Application performance metrics
- **🐛 Error Tracking**: Exception and error monitoring
- **📊 Usage Analytics**: User behavior and usage patterns
- **🔍 Custom Events**: Business-specific telemetry

### Log Analytics
- **📝 Centralized Logging**: All application logs
- **🔍 Query Capabilities**: KQL queries for log analysis
- **📊 Dashboards**: Custom monitoring dashboards
- **🚨 Alerts**: Automated alerting on issues

## 🛠️ Development Workflow

### Local Development
```bash
# Set up local environment
cp .env.example .env.local
npm install
npm run dev
```

### Database Operations
```bash
# Connect to database
azd env get-values --environment dev | grep DATABASE_URL

# Run migrations locally
DATABASE_URL="your-connection-string" ./scripts/migrate.sh local
```

### Adding New Resources
1. **Update Bicep**: Add resources to `infra/main.bicep`
2. **Update Parameters**: Add parameters to `infra/parameters.*.json`
3. **Update Applications**: Modify app code to use new resources
4. **Deploy**: Run `azd provision` to create resources

## 🚀 Deployment Commands

### Infrastructure Management
```bash
# Provision infrastructure
azd provision --environment dev

# Update infrastructure
azd provision --environment dev --force

# Destroy infrastructure (careful!)
azd down --environment dev
```

### Application Deployment
```bash
# Deploy applications
azd deploy --environment dev

# Deploy specific service
azd deploy --environment dev --service web
```

### Environment Management
```bash
# List environments
azd env list

# Get environment values
azd env get-values --environment dev

# Set environment variable
azd env set MY_VAR "value" --environment dev
```

## 🔧 Troubleshooting

### Common Issues

#### 1. OIDC Authentication Fails
```bash
# Re-run OIDC setup
azd auth federate
```

#### 2. Database Connection Issues
```bash
# Check database status
az postgres flexible-server show --name your-server-name --resource-group your-rg

# Test connection
psql "your-connection-string" -c "SELECT 1;"
```

#### 3. Container Apps Not Starting
```bash
# Check container logs
az containerapp logs show --name your-app-name --resource-group your-rg

# Check container status
az containerapp show --name your-app-name --resource-group your-rg
```

### Health Checks
```bash
# Run post-deployment checks
./scripts/post_deploy_check.sh dev

# Check specific endpoints
curl -f https://your-web-app-url.azurecontainerapps.io/health
curl -f https://your-api-app-url.azurecontainerapps.io/health
```

## 📋 Environment Variables

### Required Secrets (Set in GitHub)
- `AZURE_CLIENT_ID`: Service principal client ID
- `AZURE_TENANT_ID`: Azure tenant ID
- `AZURE_SUBSCRIPTION_ID`: Azure subscription ID

### Application Environment Variables
- `DATABASE_URL`: PostgreSQL connection string
- `AZURE_STORAGE_CONNECTION_STRING`: Blob storage connection
- `APPINSIGHTS_INSTRUMENTATIONKEY`: Application Insights key
- `NODE_ENV`: Environment (production, staging, development)

## 🎯 Best Practices

### 1. Environment Strategy
- **Dev**: Fast iteration, public access enabled
- **Staging**: Production-like, private access
- **Prod**: High availability, security hardened

### 2. Database Management
- **Migrations**: Always test migrations in dev first
- **Backups**: Automated backups in staging and prod
- **Seeding**: Use appropriate data for each environment

### 3. Security
- **Secrets**: Never commit secrets to code
- **Access**: Use least privilege principle
- **Monitoring**: Monitor for security issues

### 4. Deployment
- **Testing**: Always test in dev/staging first
- **Rollbacks**: Keep previous versions available
- **Monitoring**: Monitor deployments for issues

## 🆘 Support & Resources

### Documentation
- [Azure Developer CLI](https://learn.microsoft.com/en-us/azure/developer/azure-developer-cli/)
- [Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/)
- [Bicep Templates](https://learn.microsoft.com/en-us/azure/azure-resource-manager/bicep/)

### Getting Help
1. **Check logs**: Use `azd env get-values` and check Application Insights
2. **Health checks**: Run `./scripts/post_deploy_check.sh`
3. **Azure Portal**: Check resource status in Azure Portal
4. **GitHub Actions**: Check workflow logs for deployment issues

## 🎉 You're All Set!

Your Global Edge Platform now has complete Azure deployment management. You can:

- ✅ **Deploy with one command**: `azd up --environment dev`
- ✅ **Manage infrastructure**: Update Bicep templates
- ✅ **Handle databases**: Automatic migrations and seeding
- ✅ **Monitor everything**: Application Insights and Log Analytics
- ✅ **Secure deployments**: OIDC authentication, no secrets needed
- ✅ **Scale automatically**: Container Apps auto-scaling
- ✅ **Manage secrets**: Key Vault integration

**Happy deploying! 🚀**

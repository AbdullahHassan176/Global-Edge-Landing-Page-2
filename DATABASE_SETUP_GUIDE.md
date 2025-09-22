# Database Setup Guide

This guide will help you set up the Azure Cosmos DB database for the Global Edge platform.

## Prerequisites

- Azure account with Cosmos DB access
- Node.js installed on your system
- Git repository cloned locally

## Setup Steps

### 1. Create Azure Cosmos DB Account

1. Log into the Azure Portal
2. Create a new Cosmos DB account
3. Choose the NoSQL API
4. Select a region close to your users
5. Choose serverless capacity mode

### 2. Environment Configuration

Create a `.env.local` file in your project root with the following variables:

```bash
# Azure Cosmos DB Configuration
COSMOS_DB_ENDPOINT=https://your-cosmos-account.documents.azure.com:443/
COSMOS_DB_KEY=YOUR_COSMOS_DB_ACCOUNT_KEY
COSMOS_DB_DATABASE_ID=GlobalEdgeDatabase
```

### 3. Install Dependencies

```bash
npm install @azure/cosmos
```

### 4. Initialize Database

Run the database initialization script:

```bash
node scripts/init-database.js
```

This will create:
- Database: `GlobalEdgeDatabase`
- Containers: `users`, `assets`, `investments`, `kyc-applications`, `notifications`, `admin-logs`, `asset-requests`, `issuer-branding`, `system-settings`, `audit-logs`, `waitlist-submissions`

### 5. Test Connection

Visit `/api/database/test` to verify the connection is working.

## Container Structure

### Users Container
- **Partition Key**: `/id`
- **Purpose**: Store user accounts and profiles

### Assets Container
- **Partition Key**: `/id`
- **Purpose**: Store tokenized asset information

### Investments Container
- **Partition Key**: `/userId`
- **Purpose**: Track user investments

### KYC Applications Container
- **Partition Key**: `/userId`
- **Purpose**: Store KYC verification data

### Notifications Container
- **Partition Key**: `/userId`
- **Purpose**: User notifications and alerts

### Admin Logs Container
- **Partition Key**: `/timestamp`
- **Purpose**: Administrative action logs

### Asset Requests Container
- **Partition Key**: `/issuerId`
- **Purpose**: Asset creation requests from issuers

### Issuer Branding Container
- **Partition Key**: `/issuerId`
- **Purpose**: Whitelabel branding configurations

### System Settings Container
- **Partition Key**: `/category`
- **Purpose**: Platform configuration settings

### Audit Logs Container
- **Partition Key**: `/timestamp`
- **Purpose**: System audit trail

### Waitlist Submissions Container
- **Partition Key**: `/id`
- **Purpose**: Investor waitlist applications

## Security Notes

- Never commit actual database credentials to version control
- Use environment variables for all sensitive configuration
- Regularly rotate database access keys
- Enable firewall rules to restrict access to known IP addresses

## Troubleshooting

### Common Issues

1. **Connection Timeout**: Check your network connection and firewall settings
2. **Authentication Failed**: Verify your Cosmos DB key is correct
3. **Container Not Found**: Ensure the initialization script ran successfully

### Support

For additional help, refer to the [Azure Cosmos DB documentation](https://docs.microsoft.com/en-us/azure/cosmos-db/).

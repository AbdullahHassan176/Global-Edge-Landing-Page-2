// Azure Cosmos DB Configuration
// This file contains the configuration for connecting to Azure Cosmos DB

export interface CosmosConfig {
  endpoint: string;
  key: string;
  databaseId: string;
  containers: {
    users: string;
    assets: string;
    investments: string;
    kycApplications: string;
    notifications: string;
    adminLogs: string;
    assetRequests: string;
    issuerBranding: string;
    systemSettings: string;
    auditLogs: string;
    waitlistSubmissions: string;
  };
}

// Environment-based configuration
export const cosmosConfig: CosmosConfig = {
  endpoint: process.env.COSMOS_DB_ENDPOINT || 'https://your-cosmos-account.documents.azure.com:443/',
  key: process.env.COSMOS_DB_KEY || 'YOUR_COSMOS_DB_ACCOUNT_KEY',
  databaseId: process.env.COSMOS_DB_DATABASE_ID || 'GlobalEdgeDatabase',
  containers: {
    users: 'users',
    assets: 'assets',
    investments: 'investments',
    kycApplications: 'kyc-applications',
    notifications: 'notifications',
    adminLogs: 'admin-logs',
    assetRequests: 'asset-requests',
    issuerBranding: 'issuer-branding',
    systemSettings: 'system-settings',
    auditLogs: 'audit-logs',
    waitlistSubmissions: 'waitlist-submissions'
  }
};

// Container creation commands for Azure CLI
export const containerCreationCommands = [
  // Users container
  `az cosmosdb sql container create --account-name your-cosmos-account --database-name GlobalEdgeDatabase --name users --partition-key-path "/id" --throughput 400`,
  
  // Assets container
  `az cosmosdb sql container create --account-name your-cosmos-account --database-name GlobalEdgeDatabase --name assets --partition-key-path "/id" --throughput 400`,
  
  // Investments container
  `az cosmosdb sql container create --account-name your-cosmos-account --database-name GlobalEdgeDatabase --name investments --partition-key-path "/userId" --throughput 400`,
  
  // KYC Applications container
  `az cosmosdb sql container create --account-name your-cosmos-account --database-name GlobalEdgeDatabase --name kyc-applications --partition-key-path "/userId" --throughput 400`,
  
  // Notifications container
  `az cosmosdb sql container create --account-name your-cosmos-account --database-name GlobalEdgeDatabase --name notifications --partition-key-path "/userId" --throughput 400`,
  
  // Admin Logs container
  `az cosmosdb sql container create --account-name your-cosmos-account --database-name GlobalEdgeDatabase --name admin-logs --partition-key-path "/timestamp" --throughput 400`,
  
  // Asset Requests container
  `az cosmosdb sql container create --account-name your-cosmos-account --database-name GlobalEdgeDatabase --name asset-requests --partition-key-path "/issuerId" --throughput 400`,
  
  // Issuer Branding container
  `az cosmosdb sql container create --account-name your-cosmos-account --database-name GlobalEdgeDatabase --name issuer-branding --partition-key-path "/issuerId" --throughput 400`,
  
  // System Settings container
  `az cosmosdb sql container create --account-name your-cosmos-account --database-name GlobalEdgeDatabase --name system-settings --partition-key-path "/category" --throughput 400`,
  
  // Audit Logs container
  `az cosmosdb sql container create --account-name your-cosmos-account --database-name GlobalEdgeDatabase --name audit-logs --partition-key-path "/timestamp" --throughput 400`,
  
  // Waitlist Submissions container
  `az cosmosdb sql container create --account-name your-cosmos-account --database-name GlobalEdgeDatabase --name waitlist-submissions --partition-key-path "/id" --throughput 400`
];

// Database creation command
export const databaseCreationCommand = `az cosmosdb sql database create --account-name your-cosmos-account --name GlobalEdgeDatabase --throughput 400`;

// Serverless mode commands (recommended for development)
export const serverlessContainerCommands = [
  // Users container (serverless)
  `az cosmosdb sql container create --account-name your-cosmos-account --database-name GlobalEdgeDatabase --name users --partition-key-path "/id"`,
  
  // Assets container (serverless)
  `az cosmosdb sql container create --account-name your-cosmos-account --database-name GlobalEdgeDatabase --name assets --partition-key-path "/id"`,
  
  // Investments container (serverless)
  `az cosmosdb sql container create --account-name your-cosmos-account --database-name GlobalEdgeDatabase --name investments --partition-key-path "/userId"`,
  
  // KYC Applications container (serverless)
  `az cosmosdb sql container create --account-name your-cosmos-account --database-name GlobalEdgeDatabase --name kyc-applications --partition-key-path "/userId"`,
  
  // Notifications container (serverless)
  `az cosmosdb sql container create --account-name your-cosmos-account --database-name GlobalEdgeDatabase --name notifications --partition-key-path "/userId"`,
  
  // Admin Logs container (serverless)
  `az cosmosdb sql container create --account-name your-cosmos-account --database-name GlobalEdgeDatabase --name admin-logs --partition-key-path "/timestamp"`,
  
  // Asset Requests container (serverless)
  `az cosmosdb sql container create --account-name your-cosmos-account --database-name GlobalEdgeDatabase --name asset-requests --partition-key-path "/issuerId"`,
  
  // Issuer Branding container (serverless)
  `az cosmosdb sql container create --account-name your-cosmos-account --database-name GlobalEdgeDatabase --name issuer-branding --partition-key-path "/issuerId"`,
  
  // System Settings container (serverless)
  `az cosmosdb sql container create --account-name your-cosmos-account --database-name GlobalEdgeDatabase --name system-settings --partition-key-path "/category"`,
  
  // Audit Logs container (serverless)
  `az cosmosdb sql container create --account-name your-cosmos-account --database-name GlobalEdgeDatabase --name audit-logs --partition-key-path "/timestamp"`,
  
  // Waitlist Submissions container (serverless)
  `az cosmosdb sql container create --account-name your-cosmos-account --database-name GlobalEdgeDatabase --name waitlist-submissions --partition-key-path "/id"`
];

// Serverless database creation command
export const serverlessDatabaseCommand = `az cosmosdb sql database create --account-name your-cosmos-account --name GlobalEdgeDatabase`;

export default cosmosConfig;

/**
 * Database Initialization Script
 * 
 * This script initializes the Azure Cosmos DB database and containers
 * for the Global Edge tokenized assets platform.
 */

const { CosmosClient } = require('@azure/cosmos');

// Configuration
const config = {
  endpoint: process.env.COSMOS_DB_ENDPOINT || 'https://your-cosmos-account.documents.azure.com:443/',
  key: process.env.COSMOS_DB_KEY || 'YOUR_COSMOS_DB_ACCOUNT_KEY',
  databaseId: process.env.COSMOS_DB_DATABASE_ID || 'GlobalEdgeDatabase'
};

// Container configurations
const containers = [
  { id: 'users', partitionKey: '/id' },
  { id: 'assets', partitionKey: '/id' },
  { id: 'investments', partitionKey: '/id' },
  { id: 'kyc', partitionKey: '/userId' },
  { id: 'notifications', partitionKey: '/userId' },
  { id: 'adminLogs', partitionKey: '/timestamp' },
  { id: 'assetCreationRequests', partitionKey: '/id' },
  { id: 'issuerBranding', partitionKey: '/issuerId' },
  { id: 'systemSettings', partitionKey: '/category' },
  { id: 'auditLogs', partitionKey: '/timestamp' }
];

async function initializeDatabase() {
  console.log('🚀 Initializing Azure Cosmos DB...');
  
  const client = new CosmosClient({
    endpoint: config.endpoint,
    key: config.key,
  });

  try {
    // Test connection
    console.log('📡 Testing database connection...');
    await client.getDatabaseAccount();
    console.log('✅ Database connection successful');

    // Create database
    console.log(`📁 Creating database: ${config.databaseId}`);
    const { database } = await client.databases.createIfNotExists({
      id: config.databaseId,
    });
    console.log('✅ Database created/verified');

  // Create containers
  console.log('📦 Creating containers...');
  for (const containerConfig of containers) {
    console.log(`  Creating container: ${containerConfig.id}`);
    await database.containers.createIfNotExists({
      id: containerConfig.id,
      partitionKey: containerConfig.partitionKey,
      // Use serverless mode to avoid throughput limits
      throughput: undefined
    });
    console.log(`  ✅ Container ${containerConfig.id} created/verified`);
  }

    // Create sample data
    console.log('📊 Creating sample data...');
    await createSampleData(database);

    console.log('🎉 Database initialization completed successfully!');
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
}

async function createSampleData(database) {
  // Create sample users
  const usersContainer = database.container('users');
  const sampleUsers = [
    {
      id: 'admin-001',
      email: 'admin@globaledge.com',
      firstName: 'Admin',
      lastName: 'User',
      country: 'UAE',
      role: 'admin',
      status: 'active',
      accountType: 'individual',
      kycStatus: 'approved',
      totalInvested: 0,
      investmentLimit: 1000000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      permissions: ['admin_access', 'user_management', 'asset_management'],
      twoFactorEnabled: true,
      emailVerified: true
    },
    {
      id: 'issuer-001',
      email: 'issuer@globaledge.com',
      firstName: 'John',
      lastName: 'Issuer',
      country: 'UAE',
      role: 'issuer',
      status: 'active',
      accountType: 'corporate',
      kycStatus: 'approved',
      totalInvested: 0,
      investmentLimit: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      permissions: ['issuer_access', 'asset_creation'],
      companyName: 'Global Logistics Corp',
      taxId: 'TAX123456789',
      assetsCreated: 0,
      assetsUnderManagement: 0,
      twoFactorEnabled: false,
      emailVerified: true
    },
    {
      id: 'investor-001',
      email: 'investor@globaledge.com',
      firstName: 'Jane',
      lastName: 'Investor',
      country: 'UAE',
      role: 'investor',
      status: 'active',
      accountType: 'individual',
      kycStatus: 'approved',
      totalInvested: 0,
      investmentLimit: 100000,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      permissions: ['investor_access'],
      dateOfBirth: '1990-01-01',
      twoFactorEnabled: false,
      emailVerified: true
    }
  ];

  for (const user of sampleUsers) {
    try {
      await usersContainer.items.create(user);
      console.log(`  ✅ Created sample user: ${user.email}`);
    } catch (error) {
      if (error.code === 409) {
        console.log(`  ⚠️  User already exists: ${user.email}`);
      } else {
        console.error(`  ❌ Failed to create user ${user.email}:`, error.message);
      }
    }
  }

  // Create sample assets
  const assetsContainer = database.container('assets');
  const sampleAssets = [
    {
      id: 'asset-001',
      name: 'Jebel Ali-Dubai Container',
      type: 'container',
      description: 'High-value electronics and luxury goods container route from Jebel Ali Port to Dubai.',
      value: '45000',
      apr: '12.5',
      risk: 'Medium',
      route: 'Jebel Ali Port → Dubai',
      cargo: 'Electronics & Luxury Goods',
      status: 'active',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=192&fit=crop&crop=center',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      issuerId: 'issuer-001',
      tokenStandard: 'ERC-20',
      totalSupply: 1000000,
      availableSupply: 1000000,
      minimumInvestment: 1000,
      maximumInvestment: 100000,
      expectedReturn: 12.5,
      riskLevel: 'Medium',
      location: {
        country: 'UAE',
        city: 'Dubai'
      },
      logistics: {
        shippingCompany: 'Maersk',
        insuranceProvider: 'Global Insurance',
        insuranceAmount: 50000
      },
      complianceStatus: 'approved',
      legalDocuments: [],
      performanceMetrics: {
        totalInvestments: 0,
        totalInvestors: 0,
        averageInvestmentSize: 0,
        returnRate: 0,
        volatility: 0,
        lastUpdated: new Date().toISOString()
      },
      adminApproved: true,
      adminApprovedBy: 'admin-001',
      adminApprovedAt: new Date().toISOString()
    }
  ];

  for (const asset of sampleAssets) {
    try {
      await assetsContainer.items.create(asset);
      console.log(`  ✅ Created sample asset: ${asset.name}`);
    } catch (error) {
      if (error.code === 409) {
        console.log(`  ⚠️  Asset already exists: ${asset.name}`);
      } else {
        console.error(`  ❌ Failed to create asset ${asset.name}:`, error.message);
      }
    }
  }

  // Create sample system settings
  const settingsContainer = database.container('systemSettings');
  const sampleSettings = [
    {
      id: 'setting-001',
      category: 'general',
      key: 'site_name',
      value: 'Global Edge',
      type: 'string',
      description: 'The name of the website',
      updatedAt: new Date().toISOString(),
      updatedBy: 'admin-001'
    },
    {
      id: 'setting-002',
      category: 'general',
      key: 'contact_email',
      value: 'info@globalnext.rocks',
      type: 'string',
      description: 'Primary contact email address',
      updatedAt: new Date().toISOString(),
      updatedBy: 'admin-001'
    },
    {
      id: 'setting-003',
      category: 'security',
      key: 'enable_kyc',
      value: true,
      type: 'boolean',
      description: 'Enable KYC verification for users',
      updatedAt: new Date().toISOString(),
      updatedBy: 'admin-001'
    }
  ];

  for (const setting of sampleSettings) {
    try {
      await settingsContainer.items.create(setting);
      console.log(`  ✅ Created sample setting: ${setting.key}`);
    } catch (error) {
      if (error.code === 409) {
        console.log(`  ⚠️  Setting already exists: ${setting.key}`);
      } else {
        console.error(`  ❌ Failed to create setting ${setting.key}:`, error.message);
      }
    }
  }
}

// Run the initialization
if (require.main === module) {
  initializeDatabase().catch(console.error);
}

module.exports = { initializeDatabase };

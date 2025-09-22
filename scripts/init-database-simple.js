const { CosmosClient } = require('@azure/cosmos');

// Configuration
const config = {
  endpoint: process.env.COSMOS_DB_ENDPOINT || 'https://your-cosmos-account.documents.azure.com:443/',
  key: process.env.COSMOS_DB_KEY || 'YOUR_COSMOS_DB_ACCOUNT_KEY',
  databaseId: process.env.COSMOS_DB_DATABASE_ID || 'GlobalEdgeDatabase'
};

// Essential containers only (to stay within throughput limits)
const essentialContainers = [
  {
    id: 'users',
    partitionKey: { paths: ['/id'] }
  },
  {
    id: 'assets',
    partitionKey: { paths: ['/id'] }
  },
  {
    id: 'investments',
    partitionKey: { paths: ['/userId'] }
  },
  {
    id: 'waitlist-submissions',
    partitionKey: { paths: ['/id'] }
  }
];

async function initializeDatabase() {
  try {
    console.log('🚀 Initializing Global Edge Database...');
    
    const client = new CosmosClient({
      endpoint: config.endpoint,
      key: config.key
    });

    // Create database
    console.log('📦 Creating database...');
    const { database } = await client.databases.createIfNotExists({
      id: config.databaseId
    });
    console.log(`✅ Database '${config.databaseId}' ready`);

    // Create containers
    console.log('📋 Creating containers...');
    for (const containerConfig of essentialContainers) {
      try {
        const { container } = await database.containers.createIfNotExists({
          id: containerConfig.id,
          partitionKey: containerConfig.partitionKey
        });
        console.log(`✅ Container '${containerConfig.id}' ready`);
      } catch (error) {
        console.error(`❌ Failed to create container '${containerConfig.id}':`, error.message);
      }
    }

    console.log('🎉 Database initialization complete!');
    console.log('\n📊 Database Statistics:');
    console.log(`- Database: ${config.databaseId}`);
    console.log(`- Containers: ${essentialContainers.length}`);
    console.log(`- Mode: Serverless (no throughput limits)`);

  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
    process.exit(1);
  }
}

// Run initialization
initializeDatabase();

/**
 * Integration Test Script
 * 
 * This script tests all the database integration and API endpoints
 */

const https = require('https');
const http = require('http');

// Test configuration
const BASE_URL = 'http://localhost:3000';
const TEST_PORTS = [3000, 3001, 3002, 3003];

// Test results
const results = {
  server: null,
  database: null,
  api: {},
  suggestions: []
};

async function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ status: res.statusCode, data: jsonData });
        } catch (e) {
          resolve({ status: res.statusCode, data: data });
        }
      });
    });
    
    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
  });
}

async function findRunningServer() {
  console.log('🔍 Finding running server...');
  
  for (const port of TEST_PORTS) {
    try {
      const response = await makeRequest(`${BASE_URL.replace('3000', port)}/`);
      if (response.status === 200) {
        results.server = { port, status: 'running', url: `${BASE_URL.replace('3000', port)}` };
        console.log(`✅ Server found running on port ${port}`);
        return port;
      }
    } catch (error) {
      console.log(`❌ Port ${port}: ${error.message}`);
    }
  }
  
  console.log('❌ No running server found');
  return null;
}

async function testDatabaseConnection(port) {
  console.log('🗄️ Testing database connection...');
  
  try {
    const response = await makeRequest(`${BASE_URL.replace('3000', port)}/api/database/test`);
    results.database = {
      status: response.status === 200 ? 'connected' : 'error',
      response: response.data,
      error: response.status !== 200 ? response.data : null
    };
    
    if (response.status === 200) {
      console.log('✅ Database connection successful');
      console.log(`   Database: ${response.data.data?.stats?.databaseId || 'Unknown'}`);
      console.log(`   Containers: ${response.data.data?.stats?.containerCount || 0}`);
    } else {
      console.log('❌ Database connection failed');
      console.log(`   Error: ${response.data.error || 'Unknown error'}`);
    }
  } catch (error) {
    results.database = { status: 'error', error: error.message };
    console.log('❌ Database connection failed:', error.message);
  }
}

async function testAPIEndpoints(port) {
  console.log('🔌 Testing API endpoints...');
  
  const endpoints = [
    { name: 'Users API', url: '/api/users' },
    { name: 'Assets API', url: '/api/assets' },
    { name: 'Investments API', url: '/api/investments' }
  ];
  
  for (const endpoint of endpoints) {
    try {
      const response = await makeRequest(`${BASE_URL.replace('3000', port)}${endpoint.url}`);
      results.api[endpoint.name] = {
        status: response.status === 200 ? 'working' : 'error',
        response: response.data,
        error: response.status !== 200 ? response.data : null
      };
      
      if (response.status === 200) {
        console.log(`✅ ${endpoint.name}: Working`);
        if (response.data.data?.items) {
          console.log(`   Items: ${response.data.data.items.length}`);
        }
      } else {
        console.log(`❌ ${endpoint.name}: Error (${response.status})`);
        console.log(`   Error: ${response.data.error || 'Unknown error'}`);
      }
    } catch (error) {
      results.api[endpoint.name] = { status: 'error', error: error.message };
      console.log(`❌ ${endpoint.name}: ${error.message}`);
    }
  }
}

function generateSuggestions() {
  console.log('💡 Generating integration suggestions...');
  
  // Database suggestions
  if (results.database?.status === 'connected') {
    results.suggestions.push({
      category: 'Database',
      priority: 'High',
      suggestion: 'Database is connected! You can now integrate real data with your existing services.',
      implementation: 'Replace mock data in userAuthService, assetService, and notificationService with database calls'
    });
    
    results.suggestions.push({
      category: 'User Management',
      priority: 'High',
      suggestion: 'Integrate user registration and login with database',
      implementation: 'Update src/lib/userAuthService.ts to use databaseService.createUser() and databaseService.getUserByEmail()'
    });
    
    results.suggestions.push({
      category: 'Asset Management',
      priority: 'High',
      suggestion: 'Connect asset creation and management to database',
      implementation: 'Update src/lib/assetService.ts to use databaseService.createAsset() and databaseService.getAssets()'
    });
  } else {
    results.suggestions.push({
      category: 'Database',
      priority: 'Critical',
      suggestion: 'Fix database connection issues',
      implementation: 'Check environment variables, Cosmos DB credentials, and network connectivity'
    });
  }
  
  // API suggestions
  if (results.api['Users API']?.status === 'working') {
    results.suggestions.push({
      category: 'Admin Dashboard',
      priority: 'Medium',
      suggestion: 'Connect admin user management to database',
      implementation: 'Update src/app/admin/users/page.tsx to use /api/users endpoint instead of mock data'
    });
  }
  
  if (results.api['Assets API']?.status === 'working') {
    results.suggestions.push({
      category: 'Asset Display',
      priority: 'Medium',
      suggestion: 'Connect assets page to database',
      implementation: 'Update src/app/assets/page.tsx to fetch data from /api/assets endpoint'
    });
  }
  
  // General integration suggestions
  results.suggestions.push({
    category: 'Authentication',
    priority: 'High',
    suggestion: 'Implement database-backed authentication',
    implementation: 'Create JWT tokens, session management, and integrate with existing login flows'
  });
  
  results.suggestions.push({
    category: 'Real-time Updates',
    priority: 'Medium',
    suggestion: 'Add real-time notifications and updates',
    implementation: 'Implement WebSocket connections or Server-Sent Events for live updates'
  });
  
  results.suggestions.push({
    category: 'File Upload',
    priority: 'Medium',
    suggestion: 'Integrate file upload for KYC documents and asset images',
    implementation: 'Add Azure Blob Storage integration for document and image storage'
  });
  
  results.suggestions.push({
    category: 'Email Integration',
    priority: 'Medium',
    suggestion: 'Connect email notifications to database',
    implementation: 'Update notificationService to store and track email delivery status in database'
  });
  
  results.suggestions.push({
    category: 'Analytics',
    priority: 'Low',
    suggestion: 'Add comprehensive analytics and reporting',
    implementation: 'Create analytics dashboard with investment tracking, user behavior, and performance metrics'
  });
  
  results.suggestions.push({
    category: 'Payment Integration',
    priority: 'High',
    suggestion: 'Integrate payment processing',
    implementation: 'Add Stripe or PayPal integration for investment payments and fee collection'
  });
  
  results.suggestions.push({
    category: 'Mobile App',
    priority: 'Low',
      suggestion: 'Create mobile application',
      implementation: 'Develop React Native or Flutter app with same API endpoints'
  });
}

function printResults() {
  console.log('\n📊 INTEGRATION TEST RESULTS');
  console.log('='.repeat(50));
  
  // Server status
  console.log('\n🖥️  SERVER STATUS:');
  if (results.server) {
    console.log(`   ✅ Running on port ${results.server.port}`);
    console.log(`   🌐 URL: ${results.server.url}`);
  } else {
    console.log('   ❌ No server found');
  }
  
  // Database status
  console.log('\n🗄️  DATABASE STATUS:');
  if (results.database) {
    console.log(`   Status: ${results.database.status === 'connected' ? '✅ Connected' : '❌ Error'}`);
    if (results.database.error) {
      console.log(`   Error: ${results.database.error}`);
    }
  } else {
    console.log('   ❌ Not tested');
  }
  
  // API status
  console.log('\n🔌 API ENDPOINTS:');
  Object.entries(results.api).forEach(([name, result]) => {
    const status = result.status === 'working' ? '✅' : '❌';
    console.log(`   ${status} ${name}: ${result.status}`);
    if (result.error) {
      console.log(`      Error: ${result.error}`);
    }
  });
  
  // Suggestions
  console.log('\n💡 INTEGRATION SUGGESTIONS:');
  results.suggestions.forEach((suggestion, index) => {
    console.log(`\n${index + 1}. ${suggestion.category} (${suggestion.priority} Priority)`);
    console.log(`   💡 ${suggestion.suggestion}`);
    console.log(`   🔧 Implementation: ${suggestion.implementation}`);
  });
  
  console.log('\n' + '='.repeat(50));
  console.log('🎯 NEXT STEPS:');
  console.log('1. Fix any critical issues (Database connection)');
  console.log('2. Implement high-priority integrations (User management, Asset management)');
  console.log('3. Add medium-priority features (Admin dashboard, Real-time updates)');
  console.log('4. Consider low-priority enhancements (Analytics, Mobile app)');
}

async function runTests() {
  console.log('🚀 Starting Integration Tests...\n');
  
  const port = await findRunningServer();
  if (!port) {
    console.log('❌ Cannot run tests without a running server');
    return;
  }
  
  await testDatabaseConnection(port);
  await testAPIEndpoints(port);
  generateSuggestions();
  printResults();
}

// Run the tests
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { runTests, results };

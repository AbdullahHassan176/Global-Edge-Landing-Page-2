# Database Setup and Data Storage

## Current Implementation

The Global Edge platform currently uses a **mock database service** for development and demonstration purposes. This provides a fully functional data layer without requiring external database setup.

## Data Storage Architecture

### 1. **Mock Database Service** (Current)
- **Location**: `src/lib/dataStorage.ts`
- **Type**: In-memory storage with mock data
- **Use Case**: Development, testing, and demonstrations
- **Features**:
  - Complete CRUD operations for all entities
  - Pre-populated with realistic mock data
  - TypeScript interfaces for type safety
  - Consistent API across all data operations

### 2. **Local Storage Service** (Available)
- **Location**: `src/lib/dataStorage.ts`
- **Type**: Browser localStorage
- **Use Case**: Client-side persistence for development
- **Features**:
  - Data persists across browser sessions
  - Simple key-value storage
  - Automatic JSON serialization

## Data Entities

### Core Entities
1. **Users** - User accounts and profiles
2. **Assets** - Tokenized investment opportunities
3. **Investments** - User investment records
4. **Notifications** - System notifications and alerts

### Entity Structure
```typescript
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  accountType: 'individual' | 'corporate';
  kycStatus: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  lastLogin: string;
}

interface Asset {
  id: string;
  name: string;
  type: 'container' | 'property' | 'inventory' | 'vault';
  totalValue: number;
  availableShares: number;
  pricePerShare: number;
  expectedReturn: number;
  riskLevel: 'low' | 'medium' | 'high';
  status: 'active' | 'sold_out' | 'coming_soon';
  description: string;
  location: string;
  createdAt: string;
}

interface Investment {
  id: string;
  userId: string;
  assetId: string;
  amount: number;
  shares: number;
  purchaseDate: string;
  status: 'active' | 'sold' | 'pending';
}

interface Notification {
  id: string;
  type: 'admin' | 'email' | 'webhook';
  title: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'sent' | 'failed';
  metadata?: any;
}
```

## Usage Examples

### Basic Operations
```typescript
import { getDatabase } from '@/lib/dataStorage';

const db = getDatabase();

// Create a new user
const user = await db.createUser({
  email: 'user@example.com',
  firstName: 'John',
  lastName: 'Doe',
  phone: '+1 (555) 123-4567',
  accountType: 'individual',
  kycStatus: 'pending'
});

// Get user by ID
const foundUser = await db.getUser(user.id);

// Update user
await db.updateUser(user.id, { kycStatus: 'approved' });

// List all users
const allUsers = await db.listUsers();
```

### Investment Operations
```typescript
// Create investment
const investment = await db.createInvestment({
  userId: 'user-1',
  assetId: 'asset-1',
  amount: 1000,
  shares: 20,
  purchaseDate: new Date().toISOString(),
  status: 'active'
});

// Get user's investments
const userInvestments = await db.listInvestments('user-1');
```

## Production Database Setup

### Supported Database Types
1. **PostgreSQL** (Recommended)
2. **MongoDB**
3. **MySQL**

### Environment Configuration
```env
# Database Configuration
DATABASE_TYPE=postgresql
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=global_edge
DATABASE_USERNAME=your_username
DATABASE_PASSWORD=your_password
DATABASE_URL=postgresql://username:password@localhost:5432/global_edge
```

### PostgreSQL Setup (Recommended)

#### 1. Install PostgreSQL
```bash
# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# macOS
brew install postgresql

# Windows
# Download from https://www.postgresql.org/download/windows/
```

#### 2. Create Database
```sql
-- Connect to PostgreSQL
psql -U postgres

-- Create database
CREATE DATABASE global_edge;

-- Create user
CREATE USER global_edge_user WITH PASSWORD 'your_secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE global_edge TO global_edge_user;

-- Connect to the database
\c global_edge

-- Grant schema privileges
GRANT ALL ON SCHEMA public TO global_edge_user;
```

#### 3. Database Schema
```sql
-- Users table
CREATE TABLE users (
    id VARCHAR(255) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    account_type VARCHAR(50) NOT NULL,
    kyc_status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP
);

-- Assets table
CREATE TABLE assets (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,
    total_value DECIMAL(15,2) NOT NULL,
    available_shares INTEGER NOT NULL,
    price_per_share DECIMAL(10,2) NOT NULL,
    expected_return DECIMAL(5,2) NOT NULL,
    risk_level VARCHAR(20) NOT NULL,
    status VARCHAR(50) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Investments table
CREATE TABLE investments (
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) REFERENCES users(id),
    asset_id VARCHAR(255) REFERENCES assets(id),
    amount DECIMAL(15,2) NOT NULL,
    shares INTEGER NOT NULL,
    purchase_date TIMESTAMP NOT NULL,
    status VARCHAR(50) NOT NULL
);

-- Notifications table
CREATE TABLE notifications (
    id VARCHAR(255) PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL,
    metadata JSONB
);

-- Indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_investments_user_id ON investments(user_id);
CREATE INDEX idx_investments_asset_id ON investments(asset_id);
CREATE INDEX idx_notifications_timestamp ON notifications(timestamp);
```

### MongoDB Setup

#### 1. Install MongoDB
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# macOS
brew install mongodb-community

# Windows
# Download from https://www.mongodb.com/try/download/community
```

#### 2. Start MongoDB
```bash
# Start MongoDB service
sudo systemctl start mongod

# Or manually
mongod --dbpath /var/lib/mongodb
```

#### 3. Create Database and Collections
```javascript
// Connect to MongoDB
mongo

// Use the database
use global_edge

// Create collections with validation
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["email", "firstName", "lastName", "accountType", "kycStatus"],
      properties: {
        email: { bsonType: "string" },
        firstName: { bsonType: "string" },
        lastName: { bsonType: "string" },
        accountType: { enum: ["individual", "corporate"] },
        kycStatus: { enum: ["pending", "approved", "rejected"] }
      }
    }
  }
});

db.createCollection("assets");
db.createCollection("investments");
db.createCollection("notifications");
```

## Migration from Mock to Production Database

### Step 1: Update Configuration
```typescript
// In src/lib/dataStorage.ts
const config: DatabaseConfig = {
  type: 'postgresql', // or 'mongodb', 'mysql'
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432'),
  database: process.env.DATABASE_NAME,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD
};
```

### Step 2: Implement Database Service
```typescript
// Example PostgreSQL implementation
export class PostgreSQLService implements DatabaseService {
  private client: Client;

  constructor(config: DatabaseConfig) {
    this.client = new Client({
      host: config.host,
      port: config.port,
      database: config.database,
      user: config.username,
      password: config.password
    });
    this.client.connect();
  }

  async createUser(user: Omit<User, 'id' | 'createdAt' | 'lastLogin'>): Promise<User> {
    const query = `
      INSERT INTO users (id, email, first_name, last_name, phone, account_type, kyc_status, created_at, last_login)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;
    const id = dataUtils.generateId();
    const now = new Date().toISOString();
    const result = await this.client.query(query, [
      id, user.email, user.firstName, user.lastName, user.phone,
      user.accountType, user.kycStatus, now, now
    ]);
    return this.mapUserFromDB(result.rows[0]);
  }

  // ... implement other methods
}
```

### Step 3: Data Migration
```typescript
// Migration script to move mock data to production database
async function migrateData() {
  const mockDb = new MockDatabaseService();
  const prodDb = new PostgreSQLService(config);

  // Migrate users
  const users = await mockDb.listUsers();
  for (const user of users) {
    await prodDb.createUser(user);
  }

  // Migrate assets
  const assets = await mockDb.listAssets();
  for (const asset of assets) {
    await prodDb.createAsset(asset);
  }

  // ... migrate other entities
}
```

## Security Considerations

### 1. **Environment Variables**
- Never commit database credentials to version control
- Use environment variables for all sensitive configuration
- Use different credentials for development, staging, and production

### 2. **Connection Security**
- Use SSL/TLS for database connections in production
- Implement connection pooling for better performance
- Use read replicas for read-heavy operations

### 3. **Data Validation**
- Implement input validation at the API level
- Use database constraints and validation rules
- Sanitize user inputs to prevent injection attacks

### 4. **Backup Strategy**
- Implement regular automated backups
- Test backup restoration procedures
- Store backups in secure, off-site locations

## Performance Optimization

### 1. **Indexing**
- Create indexes on frequently queried columns
- Monitor query performance and optimize slow queries
- Use composite indexes for multi-column queries

### 2. **Caching**
- Implement Redis for session and data caching
- Cache frequently accessed data
- Use CDN for static assets

### 3. **Connection Pooling**
- Use connection pooling to manage database connections
- Configure appropriate pool sizes
- Monitor connection usage and adjust as needed

## Monitoring and Maintenance

### 1. **Health Checks**
- Implement database health check endpoints
- Monitor connection status and query performance
- Set up alerts for database issues

### 2. **Logging**
- Log all database operations
- Monitor slow queries and errors
- Implement audit trails for sensitive operations

### 3. **Maintenance**
- Regular database maintenance and optimization
- Monitor disk space and growth
- Update database software regularly

## Next Steps

1. **Choose Database**: Select PostgreSQL, MongoDB, or MySQL based on your needs
2. **Set Up Environment**: Configure development and production environments
3. **Implement Service**: Create the database service implementation
4. **Migrate Data**: Move from mock data to production database
5. **Test Thoroughly**: Ensure all functionality works with real database
6. **Deploy**: Deploy to production with proper monitoring

## Support

For questions about database setup or implementation:
- **Email**: info@globalnext.rocks
- **Documentation**: Check the code comments in `src/lib/dataStorage.ts`
- **Issues**: Create GitHub issues for bugs or feature requests

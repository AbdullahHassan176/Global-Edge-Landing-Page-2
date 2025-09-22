/**
 * Azure Cosmos DB Client
 * 
 * This file contains the Cosmos DB client configuration and connection management
 * for the Global Edge tokenized assets platform.
 */

import { CosmosClient, Database, Container } from '@azure/cosmos';
import { cosmosConfig, containerConfigs } from './cosmosConfig';

class CosmosDBClient {
  private client: CosmosClient;
  private database: Database | null = null;
  private containers: Map<string, Container> = new Map();

  constructor() {
    this.client = new CosmosClient({
      endpoint: cosmosConfig.endpoint,
      key: cosmosConfig.key,
    });
  }

  /**
   * Initialize the database connection and containers
   */
  async initialize(): Promise<void> {
    try {
      // Get or create database
      const { database } = await this.client.databases.createIfNotExists({
        id: cosmosConfig.databaseId,
      });
      this.database = database;

      // Initialize all containers
      for (const [containerName, config] of Object.entries(containerConfigs)) {
        const { container } = await this.database.containers.createIfNotExists({
          id: containerName,
          partitionKey: config.partitionKey,
        });
        this.containers.set(containerName, container);
      }

      console.log('✅ Cosmos DB initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize Cosmos DB:', error);
      throw error;
    }
  }

  /**
   * Get a specific container
   */
  getContainer(containerName: keyof typeof cosmosConfig.containers): Container {
    const container = this.containers.get(containerName);
    if (!container) {
      throw new Error(`Container ${containerName} not found. Make sure to call initialize() first.`);
    }
    return container;
  }

  /**
   * Get the database instance
   */
  getDatabase(): Database {
    if (!this.database) {
      throw new Error('Database not initialized. Make sure to call initialize() first.');
    }
    return this.database;
  }

  /**
   * Test the database connection
   */
  async testConnection(): Promise<boolean> {
    try {
      await this.client.getDatabaseAccount();
      return true;
    } catch (error) {
      console.error('Database connection test failed:', error);
      return false;
    }
  }

  /**
   * Get database statistics
   */
  async getDatabaseStats(): Promise<any> {
    try {
      const database = this.getDatabase();
      const containers = await database.containers.readAll().fetchAll();
      
      const stats = {
        databaseId: database.id,
        containerCount: containers.resources.length,
        containers: containers.resources.map(container => ({
          id: container.id,
          partitionKey: container.partitionKey,
          indexingPolicy: container.indexingPolicy,
        })),
      };

      return stats;
    } catch (error) {
      console.error('Failed to get database stats:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const cosmosClient = new CosmosDBClient();

// Export types for use in other files
export type { CosmosClient, Database, Container } from '@azure/cosmos';

@description('Location for all resources')
param location string = resourceGroup().location

@description('Environment name (dev, staging, prod)')
param env string

@description('Application name')
param appName string = 'global-edge-${env}'

@description('PostgreSQL Flexible Server SKU')
param pgSkuName string = 'GP_Standard_D2s_v3'

@description('PostgreSQL version')
param pgVersion string = '16'

@description('Enable public access for PostgreSQL (dev only)')
param enablePublicAccess bool = env == 'dev'

@description('Container Apps environment SKU')
param containerAppsSku string = env == 'prod' ? 'Premium' : 'Consumption'

@description('Storage account SKU')
param storageSku string = env == 'prod' ? 'Standard_GRS' : 'Standard_LRS'

// Key Vault for secrets management
resource keyVault 'Microsoft.KeyVault/vaults@2023-07-01' = {
  name: '${appName}-kv'
  location: location
  properties: {
    tenantId: subscription().tenantId
    sku: { 
      family: 'A' 
      name: 'standard' 
    }
    accessPolicies: []
    enableRbacAuthorization: true
    enableSoftDelete: true
    softDeleteRetentionInDays: 90
    enablePurgeProtection: env == 'prod'
  }
}

// Storage Account for blobs and static assets
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: toLower(replace('${appName}sa', '-', ''))
  location: location
  sku: { 
    name: storageSku 
  }
  kind: 'StorageV2'
  properties: {
    accessTier: 'Hot'
    allowBlobPublicAccess: false
    minimumTlsVersion: 'TLS1_2'
    supportsHttpsTrafficOnly: true
  }
}

// Blob service for file storage
resource blobService 'Microsoft.Storage/storageAccounts/blobServices@2023-01-01' = {
  parent: storageAccount
  name: 'default'
  properties: {
    cors: {
      corsRules: [
        {
          allowedOrigins: ['*']
          allowedMethods: ['GET', 'POST', 'PUT', 'DELETE']
          allowedHeaders: ['*']
          exposedHeaders: ['*']
          maxAgeInSeconds: 86400
        }
      ]
    }
  }
}

// Container for application files
resource blobContainer 'Microsoft.Storage/storageAccounts/blobServices/containers@2023-01-01' = {
  parent: blobService
  name: 'app-files'
  properties: {
    publicAccess: 'None'
  }
}

// PostgreSQL Flexible Server
resource postgresServer 'Microsoft.DBforPostgreSQL/flexibleServers@2024-02-14' = {
  name: '${appName}-pg'
  location: location
  sku: { 
    name: pgSkuName 
    tier: 'GeneralPurpose' 
  }
  properties: {
    version: pgVersion
    storage: { 
      storageSizeGB: env == 'prod' ? 512 : 128 
    }
    administratorLogin: 'pgadmin'
    administratorLoginPassword: newGuid() // Will be stored in Key Vault
    network: { 
      publicNetworkAccess: enablePublicAccess ? 'Enabled' : 'Disabled'
    }
    backup: {
      backupRetentionDays: env == 'prod' ? 30 : 7
      geoRedundantBackup: env == 'prod' ? 'Enabled' : 'Disabled'
    }
    highAvailability: env == 'prod' ? {
      mode: 'ZoneRedundant'
    } : null
  }
}

// PostgreSQL Database
resource postgresDatabase 'Microsoft.DBforPostgreSQL/flexibleServers/databases@2024-02-14' = {
  parent: postgresServer
  name: 'globaledge'
  properties: {
    charset: 'utf8'
    collation: 'en_US.utf8'
  }
}

// Application Insights for monitoring
resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: '${appName}-insights'
  location: location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    Request_Source: 'rest'
    WorkspaceResourceId: logAnalyticsWorkspace.id
  }
}

// Log Analytics Workspace
resource logAnalyticsWorkspace 'Microsoft.OperationalInsights/workspaces@2022-10-01' = {
  name: '${appName}-logs'
  location: location
  properties: {
    sku: { name: 'PerGB2018' }
    retentionInDays: env == 'prod' ? 90 : 30
  }
}

// Container Apps Environment
resource containerAppsEnvironment 'Microsoft.App/managedEnvironments@2023-05-01' = {
  name: '${appName}-env'
  location: location
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: logAnalyticsWorkspace.properties.customerId
        sharedKey: logAnalyticsWorkspace.listKeys().primarySharedKey
      }
    }
    vnetConfiguration: env == 'prod' ? {
      infrastructureSubnetId: vnet.properties.subnets[0].id
      internal: true
    } : null
  }
}

// VNet for production (optional)
resource vnet 'Microsoft.Network/virtualNetworks@2023-05-01' = if (env == 'prod') {
  name: '${appName}-vnet'
  location: location
  properties: {
    addressSpace: {
      addressPrefixes: ['10.0.0.0/16']
    }
    subnets: [
      {
        name: 'container-apps-subnet'
        properties: {
          addressPrefix: '10.0.1.0/24'
          delegations: [
            {
              name: 'Microsoft.App.environments'
              properties: {
                serviceName: 'Microsoft.App/environments'
              }
            }
          ]
        }
      }
    ]
  }
}

// Web Application (Next.js)
resource webApp 'Microsoft.App/containerApps@2023-05-01' = {
  name: '${appName}-web'
  location: location
  properties: {
    environmentId: containerAppsEnvironment.id
    configuration: {
      ingress: {
        external: true
        targetPort: 3000
        transport: 'http'
        allowInsecure: false
      }
      secrets: [
        {
          name: 'postgres-connection-string'
          value: 'Server=${postgresServer.properties.fullyQualifiedDomainName};Database=${postgresDatabase.name};Port=5432;User Id=pgadmin;Password=${postgresServer.properties.administratorLoginPassword};Ssl Mode=Require;'
        }
        {
          name: 'storage-connection-string'
          value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};AccountKey=${storageAccount.listKeys().keys[0].value};EndpointSuffix=core.windows.net'
        }
        {
          name: 'app-insights-key'
          value: appInsights.properties.InstrumentationKey
        }
      ]
    }
    template: {
      containers: [
        {
          name: 'web'
          image: 'global-edge-web:latest'
          resources: {
            cpu: env == 'prod' ? 1.0 : 0.5
            memory: env == 'prod' ? '2Gi' : '1Gi'
          }
          env: [
            {
              name: 'NODE_ENV'
              value: 'production'
            }
            {
              name: 'DATABASE_URL'
              secretRef: 'postgres-connection-string'
            }
            {
              name: 'AZURE_STORAGE_CONNECTION_STRING'
              secretRef: 'storage-connection-string'
            }
            {
              name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
              secretRef: 'app-insights-key'
            }
            {
              name: 'NEXT_PUBLIC_API_BASE'
              value: 'azure'
            }
          ]
        }
      ]
      scale: {
        minReplicas: env == 'prod' ? 2 : 0
        maxReplicas: env == 'prod' ? 10 : 3
        rules: [
          {
            name: 'http-scaling'
            http: {
              metadata: {
                concurrentRequests: '30'
              }
            }
          }
        ]
      }
    }
  }
}

// API Application (Node.js API)
resource apiApp 'Microsoft.App/containerApps@2023-05-01' = {
  name: '${appName}-api'
  location: location
  properties: {
    environmentId: containerAppsEnvironment.id
    configuration: {
      ingress: {
        external: true
        targetPort: 8080
        transport: 'http'
        allowInsecure: false
      }
      secrets: [
        {
          name: 'postgres-connection-string'
          value: 'Server=${postgresServer.properties.fullyQualifiedDomainName};Database=${postgresDatabase.name};Port=5432;User Id=pgadmin;Password=${postgresServer.properties.administratorLoginPassword};Ssl Mode=Require;'
        }
        {
          name: 'storage-connection-string'
          value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};AccountKey=${storageAccount.listKeys().keys[0].value};EndpointSuffix=core.windows.net'
        }
        {
          name: 'app-insights-key'
          value: appInsights.properties.InstrumentationKey
        }
      ]
    }
    template: {
      containers: [
        {
          name: 'api'
          image: 'global-edge-api:latest'
          resources: {
            cpu: env == 'prod' ? 1.0 : 0.5
            memory: env == 'prod' ? '2Gi' : '1Gi'
          }
          env: [
            {
              name: 'NODE_ENV'
              value: 'production'
            }
            {
              name: 'DATABASE_URL'
              secretRef: 'postgres-connection-string'
            }
            {
              name: 'AZURE_STORAGE_CONNECTION_STRING'
              secretRef: 'storage-connection-string'
            }
            {
              name: 'APPINSIGHTS_INSTRUMENTATIONKEY'
              secretRef: 'app-insights-key'
            }
          ]
        }
      ]
      scale: {
        minReplicas: env == 'prod' ? 2 : 0
        maxReplicas: env == 'prod' ? 10 : 3
        rules: [
          {
            name: 'http-scaling'
            http: {
              metadata: {
                concurrentRequests: '30'
              }
            }
          }
        ]
      }
    }
  }
}

// Store secrets in Key Vault
resource postgresSecret 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
  parent: keyVault
  name: 'postgres-connection-string'
  properties: {
    value: 'Server=${postgresServer.properties.fullyQualifiedDomainName};Database=${postgresDatabase.name};Port=5432;User Id=pgadmin;Password=${postgresServer.properties.administratorLoginPassword};Ssl Mode=Require;'
  }
}

resource storageSecret 'Microsoft.KeyVault/vaults/secrets@2023-07-01' = {
  parent: keyVault
  name: 'storage-connection-string'
  properties: {
    value: 'DefaultEndpointsProtocol=https;AccountName=${storageAccount.name};AccountKey=${storageAccount.listKeys().keys[0].value};EndpointSuffix=core.windows.net'
  }
}

// Outputs for reference
output webAppUrl string = webApp.properties.configuration.ingress.fqdn
output apiAppUrl string = apiApp.properties.configuration.ingress.fqdn
output postgresServerName string = postgresServer.name
output storageAccountName string = storageAccount.name
output keyVaultName string = keyVault.name
output appInsightsInstrumentationKey string = appInsights.properties.InstrumentationKey

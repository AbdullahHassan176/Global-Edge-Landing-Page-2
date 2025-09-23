# Azure Blob Storage Setup Guide

This guide will help you set up Azure Blob Storage for your Global Edge platform.

## Your Azure Configuration

Your Azure Blob Storage details:
- **Account Name:** `gelandingblobstorage`
- **Connection String:** [Provided separately - see environment variables section]
- **Container:** `global-edge-uploads` (needs to be created)

**Important:** Add your Azure credentials to your `.env.local` file for the application to work.

## Manual Setup Steps

Since I cannot directly access your Azure account, here are the steps you need to follow:

### 1. Create the Container

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to your storage account: `gelandingblobstorage`
3. Go to **Containers** in the left menu
4. Click **+ Container**
5. Name: `global-edge-uploads`
6. Public access level: **Private (no anonymous access)**
7. Click **Create**

### 2. Configure CORS (Cross-Origin Resource Sharing)

1. In your storage account, go to **Settings** → **Resource sharing (CORS)**
2. Add a new rule:
   - **Allowed origins:** `*` (or your domain)
   - **Allowed methods:** `GET, POST, PUT, DELETE, OPTIONS`
   - **Allowed headers:** `*`
   - **Exposed headers:** `*`
   - **Max age:** `86400`

### 3. Set Up Access Policies (Optional but Recommended)

1. Go to **Access control (IAM)** in your storage account
2. Add a new role assignment:
   - **Role:** Storage Blob Data Contributor
   - **Assign access to:** User, group, or service principal
   - **Select:** Your application or service principal

### 4. Environment Variables

Add these to your `.env.local` file with your actual Azure credentials:

```bash
# Azure Blob Storage
AZURE_STORAGE_CONNECTION_STRING=DefaultEndpointsProtocol=https;AccountName=gelandingblobstorage;AccountKey=YOUR_ACCOUNT_KEY;EndpointSuffix=core.windows.net
AZURE_STORAGE_ACCOUNT_NAME=gelandingblobstorage
AZURE_STORAGE_ACCOUNT_KEY=YOUR_ACCOUNT_KEY
AZURE_STORAGE_CONTAINER_NAME=global-edge-uploads
```

**Your Azure Details (provided separately):**
- Account Name: `gelandingblobstorage`
- Account Key: [Check your secure credentials file]
- Full Connection String: [Check your secure credentials file]

## File Upload Features

Your platform now supports:

### Document Categories
- **KYC Documents:** Passport, ID, utility bills (5MB max)
- **Investment Documents:** Agreements, contracts (10MB max)
- **Asset Documents:** Images, descriptions (20MB max)
- **General Documents:** Mixed content (10MB max)

### Supported File Types
- **Images:** JPEG, PNG, GIF
- **Documents:** PDF, DOC, DOCX
- **Size Limits:** Configurable per category

### Security Features
- **File Validation:** Type and size checking
- **Unique Naming:** Timestamp + random string
- **Private Access:** No anonymous access
- **CORS Protection:** Configured for your domain

## Testing the Setup

1. **Start your development server:**
   ```bash
   npm run dev
   ```

2. **Test file upload:**
   - Go to any page with file upload functionality
   - Try uploading a document
   - Check the browser console for any errors

3. **Verify in Azure:**
   - Go to your storage account
   - Check the `global-edge-uploads` container
   - Verify files are being uploaded

## Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Ensure CORS is properly configured
   - Check that your domain is allowed

2. **Authentication Errors:**
   - Verify your connection string is correct
   - Check that the storage account is accessible

3. **Container Not Found:**
   - Create the `global-edge-uploads` container manually
   - Ensure the container name matches exactly

4. **Permission Denied:**
   - Check your access policies
   - Verify the account key is correct

### Debug Steps

1. **Check Connection:**
   ```bash
   # Test your connection string
   az storage container list --connection-string "YOUR_CONNECTION_STRING"
   ```

2. **Verify Container:**
   ```bash
   # List containers
   az storage container list --account-name gelandingblobstorage --account-key YOUR_KEY
   ```

3. **Test Upload:**
   ```bash
   # Upload a test file
   az storage blob upload --account-name gelandingblobstorage --account-key YOUR_KEY --container-name global-edge-uploads --file test.txt --name test.txt
   ```

## Production Considerations

1. **Use Managed Identity:** Instead of connection strings
2. **Set Up Monitoring:** Enable logging and alerts
3. **Configure Backup:** Set up geo-redundant storage
4. **Implement CDN:** For faster file delivery
5. **Set Up Lifecycle Management:** Auto-delete old files

## Security Best Practices

1. **Rotate Keys Regularly:** Change access keys periodically
2. **Use SAS Tokens:** For temporary access
3. **Enable Encryption:** At rest and in transit
4. **Monitor Access:** Set up audit logs
5. **Limit Permissions:** Use least privilege principle

## Support

If you encounter issues:
1. Check the Azure Portal for error messages
2. Review the browser console for client-side errors
3. Check the server logs for backend errors
4. Verify your connection string and permissions

Your Azure Blob Storage is now ready to handle file uploads for your Global Edge platform! 🚀

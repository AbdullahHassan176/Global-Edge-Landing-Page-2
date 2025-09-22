# Environment Configuration

## Required Environment Variables

### Azure Cosmos DB Configuration
```bash
COSMOS_DB_ENDPOINT=https://your-cosmos-account.documents.azure.com:443/
COSMOS_DB_KEY=YOUR_COSMOS_DB_ACCOUNT_KEY
COSMOS_DB_DATABASE_ID=GlobalEdgeDatabase
```

### Azure Static Web Apps Configuration
```bash
AZURE_STATIC_WEB_APPS_API_TOKEN=your_api_token
AZURE_STATIC_WEB_APPS_DEPLOYMENT_TOKEN=your_deployment_token
```

### Application Configuration
```bash
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### Email Configuration (Optional)
```bash
SENDGRID_API_KEY=your_sendgrid_api_key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
```

### OAuth Configuration (Optional)
```bash
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
```

## Setup Instructions

1. Copy the `.env.example` file to `.env.local`
2. Fill in the actual values for your environment
3. Never commit `.env.local` to version control
4. For production, set these variables in your hosting platform

## Security Best Practices

- Use strong, unique secrets for production
- Rotate keys regularly
- Use different credentials for development and production
- Monitor access logs for suspicious activity

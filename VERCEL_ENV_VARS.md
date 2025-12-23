# Vercel Environment Variables

These environment variables need to be added to your Vercel project settings.

## Required Variables

### Database
```
DATABASE_URL=mysql://root:BblRGLsFrLrVBHBJDjjDMduHUbTfkuAe@ballast.proxy.rlwy.net:36179/railway
```

### Authentication
```
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### GitHub OAuth
You need to create a GitHub OAuth App first:
1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - Application name: SDSURABHI Cricket Fantasy
   - Homepage URL: https://cricket-fantasy-delta.vercel.app
   - Authorization callback URL: https://cricket-fantasy-delta.vercel.app/api/auth/github/callback
4. Click "Register application"
5. Copy the Client ID and generate a Client Secret

Then add these variables:
```
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
NEXT_PUBLIC_APP_URL=https://cricket-fantasy-delta.vercel.app
```

## How to Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Click on "Settings"
3. Click on "Environment Variables"
4. Add each variable one by one:
   - Name: (variable name, e.g., DATABASE_URL)
   - Value: (the value)
   - Environment: Select "Production", "Preview", and "Development"
5. Click "Save"

## After Adding Variables

After adding all environment variables, you need to redeploy:
1. Go to "Deployments" tab
2. Click the three dots (...) on the latest deployment
3. Click "Redeploy"
4. Check "Use existing Build Cache"
5. Click "Redeploy"

The environment variables will be available to your serverless functions.

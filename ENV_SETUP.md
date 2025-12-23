# Environment Variables Setup for Railway

This document lists all environment variables needed to deploy this application on Railway.

## Required Environment Variables

### Database
```
DATABASE_URL=mysql://user:password@host:port/database
```
- Get this from Railway's MySQL plugin or your external database provider
- Format: `mysql://username:password@hostname:port/database_name`

### Authentication
```
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
```
- Generate a secure random string (minimum 32 characters)
- Example: Use `openssl rand -base64 32` to generate

### App Configuration
```
VITE_APP_ID=cricket-fantasy
VITE_APP_TITLE=SDSURABHI - Play for Fun
VITE_APP_LOGO=/logo.png
```

### OAuth Configuration (IMPORTANT - Manus-specific, needs replacement)
```
OAUTH_SERVER_URL=https://your-oauth-server.com
OWNER_OPEN_ID=your-owner-open-id
VITE_OAUTH_PORTAL_URL=https://your-oauth-portal.com
```

**⚠️ WARNING:** The current app uses Manus OAuth which won't work on Railway.

**Options:**
1. **Implement your own OAuth** - Set up Google/GitHub OAuth
2. **Use Auth0, Clerk, or similar** - Third-party auth service
3. **Remove OAuth** - Use email/password authentication only

### Analytics (Optional)
```
VITE_ANALYTICS_ENDPOINT=https://your-analytics-endpoint.com
VITE_ANALYTICS_WEBSITE_ID=your-website-id
```
- Remove these if you're not using analytics
- Or set up your own analytics service (e.g., Umami, Plausible)

### Node Environment
```
NODE_ENV=production
```
- Railway sets this automatically

### Port
```
PORT=3000
```
- Railway sets this automatically, but 3000 is the fallback

## Manus-Specific Variables to REMOVE

These variables are Manus-specific and should NOT be set on Railway:
- `BUILT_IN_FORGE_API_URL`
- `BUILT_IN_FORGE_API_KEY`
- `VITE_FRONTEND_FORGE_API_KEY`
- `VITE_FRONTEND_FORGE_API_URL`
- `OWNER_NAME`

## Setup Instructions for Railway

1. Go to your Railway project dashboard
2. Click on your service
3. Go to "Variables" tab
4. Add each environment variable listed above
5. Click "Deploy" to apply changes

## Database Setup

Railway provides a MySQL plugin:
1. In your Railway project, click "+ New"
2. Select "Database" → "MySQL"
3. Railway will automatically create `DATABASE_URL` variable
4. Run migrations: `pnpm db:push`

## Important Notes

- Never commit `.env` file to Git
- Keep your `JWT_SECRET` secure and never share it
- Update OAuth configuration before deploying
- Test all environment variables in Railway's staging environment first

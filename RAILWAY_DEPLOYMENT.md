# Railway Deployment Guide

This guide will help you deploy the SDSURABHI Cricket Fantasy application to Railway.

## Prerequisites

- GitHub account
- Railway account (sign up at https://railway.app)
- Database (Railway MySQL or external)

## Phase 1: Prepare Code (COMPLETED ✅)

The following changes have been made to prepare the code for Railway:

1. ✅ Removed `vite-plugin-manus-runtime` dependency
2. ✅ Removed Manus-specific vite configuration
3. ✅ Created `railway.json` configuration file
4. ✅ Created environment variables documentation (`ENV_SETUP.md`)

## Phase 2: Create GitHub Repository

### Step 1: Initialize Git Repository

```bash
cd /home/ubuntu/cricket-fantasy
git init
git add .
git commit -m "Initial commit: SDSURABHI Cricket Fantasy"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `cricket-fantasy` (or your preferred name)
3. Description: "SDSURABHI Cricket Fantasy - Skill-based cricket game"
4. Visibility: Private (recommended) or Public
5. **DO NOT** initialize with README, .gitignore, or license (we already have these)
6. Click "Create repository"

### Step 3: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/cricket-fantasy.git
git branch -M main
git push -u origin main
```

## Phase 3: Deploy to Railway

### Step 1: Create Railway Project

1. Go to https://railway.app/dashboard
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access your GitHub account
5. Select your `cricket-fantasy` repository
6. Railway will automatically detect the Node.js project

### Step 2: Add MySQL Database

1. In your Railway project, click "+ New"
2. Select "Database" → "MySQL"
3. Railway will create a MySQL instance and automatically add `DATABASE_URL` to your environment variables

### Step 3: Configure Environment Variables

1. Click on your service (not the database)
2. Go to "Variables" tab
3. Add the following variables (see `ENV_SETUP.md` for details):

**Required:**
```
JWT_SECRET=<generate-a-secure-random-string-32-chars-minimum>
VITE_APP_ID=cricket-fantasy
VITE_APP_TITLE=SDSURABHI - Play for Fun
VITE_APP_LOGO=/logo.png
NODE_ENV=production
```

**OAuth (IMPORTANT - Needs Update):**
```
OAUTH_SERVER_URL=<your-oauth-server-url>
OWNER_OPEN_ID=<your-owner-open-id>
VITE_OAUTH_PORTAL_URL=<your-oauth-portal-url>
```

⚠️ **WARNING:** The current app uses Manus OAuth which won't work on Railway. You need to:
- Set up your own OAuth provider (Google, GitHub, etc.)
- Or use a third-party auth service (Auth0, Clerk, etc.)
- Or implement email/password authentication

**Analytics (Optional):**
```
VITE_ANALYTICS_ENDPOINT=<your-analytics-endpoint>
VITE_ANALYTICS_WEBSITE_ID=<your-website-id>
```

### Step 4: Run Database Migrations

1. In Railway, go to your service
2. Click on "Settings" → "Deploy"
3. Add a deploy command or run manually:
```bash
pnpm db:push
```

### Step 5: Deploy

1. Railway will automatically deploy after you add environment variables
2. Wait for the deployment to complete (check the "Deployments" tab)
3. Once deployed, you'll see a URL like `https://your-app.up.railway.app`

## Phase 4: Connect Custom Domain

### Step 1: Add Domain in Railway

1. In your Railway service, go to "Settings"
2. Scroll to "Domains"
3. Click "Custom Domain"
4. Enter your domain (e.g., `sportiqplay.com` or `www.sportiqplay.com`)

### Step 2: Update DNS Settings

Railway will show you DNS records to add. Go to your domain registrar and add:

**For root domain (sportiqplay.com):**
```
Type: A
Name: @
Value: <Railway IP address>
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: <your-app>.up.railway.app
```

### Step 3: Wait for SSL

- Railway automatically provisions SSL certificates
- This can take 5-60 minutes
- Your site will be available at `https://sportiqplay.com` once complete

## Phase 5: Disconnect from Manus

### After Railway is fully working:

1. Test your Railway deployment thoroughly
2. Verify all features work correctly
3. In Manus Management UI:
   - Go to Settings → Domains
   - Remove custom domain binding
4. (Optional) Archive or delete the Manus project

## Troubleshooting

### Build Fails
- Check Railway logs in the "Deployments" tab
- Verify all environment variables are set correctly
- Ensure `DATABASE_URL` is properly configured

### OAuth Issues
- The app currently uses Manus OAuth which won't work on Railway
- You MUST implement alternative authentication before going live

### Database Connection Issues
- Verify `DATABASE_URL` format is correct
- Check if Railway MySQL is running
- Run `pnpm db:push` to create tables

### Port Issues
- Railway automatically sets the `PORT` environment variable
- The app uses `process.env.PORT || 3000` which should work automatically

## Important Notes

1. **OAuth Authentication:** You MUST update the OAuth configuration before deploying to production
2. **Environment Variables:** Never commit `.env` file to GitHub
3. **Database:** Make sure to run migrations after first deployment
4. **Analytics:** Update or remove analytics configuration
5. **Testing:** Test thoroughly on Railway before disconnecting from Manus

## Support

- Railway Documentation: https://docs.railway.app
- Railway Discord: https://discord.gg/railway
- GitHub Issues: Create issues in your repository

## Next Steps After Deployment

1. Set up monitoring and error tracking (e.g., Sentry)
2. Configure CI/CD for automatic deployments
3. Set up database backups
4. Implement proper authentication
5. Add staging environment for testing

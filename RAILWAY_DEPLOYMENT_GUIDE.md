# Railway Deployment Guide - Cricket Fantasy

## Current Status: MySQL Deployment In Progress ⏳

**Project:** nurturing-strength  
**Environment:** production  
**Date:** December 23, 2025

---

## ✅ Completed Steps

### 1. GitHub Repository
- **Repository:** https://github.com/malavira107th/cricket-fantasy
- **Status:** ✅ Created and pushed (598 files)
- **Branch:** main

### 2. Railway Project
- **Project Name:** nurturing-strength
- **Status:** ✅ Created
- **GitHub Integration:** ✅ Connected to malavira107th/cricket-fantasy

### 3. Services Deployed
- **cricket-fantasy service:** ✅ Created (currently offline - needs configuration)
- **MySQL database:** ⏳ Deploying (9 Variables and 9 Settings)
- **PostgreSQL:** 🗑️ Being removed (was added by mistake)

---

## 🔄 Next Steps (In Order)

### Step 1: Wait for MySQL Deployment to Complete
**Status:** ⏳ In Progress  
**Action:** Wait for "Applying 21 changes" to complete  
**Expected:** MySQL service should show "Online" status

### Step 2: Get MySQL Connection Details
**Location:** MySQL service → Variables tab  
**Required Variables:**
- `MYSQL_URL` or `DATABASE_URL`
- `MYSQL_HOST`
- `MYSQL_PORT`
- `MYSQL_USER`
- `MYSQL_PASSWORD`
- `MYSQL_DATABASE`

### Step 3: Configure cricket-fantasy Service Environment Variables
**Location:** cricket-fantasy service → Variables tab

**Required Variables:**

#### Database Configuration
```bash
DATABASE_URL=<copy from MySQL service>
```

#### Authentication (CRITICAL BLOCKER)
```bash
# These Manus OAuth variables will NOT work on Railway:
# OAUTH_SERVER_URL
# VITE_OAUTH_PORTAL_URL
# OWNER_OPEN_ID
# OWNER_NAME

# SOLUTION NEEDED: Replace with Google OAuth or another provider
# See OAUTH_MIGRATION.md for detailed instructions
```

#### JWT Secret
```bash
JWT_SECRET=<generate a strong random secret>
# Generate with: openssl rand -base64 32
```

#### Application Configuration
```bash
VITE_APP_TITLE="Cricket Fantasy - Play for Fun"
VITE_APP_LOGO="/logo.svg"
NODE_ENV=production
PORT=3000
```

### Step 4: Generate Public Domain
**Location:** cricket-fantasy service → Settings → Public Networking  
**Action:** Click "Generate Domain" and set port to **3000**  
**Expected Output:** `cricket-fantasy-production.up.railway.app` or similar

### Step 5: Run Database Migrations
**Method:** Use Railway's "Run Command" feature or add to deploy script

**Option A: Add to package.json**
```json
{
  "scripts": {
    "build": "pnpm db:push && vite build",
    "start": "node server/index.js"
  }
}
```

**Option B: Manual via Railway CLI**
```bash
railway run pnpm db:push
```

### Step 6: Deploy and Test
1. Trigger deployment (automatic after env vars are set)
2. Check deployment logs for errors
3. Visit the generated domain
4. Test basic functionality

### Step 7: Add Custom Domain (sportiqplay.com)
**Location:** cricket-fantasy service → Settings → Public Networking → Custom Domain  
**Requirements:**
- Domain must be owned and DNS accessible
- Add CNAME record pointing to Railway domain
- Verify domain in Railway

---

## 🚨 Critical Blockers

### 1. OAuth Authentication
**Problem:** The application uses Manus OAuth which is not available outside Manus platform.

**Impact:** Users cannot log in or sign up on Railway deployment.

**Solution Options:**

#### Option A: Google OAuth (Recommended)
1. Create Google Cloud Project
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Update code to use Google OAuth
5. Set environment variables:
   ```bash
   GOOGLE_CLIENT_ID=<your-client-id>
   GOOGLE_CLIENT_SECRET=<your-client-secret>
   GOOGLE_CALLBACK_URL=https://your-domain.com/auth/google/callback
   ```

#### Option B: GitHub OAuth
1. Create GitHub OAuth App
2. Update code to use GitHub OAuth
3. Set environment variables

#### Option C: Email/Password Authentication
1. Implement email/password auth
2. Add password hashing (bcrypt)
3. Add email verification
4. Update login/signup flows

**See:** `OAUTH_MIGRATION.md` for detailed implementation guide

### 2. File Uploads (If Applicable)
**Problem:** Manus S3 storage is not available on Railway.

**Solution:** Configure Railway's own storage or use external S3-compatible service.

---

## 📋 Environment Variables Checklist

### Database
- [ ] `DATABASE_URL` - MySQL connection string

### Authentication
- [ ] Replace Manus OAuth with alternative
- [ ] `JWT_SECRET` - For session management

### Application
- [ ] `VITE_APP_TITLE`
- [ ] `VITE_APP_LOGO`
- [ ] `NODE_ENV=production`
- [ ] `PORT=3000`

### Optional (if needed)
- [ ] `CORS_ORIGIN` - For API CORS configuration
- [ ] `SESSION_SECRET` - For session encryption
- [ ] Storage configuration (if file uploads exist)

---

## 🔍 Verification Steps

After deployment:

1. **Health Check**
   - Visit: `https://your-domain.com/`
   - Expected: Homepage loads without errors

2. **Database Connection**
   - Check logs for database connection success
   - Verify tables are created

3. **Authentication** (BLOCKER)
   - Try to sign up/login
   - Expected: Will fail until OAuth is replaced

4. **API Endpoints**
   - Test key API routes
   - Check for CORS errors

5. **Static Assets**
   - Verify images, CSS, JS load correctly
   - Check browser console for 404s

---

## 💰 Cost Estimate (Railway Trial)

**Current Plan:** Trial (30 days or $5.00 credit)

**Resource Usage:**
- **cricket-fantasy service:** ~$0.10/day (estimated)
- **MySQL database:** ~$0.05/day (estimated)
- **Total:** ~$4.50/month (within trial limits)

**After Trial:**
- Upgrade to Hobby plan ($5/month base + usage)
- Or migrate to another platform

---

## 🔗 Useful Links

- **Railway Dashboard:** https://railway.com/dashboard
- **Project URL:** https://railway.com/project/fa465fa6-f61e-4803-b09b-84412f0c3286
- **GitHub Repo:** https://github.com/malavira107th/cricket-fantasy
- **Railway Docs:** https://docs.railway.com/
- **Railway CLI:** https://docs.railway.com/guides/cli

---

## 📝 Notes

1. **PostgreSQL was added by mistake** - Railway's UI seems to default to PostgreSQL even when clicking "Add MySQL". This has been corrected.

2. **Service is offline** - This is expected until:
   - MySQL deployment completes
   - Environment variables are configured
   - First deployment succeeds

3. **OAuth is a blocker** - The application cannot function in production until OAuth is replaced with a Railway-compatible solution.

4. **Custom domain** - Can be added after basic deployment is working.

---

## 🎯 Immediate Next Action

**Wait for MySQL deployment to complete**, then proceed with Step 2 (Get MySQL Connection Details).

Current status: "Applying 21 changes" - MySQL is being provisioned with variables and settings.

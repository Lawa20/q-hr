# 🚀 Vercel Deployment Guide for Q HR System

## Prerequisites

Before deploying to Vercel, make sure you have:

1. **Git Repository** - Your project should be in a Git repository
2. **GitHub Account** - Vercel integrates with GitHub
3. **Vercel Account** - Create one at https://vercel.com
4. **Database** - Either use a cloud database or set up Vercel Postgres

## Step 1: Prepare Your Project for Deployment

### 1.1 Create a `.gitignore` Entry

Make sure your `.gitignore` includes environment files:

```
.env
.env.local
.env.production
node_modules/
.next/
```

### 1.2 Update Environment Variables

Create a `.env.production` file with production database URL:

```env
DATABASE_URL="mysql://qhr_user:QHR_2024_Secure!@your-cloud-db-host:3306/qhr_database"
NEXTAUTH_SECRET="your-very-secure-random-string-here"
NEXTAUTH_URL="https://your-app.vercel.app"
```

**To generate a secure NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 1.3 Verify Build Configuration

Check `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {};
module.exports = nextConfig;
```

## Step 2: Push to GitHub

### 2.1 Initialize Git (if not already done)

```bash
cd /Applications/XAMPP/xamppfiles/htdocs/q-hr
git init
git add .
git commit -m "Initial commit: Q HR System ready for deployment"
```

### 2.2 Add Remote Repository

```bash
git remote add origin https://github.com/YOUR_USERNAME/q-hr.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy to Vercel

### 3.1 Connect to Vercel

**Option A: Using Vercel CLI (Recommended)**

```bash
npm i -g vercel
vercel login
vercel
```

Follow the prompts and select:
- Link to existing project? → No
- Project name → `q-hr`
- Framework → Next.js
- Root directory → `./`

**Option B: Using Vercel Dashboard**

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Select the `q-hr` directory
5. Click "Deploy"

### 3.2 Configure Environment Variables in Vercel

In Vercel Dashboard:

1. Go to your project → **Settings** → **Environment Variables**
2. Add the following variables:

```
DATABASE_URL=mysql://qhr_user:QHR_2024_Secure!@your-cloud-db-host:3306/qhr_database
NEXTAUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=https://your-app-name.vercel.app
NODE_ENV=production
```

### 3.3 Deploy

```bash
vercel --prod
```

## Step 4: Set Up Cloud Database

Your current MySQL database is local. For production, you need a cloud database:

### Option A: Use Vercel Postgres (Recommended - Easiest)

```bash
vercel postgres connect
```

This creates a PostgreSQL database connected to your Vercel project.

### Option B: Use Cloud MySQL Services

Popular options:
- **AWS RDS MySQL** - https://aws.amazon.com/rds/
- **PlanetScale MySQL** - https://planetscale.com/
- **ClearDB MySQL** - https://www.cleardb.com/
- **Heroku Postgres** - https://www.heroku.com/postgres

For each service:
1. Create a new database
2. Get the connection string
3. Add to Vercel environment variables as `DATABASE_URL`

### Option C: Keep Local Database (Not Recommended for Production)

If you want to keep MySQL locally and expose it publicly:

1. Open port 3306 on your router/firewall
2. Use your public IP address in the connection string
3. **Security Warning:** This is not secure for production

## Step 5: Run Database Migrations in Production

Once deployed, run Prisma migrations on the cloud database:

```bash
# Push schema to production database
vercel env pull
npx prisma db push

# Seed initial data (optional)
npx prisma db seed
```

Or use Vercel Deployments tab to run commands:

```bash
# In Vercel Dashboard Terminal
npx prisma db push
npx prisma db seed
```

## Step 6: Verify Deployment

1. **Visit your app:** `https://your-app-name.vercel.app`
2. **Test login:** Use demo credentials
3. **Test database operations:** Add an employee, check it saves
4. **Check Vercel logs:** Dashboard → Deployments → View Details

## Step 7: Set Up CI/CD

Vercel automatically deploys on every push to main:

```bash
git add .
git commit -m "Update feature"
git push origin main
# Vercel automatically deploys!
```

## Troubleshooting

### Database Connection Error

```
Error: ECONNREFUSED - Connection refused
```

**Solution:** Check `DATABASE_URL` in Vercel environment variables

### Build Fails

```
Error: Build failed
```

**Solution:** 
1. Check build logs in Vercel Dashboard
2. Run locally: `npm run build`
3. Ensure all environment variables are set

### Prisma Client Issues

```
Error: Missing Prisma Client
```

**Solution:**
```bash
npm install @prisma/client
npx prisma generate
```

### Import/Module Not Found

```
Error: Cannot find module
```

**Solution:** 
1. Ensure all dependencies are in `package.json`
2. Run `npm install`
3. Check import paths are correct

## Recommended Setup: Vercel + Vercel Postgres

### Step-by-Step:

1. **Create Vercel Postgres:**
   ```bash
   vercel postgres connect
   ```

2. **Get connection string:**
   - Vercel Dashboard → Storage → Postgres → Connection String

3. **Update .env.production:**
   ```env
   DATABASE_URL="postgres://..."
   NEXTAUTH_SECRET="your-secret"
   NEXTAUTH_URL="https://your-app.vercel.app"
   ```

4. **Update prisma/schema.prisma:**
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

5. **Deploy:**
   ```bash
   npx prisma db push
   git add .
   git commit -m "Switch to Vercel Postgres"
   git push
   vercel --prod
   ```

## Performance Optimization

### Enable Vercel Analytics

In `next.config.js`:

```javascript
const withVercelToolbars = require('@vercel/analytics/next');

module.exports = withVercelToolbars({
  // your config
});
```

### Enable Image Optimization

Already included in Next.js, no extra setup needed.

### Enable Code Splitting

Already optimized by Next.js, no extra setup needed.

## Monitoring

### View Logs

```bash
vercel logs [project-name]
```

### Monitor Performance

In Vercel Dashboard:
- Deployments → Performance
- Analytics → Overview

### Set Up Alerts

Vercel Dashboard → Settings → Alert Email

## Custom Domain

### Add Custom Domain

1. Vercel Dashboard → Settings → Domains
2. Add your domain: `yourdomain.com`
3. Update DNS records (Vercel provides instructions)
4. Wait for DNS propagation (up to 48 hours)

## SSL Certificate

✅ Automatically provided by Vercel for `*.vercel.app` domains

For custom domains:
✅ Automatically generated by Vercel (free)

## Security Best Practices

1. ✅ Use strong `NEXTAUTH_SECRET`
2. ✅ Never commit `.env` files
3. ✅ Use environment variables for sensitive data
4. ✅ Enable two-factor authentication on Vercel account
5. ✅ Use HTTPS only (enforced by default)
6. ✅ Regularly rotate secrets

## Cost Estimate

**Vercel Pricing (as of 2024):**
- Hosting: Free tier available
- Serverless Functions: Free tier (100,000 requests/month)
- Database: Pay-as-you-go (Vercel Postgres) or use free tier alternative

**Database Options:**
- Vercel Postgres: $0 + usage
- PlanetScale: Free tier available
- AWS RDS: $15+/month

## Quick Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] `.env.production` created
- [ ] Database set up (cloud)
- [ ] Vercel project created
- [ ] Environment variables added to Vercel
- [ ] Database migrations run
- [ ] Build successful
- [ ] App loads and works
- [ ] Tested login and database operations
- [ ] Custom domain added (optional)

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://www.prisma.io/docs

---

**Your Q HR System is ready to go live! 🚀**

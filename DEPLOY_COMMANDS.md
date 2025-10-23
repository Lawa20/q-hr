# 🚀 Copy-Paste Deployment Commands

Follow these commands exactly to deploy to Vercel:

## Step 1: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `q-hr`
3. Description: "Q HR System - Employee Management"
4. Click "Create repository"
5. Copy your repository URL (should look like: `https://github.com/YOUR_USERNAME/q-hr.git`)

## Step 2: Push Code to GitHub

```bash
cd /Applications/XAMPP/xamppfiles/htdocs/q-hr

# Configure git (replace with your details)
git config --global user.email "your@email.com"
git config --global user.name "Your Name"

# Add your GitHub repository (replace URL below with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/q-hr.git

# Push code
git push -u origin main
```

## Step 3: Deploy to Vercel

### Option A: Using Vercel Dashboard (Easiest)
1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Find and click on `q-hr` repository
4. Click "Import"
5. Click "Deploy"
6. **Your app is now live!** ✅

### Option B: Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

## Step 4: Set Environment Variables in Vercel

1. Go to https://vercel.com/dashboard/[project-name]/settings/environment-variables
2. Add these variables:

```
DATABASE_URL = mysql://qhr_user:QHR_2024_Secure!@your-cloud-db-host:3306/qhr_database
NEXTAUTH_SECRET = (generate with: openssl rand -base64 32)
NEXTAUTH_URL = https://your-app-name.vercel.app
```

## Step 5: Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

Copy the output and paste it as `NEXTAUTH_SECRET` value in Vercel.

## Step 6: Set Up Cloud Database

### PlanetScale (Recommended - Free MySQL)
1. Go to https://planetscale.com
2. Sign in with GitHub
3. Click "New database"
4. Name: `qhr-db`
5. Copy connection string
6. Add as `DATABASE_URL` in Vercel

### Alternative: Vercel Postgres
```bash
vercel postgres connect
# Follow prompts
```

## Step 7: Run Database Migrations

```bash
cd /Applications/XAMPP/xamppfiles/htdocs/q-hr

# Pull environment
vercel env pull

# Push schema
npx prisma db push

# Seed data (optional)
npx prisma db seed
```

## Step 8: Test Your Deployment

1. Visit `https://your-app-name.vercel.app`
2. Login with demo credentials
3. Add an employee and verify it saves
4. Check Vercel logs if issues: `vercel logs`

---

## ✅ Deployment Checklist

- [ ] Created GitHub repository
- [ ] Pushed code to GitHub
- [ ] Imported project to Vercel
- [ ] Clicked Deploy
- [ ] Set DATABASE_URL environment variable
- [ ] Set NEXTAUTH_SECRET environment variable
- [ ] Set NEXTAUTH_URL environment variable
- [ ] Created cloud database (PlanetScale or Vercel Postgres)
- [ ] Ran Prisma migrations
- [ ] Tested app is accessible
- [ ] Tested add employee works

---

## 🎉 Your Q HR System is Live!

Your production app is now available at:
```
https://your-vercel-project.vercel.app
```

Every push to `main` branch automatically redeploys! 🚀

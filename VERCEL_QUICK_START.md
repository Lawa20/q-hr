# ⚡ Quick Start: Deploy to Vercel (GitHub Already Connected)

Since you have Vercel and GitHub connected, here's the fastest way to deploy:

## Step 1: Add Your GitHub Remote

First, create a GitHub repository for your project:

1. Go to https://github.com/new
2. Create a new repository named `q-hr`
3. Do NOT initialize with README, .gitignore, or license
4. Click "Create repository"

## Step 2: Connect Git Remote and Push

```bash
cd /Applications/XAMPP/xamppfiles/htdocs/q-hr

# Add the remote (replace USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/q-hr.git

# Push to GitHub
git push -u origin main
```

## Step 3: Deploy to Vercel (Automatic)

Once pushed to GitHub:

1. Go to https://vercel.com/dashboard
2. Click **"Add New..."** → **"Project"**
3. Click **"Import"** on your `q-hr` repository
4. Vercel will automatically detect it's a Next.js project
5. Click **"Deploy"** ✅

**That's it! Your app is now live!** 🚀

---

## Step 4: Configure Environment Variables (Important!)

After deployment, add environment variables to Vercel:

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these variables:

```
DATABASE_URL=mysql://qhr_user:QHR_2024_Secure!@your-cloud-db-host:3306/qhr_database
NEXTAUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=https://your-app-name.vercel.app
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

## Step 5: Set Up Cloud Database

Your local MySQL won't work on Vercel. Choose one:

### ✅ Option A: Vercel Postgres (Easiest)
```bash
vercel postgres connect
```

### ✅ Option B: PlanetScale (Free MySQL)
1. Go to https://planetscale.com
2. Sign up with GitHub
3. Create new database
4. Copy connection string
5. Add to Vercel environment variables

### ✅ Option C: AWS RDS MySQL
1. Create RDS instance
2. Copy connection string
3. Add to Vercel environment variables

## Step 6: Run Migrations

After setting DATABASE_URL in Vercel:

```bash
# Pull environment from Vercel
vercel env pull

# Push schema to production database
npx prisma db push

# Seed initial data (optional)
npx prisma db seed
```

---

## Your Vercel URL

After deployment, your app will be live at:
```
https://q-hr.vercel.app
```

(or your custom domain if configured)

---

## Auto-Deploy Setup

✅ **Already configured!** Every time you push to GitHub, Vercel automatically redeploys:

```bash
git add .
git commit -m "Update feature"
git push origin main
# Vercel automatically builds and deploys!
```

---

## Troubleshooting

### Build Fails
```bash
# Test build locally
npm run build

# Check logs in Vercel Dashboard → Deployments
```

### Database Connection Error
- Ensure `DATABASE_URL` is set in Vercel environment variables
- Check database is accessible from the internet
- Verify connection string format

### Module Not Found
- Ensure all dependencies in `package.json`
- Run `npm install` locally first

---

## Next Steps

1. ✅ Create GitHub repo
2. ✅ Push code to GitHub
3. ✅ Deploy via Vercel dashboard
4. ✅ Set environment variables
5. ✅ Configure cloud database
6. ✅ Run migrations
7. ✅ Test your live app!

**Your Q HR System is now on Vercel! 🎉**

# Manual MySQL Setup for Q HR System

## Step 1: Access XAMPP Control Panel
1. Open XAMPP Control Panel
2. Make sure MySQL is running (green "Running" status)
3. Click "Admin" next to MySQL to open phpMyAdmin

## Step 2: Create Database and User in phpMyAdmin

### Option A: Using phpMyAdmin (Recommended)

1. **Open phpMyAdmin** (click "Admin" next to MySQL in XAMPP)
2. **Create Database:**
   - Click "New" in the left sidebar
   - Database name: `qhr_database`
   - Collation: `utf8mb4_unicode_ci`
   - Click "Create"

3. **Create User:**
   - Click "User accounts" tab
   - Click "Add user account"
   - **Login Information:**
     - User name: `qhr_user`
     - Host name: `localhost`
     - Password: `QHR_2024_Secure!`
   - **Database for user account:**
     - Select "Create database with same name and grant all privileges"
   - Click "Go"

### Option B: Using MySQL Command Line

If you prefer command line, open Terminal and run:

```bash
# Connect to MySQL (use your XAMPP MySQL password)
/Applications/XAMPP/xamppfiles/bin/mysql -u root -p

# Then run these SQL commands:
CREATE DATABASE qhr_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'qhr_user'@'localhost' IDENTIFIED BY 'QHR_2024_Secure!';
GRANT ALL PRIVILEGES ON qhr_database.* TO 'qhr_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

## Step 3: Test Connection in Beekeeper Studio

1. **Open Beekeeper Studio**
2. **Click "New Connection"**
3. **Select "MySQL"**
4. **Enter these details:**
   - **Name**: Q HR Database
   - **Host**: localhost
   - **Port**: 3306
   - **Database**: qhr_database
   - **Username**: qhr_user
   - **Password**: QHR_2024_Secure!
   - **SSL Mode**: Disabled
5. **Click "Connect"**

## Step 4: Create Environment File

Create `.env.local` file in your project root:

```env
DATABASE_URL="mysql://qhr_user:QHR_2024_Secure!@localhost:3306/qhr_database"
PRISMA_DATABASE_URL="mysql://qhr_user:QHR_2024_Secure!@localhost:3306/qhr_database"
```

## Step 5: Initialize Database Schema

Run these commands in your project directory:

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed with initial data
npm run db:seed
```

## Troubleshooting

### If you get "Access Denied":
1. Make sure the user `qhr_user` exists
2. Check that the password is exactly `QHR_2024_Secure!`
3. Verify the database `qhr_database` exists
4. Try connecting with root user first to verify MySQL is working

### If you get "Database doesn't exist":
1. Create the database `qhr_database` first
2. Make sure the user has privileges on that database

### If you get "User doesn't exist":
1. Create the user `qhr_user` with the correct password
2. Grant all privileges on `qhr_database` to `qhr_user`

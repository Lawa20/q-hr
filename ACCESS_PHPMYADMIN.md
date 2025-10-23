# How to Access phpMyAdmin on XAMPP

## Method 1: Using Web Browser (Easiest)

1. **Start XAMPP MySQL** (make sure MySQL is running)
2. **Open your web browser** and go to:
   ```
   http://localhost/phpmyadmin
   ```
3. You should see the phpMyAdmin login page

## Method 2: Direct Access via XAMPP

1. **Open XAMPP Control Panel**
2. Look for the MySQL section
3. Click on the **"Go to Application"** button or **"Admin"** link
   - If you can't find it, try right-clicking on MySQL row
   - Or look for a URL/link button next to MySQL

## Method 3: Access via Dashboard

1. **Open web browser**
2. Go to:
   ```
   http://localhost
   ```
3. You should see the XAMPP landing page
4. Look for **"phpMyAdmin"** link (usually in the top section or left sidebar)
5. Click it

## Method 4: Using Terminal (If Web Access Doesn't Work)

If phpMyAdmin isn't accessible, you can create the database using Terminal:

```bash
# Open Terminal and navigate to XAMPP MySQL
cd /Applications/XAMPP/xamppfiles/bin

# Connect to MySQL with root (default password is empty)
./mysql -u root -h localhost

# You should see: mysql>
# Now run these SQL commands:

CREATE DATABASE qhr_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'qhr_user'@'localhost' IDENTIFIED BY 'QHR_2024_Secure!';
GRANT ALL PRIVILEGES ON qhr_database.* TO 'qhr_user'@'localhost';
FLUSH PRIVILEGES;
SHOW DATABASES;

# If you see qhr_database in the list, it worked!
# Type: EXIT; to quit
```

## If None of the Above Works

Try this simpler connection method for Beekeeper Studio:

1. **Host**: 127.0.0.1
2. **Port**: 3306
3. **Username**: root
4. **Password**: (leave empty - default XAMPP password)
5. **Database**: mysql

This will connect you to MySQL directly as root. Then you can:
1. In Beekeeper, create a new database called `qhr_database`
2. Create the user `qhr_user` with password `QHR_2024_Secure!`

## Quick Visual Guide

If using Method 3 (Web Access):
```
1. Browser URL: http://localhost
   ↓
2. Look for "phpMyAdmin" link
   ↓
3. Click "SQL" tab
   ↓
4. Paste SQL code from create-database.sql
   ↓
5. Click "Go"
   ↓
6. Done!
```

-- MySQL Setup Script for Q HR System
-- Run this script as MySQL root user

-- Create the database
CREATE DATABASE IF NOT EXISTS qhr_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create the user
CREATE USER IF NOT EXISTS 'qhr_user'@'localhost' IDENTIFIED BY 'QHR_2024_Secure!';

-- Grant all privileges on the database
GRANT ALL PRIVILEGES ON qhr_database.* TO 'qhr_user'@'localhost';

-- Flush privileges to ensure they take effect
FLUSH PRIVILEGES;

-- Show the created user and database
SELECT 'Database and user created successfully!' as status;
SHOW DATABASES LIKE 'qhr_database';
SELECT User, Host FROM mysql.user WHERE User = 'qhr_user';

-- Q HR System Database Setup
-- Run this in phpMyAdmin SQL tab or MySQL command line

-- Create the database
CREATE DATABASE IF NOT EXISTS qhr_database 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Create the user
CREATE USER IF NOT EXISTS 'qhr_user'@'localhost' 
IDENTIFIED BY 'QHR_2024_Secure!';

-- Grant all privileges on the database
GRANT ALL PRIVILEGES ON qhr_database.* 
TO 'qhr_user'@'localhost';

-- Flush privileges to ensure they take effect
FLUSH PRIVILEGES;

-- Show success message
SELECT 'Database and user created successfully!' as status;

# MySQL Database Setup for Q HR System

## Database Configuration

### MySQL Credentials
- **Username**: `qhr_user`
- **Password**: `QHR_2024_Secure!`
- **Database Name**: `qhr_database`
- **Host**: `localhost`
- **Port**: `3306`

## Setup Instructions

### 1. Create MySQL User and Database

Connect to MySQL as root and run these commands:

```sql
-- Create the database
CREATE DATABASE qhr_database CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create the user
CREATE USER 'qhr_user'@'localhost' IDENTIFIED BY 'QHR_2024_Secure!';

-- Grant privileges
GRANT ALL PRIVILEGES ON qhr_database.* TO 'qhr_user'@'localhost';

-- Flush privileges
FLUSH PRIVILEGES;
```

### 2. Beekeeper Studio Configuration

1. Open Beekeeper Studio
2. Click "New Connection"
3. Select "MySQL" as the database type
4. Fill in the connection details:

**Connection Details:**
- **Name**: Q HR Database
- **Host**: localhost
- **Port**: 3306
- **Database**: qhr_database
- **Username**: qhr_user
- **Password**: QHR_2024_Secure!
- **SSL Mode**: Disabled (for local development)

### 3. Environment Configuration

Create a `.env.local` file in your project root with:

```env
# Database
DATABASE_URL="mysql://qhr_user:QHR_2024_Secure!@localhost:3306/qhr_database"

# Prisma
PRISMA_DATABASE_URL="mysql://qhr_user:QHR_2024_Secure!@localhost:3306/qhr_database"
```

### 4. Database Schema

The system will create the following tables:

- **users** - Employee information
- **departments** - Department data
- **attendance** - Attendance records
- **payroll** - Payroll information
- **notifications** - System notifications
- **company** - Company settings

### 5. Initialize Database

Run these commands to set up the database:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed the database with initial data
npx prisma db seed
```

## Security Notes

- The password is strong and includes special characters
- User has only access to the qhr_database
- For production, use environment variables for credentials
- Consider using SSL for production deployments

## Troubleshooting

### Connection Issues
- Ensure MySQL service is running
- Check if port 3306 is accessible
- Verify user credentials

### Permission Issues
- Make sure the user has proper privileges
- Check if the database exists
- Verify the user can connect from localhost

### Beekeeper Studio Issues
- Ensure you're using the correct connection type (MySQL)
- Check if the database name is correct
- Verify SSL settings match your MySQL configuration

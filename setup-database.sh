#!/bin/bash

# Q HR System - Database Setup Script
echo "🚀 Setting up MySQL database for Q HR System..."

# Check if MySQL is running
if ! pgrep -x "mysqld" > /dev/null; then
    echo "❌ MySQL is not running. Please start MySQL first."
    echo "   On macOS with Homebrew: brew services start mysql"
    echo "   On Linux: sudo systemctl start mysql"
    echo "   On Windows: Start MySQL service"
    exit 1
fi

echo "✅ MySQL is running"

# Run the SQL setup script
echo "📝 Creating database and user..."
mysql -u root -p < setup-mysql.sql

if [ $? -eq 0 ]; then
    echo "✅ Database setup completed successfully!"
    echo ""
    echo "📋 Connection Details for Beekeeper Studio:"
    echo "   Host: localhost"
    echo "   Port: 3306"
    echo "   Database: qhr_database"
    echo "   Username: qhr_user"
    echo "   Password: QHR_2024_Secure!"
    echo ""
    echo "🔧 Next steps:"
    echo "   1. Create .env.local file with DATABASE_URL"
    echo "   2. Run: npx prisma generate"
    echo "   3. Run: npx prisma db push"
    echo "   4. Run: npx prisma db seed"
else
    echo "❌ Database setup failed. Please check MySQL connection and try again."
    exit 1
fi

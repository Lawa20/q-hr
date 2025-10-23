# Database Setup Guide for Q HR

## 🗄️ Database Setup with Beekeeper Studio

### Step 1: Install PostgreSQL
1. **Download PostgreSQL** from [postgresql.org](https://www.postgresql.org/download/)
2. **Install PostgreSQL** with default settings
3. **Remember your password** for the `postgres` user

### Step 2: Create Database
1. **Open Beekeeper Studio**
2. **Connect to PostgreSQL**:
   - Host: `localhost`
   - Port: `5432`
   - Database: `postgres` (default)
   - Username: `postgres`
   - Password: (your PostgreSQL password)

3. **Create new database**:
   ```sql
   CREATE DATABASE qhr_database;
   ```

### Step 3: Configure Environment Variables
Create a `.env.local` file in your project root:

```env
# Database
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/qhr_database"

# Next.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### Step 4: Run Database Migrations
```bash
# Generate Prisma client
npm run db:generate

# Push schema to database
npm run db:push

# Seed the database with sample data
npm run db:seed
```

### Step 5: Verify in Beekeeper Studio
1. **Refresh your connection** in Beekeeper
2. **Navigate to `qhr_database`**
3. **Check tables**: You should see:
   - `users`
   - `departments`
   - `companies`
   - `attendances`
   - `payrolls`
   - `notifications`
   - And more...

## 🎯 What You Can Do in Beekeeper Studio

### View and Edit Data
- **Browse all tables** and their data
- **Edit employee records** directly
- **Add new departments**
- **View organizational hierarchy**
- **Check attendance records**
- **Review payroll data**

### Common Queries
```sql
-- View all employees
SELECT * FROM users;

-- View departments with employee count
SELECT d.name, COUNT(u.id) as employee_count 
FROM departments d 
LEFT JOIN users u ON d.id = u.department_id 
GROUP BY d.id, d.name;

-- View team hierarchy
SELECT 
  u.first_name, 
  u.last_name, 
  u.role,
  s.first_name as supervisor_name,
  m.first_name as manager_name
FROM users u
LEFT JOIN users s ON u.supervisor_id = s.id
LEFT JOIN users m ON u.manager_id = m.id;
```

## 🔧 Troubleshooting

### Connection Issues
- **Check PostgreSQL is running**: `brew services start postgresql` (Mac) or check Services (Windows)
- **Verify credentials** in Beekeeper Studio
- **Check firewall settings**

### Database Issues
- **Reset database**: `npm run db:reset`
- **Check logs**: Look at terminal output for error messages
- **Verify .env.local**: Make sure DATABASE_URL is correct

## 📊 Sample Data
After running `npm run db:seed`, you'll have:
- **6 departments** (Engineering, Marketing, HR, Sales, Finance, Operations)
- **3 managers** (one per department)
- **6 supervisors** (2 per manager)
- **6 employees** (1 per supervisor)
- **1 admin user**
- **1 company record**

## 🚀 Next Steps
1. **Download and install Beekeeper Studio**
2. **Set up PostgreSQL**
3. **Create the database**
4. **Configure environment variables**
5. **Run the setup commands**
6. **Start managing your HR data!**

Your Q HR system will then use real database data instead of mock data!

# 🐝 Beekeeper Studio - MySQL Connection Guide

## Step-by-Step Instructions

### Step 1: Open Beekeeper Studio
1. Launch Beekeeper Studio application
2. You should see the welcome screen with connection options

### Step 2: Create New Connection
1. Click **"New Connection"** button (usually at the top or left side)
2. A dialog box will appear asking you to select the database type

### Step 3: Select MySQL
1. From the list of database types, select **"MySQL"**
2. Click **"MySQL"** (not MariaDB, not PostgreSQL - specifically MySQL)

### Step 4: Fill in Connection Details

**Exact values to enter:**

| Field | Value |
|-------|-------|
| **Connection Name** | Q HR Database |
| **Host** | localhost |
| **Port** | 3306 |
| **Database** | qhr_database |
| **Username** | qhr_user |
| **Password** | QHR_2024_Secure! |
| **SSL Mode** | Disabled |

**Screenshot reference:**
```
┌─────────────────────────────────────────┐
│ Connection Name: Q HR Database          │
│ Host: localhost                         │
│ Port: 3306                              │
│ Database: qhr_database                  │
│ Username: qhr_user                      │
│ Password: QHR_2024_Secure!              │
│ SSL: Disabled                           │
└─────────────────────────────────────────┘
```

### Step 5: Test Connection
1. Click **"Test"** or **"Test Connection"** button
2. Wait for the result message
3. You should see ✅ "Connection successful" or similar

### Step 6: Save Connection
1. If test passed, click **"Save"** or **"Connect"**
2. Beekeeper will save the connection and open the database

### Step 7: View Your Database
After connecting, you should see:

**Left Sidebar:**
- ✅ qhr_database (selected)
  - attendances (180 rows)
  - check_ins
  - check_outs
  - companies (1 row)
  - departments (7 rows)
  - face_data
  - notifications
  - payrolls (36 rows)
  - users (6 rows)

**You can now:**
- ✅ Browse all tables
- ✅ View all 6 users (admin, hr, manager, supervisor, finance, employee)
- ✅ View 7 departments
- ✅ View 180 attendance records
- ✅ View 36 payroll records
- ✅ Add, edit, or delete data directly

---

## 🔍 If Connection Fails

### Error: "Host not found" or "Connection refused"
- Make sure MySQL is running
- Check if port 3306 is in use: `ps aux | grep mysql`

### Error: "Access Denied"
- Check username is exactly: `qhr_user`
- Check password is exactly: `QHR_2024_Secure!`
- Make sure user has privileges

### Error: "Database not found"
- Check database name is exactly: `qhr_database`
- Verify database exists: `SHOW DATABASES;`

### Error: "Wrong password"
- Password is case-sensitive
- Must be exactly: `QHR_2024_Secure!`
- No extra spaces

---

## ✅ Expected Result

Once connected, you should see in Beekeeper:

**Users Table Preview:**
```
| id | email | firstName | lastName | role | department |
|----|-------|-----------|----------|------|------------|
| admin-001 | admin@qhr.com | Sarah | Johnson | ADMIN | Administration |
| hr-001 | hr@qhr.com | Michael | Chen | HR_MANAGER | Human Resources |
| manager-001 | manager@qhr.com | Emily | Rodriguez | MANAGER | Engineering |
| supervisor-001 | supervisor@qhr.com | David | Kim | SUPERVISOR | Marketing |
| finance-001 | finance@qhr.com | Lisa | Wang | EMPLOYEE | Finance |
| employee-001 | employee@qhr.com | John | Smith | EMPLOYEE | Engineering |
```

**Departments Table Preview:**
```
| id | name | description |
|----|------|-------------|
| dept-001 | Engineering | Software and product development |
| dept-002 | Marketing | Marketing and brand management |
| dept-003 | Sales | Sales and business development |
| dept-004 | HR | Human resources management |
| dept-005 | Finance | Financial management and accounting |
| dept-006 | Operations | Operations and administration |
| dept-007 | Administration | Administrative services |
```

---

## 💡 Tips

1. **Bookmark the connection** for quick access next time
2. **Use table filtering** to find specific data
3. **Sort by columns** for better organization
4. **Right-click tables** for options like "Duplicate" or "Delete"
5. **Edit data directly** by double-clicking cells

---

## 🚀 You're All Set!

Your Beekeeper Studio is now connected to your Q HR MySQL database! 🎉

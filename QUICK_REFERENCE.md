# 🐝 Beekeeper Studio - Quick Reference

## 📌 Connection Details (Copy-Paste Ready)

```
Connection Name:  Q HR Database
Host:             localhost
Port:             3306
Database:         qhr_database
Username:         qhr_user
Password:         QHR_2024_Secure!
SSL Mode:         Disabled
```

---

## 📊 What You'll See

| Table | Records | Description |
|-------|---------|-------------|
| **users** | 6 | All employees (admin, hr, manager, supervisor, 2 employees) |
| **departments** | 7 | Engineering, Marketing, Sales, HR, Finance, Operations, Admin |
| **attendances** | 180 | 30 days of attendance for 6 employees |
| **payrolls** | 36 | 6 months of payroll for 6 employees |
| **companies** | 1 | Company information |
| **check_ins** | - | Check-in records |
| **check_outs** | - | Check-out records |
| **face_data** | - | Face recognition data |
| **notifications** | - | Notifications |

---

## 👥 User Accounts in Database

| Email | Password | Role | Department |
|-------|----------|------|------------|
| admin@qhr.com | password123 | ADMIN | Administration |
| hr@qhr.com | password123 | HR_MANAGER | Human Resources |
| manager@qhr.com | password123 | MANAGER | Engineering |
| supervisor@qhr.com | password123 | SUPERVISOR | Marketing |
| finance@qhr.com | password123 | EMPLOYEE | Finance |
| employee@qhr.com | password123 | EMPLOYEE | Engineering |

---

## 🚀 Quick Steps to Connect

1. **Open Beekeeper Studio**
2. **Click "New Connection"**
3. **Select "MySQL"**
4. **Copy details from above** ⬆️
5. **Click "Test Connection"**
6. **Click "Save"**
7. **Done!** ✅

---

## 🛠️ Useful Terminal Commands

```bash
# Check if MySQL is running
ps aux | grep mysql

# Connect to database via terminal
/Applications/XAMPP/xamppfiles/bin/mysql -u qhr_user -h localhost -pQHR_2024_Secure! qhr_database

# View all tables
SHOW TABLES;

# Count records in each table
SELECT 'users' as table_name, COUNT(*) as count FROM users
UNION ALL
SELECT 'departments', COUNT(*) FROM departments
UNION ALL
SELECT 'attendances', COUNT(*) FROM attendances
UNION ALL
SELECT 'payrolls', COUNT(*) FROM payrolls;

# Verify user exists
SELECT User, Host FROM mysql.user WHERE User = 'qhr_user';
```

---

## 📝 Database Information

- **Provider**: MySQL
- **Host**: localhost
- **Port**: 3306
- **Database**: qhr_database
- **Total Users**: 6
- **Total Departments**: 7
- **Total Attendance Records**: 180
- **Total Payroll Records**: 36

---

## ✅ Verification Status

- [x] Database created
- [x] User created with privileges
- [x] All tables created
- [x] Mock data seeded
- [x] Connection tested
- [x] Ready for Beekeeper Studio

**Status: ✅ READY TO USE**

---

## 💡 Pro Tips

1. **Password is case-sensitive!** Make sure caps are correct: `QHR_2024_Secure!`
2. **Use "Test Connection"** before saving to verify everything works
3. **All user passwords are**: `password123`
4. **To edit data**: Double-click any cell in Beekeeper
5. **To add new rows**: Right-click the table or use the "+" button

---

## 🎯 Next Steps

1. ✅ Connect Beekeeper to database
2. Browse the data
3. Update/edit records directly in Beekeeper
4. Use the data in your app at `/api/employees`, `/api/departments`, etc.

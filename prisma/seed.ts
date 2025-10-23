import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Mock users data matching your mockUsers.ts
const mockUsersData = [
  {
    id: 'admin-001',
    email: 'admin@qhr.com',
    firstName: 'Sarah',
    lastName: 'Johnson',
    role: 'ADMIN',
    department: 'Administration',
    position: 'Admin Officer',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=random&color=fff&size=200',
    phone: '+1-555-0001',
    address: '100 Admin St, City, State',
    salary: 7500,
  },
  {
    id: 'hr-001',
    email: 'hr@qhr.com',
    firstName: 'Michael',
    lastName: 'Chen',
    role: 'HR_MANAGER',
    department: 'Human Resources',
    position: 'HR Manager',
    avatar: 'https://ui-avatars.com/api/?name=Michael+Chen&background=random&color=fff&size=200',
    phone: '+1-555-0002',
    address: '101 HR St, City, State',
    salary: 6500,
  },
  {
    id: 'manager-001',
    email: 'manager@qhr.com',
    firstName: 'Emily',
    lastName: 'Rodriguez',
    role: 'MANAGER',
    department: 'Engineering',
    position: 'Engineering Manager',
    avatar: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=random&color=fff&size=200',
    phone: '+1-555-0003',
    address: '102 Manager St, City, State',
    salary: 8500,
  },
  {
    id: 'supervisor-001',
    email: 'supervisor@qhr.com',
    firstName: 'David',
    lastName: 'Kim',
    role: 'SUPERVISOR',
    department: 'Marketing',
    position: 'Marketing Supervisor',
    avatar: 'https://ui-avatars.com/api/?name=David+Kim&background=random&color=fff&size=200',
    phone: '+1-555-0004',
    address: '103 Supervisor St, City, State',
    salary: 5500,
  },
  {
    id: 'finance-001',
    email: 'finance@qhr.com',
    firstName: 'Lisa',
    lastName: 'Wang',
    role: 'EMPLOYEE',
    department: 'Finance',
    position: 'Finance Specialist',
    avatar: 'https://ui-avatars.com/api/?name=Lisa+Wang&background=random&color=fff&size=200',
    phone: '+1-555-0005',
    address: '104 Finance St, City, State',
    salary: 4500,
  },
  {
    id: 'employee-001',
    email: 'employee@qhr.com',
    firstName: 'John',
    lastName: 'Smith',
    role: 'EMPLOYEE',
    department: 'Engineering',
    position: 'Software Engineer',
    avatar: 'https://ui-avatars.com/api/?name=John+Smith&background=random&color=fff&size=200',
    phone: '+1-555-0006',
    address: '105 Employee St, City, State',
    salary: 5000,
  },
];

// Mock departments data
const departmentsData = [
  { id: 'dept-001', name: 'Engineering', description: 'Software and product development' },
  { id: 'dept-002', name: 'Marketing', description: 'Marketing and brand management' },
  { id: 'dept-003', name: 'Sales', description: 'Sales and business development' },
  { id: 'dept-004', name: 'HR', description: 'Human resources management' },
  { id: 'dept-005', name: 'Finance', description: 'Financial management and accounting' },
  { id: 'dept-006', name: 'Operations', description: 'Operations and administration' },
  { id: 'dept-007', name: 'Administration', description: 'Administrative services' },
];

async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // 1. Create Departments
    console.log('📦 Creating departments...');
    for (const dept of departmentsData) {
      await prisma.department.upsert({
        where: { id: dept.id },
        update: {},
        create: {
          id: dept.id,
          name: dept.name,
          description: dept.description,
          isActive: true,
        },
      });
    }
    console.log(`✅ ${departmentsData.length} departments created`);

    // 2. Create Users (without passwords first, then add them)
    console.log('👥 Creating users...');
    const hashedPassword = await bcrypt.hash('password123', 10);

    for (const userData of mockUsersData) {
      const dept = departmentsData.find(d => d.name === userData.department);
      
      await prisma.user.upsert({
        where: { email: userData.email },
        update: {},
        create: {
          id: userData.id,
          email: userData.email,
          password: hashedPassword,
          firstName: userData.firstName,
          lastName: userData.lastName,
          role: userData.role as any,
          avatar: userData.avatar,
          phone: userData.phone,
          address: userData.address,
          position: userData.position,
          salary: userData.salary,
          departmentId: dept?.id,
          isActive: true,
          hireDate: new Date('2023-01-15'),
          bloodType: 'O+',
          emergencyContactName: `${userData.firstName} Emergency`,
          emergencyContactPhone: userData.phone,
          emergencyContactRelationship: 'Spouse',
        },
      });
    }
    console.log(`✅ ${mockUsersData.length} users created`);

    // 3. Create Attendance Records
    console.log('📋 Creating attendance records...');
    const users = await prisma.user.findMany();
    const today = new Date();
    let attendanceCount = 0;

    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      for (const user of users) {
        const checkInTime = new Date(date);
        checkInTime.setHours(8 + Math.random() * 2, Math.floor(Math.random() * 60), 0);
        
        const checkOutTime = new Date(date);
        checkOutTime.setHours(17 + Math.random() * 2, Math.floor(Math.random() * 60), 0);

        try {
          await prisma.attendance.upsert({
            where: { userId_date: { userId: user.id, date: new Date(date.toDateString()) } },
            update: {},
            create: {
              userId: user.id,
              date: new Date(date.toDateString()),
              checkInTime,
              checkOutTime,
              status: 'PRESENT',
              totalHours: 8 + Math.random() * 2,
              notes: 'Regular working day',
            },
          });
          attendanceCount++;
        } catch (e) {
          // Skip if record already exists
        }
      }
    }
    console.log(`✅ ${attendanceCount} attendance records created`);

    // 4. Create Payroll Records
    console.log('💰 Creating payroll records...');
    let payrollCount = 0;
    const currentYear = new Date().getFullYear();
    const months = ['January', 'February', 'March', 'April', 'May', 'June'];

    for (const user of users) {
      for (let monthIndex = 0; monthIndex < months.length; monthIndex++) {
        try {
          await prisma.payroll.upsert({
            where: {
              userId_month_year: {
                userId: user.id,
                month: monthIndex + 1,
                year: currentYear,
              },
            },
            update: {},
            create: {
              userId: user.id,
              month: monthIndex + 1,
              year: currentYear,
              baseSalary: user.salary || 5000,
              overtimePay: Math.random() * 500,
              bonuses: 0,
              deductions: Math.random() * 200,
              netSalary: (user.salary || 5000) + (Math.random() * 500) - (Math.random() * 200),
              status: monthIndex < 3 ? 'PAID' : 'PENDING',
              paidAt: monthIndex < 3 ? new Date() : null,
            },
          });
          payrollCount++;
        } catch (e) {
          // Skip if record already exists
        }
      }
    }
    console.log(`✅ ${payrollCount} payroll records created`);

    // 5. Create Employee Records (synchronized with users table)
    console.log('👤 Creating employee records...');
    let employeeCount = 0;
    
    const employeeData = [
      {
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@qhr.com',
        phone: '+1-555-0001',
        address: '100 Main St, New York, NY',
        position: 'Admin Officer',
        department: 'Administration',
        salary: 7500,
        bloodType: 'O+',
        emergencyContactName: 'Michael Johnson',
        emergencyContactPhone: '+1-555-9001',
        emergencyContactRelationship: 'Spouse',
      },
      {
        firstName: 'Michael',
        lastName: 'Chen',
        email: 'michael.chen@qhr.com',
        phone: '+1-555-0002',
        address: '101 Oak Ave, San Francisco, CA',
        position: 'HR Manager',
        department: 'Human Resources',
        salary: 6500,
        bloodType: 'A+',
        emergencyContactName: 'Lisa Chen',
        emergencyContactPhone: '+1-555-9002',
        emergencyContactRelationship: 'Sister',
      },
      {
        firstName: 'Emily',
        lastName: 'Rodriguez',
        email: 'emily.rodriguez@qhr.com',
        phone: '+1-555-0003',
        address: '102 Pine St, Seattle, WA',
        position: 'Engineering Manager',
        department: 'Engineering',
        salary: 8500,
        bloodType: 'B+',
        emergencyContactName: 'David Rodriguez',
        emergencyContactPhone: '+1-555-9003',
        emergencyContactRelationship: 'Brother',
      },
      {
        firstName: 'David',
        lastName: 'Kim',
        email: 'david.kim@qhr.com',
        phone: '+1-555-0004',
        address: '103 Cedar Ln, Portland, OR',
        position: 'Marketing Supervisor',
        department: 'Marketing',
        salary: 5500,
        bloodType: 'AB-',
        emergencyContactName: 'Jennifer Kim',
        emergencyContactPhone: '+1-555-9004',
        emergencyContactRelationship: 'Wife',
      },
      {
        firstName: 'Lisa',
        lastName: 'Wang',
        email: 'lisa.wang@qhr.com',
        phone: '+1-555-0005',
        address: '104 Maple Dr, Boston, MA',
        position: 'Finance Specialist',
        department: 'Finance',
        salary: 4500,
        bloodType: 'O-',
        emergencyContactName: 'John Wang',
        emergencyContactPhone: '+1-555-9005',
        emergencyContactRelationship: 'Husband',
      },
      {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@qhr.com',
        phone: '+1-555-0006',
        address: '105 Elm St, Austin, TX',
        position: 'Software Engineer',
        department: 'Engineering',
        salary: 5000,
        bloodType: 'A-',
        emergencyContactName: 'Sarah Smith',
        emergencyContactPhone: '+1-555-9006',
        emergencyContactRelationship: 'Mother',
      },
    ];

    for (const emp of employeeData) {
      try {
        await prisma.employee.upsert({
          where: { email: emp.email },
          update: {},
          create: {
            firstName: emp.firstName,
            lastName: emp.lastName,
            email: emp.email,
            phone: emp.phone,
            address: emp.address,
            position: emp.position,
            department: emp.department,
            salary: emp.salary,
            bloodType: emp.bloodType,
            isActive: true,
            emergencyContactName: emp.emergencyContactName,
            emergencyContactPhone: emp.emergencyContactPhone,
            emergencyContactRelationship: emp.emergencyContactRelationship,
            hireDate: new Date('2023-01-15'),
          },
        });
        employeeCount++;
      } catch (e) {
        // Skip if record already exists
      }
    }
    console.log(`✅ ${employeeCount} employee records created`);

    // 6. Create Company Information
    console.log('🏢 Creating company information...');
    await prisma.company.upsert({
      where: { id: 'company-001' },
      update: {},
      create: {
        id: 'company-001',
        name: 'Q HR System',
        address: '123 Business Ave, Tech City, TC 12345',
        phone: '+1-555-1234',
        email: 'info@qhr.com',
        website: 'https://qhr.example.com',
        settings: {
          timeZone: 'UTC',
          dateFormat: 'YYYY-MM-DD',
          currency: 'USD',
        },
      },
    });
    console.log('✅ Company information created');

    console.log('🎉 Database seed completed successfully!');
  } catch (error) {
    console.error('❌ Error during seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed();

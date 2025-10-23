import { User } from '@/types';
import { mockUsers } from './mockUsers';
import { UserRole } from './auth';

// Convert mockUsers (with 'name' field) to User type (with firstName/lastName)
const convertMockUsersToEmployees = (): User[] => {
  return mockUsers.map(user => {
    const nameParts = user.name?.split(' ') || ['', ''];
    return {
      ...user,
      firstName: nameParts[0] || '',
      lastName: nameParts.slice(1).join(' ') || '',
      role: user.role.toUpperCase() as 'ADMIN' | 'HR_MANAGER' | 'MANAGER' | 'EMPLOYEE',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  });
};

// In-memory employee storage (simulates database)
let employees: User[] = [];
let isInitialized = false;

// Initialize with both original mock users and new team hierarchy data
const initializeEmployeeData = () => {
  if (isInitialized) {
    console.log('⚠️ Employee data already initialized, skipping...');
    return;
  }
  
  console.log('🔄 Initializing employee data...');
  
  // Start with original mock users
  employees = convertMockUsersToEmployees();
  console.log(`📊 Original mock users loaded: ${employees.length}`);
  
  // Add comprehensive team hierarchy data
  addMockTeamData();
  
  isInitialized = true;
  console.log('✅ Employee data initialization complete');
};

// Add mock team hierarchy data
const addMockTeamData = () => {
  // Check if mock data already exists to avoid duplicates
  const existingManagerIds = employees.filter(emp => emp.id.startsWith('manager-')).map(emp => emp.id);
  if (existingManagerIds.length > 0) {
    console.log('⚠️ Mock team data already exists, skipping...');
    return; // Mock data already added
  }
  
  console.log('🚀 Adding mock team data...');

  // Generate unique IDs with timestamp to avoid conflicts
  const timestamp = Date.now();
  
  // Departments with 2 managers each
  const departments = [
    { name: 'Engineering', positions: ['Engineering Manager', 'Senior Engineering Manager'] },
    { name: 'Marketing', positions: ['Marketing Manager', 'Senior Marketing Manager'] },
    { name: 'Sales', positions: ['Sales Manager', 'Regional Sales Manager'] },
    { name: 'HR', positions: ['HR Manager', 'Senior HR Manager'] },
    { name: 'Finance', positions: ['Finance Manager', 'Senior Finance Manager'] },
    { name: 'Operations', positions: ['Operations Manager', 'Senior Operations Manager'] }
  ];

  const newEmployees: User[] = [];

  // Create managers, supervisors, and employees for each department
  departments.forEach((dept, deptIndex) => {
    // Create 2 managers per department
    for (let managerIndex = 0; managerIndex < 2; managerIndex++) {
      const managerId = `manager-${timestamp}-${deptIndex}-${managerIndex}`;
      const manager: User = {
        id: managerId,
        email: `manager${deptIndex}-${managerIndex}@qhr.com`,
        firstName: ['Sarah', 'Michael', 'Emily', 'David', 'Lisa', 'Alex', 'Sophia', 'Marcus', 'Olivia', 'James', 'Rachel', 'Daniel'][deptIndex * 2 + managerIndex],
        lastName: ['Johnson', 'Chen', 'Rodriguez', 'Kim', 'Wang', 'Brown', 'Garcia', 'Wilson', 'Martinez', 'Taylor', 'Anderson', 'Lee'][deptIndex * 2 + managerIndex],
        role: 'MANAGER',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(['Sarah', 'Michael', 'Emily', 'David', 'Lisa', 'Alex', 'Sophia', 'Marcus', 'Olivia', 'James', 'Rachel', 'Daniel'][deptIndex * 2 + managerIndex])}&background=random&color=fff&size=200`,
        phone: `+1-555-${String(deptIndex * 2 + managerIndex + 1).padStart(4, '0')}`,
        address: `${100 + deptIndex * 2 + managerIndex} Main St, City, State`,
        position: dept.positions[managerIndex],
        department: dept.name,
        salary: 8500 + (managerIndex * 1000),
        hireDate: new Date(`2021-${String(managerIndex + 1).padStart(2, '0')}-15`),
        isActive: true,
        createdAt: new Date(`2021-${String(managerIndex + 1).padStart(2, '0')}-15`),
        updatedAt: new Date()
      };
      newEmployees.push(manager);

      // Create 2 supervisors per manager
      for (let supervisorIndex = 0; supervisorIndex < 2; supervisorIndex++) {
        const supervisorId = `supervisor-${timestamp}-${deptIndex}-${managerIndex}-${supervisorIndex}`;
        const supervisor: User = {
          id: supervisorId,
          email: `supervisor${deptIndex}-${managerIndex}-${supervisorIndex}@qhr.com`,
          firstName: ['John', 'Jane', 'Alex', 'Sarah', 'Mike', 'Emma', 'Chris', 'Anna', 'Tom', 'Kate', 'Sam', 'Lucy'][deptIndex * 4 + managerIndex * 2 + supervisorIndex],
          lastName: ['Smith', 'Doe', 'Johnson', 'Wilson', 'Brown', 'Davis', 'Miller', 'Garcia', 'Martinez', 'Anderson', 'Taylor', 'Thomas'][deptIndex * 4 + managerIndex * 2 + supervisorIndex],
          role: 'SUPERVISOR',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(['John', 'Jane', 'Alex', 'Sarah', 'Mike', 'Emma', 'Chris', 'Anna', 'Tom', 'Kate', 'Sam', 'Lucy'][deptIndex * 4 + managerIndex * 2 + supervisorIndex])}&background=random&color=fff&size=200`,
          phone: `+1-555-${String(deptIndex * 4 + managerIndex * 2 + supervisorIndex + 10).padStart(4, '0')}`,
          address: `${200 + deptIndex * 4 + managerIndex * 2 + supervisorIndex} Oak St, City, State`,
          position: `${dept.name} Supervisor`,
          department: dept.name,
          salary: 6500 + (supervisorIndex * 500),
          hireDate: new Date(`2022-${String(supervisorIndex + 1).padStart(2, '0')}-10`),
          isActive: true,
          managerId: managerId,
          createdAt: new Date(`2022-${String(supervisorIndex + 1).padStart(2, '0')}-10`),
          updatedAt: new Date()
        };
        newEmployees.push(supervisor);

        // Create 3 employees per supervisor
        for (let employeeIndex = 0; employeeIndex < 3; employeeIndex++) {
          const employee: User = {
            id: `employee-${timestamp}-${deptIndex}-${managerIndex}-${supervisorIndex}-${employeeIndex}`,
            email: `employee${deptIndex}-${managerIndex}-${supervisorIndex}-${employeeIndex}@qhr.com`,
            firstName: ['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack', 'Kelly', 'Liam', 'Maya', 'Noah', 'Oscar', 'Paula', 'Quinn', 'Ruby', 'Steve', 'Tina', 'Uma', 'Victor', 'Wendy', 'Xavier', 'Yara', 'Zoe', 'Adam', 'Beth', 'Carl', 'Diana', 'Ethan', 'Fiona', 'George', 'Hannah', 'Ian', 'Julia', 'Kevin', 'Laura', 'Mark', 'Nancy', 'Oliver', 'Penny', 'Quentin', 'Rita', 'Simon', 'Tara', 'Ulysses', 'Vera', 'William', 'Xara', 'Yolanda', 'Zack'][deptIndex * 12 + managerIndex * 6 + supervisorIndex * 3 + employeeIndex],
            lastName: ['Adams', 'Baker', 'Clark', 'Davis', 'Evans', 'Foster', 'Green', 'Harris', 'Irwin', 'Jones', 'King', 'Lee', 'Moore', 'Nelson', 'Owen', 'Parker', 'Quinn', 'Reed', 'Scott', 'Turner', 'Underwood', 'Vance', 'White', 'Young', 'Zimmerman', 'Allen', 'Bell', 'Cooper', 'Dunn', 'Edwards', 'Fisher', 'Gray', 'Hall', 'Ingram', 'Jordan', 'Klein', 'Lopez', 'Mason', 'Newman', 'Owens', 'Powell', 'Quinn', 'Roberts', 'Stewart', 'Thompson', 'Underwood', 'Vaughn', 'Ward', 'Wright', 'York', 'Zimmerman'][deptIndex * 12 + managerIndex * 6 + supervisorIndex * 3 + employeeIndex],
            role: 'EMPLOYEE',
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack', 'Kelly', 'Liam', 'Maya', 'Noah', 'Oscar', 'Paula', 'Quinn', 'Ruby', 'Steve', 'Tina', 'Uma', 'Victor', 'Wendy', 'Xavier', 'Yara', 'Zoe', 'Adam', 'Beth', 'Carl', 'Diana', 'Ethan', 'Fiona', 'George', 'Hannah', 'Ian', 'Julia', 'Kevin', 'Laura', 'Mark', 'Nancy', 'Oliver', 'Penny', 'Quentin', 'Rita', 'Simon', 'Tara', 'Ulysses', 'Vera', 'William', 'Xara', 'Yolanda', 'Zack'][deptIndex * 12 + managerIndex * 6 + supervisorIndex * 3 + employeeIndex])}&background=random&color=fff&size=200`,
            phone: `+1-555-${String(deptIndex * 12 + managerIndex * 6 + supervisorIndex * 3 + employeeIndex + 50).padStart(4, '0')}`,
            address: `${300 + deptIndex * 12 + managerIndex * 6 + supervisorIndex * 3 + employeeIndex} Pine St, City, State`,
            position: `${dept.name} Specialist`,
            department: dept.name,
            salary: 4500 + (employeeIndex * 300),
            hireDate: new Date(`2023-${String(employeeIndex + 1).padStart(2, '0')}-05`),
            isActive: true,
            supervisorId: supervisorId,
            createdAt: new Date(`2023-${String(employeeIndex + 1).padStart(2, '0')}-05`),
            updatedAt: new Date()
          };
          newEmployees.push(employee);
        }
      }
    }
  });

  // Add all new employees to the array
  employees.push(...newEmployees);
  
  // Debug log to verify data integration
  console.log(`✅ Mock team data added: ${newEmployees.length} new employees`);
  console.log(`📊 Total employees now: ${employees.length}`);
  console.log(`👥 Managers: ${employees.filter(e => e.role === 'MANAGER').length}`);
  console.log(`👨‍💼 Supervisors: ${employees.filter(e => e.role === 'SUPERVISOR').length}`);
  console.log(`👩‍💻 Employees: ${employees.filter(e => e.role === 'EMPLOYEE').length}`);
};

// Initialize all employee data immediately
console.log('🚀 Starting employee data initialization...');
initializeEmployeeData();

// Log final state after initialization
setTimeout(() => {
  console.log('📊 Final employee data state:');
  console.log(`Total employees: ${employees.length}`);
  console.log(`Managers: ${employees.filter(e => e.role === 'MANAGER').length}`);
  console.log(`Supervisors: ${employees.filter(e => e.role === 'SUPERVISOR').length}`);
  console.log(`Employees: ${employees.filter(e => e.role === 'EMPLOYEE').length}`);
}, 100);

// Get all employees
export const getAllEmployees = (): User[] => {
  return employees;
};

// Get employee count by role for debugging
export const getEmployeeCounts = () => {
  const managers = employees.filter(emp => emp.role === 'MANAGER').length;
  const supervisors = employees.filter(emp => emp.role === 'SUPERVISOR').length;
  const employees_count = employees.filter(emp => emp.role === 'EMPLOYEE').length;
  const total = employees.length;
  
  return {
    managers,
    supervisors,
    employees: employees_count,
    total
  };
};

// Debug function to check data loading
export const debugEmployeeData = () => {
  console.log('🔍 DEBUG: Employee Data Analysis');
  console.log(`📊 Total employees: ${employees.length}`);
  console.log('📋 Role distribution:', getEmployeeCounts());
  console.log('👥 All employees:', employees.map(e => ({ id: e.id, name: `${e.firstName} ${e.lastName}`, role: e.role, department: e.department })));
  return { employees, counts: getEmployeeCounts() };
};

// Force re-initialization (for debugging)
export const forceReinitialize = () => {
  console.log('🔄 Force re-initializing employee data...');
  isInitialized = false;
  employees = [];
  initializeEmployeeData();
  
  // Log the results
  setTimeout(() => {
    console.log('✅ Re-initialization complete:');
    console.log(`Total employees: ${employees.length}`);
    console.log(`Managers: ${employees.filter(e => e.role === 'MANAGER').length}`);
    console.log(`Supervisors: ${employees.filter(e => e.role === 'SUPERVISOR').length}`);
    console.log(`Employees: ${employees.filter(e => e.role === 'EMPLOYEE').length}`);
  }, 100);
  
  return { employees, counts: getEmployeeCounts() };
};

// Add a simple function to manually add mock data
export const addMockDataManually = () => {
  console.log('🔧 Manually adding mock data...');
  
  // Clear existing data
  employees = [];
  isInitialized = false;
  
  // Add original mock users
  employees = convertMockUsersToEmployees();
  console.log(`📊 Original users: ${employees.length}`);
  
  // Add team hierarchy data
  addMockTeamData();
  
  console.log('✅ Manual mock data addition complete');
  return { employees, counts: getEmployeeCounts() };
};

// Get employee by ID
export const getEmployeeById = (id: string): User | undefined => {
  return employees.find(emp => emp.id === id);
};

// Add new employee
export const addEmployee = (employeeData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User => {
  const newEmployee: User = {
    ...employeeData,
    id: `emp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  employees.push(newEmployee);
  return newEmployee;
};

// Update employee
export const updateEmployee = (id: string, updates: Partial<User>): User | undefined => {
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) return undefined;
  
  employees[index] = {
    ...employees[index],
    ...updates,
    updatedAt: new Date()
  };
  
  return employees[index];
};

// Delete employee
export const deleteEmployee = (id: string): boolean => {
  const index = employees.findIndex(emp => emp.id === id);
  if (index === -1) return false;
  
  employees.splice(index, 1);
  return true;
};

// Search employees
export const searchEmployees = (query: string): User[] => {
  const lowerQuery = query.toLowerCase();
  return employees.filter(emp =>
    emp.firstName?.toLowerCase().includes(lowerQuery) ||
    emp.lastName?.toLowerCase().includes(lowerQuery) ||
    emp.email.toLowerCase().includes(lowerQuery) ||
    emp.department?.toLowerCase().includes(lowerQuery) ||
    emp.position?.toLowerCase().includes(lowerQuery)
  );
};

// Filter by department
export const filterByDepartment = (department: string): User[] => {
  if (department === 'All') return employees;
  return employees.filter(emp => emp.department === department);
};

// Filter by role
export const filterByRole = (role: UserRole): User[] => {
  return employees.filter(emp => emp.role === role);
};

// Get statistics
export const getEmployeeStats = () => {
  const active = employees.filter(emp => emp.isActive).length;
  const inactive = employees.length - active;
  const departments = new Set(employees.map(emp => emp.department).filter(Boolean)).size;
  
  return {
    total: employees.length,
    active,
    inactive,
    departments
  };
};

// ================= Team hierarchy helpers =================

export const getManagers = (): User[] => {
  const managers = employees.filter(e => e.role === 'MANAGER');
  console.log(`🔍 getManagers() - Found ${managers.length} managers out of ${employees.length} total employees`);
  console.log('📋 All roles in employees:', employees.map(e => e.role));
  return managers;
};
export const getSupervisors = (): User[] => employees.filter(e => e.role === 'SUPERVISOR');
export const getEmployeesOnly = (): User[] => employees.filter(e => e.role === 'EMPLOYEE');

export const getSupervisorsByManager = (managerId: string): User[] =>
  employees.filter(e => e.role === 'SUPERVISOR' && e.managerId === managerId);

export const getEmployeesBySupervisor = (supervisorId: string): User[] =>
  employees.filter(e => e.role === 'EMPLOYEE' && e.supervisorId === supervisorId);

export const assignSupervisorToEmployee = (employeeId: string, supervisorId: string): User | undefined => {
  const supervisor = employees.find(e => e.id === supervisorId && e.role === 'SUPERVISOR');
  const employee = employees.find(e => e.id === employeeId && e.role === 'EMPLOYEE');
  if (!supervisor || !employee) return undefined;
  employee.supervisorId = supervisorId;
  employee.updatedAt = new Date();
  return employee;
};

export const assignManagerToSupervisor = (supervisorId: string, managerId: string): User | undefined => {
  const manager = employees.find(e => e.id === managerId && e.role === 'MANAGER');
  const supervisor = employees.find(e => e.id === supervisorId && e.role === 'SUPERVISOR');
  if (!manager || !supervisor) return undefined;
  supervisor.managerId = managerId;
  supervisor.updatedAt = new Date();
  return supervisor;
};

export const getOrgTree = () => {
  const managers = getManagers();
  console.log(`🌳 getOrgTree() - Building tree with ${managers.length} managers`);
  
  const tree = managers.map(manager => {
    const supervisors = getSupervisorsByManager(manager.id);
    console.log(`👨‍💼 Manager ${manager.firstName} ${manager.lastName} has ${supervisors.length} supervisors`);
    
    return {
      manager,
      supervisors: supervisors.map(supervisor => {
        const employees = getEmployeesBySupervisor(supervisor.id);
        console.log(`👩‍💼 Supervisor ${supervisor.firstName} ${supervisor.lastName} has ${employees.length} employees`);
        
        return {
          supervisor,
          employees
        };
      })
    };
  });
  
  console.log(`🌳 Final tree structure: ${tree.length} manager nodes`);
  return tree;
};


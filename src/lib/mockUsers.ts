import { User, UserRole } from './auth';

export const mockUsers: User[] = [
  {
    id: 'admin-001',
    email: 'admin@qhr.com',
    name: 'Sarah Johnson',
    role: 'admin',
    department: 'Administration',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    permissions: [
      'view_all', 'edit_all', 'delete_all', 'manage_users', 'manage_roles',
      'view_payroll', 'edit_payroll', 'view_attendance', 'edit_attendance',
      'view_leave', 'edit_leave', 'view_documents', 'edit_documents',
      'view_reports', 'system_settings'
    ]
  },
  {
    id: 'hr-001',
    email: 'hr@qhr.com',
    name: 'Michael Chen',
    role: 'hr',
    department: 'Human Resources',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    permissions: [
      'view_all', 'edit_employees', 'view_payroll', 'edit_payroll',
      'view_attendance', 'edit_attendance', 'view_leave', 'edit_leave',
      'view_documents', 'edit_documents', 'view_reports'
    ]
  },
  {
    id: 'manager-001',
    email: 'manager@qhr.com',
    name: 'Emily Rodriguez',
    role: 'manager',
    department: 'Engineering',
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    permissions: [
      'view_team', 'edit_team', 'view_attendance', 'edit_attendance',
      'view_leave', 'edit_leave', 'view_documents', 'view_reports'
    ]
  },
  {
    id: 'supervisor-001',
    email: 'supervisor@qhr.com',
    name: 'David Kim',
    role: 'supervisor',
    department: 'Marketing',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    permissions: [
      'view_team', 'view_attendance', 'view_leave', 'edit_leave', 'view_documents'
    ]
  },
  {
    id: 'finance-001',
    email: 'finance@qhr.com',
    name: 'Lisa Wang',
    role: 'finance',
    department: 'Finance',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    permissions: [
      'view_payroll', 'edit_payroll', 'view_reports', 'view_attendance'
    ]
  },
  {
    id: 'employee-001',
    email: 'employee@qhr.com',
    name: 'John Smith',
    role: 'employee',
    department: 'Engineering',
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    permissions: [
      'view_own', 'edit_own', 'view_leave', 'edit_leave', 'view_documents'
    ]
  }
];

// Demo credentials for easy testing
export const demoCredentials = {
  admin: { email: 'admin@qhr.com', password: 'admin123' },
  hr: { email: 'hr@qhr.com', password: 'hr123' },
  manager: { email: 'manager@qhr.com', password: 'manager123' },
  supervisor: { email: 'supervisor@qhr.com', password: 'supervisor123' },
  finance: { email: 'finance@qhr.com', password: 'finance123' },
  employee: { email: 'employee@qhr.com', password: 'employee123' }
};

// Get user by email
export const getUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email === email);
};

// Get user by ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Get users by role
export const getUsersByRole = (role: UserRole): User[] => {
  return mockUsers.filter(user => user.role === role);
};

// Get users by department
export const getUsersByDepartment = (department: string): User[] => {
  return mockUsers.filter(user => user.department === department);
};

// Validate credentials
export const validateCredentials = (email: string, password: string): User | null => {
  const user = getUserByEmail(email);
  if (!user) return null;
  
  // In a real app, you'd hash and compare passwords
  // For demo purposes, we'll use simple password matching
  const expectedPassword = demoCredentials[user.role]?.password;
  if (password !== expectedPassword) return null;
  
  return user;
};

// Get role statistics
export const getRoleStatistics = () => {
  const stats = mockUsers.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<UserRole, number>);
  
  return {
    total: mockUsers.length,
    byRole: stats,
    byDepartment: mockUsers.reduce((acc, user) => {
      acc[user.department] = (acc[user.department] || 0) + 1;
      return acc;
    }, {} as Record<string, number>)
  };
};

// Get user dashboard data based on role
export const getUserDashboardData = (userRole: UserRole) => {
  const baseData = {
    totalEmployees: mockUsers.length,
    totalDepartments: new Set(mockUsers.map(u => u.department)).size,
    recentActivity: [
      { action: 'User logged in', timestamp: new Date().toISOString(), user: 'System' },
      { action: 'Document uploaded', timestamp: new Date(Date.now() - 300000).toISOString(), user: 'John Smith' },
      { action: 'Leave request submitted', timestamp: new Date(Date.now() - 600000).toISOString(), user: 'Emily Rodriguez' }
    ]
  };

  switch (userRole) {
    case 'admin':
      return {
        ...baseData,
        title: 'Administrator Dashboard',
        subtitle: 'Full system access and management',
        stats: [
          { label: 'Total Users', value: mockUsers.length, color: 'blue' },
          { label: 'Active Sessions', value: 12, color: 'green' },
          { label: 'System Health', value: '99.9%', color: 'green' },
          { label: 'Storage Used', value: '2.3GB', color: 'yellow' }
        ],
        quickActions: [
          { name: 'Manage Users', icon: 'UsersIcon', href: '/admin/users' },
          { name: 'System Settings', icon: 'CogIcon', href: '/admin/settings' },
          { name: 'View Reports', icon: 'ChartBarIcon', href: '/reports' },
          { name: 'Backup System', icon: 'CloudIcon', href: '/admin/backup' }
        ]
      };

    case 'hr':
      return {
        ...baseData,
        title: 'HR Manager Dashboard',
        subtitle: 'Human resources management and oversight',
        stats: [
          { label: 'Total Employees', value: mockUsers.length, color: 'blue' },
          { label: 'Pending Reviews', value: 8, color: 'yellow' },
          { label: 'Active Recruitments', value: 3, color: 'green' },
          { label: 'Training Hours', value: '156h', color: 'purple' }
        ],
        quickActions: [
          { name: 'Employee Records', icon: 'UsersIcon', href: '/hr/employees' },
          { name: 'Recruitment', icon: 'UserPlusIcon', href: '/hr/recruitment' },
          { name: 'Performance Reviews', icon: 'StarIcon', href: '/hr/reviews' },
          { name: 'Training Programs', icon: 'AcademicCapIcon', href: '/hr/training' }
        ]
      };

    case 'manager':
      return {
        ...baseData,
        title: 'Manager Dashboard',
        subtitle: 'Team management and oversight',
        stats: [
          { label: 'Team Members', value: 8, color: 'blue' },
          { label: 'Pending Approvals', value: 5, color: 'yellow' },
          { label: 'Team Performance', value: '92%', color: 'green' },
          { label: 'Projects Active', value: 4, color: 'purple' }
        ],
        quickActions: [
          { name: 'Team Overview', icon: 'UsersIcon', href: '/manager/team' },
          { name: 'Performance Reviews', icon: 'StarIcon', href: '/manager/reviews' },
          { name: 'Project Management', icon: 'FolderIcon', href: '/manager/projects' },
          { name: 'Team Reports', icon: 'ChartBarIcon', href: '/manager/reports' }
        ]
      };

    case 'supervisor':
      return {
        ...baseData,
        title: 'Supervisor Dashboard',
        subtitle: 'Team supervision and coordination',
        stats: [
          { label: 'Team Members', value: 6, color: 'blue' },
          { label: 'Pending Tasks', value: 12, color: 'yellow' },
          { label: 'Team Efficiency', value: '88%', color: 'green' },
          { label: 'Completed Tasks', value: 24, color: 'purple' }
        ],
        quickActions: [
          { name: 'Team Status', icon: 'UsersIcon', href: '/supervisor/team' },
          { name: 'Task Management', icon: 'ClipboardIcon', href: '/supervisor/tasks' },
          { name: 'Team Communication', icon: 'ChatIcon', href: '/supervisor/chat' },
          { name: 'Progress Reports', icon: 'ChartBarIcon', href: '/supervisor/reports' }
        ]
      };

    case 'finance':
      return {
        ...baseData,
        title: 'Finance Dashboard',
        subtitle: 'Financial management and reporting',
        stats: [
          { label: 'Total Payroll', value: '$125,000', color: 'blue' },
          { label: 'Pending Approvals', value: 7, color: 'yellow' },
          { label: 'Budget Utilization', value: '78%', color: 'green' },
          { label: 'Cost Savings', value: '$12,500', color: 'purple' }
        ],
        quickActions: [
          { name: 'Payroll Management', icon: 'CurrencyDollarIcon', href: '/finance/payroll' },
          { name: 'Budget Planning', icon: 'ChartBarIcon', href: '/finance/budget' },
          { name: 'Expense Reports', icon: 'DocumentIcon', href: '/finance/expenses' },
          { name: 'Financial Reports', icon: 'ChartLineIcon', href: '/finance/reports' }
        ]
      };

    case 'employee':
      return {
        ...baseData,
        title: 'Employee Dashboard',
        subtitle: 'Personal workspace and self-service',
        stats: [
          { label: 'Leave Balance', value: '15 days', color: 'blue' },
          { label: 'Hours This Week', value: '32h', color: 'green' },
          { label: 'Pending Tasks', value: 3, color: 'yellow' },
          { label: 'Performance Score', value: '4.2/5', color: 'purple' }
        ],
        quickActions: [
          { name: 'My Profile', icon: 'UserIcon', href: '/employee/profile' },
          { name: 'Leave Requests', icon: 'CalendarIcon', href: '/employee/leave' },
          { name: 'Time Tracking', icon: 'ClockIcon', href: '/employee/time' },
          { name: 'Documents', icon: 'FolderIcon', href: '/employee/documents' }
        ]
      };

    default:
      return baseData;
  }
};

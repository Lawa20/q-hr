// JWT Authentication utilities
// Note: In production, use proper JWT libraries like jsonwebtoken

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  department: string;
  avatar?: string;
  permissions: string[];
}

export type UserRole = 'admin' | 'hr' | 'manager' | 'supervisor' | 'employee' | 'finance';

export interface JWTPayload {
  userId: string;
  email: string;
  role: UserRole;
  iat: number;
  exp: number;
}

// Mock JWT secret (in production, use environment variable)
const JWT_SECRET = 'qhr-secret-key-2024';

// Simple JWT encoding (for demo purposes)
export const encodeJWT = (payload: Omit<JWTPayload, 'iat' | 'exp'>): string => {
  const header = {
    alg: 'HS256',
    typ: 'JWT'
  };
  
  const now = Math.floor(Date.now() / 1000);
  const jwtPayload: JWTPayload = {
    ...payload,
    iat: now,
    exp: now + (24 * 60 * 60) // 24 hours
  };
  
  const encodedHeader = btoa(JSON.stringify(header));
  const encodedPayload = btoa(JSON.stringify(jwtPayload));
  const signature = btoa(`${encodedHeader}.${encodedPayload}.${JWT_SECRET}`);
  
  return `${encodedHeader}.${encodedPayload}.${signature}`;
};

// Simple JWT decoding (for demo purposes)
export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    const payload = JSON.parse(atob(parts[1]));
    
    // Check expiration
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    
    return payload;
  } catch (error) {
    return null;
  }
};

// Role-based permissions
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: [
    'view_all',
    'edit_all',
    'delete_all',
    'manage_users',
    'manage_roles',
    'view_payroll',
    'edit_payroll',
    'view_attendance',
    'edit_attendance',
    'view_leave',
    'edit_leave',
    'view_documents',
    'edit_documents',
    'view_reports',
    'system_settings'
  ],
  hr: [
    'view_all',
    'edit_employees',
    'view_payroll',
    'edit_payroll',
    'view_attendance',
    'edit_attendance',
    'view_leave',
    'edit_leave',
    'view_documents',
    'edit_documents',
    'view_reports'
  ],
  manager: [
    'view_team',
    'edit_team',
    'view_attendance',
    'edit_attendance',
    'view_leave',
    'edit_leave',
    'view_documents',
    'view_reports'
  ],
  supervisor: [
    'view_team',
    'view_attendance',
    'view_leave',
    'edit_leave',
    'view_documents'
  ],
  finance: [
    'view_payroll',
    'edit_payroll',
    'view_reports',
    'view_attendance'
  ],
  employee: [
    'view_own',
    'edit_own',
    'view_leave',
    'edit_leave',
    'view_documents'
  ]
};

// Check if user has permission
export const hasPermission = (userRole: UserRole | string | undefined, permission: string): boolean => {
  if (!userRole) return false;
  
  const normalizedRole = (userRole as string).toLowerCase();
  
  // Try to find the role in ROLE_PERMISSIONS
  const roleKey = Object.keys(ROLE_PERMISSIONS).find(
    key => key === userRole || key === normalizedRole
  );
  
  if (!roleKey) {
    console.warn(`Unknown role: ${userRole}`);
    return false;
  }
  
  return ROLE_PERMISSIONS[roleKey as UserRole].includes(permission);
};

// Check if user can access route
export const canAccessRoute = (userRole: UserRole, route: string): boolean => {
  const routePermissions: Record<string, string[]> = {
    '/': ['view_all', 'view_own'],
    '/attendance': ['view_attendance', 'edit_attendance'],
    '/leave-tracker': ['view_leave', 'edit_leave'],
    '/inbox': ['view_all', 'view_own'],
    '/payroll': ['view_payroll', 'edit_payroll'],
    '/more': ['view_all', 'view_own'],
    '/documents': ['view_documents', 'edit_documents']
  };
  
  const requiredPermissions = routePermissions[route] || [];
  return requiredPermissions.some(permission => hasPermission(userRole, permission));
};

// Get sidebar items based on role
export const getSidebarItems = (userRole: UserRole) => {
  const allItems = [
    { name: 'Home', href: '/', icon: 'HomeIcon', description: 'Dashboard overview', permission: 'view_all' },
    { name: 'Self-Service', href: '/self-service', icon: 'UserIcon', description: 'Personal workspace', permission: 'view_own' },
    { name: 'Employees', href: '/employees', icon: 'UserGroupIcon', description: 'Manage employees', permission: 'view_all' },
    { name: 'Departments', href: '/departments', icon: 'Squares2X2Icon', description: 'Department structure', permission: 'view_all' },
    { name: 'Teams', href: '/teams', icon: 'UserGroupIcon', description: 'Team hierarchy', permission: 'view_all' },
    { name: 'Leave Tracker', href: '/leave-tracker', icon: 'CalendarDaysIcon', description: 'Leave management', permission: 'view_leave' },
    { name: 'Attendance', href: '/attendance', icon: 'ClockIcon', description: 'Time tracking', permission: 'view_attendance' },
    { name: 'Inbox', href: '/inbox', icon: 'ChatBubbleLeftIcon', description: 'Messages & notifications', permission: 'view_all' },
    { name: 'Payroll', href: '/payroll', icon: 'CurrencyDollarIcon', description: 'Salary management', permission: 'view_payroll' },
    { name: 'More', href: '/more', icon: 'EllipsisHorizontalIcon', description: 'Additional tools', permission: 'view_all' }
  ];
  
  return allItems.filter(item => hasPermission(userRole, item.permission));
};

// Get navigation items based on role
export const getNavigationItems = (userRole: UserRole) => {
  const allItems = [
    { name: 'Dashboard', href: '/', permission: 'view_all' },
    { name: 'Attendance', href: '/attendance', permission: 'view_attendance' },
    { name: 'Leave Management', href: '/leave-tracker', permission: 'view_leave' },
    { name: 'Payroll', href: '/payroll', permission: 'view_payroll' },
    { name: 'Documents', href: '/more', permission: 'view_documents' },
    { name: 'Reports', href: '/reports', permission: 'view_reports' }
  ];
  
  return allItems.filter(item => hasPermission(userRole, item.permission));
};

// Role hierarchy for access control
export const ROLE_HIERARCHY: Record<UserRole, number> = {
  admin: 6,
  hr: 5,
  manager: 4,
  supervisor: 3,
  finance: 2,
  employee: 1
};

// Check if user can manage another user
export const canManageUser = (managerRole: UserRole, targetRole: UserRole): boolean => {
  return ROLE_HIERARCHY[managerRole] > ROLE_HIERARCHY[targetRole];
};

// Get role display name
export const getRoleDisplayName = (role: UserRole | string | undefined): string => {
  if (!role) return 'Unknown Role';
  
  const normalizedRole = (role as string).toLowerCase();
  const displayNames: Record<string, string> = {
    admin: 'Administrator',
    hr: 'HR Manager',
    manager: 'Manager',
    supervisor: 'Supervisor',
    finance: 'Finance',
    employee: 'Employee',
    hr_manager: 'HR Manager',
    // Handle uppercase versions
    ADMIN: 'Administrator',
    HR_MANAGER: 'HR Manager',
    MANAGER: 'Manager',
    SUPERVISOR: 'Supervisor',
    EMPLOYEE: 'Employee'
  };
  
  return displayNames[role as string] || displayNames[normalizedRole] || 'Employee';
};

// Get role color
export const getRoleColor = (role: UserRole | string | undefined): string => {
  if (!role) return 'bg-gray-100 text-gray-800 border-gray-200';
  
  const normalizedRole = (role as string).toLowerCase();
  const colors: Record<string, string> = {
    admin: 'bg-red-100 text-red-800 border-red-200',
    hr: 'bg-blue-100 text-blue-800 border-blue-200',
    manager: 'bg-green-100 text-green-800 border-green-200',
    supervisor: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    finance: 'bg-purple-100 text-purple-800 border-purple-200',
    employee: 'bg-gray-100 text-gray-800 border-gray-200',
    hr_manager: 'bg-blue-100 text-blue-800 border-blue-200',
    // Handle uppercase versions
    ADMIN: 'bg-red-100 text-red-800 border-red-200',
    HR_MANAGER: 'bg-blue-100 text-blue-800 border-blue-200',
    MANAGER: 'bg-green-100 text-green-800 border-green-200',
    SUPERVISOR: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    EMPLOYEE: 'bg-gray-100 text-gray-800 border-gray-200'
  };
  
  return colors[role as string] || colors[normalizedRole] || 'bg-gray-100 text-gray-800 border-gray-200';
};

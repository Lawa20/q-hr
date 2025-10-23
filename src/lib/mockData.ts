// Comprehensive mock data for all HR modules

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  manager: string;
  hireDate: string;
  salary: number;
  avatar?: string;
  phone?: string;
  address?: string;
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  timestamp: string;
  type: 'check-in' | 'check-out';
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  zoneStatus: 'inside' | 'outside';
  deviceInfo: {
    browser: string;
    os: string;
    ip: string;
  };
}

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  leaveType: 'sick' | 'vacation' | 'personal' | 'maternity' | 'paternity' | 'bereavement';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  reviewedDate?: string;
  reviewedBy?: string;
  comments?: string;
}

export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  month: string;
  year: number;
  baseSalary: number;
  incentives: number;
  bonus: number;
  overtime: number;
  deductions: {
    late: number;
    early: number;
    socialSecurity: number;
    unpermittedOff: number;
  };
  totalSalary: number;
  netSalary: number;
}

export interface Document {
  id: string;
  name: string;
  type: 'contract' | 'id' | 'certificate' | 'policy' | 'other';
  size: number;
  uploadDate: string;
  uploadedBy: string;
  category: string;
  description?: string;
  tags: string[];
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  recipientName: string;
  subject: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  attachments?: {
    name: string;
    size: number;
    type: string;
  }[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

// Mock Employees
export const mockEmployees: Employee[] = [
  {
    id: 'emp-001',
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@qhr.com',
    department: 'Engineering',
    position: 'Senior Software Engineer',
    manager: 'Sarah Johnson',
    hireDate: '2022-03-15',
    salary: 8500,
    phone: '+1-555-0101',
    address: '123 Tech Street, Silicon Valley, CA',
    emergencyContact: {
      name: 'Fatima Hassan',
      phone: '+1-555-0102',
      relationship: 'Spouse'
    }
  },
  {
    id: 'emp-002',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@qhr.com',
    department: 'Engineering',
    position: 'Engineering Manager',
    manager: 'CEO',
    hireDate: '2020-01-10',
    salary: 12000,
    phone: '+1-555-0201',
    address: '456 Manager Ave, Tech City, CA',
    emergencyContact: {
      name: 'John Johnson',
      phone: '+1-555-0202',
      relationship: 'Husband'
    }
  },
  {
    id: 'emp-003',
    name: 'Mohammed Al-Rashid',
    email: 'mohammed.alrashid@qhr.com',
    department: 'HR',
    position: 'HR Manager',
    manager: 'CEO',
    hireDate: '2019-06-01',
    salary: 9500,
    phone: '+1-555-0301',
    address: '789 HR Boulevard, Business District, CA',
    emergencyContact: {
      name: 'Aisha Al-Rashid',
      phone: '+1-555-0302',
      relationship: 'Wife'
    }
  },
  {
    id: 'emp-004',
    name: 'Jennifer Chen',
    email: 'jennifer.chen@qhr.com',
    department: 'Finance',
    position: 'Financial Analyst',
    manager: 'David Wilson',
    hireDate: '2021-09-20',
    salary: 7500,
    phone: '+1-555-0401',
    address: '321 Finance Lane, Money Town, CA',
    emergencyContact: {
      name: 'Robert Chen',
      phone: '+1-555-0402',
      relationship: 'Father'
    }
  },
  {
    id: 'emp-005',
    name: 'David Wilson',
    email: 'david.wilson@qhr.com',
    department: 'Finance',
    position: 'Finance Manager',
    manager: 'CEO',
    hireDate: '2018-11-15',
    salary: 11000,
    phone: '+1-555-0501',
    address: '654 Finance Street, Capital City, CA',
    emergencyContact: {
      name: 'Lisa Wilson',
      phone: '+1-555-0502',
      relationship: 'Wife'
    }
  },
  {
    id: 'emp-006',
    name: 'Amina Othman',
    email: 'amina.othman@qhr.com',
    department: 'Marketing',
    position: 'Marketing Specialist',
    manager: 'Michael Brown',
    hireDate: '2022-07-10',
    salary: 6800,
    phone: '+1-555-0601',
    address: '987 Marketing Way, Creative District, CA',
    emergencyContact: {
      name: 'Omar Othman',
      phone: '+1-555-0602',
      relationship: 'Brother'
    }
  },
  {
    id: 'emp-007',
    name: 'Michael Brown',
    email: 'michael.brown@qhr.com',
    department: 'Marketing',
    position: 'Marketing Manager',
    manager: 'CEO',
    hireDate: '2020-04-05',
    salary: 9200,
    phone: '+1-555-0701',
    address: '147 Marketing Ave, Brand City, CA',
    emergencyContact: {
      name: 'Emily Brown',
      phone: '+1-555-0702',
      relationship: 'Wife'
    }
  },
  {
    id: 'emp-008',
    name: 'Kurdish Employee',
    email: 'kurdish.employee@qhr.com',
    department: 'Operations',
    position: 'Operations Coordinator',
    manager: 'Sarah Johnson',
    hireDate: '2023-01-15',
    salary: 6200,
    phone: '+1-555-0801',
    address: '258 Operations Blvd, Process City, CA',
    emergencyContact: {
      name: 'Family Member',
      phone: '+1-555-0802',
      relationship: 'Sibling'
    }
  },
  {
    id: 'emp-009',
    name: 'Lisa Martinez',
    email: 'lisa.martinez@qhr.com',
    department: 'Customer Support',
    position: 'Customer Support Representative',
    manager: 'Jennifer Chen',
    hireDate: '2023-03-01',
    salary: 5500,
    phone: '+1-555-0901',
    address: '369 Support Street, Help Town, CA',
    emergencyContact: {
      name: 'Carlos Martinez',
      phone: '+1-555-0902',
      relationship: 'Husband'
    }
  },
  {
    id: 'emp-010',
    name: 'Omar Khalil',
    email: 'omar.khalil@qhr.com',
    department: 'Engineering',
    position: 'Junior Developer',
    manager: 'Ahmed Hassan',
    hireDate: '2023-06-01',
    salary: 5800,
    phone: '+1-555-1001',
    address: '741 Developer Lane, Code City, CA',
    emergencyContact: {
      name: 'Nour Khalil',
      phone: '+1-555-1002',
      relationship: 'Sister'
    }
  }
];

// Mock Attendance Records
export const mockAttendanceRecords: AttendanceRecord[] = [
  {
    id: 'att-001',
    employeeId: 'emp-001',
    employeeName: 'Ahmed Hassan',
    department: 'Engineering',
    timestamp: '2024-01-15T09:00:00Z',
    type: 'check-in',
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      address: '123 Tech Street, Silicon Valley, CA'
    },
    zoneStatus: 'inside',
    deviceInfo: {
      browser: 'Chrome 120.0',
      os: 'Windows 11',
      ip: '192.168.1.100'
    }
  },
  {
    id: 'att-002',
    employeeId: 'emp-001',
    employeeName: 'Ahmed Hassan',
    department: 'Engineering',
    timestamp: '2024-01-15T17:30:00Z',
    type: 'check-out',
    location: {
      latitude: 37.7749,
      longitude: -122.4194,
      address: '123 Tech Street, Silicon Valley, CA'
    },
    zoneStatus: 'inside',
    deviceInfo: {
      browser: 'Chrome 120.0',
      os: 'Windows 11',
      ip: '192.168.1.100'
    }
  },
  {
    id: 'att-003',
    employeeId: 'emp-002',
    employeeName: 'Sarah Johnson',
    department: 'Engineering',
    timestamp: '2024-01-15T08:45:00Z',
    type: 'check-in',
    location: {
      latitude: 37.7849,
      longitude: -122.4094,
      address: '456 Manager Ave, Tech City, CA'
    },
    zoneStatus: 'inside',
    deviceInfo: {
      browser: 'Safari 17.0',
      os: 'macOS 14.0',
      ip: '192.168.1.101'
    }
  },
  {
    id: 'att-004',
    employeeId: 'emp-003',
    employeeName: 'Mohammed Al-Rashid',
    department: 'HR',
    timestamp: '2024-01-15T09:15:00Z',
    type: 'check-in',
    location: {
      latitude: 37.7649,
      longitude: -122.4294,
      address: '789 HR Boulevard, Business District, CA'
    },
    zoneStatus: 'inside',
    deviceInfo: {
      browser: 'Firefox 121.0',
      os: 'Windows 10',
      ip: '192.168.1.102'
    }
  },
  {
    id: 'att-005',
    employeeId: 'emp-004',
    employeeName: 'Jennifer Chen',
    department: 'Finance',
    timestamp: '2024-01-15T09:30:00Z',
    type: 'check-in',
    location: {
      latitude: 37.7549,
      longitude: -122.4394,
      address: '321 Finance Lane, Money Town, CA'
    },
    zoneStatus: 'outside',
    deviceInfo: {
      browser: 'Chrome 120.0',
      os: 'Windows 11',
      ip: '192.168.1.103'
    }
  }
];

// Mock Leave Requests
export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 'leave-001',
    employeeId: 'emp-001',
    employeeName: 'Ahmed Hassan',
    department: 'Engineering',
    leaveType: 'vacation',
    startDate: '2024-02-15',
    endDate: '2024-02-20',
    days: 5,
    reason: 'Family vacation to Dubai',
    status: 'approved',
    submittedDate: '2024-01-10T10:00:00Z',
    reviewedDate: '2024-01-12T14:30:00Z',
    reviewedBy: 'Sarah Johnson',
    comments: 'Approved. Enjoy your vacation!'
  },
  {
    id: 'leave-002',
    employeeId: 'emp-002',
    employeeName: 'Sarah Johnson',
    department: 'Engineering',
    leaveType: 'sick',
    startDate: '2024-01-20',
    endDate: '2024-01-22',
    days: 3,
    reason: 'Flu symptoms',
    status: 'approved',
    submittedDate: '2024-01-19T08:00:00Z',
    reviewedDate: '2024-01-19T09:00:00Z',
    reviewedBy: 'Mohammed Al-Rashid',
    comments: 'Get well soon!'
  },
  {
    id: 'leave-003',
    employeeId: 'emp-003',
    employeeName: 'Mohammed Al-Rashid',
    department: 'HR',
    leaveType: 'personal',
    startDate: '2024-02-01',
    endDate: '2024-02-01',
    days: 1,
    reason: 'Personal appointment',
    status: 'pending',
    submittedDate: '2024-01-25T15:30:00Z'
  },
  {
    id: 'leave-004',
    employeeId: 'emp-004',
    employeeName: 'Jennifer Chen',
    department: 'Finance',
    leaveType: 'maternity',
    startDate: '2024-03-01',
    endDate: '2024-06-01',
    days: 90,
    reason: 'Maternity leave',
    status: 'approved',
    submittedDate: '2024-01-15T11:00:00Z',
    reviewedDate: '2024-01-16T10:00:00Z',
    reviewedBy: 'David Wilson',
    comments: 'Congratulations! Approved for full maternity leave.'
  },
  {
    id: 'leave-005',
    employeeId: 'emp-005',
    employeeName: 'David Wilson',
    department: 'Finance',
    leaveType: 'vacation',
    startDate: '2024-02-10',
    endDate: '2024-02-16',
    days: 7,
    reason: 'Skiing trip to Colorado',
    status: 'rejected',
    submittedDate: '2024-01-20T13:00:00Z',
    reviewedDate: '2024-01-22T16:00:00Z',
    reviewedBy: 'Mohammed Al-Rashid',
    comments: 'Rejected due to budget planning period. Please reschedule.'
  }
];

// Mock Payroll Records
export const mockPayrollRecords: PayrollRecord[] = [
  {
    id: 'pay-001',
    employeeId: 'emp-001',
    employeeName: 'Ahmed Hassan',
    department: 'Engineering',
    month: 'January',
    year: 2024,
    baseSalary: 8500,
    incentives: 1200,
    bonus: 500,
    overtime: 300,
    deductions: {
      late: 50,
      early: 0,
      socialSecurity: 425,
      unpermittedOff: 0
    },
    totalSalary: 10500,
    netSalary: 10025
  },
  {
    id: 'pay-002',
    employeeId: 'emp-002',
    employeeName: 'Sarah Johnson',
    department: 'Engineering',
    month: 'January',
    year: 2024,
    baseSalary: 12000,
    incentives: 1800,
    bonus: 1000,
    overtime: 0,
    deductions: {
      late: 0,
      early: 0,
      socialSecurity: 600,
      unpermittedOff: 0
    },
    totalSalary: 14800,
    netSalary: 14200
  },
  {
    id: 'pay-003',
    employeeId: 'emp-003',
    employeeName: 'Mohammed Al-Rashid',
    department: 'HR',
    month: 'January',
    year: 2024,
    baseSalary: 9500,
    incentives: 800,
    bonus: 300,
    overtime: 150,
    deductions: {
      late: 25,
      early: 0,
      socialSecurity: 475,
      unpermittedOff: 0
    },
    totalSalary: 10750,
    netSalary: 10250
  }
];

// Mock Documents
export const mockDocuments: Document[] = [
  {
    id: 'doc-001',
    name: 'Employment Contract - Ahmed Hassan.pdf',
    type: 'contract',
    size: 245760,
    uploadDate: '2024-01-15T10:00:00Z',
    uploadedBy: 'Mohammed Al-Rashid',
    category: 'HR Documents',
    description: 'Standard employment contract for software engineer position',
    tags: ['contract', 'employment', 'engineering']
  },
  {
    id: 'doc-002',
    name: 'ID Copy - Sarah Johnson.jpg',
    type: 'id',
    size: 1024000,
    uploadDate: '2024-01-10T14:30:00Z',
    uploadedBy: 'Sarah Johnson',
    category: 'Personal Documents',
    description: 'Government issued ID copy',
    tags: ['id', 'personal', 'verification']
  },
  {
    id: 'doc-003',
    name: 'Company Policy Handbook 2024.pdf',
    type: 'policy',
    size: 2048000,
    uploadDate: '2024-01-01T09:00:00Z',
    uploadedBy: 'Mohammed Al-Rashid',
    category: 'Company Policies',
    description: 'Updated company policies and procedures',
    tags: ['policy', 'handbook', 'company']
  }
];

// Mock Messages
export const mockMessages: Message[] = [
  {
    id: 'msg-001',
    senderId: 'emp-003',
    senderName: 'Mohammed Al-Rashid',
    recipientId: 'emp-001',
    recipientName: 'Ahmed Hassan',
    subject: 'Leave Request Approved',
    content: 'Your vacation request for February 15-20 has been approved. Have a great trip!',
    timestamp: '2024-01-12T14:30:00Z',
    isRead: true
  },
  {
    id: 'msg-002',
    senderId: 'emp-002',
    senderName: 'Sarah Johnson',
    recipientId: 'emp-003',
    recipientName: 'Mohammed Al-Rashid',
    subject: 'Team Meeting Reminder',
    content: 'Reminder: We have our weekly team meeting tomorrow at 10 AM. Please prepare your status updates.',
    timestamp: '2024-01-14T16:00:00Z',
    isRead: false
  },
  {
    id: 'msg-003',
    senderId: 'emp-005',
    senderName: 'David Wilson',
    recipientId: 'emp-004',
    recipientName: 'Jennifer Chen',
    subject: 'Budget Review Meeting',
    content: 'Hi Jennifer, can we schedule a budget review meeting for next week? I need to discuss the Q1 projections.',
    timestamp: '2024-01-13T11:15:00Z',
    isRead: true
  }
];

// Mock Notifications
export const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    title: 'Leave Request Approved',
    message: 'Your vacation request has been approved by Sarah Johnson',
    type: 'success',
    timestamp: '2024-01-12T14:30:00Z',
    isRead: true,
    actionUrl: '/leave-tracker'
  },
  {
    id: 'notif-002',
    title: 'New Message Received',
    message: 'You have received a new message from Sarah Johnson',
    type: 'info',
    timestamp: '2024-01-14T16:00:00Z',
    isRead: false,
    actionUrl: '/inbox'
  },
  {
    id: 'notif-003',
    title: 'Payroll Processed',
    message: 'Your January payroll has been processed and will be deposited tomorrow',
    type: 'success',
    timestamp: '2024-01-31T09:00:00Z',
    isRead: true,
    actionUrl: '/payroll'
  },
  {
    id: 'notif-004',
    title: 'Attendance Alert',
    message: 'You checked in outside the designated zone. Please contact HR if this is an error.',
    type: 'warning',
    timestamp: '2024-01-15T09:30:00Z',
    isRead: false,
    actionUrl: '/attendance'
  }
];

// Utility functions
export const getEmployeeById = (id: string): Employee | undefined => {
  return mockEmployees.find(emp => emp.id === id);
};

export const getAttendanceByEmployee = (employeeId: string): AttendanceRecord[] => {
  return mockAttendanceRecords.filter(att => att.employeeId === employeeId);
};

export const getLeaveRequestsByEmployee = (employeeId: string): LeaveRequest[] => {
  return mockLeaveRequests.filter(leave => leave.employeeId === employeeId);
};

export const getPayrollByEmployee = (employeeId: string): PayrollRecord[] => {
  return mockPayrollRecords.filter(pay => pay.employeeId === employeeId);
};

export const getUnreadMessagesCount = (): number => {
  return mockMessages.filter(msg => !msg.isRead).length;
};

export const getUnreadNotificationsCount = (): number => {
  return mockNotifications.filter(notif => !notif.isRead).length;
};
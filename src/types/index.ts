export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'HR_MANAGER' | 'MANAGER' | 'SUPERVISOR' | 'EMPLOYEE';
  avatar?: string;
  phone?: string;
  address?: string;
  position?: string;
  department?: string;
  salary?: number;
  bloodType?: string;
  hireDate?: Date;
  // Team hierarchy relationships
  managerId?: string; // For SUPERVISORs: who they report to; optional for EMPLOYEE
  supervisorId?: string; // For EMPLOYEEs: who they report to
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Attendance {
  id: string;
  userId: string;
  date: Date;
  checkInTime?: Date;
  checkOutTime?: Date;
  status: 'PRESENT' | 'ABSENT' | 'LATE' | 'HALF_DAY' | 'SICK_LEAVE' | 'VACATION' | 'HOLIDAY';
  totalHours?: number;
  overtimeHours?: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CheckIn {
  id: string;
  userId: string;
  attendanceId: string;
  timestamp: Date;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  faceVerified: boolean;
  deviceInfo?: string;
  ipAddress?: string;
  notes?: string;
}

export interface CheckOut {
  id: string;
  userId: string;
  attendanceId: string;
  timestamp: Date;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  faceVerified: boolean;
  deviceInfo?: string;
  ipAddress?: string;
  notes?: string;
}

export interface Payroll {
  id: string;
  userId: string;
  month: number;
  year: number;
  baseSalary: number;
  overtimePay: number;
  bonuses: number;
  deductions: number;
  netSalary: number;
  status: 'PENDING' | 'PROCESSED' | 'PAID' | 'CANCELLED';
  paidAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'INFO' | 'WARNING' | 'SUCCESS' | 'ERROR' | 'ATTENDANCE' | 'PAYROLL' | 'SYSTEM';
  isRead: boolean;
  createdAt: Date;
}

export interface Company {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  logo?: string;
  settings?: {
    workingHours: {
      start: string;
      end: string;
      breakDuration: number;
    };
    overtimeThreshold: number;
    faceRecognitionEnabled: boolean;
    gpsTrackingEnabled: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'ADMIN' | 'HR_MANAGER' | 'MANAGER' | 'EMPLOYEE';
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role?: 'ADMIN' | 'HR_MANAGER' | 'MANAGER' | 'EMPLOYEE';
}

export interface DashboardStats {
  totalEmployees: number;
  presentToday: number;
  lateToday: number;
  absentToday: number;
  totalHoursThisWeek: number;
  averageHoursPerDay: number;
}

export interface AttendanceChartData {
  date: string;
  present: number;
  absent: number;
  late: number;
}

export interface PayrollChartData {
  month: string;
  total: number;
  base: number;
  overtime: number;
  bonuses: number;
}

import { formatDate } from './dateUtils';

// Mock data for dashboard
export const dashboardData = {
  // Today's attendance summary
  todayAttendance: {
    totalEmployees: 156,
    checkedIn: 142,
    notCheckedIn: 14,
    lateArrivals: 8,
    earlyDepartures: 3,
  },

  // Monthly salary summary (HR/Finance view)
  monthlySalary: {
    totalPayroll: 2450000,
    averageSalary: 15705,
    processedPayrolls: 156,
    pendingPayrolls: 0,
    currency: 'USD',
  },

  // Leave requests
  leaveRequests: [
    {
      id: '1',
      employee: 'Sarah Johnson',
      type: 'Vacation',
      startDate: '2024-01-15',
      endDate: '2024-01-19',
      days: 5,
      status: 'pending' as const,
      reason: 'Family vacation',
    },
    {
      id: '2',
      employee: 'Mike Chen',
      type: 'Sick Leave',
      startDate: '2024-01-12',
      endDate: '2024-01-12',
      days: 1,
      status: 'approved' as const,
      reason: 'Medical appointment',
    },
    {
      id: '3',
      employee: 'Emily Davis',
      type: 'Personal',
      startDate: '2024-01-20',
      endDate: '2024-01-22',
      days: 3,
      status: 'pending' as const,
      reason: 'Personal matters',
    },
    {
      id: '4',
      employee: 'John Smith',
      type: 'Vacation',
      startDate: '2024-01-25',
      endDate: '2024-01-29',
      days: 5,
      status: 'rejected' as const,
      reason: 'Holiday trip',
    },
  ],

  // Notifications
  notifications: [
    {
      id: '1',
      title: 'New Leave Request',
      message: 'Sarah Johnson has submitted a vacation request for Jan 15-19',
      type: 'info' as const,
      timestamp: '2 hours ago',
      isRead: false,
    },
    {
      id: '2',
      title: 'Payroll Processed',
      message: 'January payroll has been successfully processed for all employees',
      type: 'success' as const,
      timestamp: '1 day ago',
      isRead: true,
    },
    {
      id: '3',
      title: 'Attendance Alert',
      message: '8 employees have not checked in today',
      type: 'warning' as const,
      timestamp: '3 hours ago',
      isRead: false,
    },
    {
      id: '4',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur tonight from 11 PM to 1 AM',
      type: 'info' as const,
      timestamp: '5 hours ago',
      isRead: true,
    },
  ],

  // Attendance chart data (last 7 days)
  attendanceChartData: [
    { date: 'Mon', present: 145, absent: 8, late: 12 },
    { date: 'Tue', present: 148, absent: 5, late: 9 },
    { date: 'Wed', present: 142, absent: 11, late: 15 },
    { date: 'Thu', present: 150, absent: 3, late: 8 },
    { date: 'Fri', present: 147, absent: 6, late: 10 },
    { date: 'Sat', present: 45, absent: 2, late: 3 },
    { date: 'Sun', present: 38, absent: 1, late: 2 },
  ],

  // Quick stats
  quickStats: {
    totalEmployees: 156,
    activeEmployees: 152,
    onLeave: 4,
    newHires: 3,
    departures: 1,
  },
};

// Helper functions
export const getAttendancePercentage = () => {
  const { checkedIn, totalEmployees } = dashboardData.todayAttendance;
  return Math.round((checkedIn / totalEmployees) * 100);
};

export const getPendingLeaveCount = () => {
  return dashboardData.leaveRequests.filter(r => r.status === 'pending').length;
};

export const getUnreadNotificationsCount = () => {
  return dashboardData.notifications.filter(n => !n.isRead).length;
};

export const formatCurrency = (amount: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  employeeEmail: string;
  leaveType: 'Annual' | 'Sick' | 'Personal' | 'Maternity' | 'Paternity' | 'Emergency' | 'Study';
  startDate: string;
  endDate: string;
  totalDays: number;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  submittedDate: string;
  reviewedBy?: string;
  reviewedDate?: string;
  comments?: string;
  attachments?: string[];
}

export interface LeaveBalanceData {
  employeeId: string;
  annualLeave: number;
  sickLeave: number;
  personalLeave: number;
  maternityLeave: number;
  paternityLeave: number;
  emergencyLeave: number;
  studyLeave: number;
}

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: 'leave-req-001',
    employeeId: 'emp-001',
    employeeName: 'Alice Johnson',
    employeeEmail: 'alice.johnson@qhr.com',
    leaveType: 'Annual',
    startDate: '2024-01-15',
    endDate: '2024-01-19',
    totalDays: 5,
    reason: 'Family vacation to Hawaii',
    status: 'Approved',
    submittedDate: '2024-01-10T09:00:00Z',
    reviewedBy: 'Sarah Wilson',
    reviewedDate: '2024-01-11T14:30:00Z',
    comments: 'Approved. Enjoy your vacation!',
    attachments: ['vacation_booking.pdf']
  },
  {
    id: 'leave-req-002',
    employeeId: 'emp-002',
    employeeName: 'Bob Smith',
    employeeEmail: 'bob.smith@qhr.com',
    leaveType: 'Sick',
    startDate: '2024-01-20',
    endDate: '2024-01-22',
    totalDays: 3,
    reason: 'Flu symptoms and fever',
    status: 'Approved',
    submittedDate: '2024-01-19T08:15:00Z',
    reviewedBy: 'Sarah Wilson',
    reviewedDate: '2024-01-19T10:00:00Z',
    comments: 'Get well soon!',
    attachments: ['medical_certificate.pdf']
  },
  {
    id: 'leave-req-003',
    employeeId: 'emp-003',
    employeeName: 'Charlie Brown',
    employeeEmail: 'charlie.brown@qhr.com',
    leaveType: 'Personal',
    startDate: '2024-01-25',
    endDate: '2024-01-25',
    totalDays: 1,
    reason: 'Personal appointment with lawyer',
    status: 'Pending',
    submittedDate: '2024-01-22T16:45:00Z'
  },
  {
    id: 'leave-req-004',
    employeeId: 'emp-004',
    employeeName: 'Diana Prince',
    employeeEmail: 'diana.prince@qhr.com',
    leaveType: 'Maternity',
    startDate: '2024-02-01',
    endDate: '2024-05-01',
    totalDays: 90,
    reason: 'Maternity leave for childbirth',
    status: 'Approved',
    submittedDate: '2024-01-15T11:20:00Z',
    reviewedBy: 'Sarah Wilson',
    reviewedDate: '2024-01-16T09:00:00Z',
    comments: 'Congratulations! Approved for full maternity leave.',
    attachments: ['pregnancy_certificate.pdf', 'doctor_letter.pdf']
  },
  {
    id: 'leave-req-005',
    employeeId: 'emp-005',
    employeeName: 'Eve Adams',
    employeeEmail: 'eve.adams@qhr.com',
    leaveType: 'Study',
    startDate: '2024-02-10',
    endDate: '2024-02-14',
    totalDays: 5,
    reason: 'Professional development course',
    status: 'Pending',
    submittedDate: '2024-01-28T13:30:00Z'
  },
  {
    id: 'leave-req-006',
    employeeId: 'emp-006',
    employeeName: 'Frank Miller',
    employeeEmail: 'frank.miller@qhr.com',
    leaveType: 'Annual',
    startDate: '2024-01-30',
    endDate: '2024-02-02',
    totalDays: 4,
    reason: 'Long weekend getaway',
    status: 'Rejected',
    submittedDate: '2024-01-25T10:00:00Z',
    reviewedBy: 'Sarah Wilson',
    reviewedDate: '2024-01-26T15:20:00Z',
    comments: 'Rejected due to project deadline conflicts. Please reschedule.',
    attachments: []
  },
  {
    id: 'leave-req-007',
    employeeId: 'emp-007',
    employeeName: 'Grace Lee',
    employeeEmail: 'grace.lee@qhr.com',
    leaveType: 'Emergency',
    startDate: '2024-01-18',
    endDate: '2024-01-18',
    totalDays: 1,
    reason: 'Family emergency - parent hospitalization',
    status: 'Approved',
    submittedDate: '2024-01-18T07:30:00Z',
    reviewedBy: 'Sarah Wilson',
    reviewedDate: '2024-01-18T08:00:00Z',
    comments: 'Approved immediately. Take care of your family.',
    attachments: ['emergency_medical_report.pdf']
  },
  {
    id: 'leave-req-008',
    employeeId: 'emp-008',
    employeeName: 'Henry Davis',
    employeeEmail: 'henry.davis@qhr.com',
    leaveType: 'Paternity',
    startDate: '2024-02-15',
    endDate: '2024-02-22',
    totalDays: 8,
    reason: 'Paternity leave for newborn child',
    status: 'Pending',
    submittedDate: '2024-02-01T12:00:00Z'
  },
  {
    id: 'leave-req-009',
    employeeId: 'emp-009',
    employeeName: 'Ivy Chen',
    employeeEmail: 'ivy.chen@qhr.com',
    leaveType: 'Sick',
    startDate: '2024-01-24',
    endDate: '2024-01-26',
    totalDays: 3,
    reason: 'COVID-19 symptoms and isolation',
    status: 'Approved',
    submittedDate: '2024-01-23T20:00:00Z',
    reviewedBy: 'Sarah Wilson',
    reviewedDate: '2024-01-24T08:30:00Z',
    comments: 'Approved. Please follow health guidelines and get well soon.',
    attachments: ['covid_test_result.pdf']
  },
  {
    id: 'leave-req-010',
    employeeId: 'emp-010',
    employeeName: 'Jack Wilson',
    employeeEmail: 'jack.wilson@qhr.com',
    leaveType: 'Annual',
    startDate: '2024-03-01',
    endDate: '2024-03-15',
    totalDays: 15,
    reason: 'Extended vacation to Europe',
    status: 'Pending',
    submittedDate: '2024-01-20T14:15:00Z'
  }
];

export const mockLeaveBalances: LeaveBalanceData[] = [
  {
    employeeId: 'emp-001',
    annualLeave: 20,
    sickLeave: 10,
    personalLeave: 5,
    maternityLeave: 90,
    paternityLeave: 15,
    emergencyLeave: 3,
    studyLeave: 5
  },
  {
    employeeId: 'emp-002',
    annualLeave: 18,
    sickLeave: 8,
    personalLeave: 4,
    maternityLeave: 90,
    paternityLeave: 15,
    emergencyLeave: 3,
    studyLeave: 5
  },
  {
    employeeId: 'emp-003',
    annualLeave: 22,
    sickLeave: 12,
    personalLeave: 6,
    maternityLeave: 90,
    paternityLeave: 15,
    emergencyLeave: 3,
    studyLeave: 5
  },
  {
    employeeId: 'emp-004',
    annualLeave: 15,
    sickLeave: 10,
    personalLeave: 3,
    maternityLeave: 90,
    paternityLeave: 15,
    emergencyLeave: 3,
    studyLeave: 5
  },
  {
    employeeId: 'emp-005',
    annualLeave: 25,
    sickLeave: 10,
    personalLeave: 5,
    maternityLeave: 90,
    paternityLeave: 15,
    emergencyLeave: 3,
    studyLeave: 5
  }
];

export const getLeaveBalanceByEmployeeId = (employeeId: string): LeaveBalanceData | undefined => {
  return mockLeaveBalances.find(balance => balance.employeeId === employeeId);
};

export const getLeaveRequestsByEmployeeId = (employeeId: string): LeaveRequest[] => {
  return mockLeaveRequests.filter(request => request.employeeId === employeeId);
};

export const getPendingLeaveRequests = (): LeaveRequest[] => {
  return mockLeaveRequests.filter(request => request.status === 'Pending');
};

export const getApprovedLeaveRequests = (): LeaveRequest[] => {
  return mockLeaveRequests.filter(request => request.status === 'Approved');
};

export const getRejectedLeaveRequests = (): LeaveRequest[] => {
  return mockLeaveRequests.filter(request => request.status === 'Rejected');
};

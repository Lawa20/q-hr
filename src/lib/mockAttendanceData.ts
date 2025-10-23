export interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  position: string;
  type: 'check-in' | 'check-out';
  timestamp: Date;
  location: {
    latitude: number;
    longitude: number;
    address: string;
    zoneStatus: 'Inside Zone' | 'Outside Zone';
  };
  faceRecognition: {
    confidence: number;
    verified: boolean;
  };
  isOffline: boolean;
  synced: boolean;
  notes?: string;
}

export interface AttendanceStats {
  totalEmployees: number;
  checkedInToday: number;
  lateArrivals: number;
  earlyDepartures: number;
  outsideZoneCount: number;
  averageCheckInTime: string;
  averageCheckOutTime: string;
}

// Mock employees data
const mockEmployees = [
  { id: 'emp-001', name: 'Alice Johnson', department: 'Engineering', position: 'Senior Developer' },
  { id: 'emp-002', name: 'Bob Smith', department: 'Marketing', position: 'Marketing Manager' },
  { id: 'emp-003', name: 'Charlie Brown', department: 'HR', position: 'HR Specialist' },
  { id: 'emp-004', name: 'Diana Prince', department: 'Finance', position: 'Financial Analyst' },
  { id: 'emp-005', name: 'Eve Adams', department: 'Engineering', position: 'Frontend Developer' },
  { id: 'emp-006', name: 'Frank Miller', department: 'Sales', position: 'Sales Representative' },
  { id: 'emp-007', name: 'Grace Lee', department: 'Operations', position: 'Operations Manager' },
  { id: 'emp-008', name: 'Henry Davis', department: 'Engineering', position: 'Backend Developer' },
  { id: 'emp-009', name: 'Ivy Chen', department: 'Design', position: 'UI/UX Designer' },
  { id: 'emp-010', name: 'Jack Wilson', department: 'Marketing', position: 'Content Creator' },
  { id: 'emp-011', name: 'Kate Taylor', department: 'Finance', position: 'Accountant' },
  { id: 'emp-012', name: 'Liam O\'Connor', department: 'Sales', position: 'Sales Manager' }
];

// Office location (center of geofence zone)
const officeLocation = {
  latitude: 37.7749,
  longitude: -122.4194,
  address: '123 Main St, San Francisco, CA 94105'
};

// Generate random location within or outside geofence
const generateLocation = (isInsideZone: boolean) => {
  const baseLat = officeLocation.latitude;
  const baseLng = officeLocation.longitude;
  
  // Offset for inside zone (smaller) vs outside zone (larger)
  const offset = isInsideZone ? 0.001 : 0.01;
  
  const latitude = baseLat + (Math.random() - 0.5) * offset;
  const longitude = baseLng + (Math.random() - 0.5) * offset;
  
  const address = isInsideZone 
    ? `${Math.floor(Math.random() * 100) + 100} Main St, San Francisco, CA 94105`
    : `${Math.floor(Math.random() * 100) + 200} Remote St, San Francisco, CA 94105`;
  
  return {
    latitude,
    longitude,
    address,
    zoneStatus: isInsideZone ? 'Inside Zone' as const : 'Outside Zone' as const
  };
};

// Generate attendance records for the last 30 days
export const generateMockAttendanceData = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const now = new Date();
  
  // Generate records for the last 30 days
  for (let day = 0; day < 30; day++) {
    const date = new Date(now);
    date.setDate(date.getDate() - day);
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    // Generate records for 8-10 random employees each day
    const employeesForDay = mockEmployees.slice(0, Math.floor(Math.random() * 3) + 8);
    
    employeesForDay.forEach(employee => {
      // 90% chance of being inside zone, 10% outside
      const isInsideZone = Math.random() > 0.1;
      
      // Check-in time (7:00 AM - 10:00 AM)
      const checkInTime = new Date(date);
      checkInTime.setHours(7 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 60), 0, 0);
      
      // Check-out time (4:00 PM - 8:00 PM)
      const checkOutTime = new Date(date);
      checkOutTime.setHours(16 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 60), 0, 0);
      
      // Generate check-in record
      const checkInRecord: AttendanceRecord = {
        id: `attendance-in-${employee.id}-${date.toISOString().split('T')[0]}`,
        employeeId: employee.id,
        employeeName: employee.name,
        department: employee.department,
        position: employee.position,
        type: 'check-in',
        timestamp: checkInTime,
        location: generateLocation(isInsideZone),
        faceRecognition: {
          confidence: Math.random() * 0.2 + 0.8, // 0.8 to 1.0
          verified: Math.random() > 0.05 // 95% success rate
        },
        isOffline: Math.random() > 0.9, // 10% offline
        synced: Math.random() > 0.1, // 90% synced
        notes: Math.random() > 0.8 ? 'Late arrival due to traffic' : undefined
      };
      
      // Generate check-out record
      const checkOutRecord: AttendanceRecord = {
        id: `attendance-out-${employee.id}-${date.toISOString().split('T')[0]}`,
        employeeId: employee.id,
        employeeName: employee.name,
        department: employee.department,
        position: employee.position,
        type: 'check-out',
        timestamp: checkOutTime,
        location: generateLocation(isInsideZone),
        faceRecognition: {
          confidence: Math.random() * 0.2 + 0.8,
          verified: Math.random() > 0.05
        },
        isOffline: Math.random() > 0.9,
        synced: Math.random() > 0.1,
        notes: Math.random() > 0.8 ? 'Early departure for appointment' : undefined
      };
      
      records.push(checkInRecord, checkOutRecord);
    });
  }
  
  // Sort by timestamp (newest first)
  return records.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
};

// Get attendance statistics
export const getAttendanceStats = (records: AttendanceRecord[]): AttendanceStats => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayRecords = records.filter(record => {
    const recordDate = new Date(record.timestamp);
    recordDate.setHours(0, 0, 0, 0);
    return recordDate.getTime() === today.getTime();
  });
  
  const checkedInToday = new Set(
    todayRecords
      .filter(record => record.type === 'check-in')
      .map(record => record.employeeId)
  ).size;
  
  const lateArrivals = todayRecords.filter(record => {
    if (record.type !== 'check-in') return false;
    const checkInHour = record.timestamp.getHours();
    return checkInHour > 9; // After 9 AM
  }).length;
  
  const earlyDepartures = todayRecords.filter(record => {
    if (record.type !== 'check-out') return false;
    const checkOutHour = record.timestamp.getHours();
    return checkOutHour < 17; // Before 5 PM
  }).length;
  
  const outsideZoneCount = todayRecords.filter(record => 
    record.location.zoneStatus === 'Outside Zone'
  ).length;
  
  const checkInTimes = todayRecords
    .filter(record => record.type === 'check-in')
    .map(record => record.timestamp.getHours() * 60 + record.timestamp.getMinutes());
  
  const checkOutTimes = todayRecords
    .filter(record => record.type === 'check-out')
    .map(record => record.timestamp.getHours() * 60 + record.timestamp.getMinutes());
  
  const averageCheckInTime = checkInTimes.length > 0 
    ? `${Math.floor(checkInTimes.reduce((a, b) => a + b, 0) / checkInTimes.length / 60)}:${String(Math.floor((checkInTimes.reduce((a, b) => a + b, 0) / checkInTimes.length) % 60)).padStart(2, '0')}`
    : 'N/A';
  
  const averageCheckOutTime = checkOutTimes.length > 0
    ? `${Math.floor(checkOutTimes.reduce((a, b) => a + b, 0) / checkOutTimes.length / 60)}:${String(Math.floor((checkOutTimes.reduce((a, b) => a + b, 0) / checkOutTimes.length) % 60)).padStart(2, '0')}`
    : 'N/A';
  
  return {
    totalEmployees: mockEmployees.length,
    checkedInToday,
    lateArrivals,
    earlyDepartures,
    outsideZoneCount,
    averageCheckInTime,
    averageCheckOutTime
  };
};

// Filter records by criteria
export const filterAttendanceRecords = (
  records: AttendanceRecord[],
  filters: {
    employeeName?: string;
    department?: string;
    dateRange?: { start: Date; end: Date };
    zoneStatus?: 'Inside Zone' | 'Outside Zone';
    type?: 'check-in' | 'check-out';
  }
): AttendanceRecord[] => {
  return records.filter(record => {
    if (filters.employeeName && !record.employeeName.toLowerCase().includes(filters.employeeName.toLowerCase())) {
      return false;
    }
    
    if (filters.department && record.department !== filters.department) {
      return false;
    }
    
    if (filters.dateRange) {
      const recordDate = new Date(record.timestamp);
      if (recordDate < filters.dateRange.start || recordDate > filters.dateRange.end) {
        return false;
      }
    }
    
    if (filters.zoneStatus && record.location.zoneStatus !== filters.zoneStatus) {
      return false;
    }
    
    if (filters.type && record.type !== filters.type) {
      return false;
    }
    
    return true;
  });
};

// Get unique departments
export const getDepartments = (records: AttendanceRecord[]): string[] => {
  return Array.from(new Set(records.map(record => record.department))).sort();
};

// Get unique employee names
export const getEmployeeNames = (records: AttendanceRecord[]): string[] => {
  return Array.from(new Set(records.map(record => record.employeeName))).sort();
};
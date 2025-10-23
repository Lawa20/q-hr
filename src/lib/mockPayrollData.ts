export interface PayrollRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  position: string;
  email: string;
  month: string;
  year: number;
  
  // Salary Components
  baseSalary: number;
  incentives: number;
  bonus: number;
  
  // Deductions
  lateArrivals: number;
  earlyDepartures: number;
  unpermittedOffDays: number;
  socialSecurityCut: number;
  
  // Calculated Fields
  totalDeductions: number;
  netSalary: number;
  
  // Additional Info
  workingDays: number;
  presentDays: number;
  absentDays: number;
  overtimeHours: number;
  overtimePay: number;
  
  // Status
  status: 'Draft' | 'Approved' | 'Paid' | 'Rejected';
  approvedBy?: string;
  approvedDate?: Date;
  paymentDate?: Date;
  notes?: string;
}

export interface PayrollSummary {
  totalEmployees: number;
  totalBaseSalary: number;
  totalIncentives: number;
  totalBonus: number;
  totalDeductions: number;
  totalNetSalary: number;
  averageSalary: number;
  highestSalary: number;
  lowestSalary: number;
}

export interface SalaryBreakdown {
  baseSalary: number;
  incentives: number;
  bonus: number;
  lateDeductions: number;
  earlyDeductions: number;
  unpermittedDeductions: number;
  socialSecurityDeduction: number;
  overtimePay: number;
  totalDeductions: number;
  netSalary: number;
}

// Mock employees data
const mockEmployees = [
  { id: 'emp-001', name: 'Alice Johnson', department: 'Engineering', position: 'Senior Developer', baseSalary: 8500 },
  { id: 'emp-002', name: 'Bob Smith', department: 'Marketing', position: 'Marketing Manager', baseSalary: 7500 },
  { id: 'emp-003', name: 'Charlie Brown', department: 'HR', position: 'HR Specialist', baseSalary: 6000 },
  { id: 'emp-004', name: 'Diana Prince', department: 'Finance', position: 'Financial Analyst', baseSalary: 7000 },
  { id: 'emp-005', name: 'Eve Adams', department: 'Engineering', position: 'Frontend Developer', baseSalary: 6500 },
  { id: 'emp-006', name: 'Frank Miller', department: 'Sales', position: 'Sales Representative', baseSalary: 5500 },
  { id: 'emp-007', name: 'Grace Lee', department: 'Operations', position: 'Operations Manager', baseSalary: 8000 },
  { id: 'emp-008', name: 'Henry Davis', department: 'Engineering', position: 'Backend Developer', baseSalary: 6800 },
  { id: 'emp-009', name: 'Ivy Chen', department: 'Design', position: 'UI/UX Designer', baseSalary: 6200 },
  { id: 'emp-010', name: 'Jack Wilson', department: 'Marketing', position: 'Content Creator', baseSalary: 5800 },
  { id: 'emp-011', name: 'Kate Taylor', department: 'Finance', position: 'Accountant', baseSalary: 6000 },
  { id: 'emp-012', name: 'Liam O\'Connor', department: 'Sales', position: 'Sales Manager', baseSalary: 7200 }
];

// Generate random salary components
const generateSalaryComponents = (baseSalary: number) => {
  // Incentives (0-15% of base salary)
  const incentives = Math.floor(baseSalary * (Math.random() * 0.15));
  
  // Bonus (0-20% of base salary, 70% chance)
  const bonus = Math.random() > 0.3 ? Math.floor(baseSalary * (Math.random() * 0.2)) : 0;
  
  // Late arrivals (0-5 times, $50 per occurrence)
  const lateArrivals = Math.floor(Math.random() * 6);
  const lateDeductions = lateArrivals * 50;
  
  // Early departures (0-3 times, $30 per occurrence)
  const earlyDepartures = Math.floor(Math.random() * 4);
  const earlyDeductions = earlyDepartures * 30;
  
  // Unpermitted off days (0-2 days, $100 per day)
  const unpermittedOffDays = Math.floor(Math.random() * 3);
  const unpermittedDeductions = unpermittedOffDays * 100;
  
  // Social security (8.5% of base salary)
  const socialSecurityCut = Math.floor(baseSalary * 0.085);
  
  // Overtime hours (0-20 hours, $25 per hour)
  const overtimeHours = Math.floor(Math.random() * 21);
  const overtimePay = overtimeHours * 25;
  
  const totalDeductions = lateDeductions + earlyDeductions + unpermittedDeductions + socialSecurityCut;
  const netSalary = baseSalary + incentives + bonus + overtimePay - totalDeductions;
  
  return {
    incentives,
    bonus,
    lateArrivals,
    earlyDepartures,
    unpermittedOffDays,
    socialSecurityCut,
    totalDeductions,
    netSalary,
    overtimeHours,
    overtimePay
  };
};

// Generate payroll records for the last 6 months
export const generateMockPayrollData = (): PayrollRecord[] => {
  const records: PayrollRecord[] = [];
  const currentDate = new Date();
  
  // Generate records for the last 6 months
  for (let monthOffset = 0; monthOffset < 6; monthOffset++) {
    const recordDate = new Date(currentDate);
    recordDate.setMonth(recordDate.getMonth() - monthOffset);
    
    const month = recordDate.toLocaleDateString('en-US', { month: 'long' });
    const year = recordDate.getFullYear();
    
    mockEmployees.forEach(employee => {
      const components = generateSalaryComponents(employee.baseSalary);
      
      // Random status distribution
      const statusOptions = ['Draft', 'Approved', 'Paid', 'Rejected'];
      const statusWeights = [0.1, 0.4, 0.4, 0.1]; // 10% draft, 40% approved, 40% paid, 10% rejected
      const random = Math.random();
      let cumulativeWeight = 0;
      let status = 'Draft';
      
      for (let i = 0; i < statusOptions.length; i++) {
        cumulativeWeight += statusWeights[i];
        if (random <= cumulativeWeight) {
          status = statusOptions[i];
          break;
        }
      }
      
      const record: PayrollRecord = {
        id: `payroll-${employee.id}-${year}-${month.toLowerCase().substring(0, 3)}`,
        employeeId: employee.id,
        employeeName: employee.name,
        department: employee.department,
        position: employee.position,
        email: `${employee.name.toLowerCase().replace(/\s+/g, '.')}@qhr.com`,
        month,
        year,
        
        baseSalary: employee.baseSalary,
        incentives: components.incentives,
        bonus: components.bonus,
        
        lateArrivals: components.lateArrivals,
        earlyDepartures: components.earlyDepartures,
        unpermittedOffDays: components.unpermittedOffDays,
        socialSecurityCut: components.socialSecurityCut,
        
        totalDeductions: components.totalDeductions,
        netSalary: components.netSalary,
        
        workingDays: 22, // Standard working days per month
        presentDays: 22 - components.unpermittedOffDays,
        absentDays: components.unpermittedOffDays,
        overtimeHours: components.overtimeHours,
        overtimePay: components.overtimePay,
        
        status: status as 'Draft' | 'Approved' | 'Paid' | 'Rejected',
        approvedBy: status === 'Approved' || status === 'Paid' ? 'HR Manager' : undefined,
        approvedDate: status === 'Approved' || status === 'Paid' ? new Date(recordDate.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000) : undefined,
        paymentDate: status === 'Paid' ? new Date(recordDate.getTime() + Math.random() * 15 * 24 * 60 * 60 * 1000) : undefined,
        notes: Math.random() > 0.8 ? 'Performance bonus included' : undefined
      };
      
      records.push(record);
    });
  }
  
  // Sort by year and month (newest first)
  return records.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthOrder.indexOf(b.month) - monthOrder.indexOf(a.month);
  });
};

// Calculate payroll summary
export const getPayrollSummary = (records: PayrollRecord[]): PayrollSummary => {
  const totalEmployees = new Set(records.map(r => r.employeeId)).size;
  const totalBaseSalary = records.reduce((sum, r) => sum + r.baseSalary, 0);
  const totalIncentives = records.reduce((sum, r) => sum + r.incentives, 0);
  const totalBonus = records.reduce((sum, r) => sum + r.bonus, 0);
  const totalDeductions = records.reduce((sum, r) => sum + r.totalDeductions, 0);
  const totalNetSalary = records.reduce((sum, r) => sum + r.netSalary, 0);
  
  const salaries = records.map(r => r.netSalary);
  const averageSalary = totalNetSalary / records.length;
  const highestSalary = Math.max(...salaries);
  const lowestSalary = Math.min(...salaries);
  
  return {
    totalEmployees,
    totalBaseSalary,
    totalIncentives,
    totalBonus,
    totalDeductions,
    totalNetSalary,
    averageSalary,
    highestSalary,
    lowestSalary
  };
};

// Get salary breakdown for an employee
export const getSalaryBreakdown = (record: PayrollRecord): SalaryBreakdown => {
  const lateDeductions = record.lateArrivals * 50;
  const earlyDeductions = record.earlyDepartures * 30;
  const unpermittedDeductions = record.unpermittedOffDays * 100;
  
  return {
    baseSalary: record.baseSalary,
    incentives: record.incentives,
    bonus: record.bonus,
    lateDeductions,
    earlyDeductions,
    unpermittedDeductions,
    socialSecurityDeduction: record.socialSecurityCut,
    overtimePay: record.overtimePay,
    totalDeductions: record.totalDeductions,
    netSalary: record.netSalary
  };
};

// Filter records by criteria
export const filterPayrollRecords = (
  records: PayrollRecord[],
  filters: {
    employeeName?: string;
    department?: string;
    month?: string;
    year?: number;
    status?: string;
    search?: string;
  }
): PayrollRecord[] => {
  return records.filter(record => {
    if (filters.employeeName && !record.employeeName.toLowerCase().includes(filters.employeeName.toLowerCase())) {
      return false;
    }
    
    if (filters.department && record.department !== filters.department) {
      return false;
    }
    
    if (filters.month && record.month !== filters.month) {
      return false;
    }
    
    if (filters.year && record.year !== filters.year) {
      return false;
    }
    
    if (filters.status && record.status !== filters.status) {
      return false;
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      if (!record.employeeName.toLowerCase().includes(searchTerm) &&
          !record.department.toLowerCase().includes(searchTerm) &&
          !record.position.toLowerCase().includes(searchTerm) &&
          !record.email.toLowerCase().includes(searchTerm)) {
        return false;
      }
    }
    
    return true;
  });
};

// Get unique departments
export const getDepartments = (records: PayrollRecord[]): string[] => {
  return Array.from(new Set(records.map(record => record.department))).sort();
};

// Get unique months
export const getMonths = (records: PayrollRecord[]): string[] => {
  return Array.from(new Set(records.map(record => record.month))).sort((a, b) => {
    const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthOrder.indexOf(a) - monthOrder.indexOf(b);
  });
};

// Get unique years
export const getYears = (records: PayrollRecord[]): number[] => {
  return Array.from(new Set(records.map(record => record.year))).sort((a, b) => b - a);
};

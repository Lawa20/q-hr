import { PayrollRecord, SalaryBreakdown } from './mockPayrollData';

// Salary calculation formula:
// Total Salary = Base Salary + Incentives + Bonus – (Late/Early Deductions + Social Security Cut + Unpermitted Off Days)

export interface SalaryCalculationParams {
  baseSalary: number;
  incentives: number;
  bonus: number;
  lateArrivals: number;
  earlyDepartures: number;
  unpermittedOffDays: number;
  overtimeHours: number;
}

export interface SalaryCalculationResult {
  baseSalary: number;
  incentives: number;
  bonus: number;
  overtimePay: number;
  lateDeductions: number;
  earlyDeductions: number;
  unpermittedDeductions: number;
  socialSecurityDeduction: number;
  totalDeductions: number;
  grossSalary: number;
  netSalary: number;
}

// Calculate salary based on the formula
export const calculateSalary = (params: SalaryCalculationParams): SalaryCalculationResult => {
  const {
    baseSalary,
    incentives,
    bonus,
    lateArrivals,
    earlyDepartures,
    unpermittedOffDays,
    overtimeHours
  } = params;

  // Overtime pay ($25 per hour)
  const overtimePay = overtimeHours * 25;

  // Deductions
  const lateDeductions = lateArrivals * 50; // $50 per late arrival
  const earlyDeductions = earlyDepartures * 30; // $30 per early departure
  const unpermittedDeductions = unpermittedOffDays * 100; // $100 per unpermitted off day
  const socialSecurityDeduction = Math.floor(baseSalary * 0.085); // 8.5% of base salary

  const totalDeductions = lateDeductions + earlyDeductions + unpermittedDeductions + socialSecurityDeduction;

  // Gross salary (before deductions)
  const grossSalary = baseSalary + incentives + bonus + overtimePay;

  // Net salary (after deductions)
  const netSalary = grossSalary - totalDeductions;

  return {
    baseSalary,
    incentives,
    bonus,
    overtimePay,
    lateDeductions,
    earlyDeductions,
    unpermittedDeductions,
    socialSecurityDeduction,
    totalDeductions,
    grossSalary,
    netSalary
  };
};

// Get salary breakdown for display
export const getSalaryBreakdown = (record: PayrollRecord): SalaryBreakdown => {
  const calculation = calculateSalary({
    baseSalary: record.baseSalary,
    incentives: record.incentives,
    bonus: record.bonus,
    lateArrivals: record.lateArrivals,
    earlyDepartures: record.earlyDepartures,
    unpermittedOffDays: record.unpermittedOffDays,
    overtimeHours: record.overtimeHours
  });

  return {
    baseSalary: calculation.baseSalary,
    incentives: calculation.incentives,
    bonus: calculation.bonus,
    lateDeductions: calculation.lateDeductions,
    earlyDeductions: calculation.earlyDeductions,
    unpermittedDeductions: calculation.unpermittedDeductions,
    socialSecurityDeduction: calculation.socialSecurityDeduction,
    overtimePay: calculation.overtimePay,
    totalDeductions: calculation.totalDeductions,
    netSalary: calculation.netSalary
  };
};

// Calculate monthly payroll summary
export const calculateMonthlyPayrollSummary = (records: PayrollRecord[]) => {
  const totalBaseSalary = records.reduce((sum, r) => sum + r.baseSalary, 0);
  const totalIncentives = records.reduce((sum, r) => sum + r.incentives, 0);
  const totalBonus = records.reduce((sum, r) => sum + r.bonus, 0);
  const totalOvertimePay = records.reduce((sum, r) => sum + r.overtimePay, 0);
  const totalDeductions = records.reduce((sum, r) => sum + r.totalDeductions, 0);
  const totalNetSalary = records.reduce((sum, r) => sum + r.netSalary, 0);

  return {
    totalBaseSalary,
    totalIncentives,
    totalBonus,
    totalOvertimePay,
    totalDeductions,
    totalNetSalary,
    averageSalary: totalNetSalary / records.length,
    employeeCount: records.length
  };
};

// Calculate department-wise payroll
export const calculateDepartmentPayroll = (records: PayrollRecord[]) => {
  const departmentMap = new Map<string, PayrollRecord[]>();
  
  records.forEach(record => {
    if (!departmentMap.has(record.department)) {
      departmentMap.set(record.department, []);
    }
    departmentMap.get(record.department)!.push(record);
  });

  const departmentSummary = Array.from(departmentMap.entries()).map(([department, deptRecords]) => {
    const summary = calculateMonthlyPayrollSummary(deptRecords);
    return {
      department,
      ...summary
    };
  });

  return departmentSummary.sort((a, b) => b.totalNetSalary - a.totalNetSalary);
};

// Calculate salary trends over months
export const calculateSalaryTrends = (records: PayrollRecord[]) => {
  const monthMap = new Map<string, PayrollRecord[]>();
  
  records.forEach(record => {
    const key = `${record.month} ${record.year}`;
    if (!monthMap.has(key)) {
      monthMap.set(key, []);
    }
    monthMap.get(key)!.push(record);
  });

  const trends = Array.from(monthMap.entries()).map(([monthYear, monthRecords]) => {
    const summary = calculateMonthlyPayrollSummary(monthRecords);
    return {
      monthYear,
      ...summary
    };
  });

  return trends.sort((a, b) => {
    const [monthA, yearA] = a.monthYear.split(' ');
    const [monthB, yearB] = b.monthYear.split(' ');
    const yearDiff = parseInt(yearB) - parseInt(yearA);
    if (yearDiff !== 0) return yearDiff;
    
    const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthOrder.indexOf(monthB) - monthOrder.indexOf(monthA);
  });
};

// Validate salary calculation
export const validateSalaryCalculation = (record: PayrollRecord): boolean => {
  const calculated = calculateSalary({
    baseSalary: record.baseSalary,
    incentives: record.incentives,
    bonus: record.bonus,
    lateArrivals: record.lateArrivals,
    earlyDepartures: record.earlyDepartures,
    unpermittedOffDays: record.unpermittedOffDays,
    overtimeHours: record.overtimeHours
  });

  const tolerance = 1; // Allow $1 tolerance for rounding differences
  return Math.abs(calculated.netSalary - record.netSalary) <= tolerance;
};

// Get salary statistics
export const getSalaryStatistics = (records: PayrollRecord[]) => {
  const salaries = records.map(r => r.netSalary);
  const sortedSalaries = salaries.sort((a, b) => a - b);
  
  const median = sortedSalaries.length % 2 === 0
    ? (sortedSalaries[sortedSalaries.length / 2 - 1] + sortedSalaries[sortedSalaries.length / 2]) / 2
    : sortedSalaries[Math.floor(sortedSalaries.length / 2)];

  const mean = salaries.reduce((sum, salary) => sum + salary, 0) / salaries.length;
  
  const variance = salaries.reduce((sum, salary) => sum + Math.pow(salary - mean, 2), 0) / salaries.length;
  const standardDeviation = Math.sqrt(variance);

  return {
    min: Math.min(...salaries),
    max: Math.max(...salaries),
    median,
    mean,
    standardDeviation,
    range: Math.max(...salaries) - Math.min(...salaries)
  };
};

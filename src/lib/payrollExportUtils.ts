import { PayrollRecord, PayrollSummary } from './mockPayrollData';

// Export payroll data to Excel (CSV format)
export const exportPayrollToExcel = (records: PayrollRecord[], filename: string = 'payroll_records') => {
  const headers = [
    'Employee Name',
    'Department',
    'Position',
    'Email',
    'Month',
    'Year',
    'Base Salary',
    'Incentives',
    'Bonus',
    'Overtime Pay',
    'Late Deductions',
    'Early Deductions',
    'Unpermitted Deductions',
    'Social Security',
    'Total Deductions',
    'Net Salary',
    'Working Days',
    'Present Days',
    'Absent Days',
    'Overtime Hours',
    'Status',
    'Approved By',
    'Approved Date',
    'Payment Date',
    'Notes'
  ];

  const csvContent = [
    headers.join(','),
    ...records.map(record => [
      `"${record.employeeName}"`,
      `"${record.department}"`,
      `"${record.position}"`,
      `"${record.email}"`,
      `"${record.month}"`,
      record.year,
      record.baseSalary,
      record.incentives,
      record.bonus,
      record.overtimePay,
      record.lateArrivals * 50,
      record.earlyDepartures * 30,
      record.unpermittedOffDays * 100,
      record.socialSecurityCut,
      record.totalDeductions,
      record.netSalary,
      record.workingDays,
      record.presentDays,
      record.absentDays,
      record.overtimeHours,
      `"${record.status}"`,
      `"${record.approvedBy || ''}"`,
      `"${record.approvedDate ? record.approvedDate.toLocaleDateString() : ''}"`,
      `"${record.paymentDate ? record.paymentDate.toLocaleDateString() : ''}"`,
      `"${record.notes || ''}"`
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Export payroll data to PDF
export const exportPayrollToPDF = (records: PayrollRecord[], summary: PayrollSummary, filename: string = 'payroll_report') => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Payroll Report</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
          color: #333;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #3b82f6;
          padding-bottom: 20px;
        }
        .header h1 {
          color: #3b82f6;
          margin: 0;
        }
        .header p {
          color: #666;
          margin: 5px 0 0 0;
        }
        .summary {
          background: #f8fafc;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 30px;
        }
        .summary h3 {
          margin: 0 0 15px 0;
          color: #1f2937;
        }
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
        }
        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 8px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        .summary-label {
          font-weight: 600;
          color: #374151;
        }
        .summary-value {
          color: #3b82f6;
          font-weight: 600;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #d1d5db;
          padding: 8px;
          text-align: left;
          font-size: 11px;
        }
        th {
          background-color: #f3f4f6;
          font-weight: 600;
          color: #374151;
        }
        tr:nth-child(even) {
          background-color: #f9fafb;
        }
        .status-paid {
          color: #059669;
          font-weight: 600;
        }
        .status-approved {
          color: #2563eb;
          font-weight: 600;
        }
        .status-draft {
          color: #d97706;
          font-weight: 600;
        }
        .status-rejected {
          color: #dc2626;
          font-weight: 600;
        }
        .currency {
          text-align: right;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          color: #6b7280;
          font-size: 12px;
        }
        @media print {
          body { margin: 0; }
          .header { page-break-after: avoid; }
          .summary { page-break-after: avoid; }
          table { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Q HR Payroll Report</h1>
        <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
      </div>

      <div class="summary">
        <h3>Payroll Summary</h3>
        <div class="summary-grid">
          <div class="summary-item">
            <span class="summary-label">Total Employees:</span>
            <span class="summary-value">${summary.totalEmployees}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Total Base Salary:</span>
            <span class="summary-value">${formatCurrency(summary.totalBaseSalary)}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Total Incentives:</span>
            <span class="summary-value">${formatCurrency(summary.totalIncentives)}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Total Bonus:</span>
            <span class="summary-value">${formatCurrency(summary.totalBonus)}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Total Deductions:</span>
            <span class="summary-value">${formatCurrency(summary.totalDeductions)}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Total Net Salary:</span>
            <span class="summary-value">${formatCurrency(summary.totalNetSalary)}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Average Salary:</span>
            <span class="summary-value">${formatCurrency(summary.averageSalary)}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Highest Salary:</span>
            <span class="summary-value">${formatCurrency(summary.highestSalary)}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Lowest Salary:</span>
            <span class="summary-value">${formatCurrency(summary.lowestSalary)}</span>
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Department</th>
            <th>Period</th>
            <th class="currency">Base Salary</th>
            <th class="currency">Incentives</th>
            <th class="currency">Bonus</th>
            <th class="currency">Overtime</th>
            <th class="currency">Deductions</th>
            <th class="currency">Net Salary</th>
            <th>Status</th>
            <th>Working Days</th>
            <th>Overtime Hours</th>
          </tr>
        </thead>
        <tbody>
          ${records.map(record => `
            <tr>
              <td>${record.employeeName}</td>
              <td>${record.department}</td>
              <td>${record.month} ${record.year}</td>
              <td class="currency">${formatCurrency(record.baseSalary)}</td>
              <td class="currency">${formatCurrency(record.incentives)}</td>
              <td class="currency">${formatCurrency(record.bonus)}</td>
              <td class="currency">${formatCurrency(record.overtimePay)}</td>
              <td class="currency">${formatCurrency(record.totalDeductions)}</td>
              <td class="currency">${formatCurrency(record.netSalary)}</td>
              <td class="status-${record.status.toLowerCase()}">${record.status}</td>
              <td>${record.workingDays}</td>
              <td>${record.overtimeHours}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="footer">
        <p>This report was generated by Q HR Management System</p>
        <p>For questions or support, contact your HR or Finance department</p>
        <p><strong>Confidential Document</strong> - For authorized personnel only</p>
      </div>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
  
  printWindow.onload = () => {
    printWindow.print();
    printWindow.close();
  };
};

// Generate payroll summary for export
export const generatePayrollSummary = (records: PayrollRecord[]): PayrollSummary => {
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

// Export department-wise payroll
export const exportDepartmentPayroll = (records: PayrollRecord[]) => {
  const departmentMap = new Map<string, PayrollRecord[]>();
  
  records.forEach(record => {
    if (!departmentMap.has(record.department)) {
      departmentMap.set(record.department, []);
    }
    departmentMap.get(record.department)!.push(record);
  });

  const departmentSummary = Array.from(departmentMap.entries()).map(([department, deptRecords]) => {
    const totalBaseSalary = deptRecords.reduce((sum, r) => sum + r.baseSalary, 0);
    const totalNetSalary = deptRecords.reduce((sum, r) => sum + r.netSalary, 0);
    const averageSalary = totalNetSalary / deptRecords.length;
    
    return {
      department,
      employeeCount: deptRecords.length,
      totalBaseSalary,
      totalNetSalary,
      averageSalary
    };
  });

  const headers = ['Department', 'Employee Count', 'Total Base Salary', 'Total Net Salary', 'Average Salary'];
  const csvContent = [
    headers.join(','),
    ...departmentSummary.map(dept => [
      `"${dept.department}"`,
      dept.employeeCount,
      dept.totalBaseSalary,
      dept.totalNetSalary,
      dept.averageSalary
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'department_payroll_summary.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

import { AttendanceRecord } from './mockAttendanceData';

// Export to Excel (CSV format for simplicity)
export const exportToExcel = (records: AttendanceRecord[], filename: string = 'attendance_records') => {
  const headers = [
    'Employee Name',
    'Department',
    'Position',
    'Type',
    'Date',
    'Time',
    'Address',
    'Latitude',
    'Longitude',
    'Zone Status',
    'Face Recognition Status',
    'Confidence %',
    'Connection Status',
    'Synced',
    'Notes'
  ];

  const csvContent = [
    headers.join(','),
    ...records.map(record => [
      `"${record.employeeName}"`,
      `"${record.department}"`,
      `"${record.position}"`,
      `"${record.type}"`,
      `"${record.timestamp.toLocaleDateString()}"`,
      `"${record.timestamp.toLocaleTimeString()}"`,
      `"${record.location.address}"`,
      record.location.latitude,
      record.location.longitude,
      `"${record.location.zoneStatus}"`,
      `"${record.faceRecognition.verified ? 'Verified' : 'Failed'}"`,
      (record.faceRecognition.confidence * 100).toFixed(1),
      `"${record.isOffline ? 'Offline' : 'Online'}"`,
      `"${record.synced ? 'Yes' : 'No'}"`,
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

// Export to PDF (using browser's print functionality)
export const exportToPDF = (records: AttendanceRecord[], filename: string = 'attendance_records') => {
  // Create a new window for printing
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Attendance Records Report</title>
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
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .summary h3 {
          margin: 0 0 10px 0;
          color: #1f2937;
        }
        .summary-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 10px;
        }
        .summary-item {
          display: flex;
          justify-content: space-between;
          padding: 5px 0;
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
          font-size: 12px;
        }
        th {
          background-color: #f3f4f6;
          font-weight: 600;
          color: #374151;
        }
        tr:nth-child(even) {
          background-color: #f9fafb;
        }
        .status-verified {
          color: #059669;
          font-weight: 600;
        }
        .status-failed {
          color: #dc2626;
          font-weight: 600;
        }
        .status-inside {
          color: #059669;
          font-weight: 600;
        }
        .status-outside {
          color: #dc2626;
          font-weight: 600;
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
          table { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Q HR Attendance Report</h1>
        <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
      </div>

      <div class="summary">
        <h3>Report Summary</h3>
        <div class="summary-grid">
          <div class="summary-item">
            <span class="summary-label">Total Records:</span>
            <span class="summary-value">${records.length}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Check-ins:</span>
            <span class="summary-value">${records.filter(r => r.type === 'check-in').length}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Check-outs:</span>
            <span class="summary-value">${records.filter(r => r.type === 'check-out').length}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Inside Zone:</span>
            <span class="summary-value">${records.filter(r => r.location.zoneStatus === 'Inside Zone').length}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Outside Zone:</span>
            <span class="summary-value">${records.filter(r => r.location.zoneStatus === 'Outside Zone').length}</span>
          </div>
          <div class="summary-item">
            <span class="summary-label">Verified:</span>
            <span class="summary-value">${records.filter(r => r.faceRecognition.verified).length}</span>
          </div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Department</th>
            <th>Type</th>
            <th>Date</th>
            <th>Time</th>
            <th>Address</th>
            <th>Zone Status</th>
            <th>Face Recognition</th>
            <th>Confidence</th>
            <th>Connection</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          ${records.map(record => `
            <tr>
              <td>${record.employeeName}</td>
              <td>${record.department}</td>
              <td>${record.type === 'check-in' ? 'Check In' : 'Check Out'}</td>
              <td>${record.timestamp.toLocaleDateString()}</td>
              <td>${record.timestamp.toLocaleTimeString()}</td>
              <td>${record.location.address}</td>
              <td class="status-${record.location.zoneStatus === 'Inside Zone' ? 'inside' : 'outside'}">
                ${record.location.zoneStatus}
              </td>
              <td class="status-${record.faceRecognition.verified ? 'verified' : 'failed'}">
                ${record.faceRecognition.verified ? 'Verified' : 'Failed'}
              </td>
              <td>${(record.faceRecognition.confidence * 100).toFixed(1)}%</td>
              <td>${record.isOffline ? 'Offline' : 'Online'}</td>
              <td>${record.notes || '-'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div class="footer">
        <p>This report was generated by Q HR Management System</p>
        <p>For questions or support, contact your HR department</p>
      </div>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
  
  // Wait for content to load, then trigger print
  printWindow.onload = () => {
    printWindow.print();
    printWindow.close();
  };
};

// Get attendance statistics for export
export const getAttendanceStats = (records: AttendanceRecord[]) => {
  const totalRecords = records.length;
  const checkIns = records.filter(r => r.type === 'check-in').length;
  const checkOuts = records.filter(r => r.type === 'check-out').length;
  const insideZone = records.filter(r => r.location.zoneStatus === 'Inside Zone').length;
  const outsideZone = records.filter(r => r.location.zoneStatus === 'Outside Zone').length;
  const verified = records.filter(r => r.faceRecognition.verified).length;
  const failed = records.filter(r => !r.faceRecognition.verified).length;
  const online = records.filter(r => !r.isOffline).length;
  const offline = records.filter(r => r.isOffline).length;

  return {
    totalRecords,
    checkIns,
    checkOuts,
    insideZone,
    outsideZone,
    verified,
    failed,
    online,
    offline
  };
};

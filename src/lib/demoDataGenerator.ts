import { mockUsers, mockGeofenceZones, type MockCheckInOut, type MockNotification } from './mockAttendanceData';

// Generate comprehensive demo data for the face recognition + GPS system
export const generateDemoData = () => {
  const now = new Date();
  const demoCheckIns: MockCheckInOut[] = [];
  const demoNotifications: MockNotification[] = [];

  // Generate check-ins for the last 30 days
  for (let day = 0; day < 30; day++) {
    const date = new Date(now);
    date.setDate(date.getDate() - day);
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    // Generate check-ins for 3-5 random employees each day
    const employeesForDay = mockUsers.slice(0, Math.floor(Math.random() * 3) + 3);
    
    employeesForDay.forEach(employee => {
      // Morning check-in (8:00 AM - 10:00 AM)
      const checkInTime = new Date(date);
      checkInTime.setHours(8 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 60), 0, 0);
      
      // Evening check-out (4:00 PM - 7:00 PM)
      const checkOutTime = new Date(date);
      checkOutTime.setHours(16 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 60), 0, 0);
      
      // Random location (90% inside geofence, 10% outside)
      const isInsideGeofence = Math.random() > 0.1;
      const baseLocation = mockGeofenceZones[0].center;
      const offset = isInsideGeofence ? 0.0005 : 0.005; // Larger offset for outside
      
      const location = {
        latitude: baseLocation.lat + (Math.random() - 0.5) * offset,
        longitude: baseLocation.lng + (Math.random() - 0.5) * offset,
        address: isInsideGeofence 
          ? '123 Main St, San Francisco, CA 94105'
          : '456 Remote St, San Francisco, CA 94105'
      };
      
      // Check-in record
      const checkInRecord: MockCheckInOut = {
        id: `checkin-${date.getTime()}-${employee.id}`,
        userId: employee.id,
        type: 'check-in',
        timestamp: checkInTime,
        location,
        faceRecognition: {
          confidence: Math.random() * 0.2 + 0.8, // 0.8 to 1.0
          verified: Math.random() > 0.05 // 95% verified
        },
        isOffline: Math.random() > 0.9, // 10% offline
        synced: Math.random() > 0.05, // 95% synced
        geofenceStatus: isInsideGeofence ? 'inside' : 'outside'
      };
      
      // Check-out record
      const checkOutRecord: MockCheckInOut = {
        id: `checkout-${date.getTime()}-${employee.id}`,
        userId: employee.id,
        type: 'check-out',
        timestamp: checkOutTime,
        location: {
          ...location,
          latitude: location.latitude + (Math.random() - 0.5) * 0.0001,
          longitude: location.longitude + (Math.random() - 0.5) * 0.0001
        },
        faceRecognition: {
          confidence: Math.random() * 0.2 + 0.8,
          verified: Math.random() > 0.05
        },
        isOffline: Math.random() > 0.9,
        synced: Math.random() > 0.05,
        geofenceStatus: isInsideGeofence ? 'inside' : 'outside'
      };
      
      demoCheckIns.push(checkInRecord, checkOutRecord);
      
      // Generate notifications for outside geofence check-ins
      if (!isInsideGeofence) {
        demoNotifications.push({
          id: `notif-geofence-${date.getTime()}-${employee.id}`,
          type: 'geofence_alert',
          title: 'Employee Checked In Outside Geofence',
          message: `${employee.name} checked in at an unauthorized location. GPS coordinates: ${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`,
          timestamp: checkInTime,
          read: Math.random() > 0.3, // 70% read
          priority: 'high'
        });
      }
      
      // Generate face recognition failure notifications (5% chance)
      if (Math.random() < 0.05) {
        demoNotifications.push({
          id: `notif-face-${date.getTime()}-${employee.id}`,
          type: 'face_recognition_failed',
          title: 'Face Recognition Failed',
          message: `Unable to verify ${employee.name}'s identity during check-in. Manual verification required.`,
          timestamp: checkInTime,
          read: Math.random() > 0.4, // 60% read
          priority: 'medium'
        });
      }
    });
  }
  
  // Generate offline sync notifications
  for (let i = 0; i < 8; i++) {
    const time = new Date(now);
    time.setHours(time.getHours() - i * 3);
    
    demoNotifications.push({
      id: `notif-sync-${i}`,
      type: 'offline_sync',
      title: 'Offline Data Synced',
      message: `${Math.floor(Math.random() * 5) + 1} offline check-in records have been synchronized successfully.`,
      timestamp: time,
      read: i > 3, // Recent ones unread
      priority: 'low'
    });
  }
  
  return {
    checkIns: demoCheckIns.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
    notifications: demoNotifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()),
    stats: {
      totalCheckIns: demoCheckIns.length,
      outsideGeofence: demoCheckIns.filter(c => c.geofenceStatus === 'outside').length,
      faceRecognitionFailures: demoCheckIns.filter(c => !c.faceRecognition.verified).length,
      offlineRecords: demoCheckIns.filter(c => c.isOffline).length,
      averageConfidence: demoCheckIns.reduce((sum, c) => sum + c.faceRecognition.confidence, 0) / demoCheckIns.length
    }
  };
};

// Initialize demo data in localStorage
export const initializeDemoData = () => {
  if (typeof window === 'undefined') return;
  
  const demoData = generateDemoData();
  
  // Store in localStorage for the demo
  localStorage.setItem('demoCheckInHistory', JSON.stringify(demoData.checkIns));
  localStorage.setItem('demoNotifications', JSON.stringify(demoData.notifications));
  localStorage.setItem('demoStats', JSON.stringify(demoData.stats));
  
  console.log('🎯 Demo data initialized:', demoData.stats);
  return demoData;
};

// Get demo data from localStorage
export const getDemoData = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const checkIns = JSON.parse(localStorage.getItem('demoCheckInHistory') || '[]');
    const notifications = JSON.parse(localStorage.getItem('demoNotifications') || '[]');
    const stats = JSON.parse(localStorage.getItem('demoStats') || '{}');
    
    return { checkIns, notifications, stats };
  } catch (error) {
    console.error('Error loading demo data:', error);
    return null;
  }
};

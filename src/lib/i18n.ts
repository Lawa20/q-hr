export type Language = 'en' | 'ar' | 'ku';

export interface Translations {
  // Navigation
  home: string;
  selfService: string;
  employees: string;
  departments: string;
  teams: string;
  leaveTracker: string;
  attendance: string;
  payroll: string;
  documents: string;
  inbox: string;
  more: string;
  
  // Common
  loading: string;
  search: string;
  filter: string;
  export: string;
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  view: string;
  approve: string;
  reject: string;
  submit: string;
  close: string;
  
  // Dashboard
  dashboard: string;
  welcomeBack: string;
  todaysAttendance: string;
  monthlySalary: string;
  pendingRequests: string;
  notifications: string;
  
  // Leave Tracker
  requestLeave: string;
  leaveBalance: string;
  totalRequests: string;
  pending: string;
  approved: string;
  rejected: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
  
  // Attendance
  checkIn: string;
  checkOut: string;
  location: string;
  time: string;
  employee: string;
  department: string;
  zoneStatus: string;
  
  // Payroll
  salary: string;
  baseSalary: string;
  incentives: string;
  bonus: string;
  deductions: string;
  totalSalary: string;
  
  // Documents
  uploadDocument: string;
  documentName: string;
  documentType: string;
  uploadDate: string;
  fileSize: string;
  
  // Messaging
  messages: string;
  newMessage: string;
  send: string;
  reply: string;
  unread: string;
  
  // Roles
  admin: string;
  hr: string;
  manager: string;
  supervisor: string;
  finance: string;
  employee: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    home: 'Home',
    selfService: 'Self Service',
    employees: 'Employees',
    departments: 'Departments',
    teams: 'Teams',
    leaveTracker: 'Leave Tracker',
    attendance: 'Attendance',
    payroll: 'Payroll',
    documents: 'Documents',
    inbox: 'Inbox',
    more: 'More',
    
    // Common
    loading: 'Loading...',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    approve: 'Approve',
    reject: 'Reject',
    submit: 'Submit',
    close: 'Close',
    
    // Dashboard
    dashboard: 'Dashboard',
    welcomeBack: 'Welcome Back',
    todaysAttendance: "Today's Attendance",
    monthlySalary: 'Monthly Salary',
    pendingRequests: 'Pending Requests',
    notifications: 'Notifications',
    
    // Leave Tracker
    requestLeave: 'Request Leave',
    leaveBalance: 'Leave Balance',
    totalRequests: 'Total Requests',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    leaveType: 'Leave Type',
    startDate: 'Start Date',
    endDate: 'End Date',
    reason: 'Reason',
    status: 'Status',
    
    // Attendance
    checkIn: 'Check In',
    checkOut: 'Check Out',
    location: 'Location',
    time: 'Time',
    employee: 'Employee',
    department: 'Department',
    zoneStatus: 'Zone Status',
    
    // Payroll
    salary: 'Salary',
    baseSalary: 'Base Salary',
    incentives: 'Incentives',
    bonus: 'Bonus',
    deductions: 'Deductions',
    totalSalary: 'Total Salary',
    
    // Documents
    uploadDocument: 'Upload Document',
    documentName: 'Document Name',
    documentType: 'Document Type',
    uploadDate: 'Upload Date',
    fileSize: 'File Size',
    
    // Messaging
    messages: 'Messages',
    newMessage: 'New Message',
    send: 'Send',
    reply: 'Reply',
    unread: 'Unread',
    
    // Roles
    admin: 'Admin',
    hr: 'HR',
    manager: 'Manager',
    supervisor: 'Supervisor',
    finance: 'Finance',
    employee: 'Employee',
  },
  
  ar: {
    // Navigation
    home: 'الرئيسية',
    selfService: 'الخدمة الذاتية',
    employees: 'الموظفين',
    departments: 'الأقسام',
    teams: 'الفرق',
    leaveTracker: 'تتبع الإجازات',
    attendance: 'الحضور',
    payroll: 'كشف الرواتب',
    documents: 'المستندات',
    inbox: 'صندوق الوارد',
    more: 'المزيد',
    
    // Common
    loading: 'جاري التحميل...',
    search: 'بحث',
    filter: 'تصفية',
    export: 'تصدير',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    view: 'عرض',
    approve: 'موافقة',
    reject: 'رفض',
    submit: 'إرسال',
    close: 'إغلاق',
    
    // Dashboard
    dashboard: 'لوحة التحكم',
    welcomeBack: 'مرحباً بعودتك',
    todaysAttendance: 'حضور اليوم',
    monthlySalary: 'الراتب الشهري',
    pendingRequests: 'الطلبات المعلقة',
    notifications: 'الإشعارات',
    
    // Leave Tracker
    requestLeave: 'طلب إجازة',
    leaveBalance: 'رصيد الإجازات',
    totalRequests: 'إجمالي الطلبات',
    pending: 'معلق',
    approved: 'موافق عليه',
    rejected: 'مرفوض',
    leaveType: 'نوع الإجازة',
    startDate: 'تاريخ البداية',
    endDate: 'تاريخ النهاية',
    reason: 'السبب',
    status: 'الحالة',
    
    // Attendance
    checkIn: 'تسجيل الدخول',
    checkOut: 'تسجيل الخروج',
    location: 'الموقع',
    time: 'الوقت',
    employee: 'الموظف',
    department: 'القسم',
    zoneStatus: 'حالة المنطقة',
    
    // Payroll
    salary: 'الراتب',
    baseSalary: 'الراتب الأساسي',
    incentives: 'الحوافز',
    bonus: 'المكافأة',
    deductions: 'الخصومات',
    totalSalary: 'إجمالي الراتب',
    
    // Documents
    uploadDocument: 'رفع مستند',
    documentName: 'اسم المستند',
    documentType: 'نوع المستند',
    uploadDate: 'تاريخ الرفع',
    fileSize: 'حجم الملف',
    
    // Messaging
    messages: 'الرسائل',
    newMessage: 'رسالة جديدة',
    send: 'إرسال',
    reply: 'رد',
    unread: 'غير مقروء',
    
    // Roles
    admin: 'مدير',
    hr: 'موارد بشرية',
    manager: 'مدير',
    supervisor: 'مشرف',
    finance: 'مالية',
    employee: 'موظف',
  },
  
  ku: {
    // Navigation
    home: 'سەرەکی',
    selfService: 'خزمەتگوزاری خۆکار',
    employees: 'کارمەندان',
    departments: 'بەشەکان',
    teams: 'تیمەکان',
    leaveTracker: 'بەدواداچوونی مۆڵەت',
    attendance: 'حاضربوون',
    payroll: 'پێرستی مووچە',
    documents: 'بەڵگەکان',
    inbox: 'نامەکان',
    more: 'زیاتر',
    
    // Common
    loading: 'بارکردن...',
    search: 'گەڕان',
    filter: 'پاڵاوتن',
    export: 'دەرکردن',
    save: 'پاشەکەوت',
    cancel: 'هەڵوەشاندنەوە',
    delete: 'سڕینەوە',
    edit: 'دەستکاری',
    view: 'بینین',
    approve: 'پەسەندکردن',
    reject: 'ڕەتکردنەوە',
    submit: 'ناردن',
    close: 'داخستن',
    
    // Dashboard
    dashboard: 'داشبۆرد',
    welcomeBack: 'بەخێربێیتەوە',
    todaysAttendance: 'حاضربوونی ئەمڕۆ',
    monthlySalary: 'مووچەی مانگانە',
    pendingRequests: 'داواکاریە چاوەڕوانەکان',
    notifications: 'ئاگادارکردنەوەکان',
    
    // Leave Tracker
    requestLeave: 'داواکاری مۆڵەت',
    leaveBalance: 'بەرنامەی مۆڵەت',
    totalRequests: 'کۆی داواکاریەکان',
    pending: 'چاوەڕوان',
    approved: 'پەسەندکراو',
    rejected: 'ڕەتکراوەتەوە',
    leaveType: 'جۆری مۆڵەت',
    startDate: 'بەرواری دەستپێک',
    endDate: 'بەرواری کۆتایی',
    reason: 'هۆکار',
    status: 'دۆخ',
    
    // Attendance
    checkIn: 'تۆمارکردنی چوونەژوورەوە',
    checkOut: 'تۆمارکردنی دەرچوون',
    location: 'شوێن',
    time: 'کات',
    employee: 'کارمەند',
    department: 'بەش',
    zoneStatus: 'دۆخی ناوچە',
    
    // Payroll
    salary: 'مووچە',
    baseSalary: 'مووچەی سەرەکی',
    incentives: 'پاداشتەکان',
    bonus: 'بەخشین',
    deductions: 'کەمکردنەوەکان',
    totalSalary: 'کۆی مووچە',
    
    // Documents
    uploadDocument: 'بارکردنی بەڵگە',
    documentName: 'ناوی بەڵگە',
    documentType: 'جۆری بەڵگە',
    uploadDate: 'بەرواری بارکردن',
    fileSize: 'قەبارەی فایل',
    
    // Messaging
    messages: 'نامەکان',
    newMessage: 'نامەی نوێ',
    send: 'ناردن',
    reply: 'وەڵام',
    unread: 'نەخوێنراوە',
    
    // Roles
    admin: 'بەڕێوەبەر',
    hr: 'سەرچاوەکانی مرۆڤ',
    manager: 'بەڕێوەبەر',
    supervisor: 'سەرپەرشتیار',
    finance: 'دارایی',
    employee: 'کارمەند',
  },
};

export const getLanguageDirection = (language: Language): 'ltr' | 'rtl' => {
  return language === 'ar' || language === 'ku' ? 'rtl' : 'ltr';
};

export const getLanguageName = (language: Language): string => {
  const names = {
    en: 'English',
    ar: 'العربية',
    ku: 'کوردی',
  };
  return names[language];
};

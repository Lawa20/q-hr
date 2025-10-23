export interface Document {
  id: string;
  name: string;
  type: 'contract' | 'id' | 'certificate' | 'policy' | 'report' | 'other';
  category: string;
  size: number; // in bytes
  format: string; // file extension
  uploadDate: Date;
  lastModified: Date;
  uploadedBy: string;
  employeeId: string;
  employeeName: string;
  department: string;
  description?: string;
  tags: string[];
  isPublic: boolean;
  downloadCount: number;
  fileUrl?: string; // mock file URL
  thumbnailUrl?: string; // for image previews
}

export interface DocumentCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface UploadProgress {
  fileId: string;
  fileName: string;
  progress: number;
  status: 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
}

// Document categories
export const documentCategories: DocumentCategory[] = [
  {
    id: 'contracts',
    name: 'Contracts',
    description: 'Employment contracts and agreements',
    icon: '📄',
    color: 'blue'
  },
  {
    id: 'ids',
    name: 'ID Documents',
    description: 'Passports, driver licenses, and identification',
    icon: '🆔',
    color: 'green'
  },
  {
    id: 'certificates',
    name: 'Certificates',
    description: 'Professional certificates and qualifications',
    icon: '🏆',
    color: 'yellow'
  },
  {
    id: 'policies',
    name: 'Policies',
    description: 'Company policies and procedures',
    icon: '📋',
    color: 'purple'
  },
  {
    id: 'reports',
    name: 'Reports',
    description: 'Performance and evaluation reports',
    icon: '📊',
    color: 'indigo'
  },
  {
    id: 'other',
    name: 'Other',
    description: 'Miscellaneous documents',
    icon: '📁',
    color: 'gray'
  }
];

// Mock employees for document ownership
const mockEmployees = [
  { id: 'emp-001', name: 'Alice Johnson', department: 'Engineering' },
  { id: 'emp-002', name: 'Bob Smith', department: 'Marketing' },
  { id: 'emp-003', name: 'Charlie Brown', department: 'HR' },
  { id: 'emp-004', name: 'Diana Prince', department: 'Finance' },
  { id: 'emp-005', name: 'Eve Adams', department: 'Engineering' },
  { id: 'emp-006', name: 'Frank Miller', department: 'Sales' },
  { id: 'emp-007', name: 'Grace Lee', department: 'Operations' },
  { id: 'emp-008', name: 'Henry Davis', department: 'Engineering' },
  { id: 'emp-009', name: 'Ivy Chen', department: 'Design' },
  { id: 'emp-010', name: 'Jack Wilson', department: 'Marketing' }
];

// Generate mock documents
export const generateMockDocuments = (): Document[] => {
  const documents: Document[] = [];
  const documentTypes = ['contract', 'id', 'certificate', 'policy', 'report', 'other'] as const;
  const fileFormats = ['pdf', 'doc', 'docx', 'jpg', 'png', 'txt'];
  
  // Generate documents for each employee
  mockEmployees.forEach(employee => {
    // Generate 3-5 documents per employee
    const docCount = Math.floor(Math.random() * 3) + 3;
    
    for (let i = 0; i < docCount; i++) {
      const type = documentTypes[Math.floor(Math.random() * documentTypes.length)];
      const format = fileFormats[Math.floor(Math.random() * fileFormats.length)];
      const size = Math.floor(Math.random() * 5000000) + 100000; // 100KB to 5MB
      
      const documentNames = {
        contract: ['Employment Contract', 'Non-Disclosure Agreement', 'Service Agreement', 'Consulting Contract'],
        id: ['Passport Copy', 'Driver License', 'National ID', 'Work Permit'],
        certificate: ['Degree Certificate', 'Professional Certification', 'Training Certificate', 'Award Certificate'],
        policy: ['Employee Handbook', 'Code of Conduct', 'Safety Policy', 'Remote Work Policy'],
        report: ['Performance Review', 'Annual Report', 'Project Report', 'Financial Report'],
        other: ['Resume', 'Cover Letter', 'Reference Letter', 'Medical Certificate']
      };
      
      const name = documentNames[type][Math.floor(Math.random() * documentNames[type].length)];
      const uploadDate = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000); // Last 90 days
      const lastModified = new Date(uploadDate.getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000);
      
      const document: Document = {
        id: `document-${employee.id}-${i}-${type}`,
        name: `${name} - ${employee.name}`,
        type,
        category: documentCategories.find(cat => cat.id === type)?.name || 'Other',
        size,
        format: format.toUpperCase(),
        uploadDate,
        lastModified,
        uploadedBy: employee.name,
        employeeId: employee.id,
        employeeName: employee.name,
        department: employee.department,
        description: `Document uploaded by ${employee.name} from ${employee.department} department`,
        tags: generateTags(type),
        isPublic: Math.random() > 0.3, // 70% public
        downloadCount: Math.floor(Math.random() * 20),
        fileUrl: `/mock-files/${name.toLowerCase().replace(/\s+/g, '-')}.${format}`,
        thumbnailUrl: format === 'jpg' || format === 'png' ? `/mock-thumbnails/${name.toLowerCase().replace(/\s+/g, '-')}.${format}` : undefined
      };
      
      documents.push(document);
    }
  });
  
  // Sort by upload date (newest first)
  return documents.sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime());
};

// Generate tags based on document type
const generateTags = (type: string): string[] => {
  const tagMap: Record<string, string[]> = {
    contract: ['legal', 'employment', 'agreement'],
    id: ['identification', 'personal', 'official'],
    certificate: ['qualification', 'achievement', 'professional'],
    policy: ['company', 'guidelines', 'procedures'],
    report: ['analysis', 'performance', 'evaluation'],
    other: ['miscellaneous', 'personal', 'reference']
  };
  
  return tagMap[type] || ['document'];
};

// Get document statistics
export const getDocumentStats = (documents: Document[]) => {
  const totalDocuments = documents.length;
  const totalSize = documents.reduce((sum, doc) => sum + doc.size, 0);
  const typeCounts = documents.reduce((counts, doc) => {
    counts[doc.type] = (counts[doc.type] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
  
  const formatCounts = documents.reduce((counts, doc) => {
    counts[doc.format] = (counts[doc.format] || 0) + 1;
    return counts;
  }, {} as Record<string, number>);
  
  const totalDownloads = documents.reduce((sum, doc) => sum + doc.downloadCount, 0);
  const averageSize = totalSize / totalDocuments;
  
  return {
    totalDocuments,
    totalSize,
    totalDownloads,
    averageSize,
    typeCounts,
    formatCounts
  };
};

// Filter documents by criteria
export const filterDocuments = (
  documents: Document[],
  filters: {
    type?: string;
    category?: string;
    format?: string;
    department?: string;
    search?: string;
    isPublic?: boolean;
    dateRange?: { start: Date; end: Date };
  }
): Document[] => {
  return documents.filter(document => {
    if (filters.type && document.type !== filters.type) {
      return false;
    }
    
    if (filters.category && document.category !== filters.category) {
      return false;
    }
    
    if (filters.format && document.format !== filters.format) {
      return false;
    }
    
    if (filters.department && document.department !== filters.department) {
      return false;
    }
    
    if (filters.isPublic !== undefined && document.isPublic !== filters.isPublic) {
      return false;
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      if (!document.name.toLowerCase().includes(searchTerm) &&
          !document.description?.toLowerCase().includes(searchTerm) &&
          !document.tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
        return false;
      }
    }
    
    if (filters.dateRange) {
      const docDate = new Date(document.uploadDate);
      if (docDate < filters.dateRange.start || docDate > filters.dateRange.end) {
        return false;
      }
    }
    
    return true;
  });
};

// Get unique departments
export const getDepartments = (documents: Document[]): string[] => {
  return Array.from(new Set(documents.map(doc => doc.department))).sort();
};

// Get unique formats
export const getFormats = (documents: Document[]): string[] => {
  return Array.from(new Set(documents.map(doc => doc.format))).sort();
};

// Format file size
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Get file icon based on format
export const getFileIcon = (format: string): string => {
  const iconMap: Record<string, string> = {
    'PDF': '📄',
    'DOC': '📝',
    'DOCX': '📝',
    'JPG': '🖼️',
    'PNG': '🖼️',
    'TXT': '📄',
    'XLS': '📊',
    'XLSX': '📊',
    'PPT': '📊',
    'PPTX': '📊'
  };
  
  return iconMap[format] || '📁';
};

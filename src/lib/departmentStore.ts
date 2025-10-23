// Department management store
export interface Department {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Initialize with default departments
let departments: Department[] = [
  {
    id: 'dept-001',
    name: 'Engineering',
    description: 'Software development and technical teams',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'dept-002',
    name: 'Marketing',
    description: 'Brand management and marketing campaigns',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'dept-003',
    name: 'Sales',
    description: 'Sales and business development',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'dept-004',
    name: 'HR',
    description: 'Human resources and talent management',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'dept-005',
    name: 'Finance',
    description: 'Financial planning and accounting',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'dept-006',
    name: 'Operations',
    description: 'Business operations and logistics',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'dept-007',
    name: 'Design',
    description: 'Product and graphic design',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: 'dept-008',
    name: 'Customer Support',
    description: 'Customer service and support',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

export function getAllDepartments(): Department[] {
  return [...departments];
}

export function getDepartmentById(id: string): Department | undefined {
  return departments.find(dept => dept.id === id);
}

export function getDepartmentByName(name: string): Department | undefined {
  return departments.find(dept => dept.name.toLowerCase() === name.toLowerCase());
}

export function addDepartment(departmentData: Omit<Department, 'id' | 'createdAt' | 'updatedAt'>): Department {
  const newDepartment: Department = {
    ...departmentData,
    id: `dept-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  departments.push(newDepartment);
  return newDepartment;
}

export function updateDepartment(id: string, updatedData: Partial<Omit<Department, 'id' | 'createdAt' | 'updatedAt'>>): Department | null {
  const index = departments.findIndex(dept => dept.id === id);
  if (index === -1) return null;
  
  departments[index] = {
    ...departments[index],
    ...updatedData,
    updatedAt: new Date()
  };
  
  return departments[index];
}

export function deleteDepartment(id: string): boolean {
  const index = departments.findIndex(dept => dept.id === id);
  if (index === -1) return false;
  
  departments.splice(index, 1);
  return true;
}


import { prisma } from './prisma';

export interface Employee {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
  phone?: string;
  address?: string;
  position?: string;
  department?: {
    id: string;
    name: string;
    description?: string;
  };
  salary?: number;
  hireDate?: Date;
  isActive: boolean;
  supervisorId?: string;
  managerId?: string;
  supervisor?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
  manager?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
  subordinates?: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
    role: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Department {
  id: string;
  name: string;
  description?: string;
  managerId?: string;
  isActive: boolean;
  users: Array<{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    avatar?: string;
    isActive: boolean;
  }>;
  manager?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  };
  _count: {
    users: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export class EmployeeService {
  // Get all employees
  static async getAllEmployees(): Promise<Employee[]> {
    try {
      const employees = await prisma.user.findMany({
        where: { isActive: true },
        include: {
          department: true,
          supervisor: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatar: true
            }
          },
          manager: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatar: true
            }
          },
          subordinates: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatar: true,
              role: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      });

      return employees as Employee[];
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw new Error('Failed to fetch employees');
    }
  }

  // Get employee by ID
  static async getEmployeeById(id: string): Promise<Employee | null> {
    try {
      const employee = await prisma.user.findUnique({
        where: { id },
        include: {
          department: true,
          supervisor: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatar: true
            }
          },
          manager: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatar: true
            }
          },
          subordinates: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatar: true,
              role: true
            }
          }
        }
      });

      return employee as Employee | null;
    } catch (error) {
      console.error('Error fetching employee:', error);
      throw new Error('Failed to fetch employee');
    }
  }

  // Get employees by role
  static async getEmployeesByRole(role: string): Promise<Employee[]> {
    try {
      const employees = await prisma.user.findMany({
        where: { 
          role: role as any,
          isActive: true 
        },
        include: {
          department: true,
          supervisor: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatar: true
            }
          },
          manager: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatar: true
            }
          },
          subordinates: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatar: true,
              role: true
            }
          }
        },
        orderBy: {
          firstName: 'asc'
        }
      });

      return employees as Employee[];
    } catch (error) {
      console.error('Error fetching employees by role:', error);
      throw new Error('Failed to fetch employees by role');
    }
  }

  // Get organizational tree
  static async getOrgTree(): Promise<any[]> {
    try {
      const managers = await prisma.user.findMany({
        where: { 
          role: 'MANAGER',
          isActive: true 
        },
        include: {
          department: true,
          supervisedBy: {
            where: { isActive: true },
            include: {
              subordinates: {
                where: { isActive: true },
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  email: true,
                  avatar: true,
                  role: true,
                  position: true,
                  department: true
                }
              }
            }
          }
        }
      });

      return managers.map(manager => ({
        manager: {
          id: manager.id,
          firstName: manager.firstName,
          lastName: manager.lastName,
          email: manager.email,
          avatar: manager.avatar,
          role: manager.role,
          position: manager.position,
          department: manager.department
        },
        supervisors: manager.supervisedBy.map(supervisor => ({
          supervisor: {
            id: supervisor.id,
            firstName: supervisor.firstName,
            lastName: supervisor.lastName,
            email: supervisor.email,
            avatar: supervisor.avatar,
            role: supervisor.role,
            position: supervisor.position,
            department: supervisor.department
          },
          employees: supervisor.subordinates
        }))
      }));
    } catch (error) {
      console.error('Error fetching org tree:', error);
      throw new Error('Failed to fetch organizational tree');
    }
  }

  // Get all departments
  static async getAllDepartments(): Promise<Department[]> {
    try {
      const departments = await prisma.department.findMany({
        where: { isActive: true },
        include: {
          users: {
            where: { isActive: true },
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              role: true,
              avatar: true,
              isActive: true
            }
          },
          manager: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatar: true
            }
          },
          _count: {
            select: {
              users: true
            }
          }
        },
        orderBy: {
          name: 'asc'
        }
      });

      return departments as Department[];
    } catch (error) {
      console.error('Error fetching departments:', error);
      throw new Error('Failed to fetch departments');
    }
  }

  // Add new employee
  static async addEmployee(employeeData: Partial<Employee>): Promise<Employee> {
    try {
      const employee = await prisma.user.create({
        data: {
          email: employeeData.email!,
          password: 'defaultPassword', // In production, hash this
          firstName: employeeData.firstName!,
          lastName: employeeData.lastName!,
          role: employeeData.role as any,
          avatar: employeeData.avatar,
          phone: employeeData.phone,
          address: employeeData.address,
          position: employeeData.position,
          departmentId: employeeData.department?.id,
          salary: employeeData.salary,
          hireDate: employeeData.hireDate,
          supervisorId: employeeData.supervisorId,
          managerId: employeeData.managerId
        },
        include: {
          department: true,
          supervisor: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatar: true
            }
          },
          manager: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatar: true
            }
          },
          subordinates: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatar: true,
              role: true
            }
          }
        }
      });

      return employee as Employee;
    } catch (error) {
      console.error('Error adding employee:', error);
      throw new Error('Failed to add employee');
    }
  }

  // Update employee
  static async updateEmployee(id: string, employeeData: Partial<Employee>): Promise<Employee> {
    try {
      const employee = await prisma.user.update({
        where: { id },
        data: {
          email: employeeData.email,
          firstName: employeeData.firstName,
          lastName: employeeData.lastName,
          role: employeeData.role as any,
          avatar: employeeData.avatar,
          phone: employeeData.phone,
          address: employeeData.address,
          position: employeeData.position,
          departmentId: employeeData.department?.id,
          salary: employeeData.salary,
          hireDate: employeeData.hireDate,
          supervisorId: employeeData.supervisorId,
          managerId: employeeData.managerId,
          isActive: employeeData.isActive
        },
        include: {
          department: true,
          supervisor: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatar: true
            }
          },
          manager: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatar: true
            }
          },
          subordinates: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
              avatar: true,
              role: true
            }
          }
        }
      });

      return employee as Employee;
    } catch (error) {
      console.error('Error updating employee:', error);
      throw new Error('Failed to update employee');
    }
  }

  // Delete employee (soft delete)
  static async deleteEmployee(id: string): Promise<void> {
    try {
      await prisma.user.update({
        where: { id },
        data: { isActive: false }
      });
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw new Error('Failed to delete employee');
    }
  }
}

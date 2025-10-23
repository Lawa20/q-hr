import { prisma } from './prisma';

export class DatabaseUtils {
  // Check if database is connected
  static async checkConnection(): Promise<boolean> {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return false;
    }
  }

  // Get database statistics
  static async getStats() {
    try {
      const [userCount, departmentCount, attendanceCount, payrollCount] = await Promise.all([
        prisma.user.count(),
        prisma.department.count(),
        prisma.attendance.count(),
        prisma.payroll.count()
      ]);

      return {
        users: userCount,
        departments: departmentCount,
        attendances: attendanceCount,
        payrolls: payrollCount,
        connected: true
      };
    } catch (error) {
      console.error('Error getting database stats:', error);
      return {
        users: 0,
        departments: 0,
        attendances: 0,
        payrolls: 0,
        connected: false
      };
    }
  }

  // Clear all data (use with caution!)
  static async clearAllData() {
    try {
      await prisma.$transaction([
        prisma.attendance.deleteMany(),
        prisma.payroll.deleteMany(),
        prisma.notification.deleteMany(),
        prisma.user.deleteMany(),
        prisma.department.deleteMany(),
        prisma.company.deleteMany()
      ]);
      console.log('All data cleared successfully');
    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  }

  // Get employees with their relationships
  static async getEmployeesWithRelations() {
    try {
      return await prisma.user.findMany({
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
    } catch (error) {
      console.error('Error fetching employees:', error);
      return [];
    }
  }

  // Get organizational tree
  static async getOrganizationalTree() {
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
      console.error('Error fetching organizational tree:', error);
      return [];
    }
  }
}

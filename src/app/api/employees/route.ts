import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Create a singleton instance of PrismaClient
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['error', 'warn'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// GET all employees
export async function GET() {
  try {
    const employees = await prisma.employee.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(employees);
  } catch (error) {
    console.error('❌ Error fetching employees:', error);
    return NextResponse.json(
      { error: 'Failed to fetch employees' },
      { status: 500 }
    );
  }
}

// POST - Create new employee
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email) {
      return NextResponse.json(
        { error: 'Missing required fields: firstName, lastName, email' },
        { status: 400 }
      );
    }

    console.log('📝 Creating employee with data:', {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      department: data.department,
      position: data.position,
    });

    const employee = await prisma.employee.create({
      data: {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone ? data.phone.trim() : null,
        address: data.address ? data.address.trim() : null,
        position: data.position ? data.position.trim() : null,
        department: data.department ? data.department.trim() : null,
        salary: data.salary ? parseFloat(data.salary) : null,
        bloodType: data.bloodType ? data.bloodType.trim() : null,
        isActive: data.isActive ?? true,
        emergencyContactName: data.emergencyContactName ? data.emergencyContactName.trim() : null,
        emergencyContactPhone: data.emergencyContactPhone ? data.emergencyContactPhone.trim() : null,
        emergencyContactRelationship: data.emergencyContactRelationship ? data.emergencyContactRelationship.trim() : null,
        profilePhoto: data.profilePhoto || null,
        personalFiles: data.personalFiles ? JSON.stringify(data.personalFiles) : null,
        supervisorId: data.supervisorId || null,
        managerId: data.managerId || null,
        hireDate: data.hireDate ? new Date(data.hireDate) : new Date(),
      },
    });

    console.log('✅ Employee created successfully:', employee.id);
    return NextResponse.json(employee, { status: 201 });
  } catch (error: any) {
    console.error('❌ Error creating employee:', {
      message: error.message,
      code: error.code,
      meta: error.meta,
    });
    
    // Handle duplicate email
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'Email already exists in the system' },
        { status: 400 }
      );
    }

    // Handle validation errors
    if (error.code === 'P2025') {
      return NextResponse.json(
        { error: 'Invalid reference ID (supervisor or manager does not exist)' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: `Failed to create employee: ${error.message}` },
      { status: 500 }
    );
  }
}

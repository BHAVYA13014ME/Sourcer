import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...\n');

    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing data...');
    await prisma.timeOff.deleteMany();
    await prisma.attendance.deleteMany();
    await prisma.session.deleteMany();
    await prisma.account.deleteMany();
    await prisma.token.deleteMany();
    await prisma.user.deleteMany();
    console.log('✅ Existing data cleared\n');

    // Create HR Users
    console.log('👨‍💼 Creating HR users...');
    const hrPassword = await bcrypt.hash('Admin@123', 10);
    
    const hr1 = await prisma.user.create({
      data: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@company.com',
        password: hrPassword,
        emailVerified: new Date(),
        role: 'HR',
        companyName: 'Tech Solutions Inc',
        phoneNumber: '+1-555-0101',
        isPasswordChanged: true,
        jobPosition: 'HR Manager',
        department: 'Human Resources',
        location: 'New York Office',
        dateOfJoining: new Date('2020-01-15'),
      },
    });

    const hr2 = await prisma.user.create({
      data: {
        name: 'Michael Chen',
        email: 'michael.chen@company.com',
        password: hrPassword,
        emailVerified: new Date(),
        role: 'HR',
        companyName: 'Tech Solutions Inc',
        phoneNumber: '+1-555-0102',
        isPasswordChanged: true,
        jobPosition: 'HR Director',
        department: 'Human Resources',
        location: 'San Francisco Office',
        dateOfJoining: new Date('2019-03-20'),
      },
    });

    console.log(`✅ Created ${2} HR users\n`);

    // Create Employees
    console.log('👥 Creating employees...');
    const employeePassword = await bcrypt.hash('Employee@123', 10);
    
    const employees = [];

    // Software Engineers
    const employee1 = await prisma.user.create({
      data: {
        name: 'John Smith',
        email: 'john.smith@company.com',
        password: employeePassword,
        emailVerified: new Date(),
        role: 'EMPLOYEE',
        hrId: hr1.id,
        employeeId: 'EMP001',
        phoneNumber: '+1-555-0201',
        isPasswordChanged: true,
        jobPosition: 'Senior Software Engineer',
        department: 'Engineering',
        manager: 'Sarah Johnson',
        location: 'New York Office',
        dateOfBirth: new Date('1990-05-15'),
        residingAddress: '123 Main St, New York, NY 10001',
        nationality: 'American',
        personalEmail: 'john.smith.personal@gmail.com',
        gender: 'Male',
        maritalStatus: 'Married',
        dateOfJoining: new Date('2021-06-01'),
        accountNumber: '1234567890',
        bankName: 'Chase Bank',
        ifscCode: 'CHAS0001234',
        panNo: 'ABCDE1234F',
        uanNo: 'UAN1234567890',
        emergencyContactName: 'Jane Smith',
        emergencyContactPhone: '+1-555-0301',
        emergencyContactRelation: 'Spouse',
        skills: 'React, Node.js, TypeScript, AWS',
        experience: '8 years',
        education: 'BS in Computer Science',
        certifications: 'AWS Certified Developer',
        languages: 'English, Spanish',
        monthlyWage: 8500,
        yearlyWage: 102000,
        workingDaysPerWeek: 5,
        breakTimeHours: 1,
        basicSalary: 70000,
        basicSalaryPercent: 68.6,
        hra: 15000,
        hraPercent: 14.7,
        standardAllowance: 5000,
        standardAllowancePercent: 4.9,
        performanceBonus: 12000,
        performanceBonusPercent: 11.8,
        employeePF: 8400,
        employeePFPercent: 8.2,
        employerPF: 8400,
        employerPFPercent: 8.2,
        professionalTax: 2400,
      },
    });
    employees.push(employee1);

    const employee2 = await prisma.user.create({
      data: {
        name: 'Emily Rodriguez',
        email: 'emily.rodriguez@company.com',
        password: employeePassword,
        emailVerified: new Date(),
        role: 'EMPLOYEE',
        hrId: hr1.id,
        employeeId: 'EMP002',
        phoneNumber: '+1-555-0202',
        isPasswordChanged: true,
        jobPosition: 'Full Stack Developer',
        department: 'Engineering',
        manager: 'Sarah Johnson',
        location: 'New York Office',
        dateOfBirth: new Date('1992-08-22'),
        residingAddress: '456 Park Ave, New York, NY 10002',
        nationality: 'American',
        personalEmail: 'emily.r.personal@gmail.com',
        gender: 'Female',
        maritalStatus: 'Single',
        dateOfJoining: new Date('2022-01-15'),
        accountNumber: '2345678901',
        bankName: 'Bank of America',
        ifscCode: 'BOFA0001234',
        panNo: 'BCDEF2345G',
        uanNo: 'UAN2345678901',
        emergencyContactName: 'Maria Rodriguez',
        emergencyContactPhone: '+1-555-0302',
        emergencyContactRelation: 'Mother',
        skills: 'Vue.js, Python, PostgreSQL, Docker',
        experience: '5 years',
        education: 'MS in Software Engineering',
        certifications: 'Google Cloud Professional',
        languages: 'English, Spanish, Portuguese',
        monthlyWage: 7000,
        yearlyWage: 84000,
        workingDaysPerWeek: 5,
        breakTimeHours: 1,
        basicSalary: 58000,
        basicSalaryPercent: 69,
        hra: 12000,
        hraPercent: 14.3,
        standardAllowance: 4000,
        standardAllowancePercent: 4.8,
        performanceBonus: 10000,
        performanceBonusPercent: 11.9,
        employeePF: 6960,
        employeePFPercent: 8.3,
        employerPF: 6960,
        employerPFPercent: 8.3,
        professionalTax: 2000,
      },
    });
    employees.push(employee2);

    const employee3 = await prisma.user.create({
      data: {
        name: 'David Kim',
        email: 'david.kim@company.com',
        password: employeePassword,
        emailVerified: new Date(),
        role: 'EMPLOYEE',
        hrId: hr2.id,
        employeeId: 'EMP003',
        phoneNumber: '+1-555-0203',
        isPasswordChanged: true,
        jobPosition: 'DevOps Engineer',
        department: 'Engineering',
        manager: 'Michael Chen',
        location: 'San Francisco Office',
        dateOfBirth: new Date('1988-11-30'),
        residingAddress: '789 Market St, San Francisco, CA 94103',
        nationality: 'American',
        personalEmail: 'david.kim.dev@gmail.com',
        gender: 'Male',
        maritalStatus: 'Married',
        dateOfJoining: new Date('2020-09-01'),
        accountNumber: '3456789012',
        bankName: 'Wells Fargo',
        ifscCode: 'WELL0001234',
        panNo: 'CDEFG3456H',
        uanNo: 'UAN3456789012',
        emergencyContactName: 'Sarah Kim',
        emergencyContactPhone: '+1-555-0303',
        emergencyContactRelation: 'Spouse',
        skills: 'Kubernetes, Jenkins, AWS, Terraform',
        experience: '10 years',
        education: 'BS in Computer Engineering',
        certifications: 'Kubernetes Administrator, AWS Solutions Architect',
        languages: 'English, Korean',
        monthlyWage: 9000,
        yearlyWage: 108000,
        workingDaysPerWeek: 5,
        breakTimeHours: 1,
        basicSalary: 75000,
        basicSalaryPercent: 69.4,
        hra: 16000,
        hraPercent: 14.8,
        standardAllowance: 5500,
        standardAllowancePercent: 5.1,
        performanceBonus: 11500,
        performanceBonusPercent: 10.7,
        employeePF: 8640,
        employeePFPercent: 8,
        employerPF: 8640,
        employerPFPercent: 8,
        professionalTax: 2500,
      },
    });
    employees.push(employee3);

    // Marketing Team
    const employee4 = await prisma.user.create({
      data: {
        name: 'Lisa Anderson',
        email: 'lisa.anderson@company.com',
        password: employeePassword,
        emailVerified: new Date(),
        role: 'EMPLOYEE',
        hrId: hr1.id,
        employeeId: 'EMP004',
        phoneNumber: '+1-555-0204',
        isPasswordChanged: true,
        jobPosition: 'Marketing Manager',
        department: 'Marketing',
        manager: 'Sarah Johnson',
        location: 'New York Office',
        dateOfBirth: new Date('1991-03-12'),
        residingAddress: '321 Broadway, New York, NY 10003',
        nationality: 'American',
        personalEmail: 'lisa.anderson.mktg@gmail.com',
        gender: 'Female',
        maritalStatus: 'Single',
        dateOfJoining: new Date('2021-03-10'),
        accountNumber: '4567890123',
        bankName: 'Citibank',
        ifscCode: 'CITI0001234',
        panNo: 'DEFGH4567I',
        uanNo: 'UAN4567890123',
        emergencyContactName: 'Robert Anderson',
        emergencyContactPhone: '+1-555-0304',
        emergencyContactRelation: 'Father',
        skills: 'Digital Marketing, SEO, Content Strategy, Analytics',
        experience: '6 years',
        education: 'MBA in Marketing',
        certifications: 'Google Analytics, HubSpot Inbound Marketing',
        languages: 'English, French',
        monthlyWage: 6500,
        yearlyWage: 78000,
        workingDaysPerWeek: 5,
        breakTimeHours: 1,
        basicSalary: 54000,
        basicSalaryPercent: 69.2,
        hra: 11000,
        hraPercent: 14.1,
        standardAllowance: 3800,
        standardAllowancePercent: 4.9,
        performanceBonus: 9200,
        performanceBonusPercent: 11.8,
        employeePF: 6240,
        employeePFPercent: 8,
        employerPF: 6240,
        employerPFPercent: 8,
        professionalTax: 1800,
      },
    });
    employees.push(employee4);

    const employee5 = await prisma.user.create({
      data: {
        name: 'James Wilson',
        email: 'james.wilson@company.com',
        password: employeePassword,
        emailVerified: new Date(),
        role: 'EMPLOYEE',
        hrId: hr2.id,
        employeeId: 'EMP005',
        phoneNumber: '+1-555-0205',
        isPasswordChanged: true,
        jobPosition: 'Content Specialist',
        department: 'Marketing',
        manager: 'Michael Chen',
        location: 'San Francisco Office',
        dateOfBirth: new Date('1994-07-18'),
        residingAddress: '555 Mission St, San Francisco, CA 94104',
        nationality: 'American',
        personalEmail: 'james.w.content@gmail.com',
        gender: 'Male',
        maritalStatus: 'Single',
        dateOfJoining: new Date('2023-02-01'),
        accountNumber: '5678901234',
        bankName: 'Bank of America',
        ifscCode: 'BOFA0002345',
        panNo: 'EFGHI5678J',
        uanNo: 'UAN5678901234',
        emergencyContactName: 'Nancy Wilson',
        emergencyContactPhone: '+1-555-0305',
        emergencyContactRelation: 'Mother',
        skills: 'Copywriting, Content Marketing, Social Media, Video Production',
        experience: '3 years',
        education: 'BA in Communications',
        certifications: 'Content Marketing Certification',
        languages: 'English',
        monthlyWage: 5000,
        yearlyWage: 60000,
        workingDaysPerWeek: 5,
        breakTimeHours: 1,
        basicSalary: 42000,
        basicSalaryPercent: 70,
        hra: 8500,
        hraPercent: 14.2,
        standardAllowance: 3000,
        standardAllowancePercent: 5,
        performanceBonus: 6500,
        performanceBonusPercent: 10.8,
        employeePF: 4800,
        employeePFPercent: 8,
        employerPF: 4800,
        employerPFPercent: 8,
        professionalTax: 1500,
      },
    });
    employees.push(employee5);

    // Sales Team
    const employee6 = await prisma.user.create({
      data: {
        name: 'Jennifer Martinez',
        email: 'jennifer.martinez@company.com',
        password: employeePassword,
        emailVerified: new Date(),
        role: 'EMPLOYEE',
        hrId: hr1.id,
        employeeId: 'EMP006',
        phoneNumber: '+1-555-0206',
        isPasswordChanged: true,
        jobPosition: 'Sales Manager',
        department: 'Sales',
        manager: 'Sarah Johnson',
        location: 'New York Office',
        dateOfBirth: new Date('1989-12-05'),
        residingAddress: '888 5th Ave, New York, NY 10004',
        nationality: 'American',
        personalEmail: 'jennifer.sales@gmail.com',
        gender: 'Female',
        maritalStatus: 'Married',
        dateOfJoining: new Date('2020-05-15'),
        accountNumber: '6789012345',
        bankName: 'Chase Bank',
        ifscCode: 'CHAS0002345',
        panNo: 'FGHIJ6789K',
        uanNo: 'UAN6789012345',
        emergencyContactName: 'Carlos Martinez',
        emergencyContactPhone: '+1-555-0306',
        emergencyContactRelation: 'Spouse',
        skills: 'Sales Strategy, CRM, Negotiation, Account Management',
        experience: '9 years',
        education: 'BA in Business Administration',
        certifications: 'Salesforce Certified Administrator',
        languages: 'English, Spanish',
        monthlyWage: 7500,
        yearlyWage: 90000,
        workingDaysPerWeek: 5,
        breakTimeHours: 1,
        basicSalary: 62000,
        basicSalaryPercent: 68.9,
        hra: 13000,
        hraPercent: 14.4,
        standardAllowance: 4500,
        standardAllowancePercent: 5,
        performanceBonus: 10500,
        performanceBonusPercent: 11.7,
        employeePF: 7200,
        employeePFPercent: 8,
        employerPF: 7200,
        employerPFPercent: 8,
        professionalTax: 2200,
      },
    });
    employees.push(employee6);

    const employee7 = await prisma.user.create({
      data: {
        name: 'Robert Taylor',
        email: 'robert.taylor@company.com',
        password: employeePassword,
        emailVerified: new Date(),
        role: 'EMPLOYEE',
        hrId: hr2.id,
        employeeId: 'EMP007',
        phoneNumber: '+1-555-0207',
        isPasswordChanged: true,
        jobPosition: 'Account Executive',
        department: 'Sales',
        manager: 'Michael Chen',
        location: 'San Francisco Office',
        dateOfBirth: new Date('1993-04-28'),
        residingAddress: '999 California St, San Francisco, CA 94105',
        nationality: 'American',
        personalEmail: 'rob.taylor.sales@gmail.com',
        gender: 'Male',
        maritalStatus: 'Single',
        dateOfJoining: new Date('2022-07-01'),
        accountNumber: '7890123456',
        bankName: 'Wells Fargo',
        ifscCode: 'WELL0002345',
        panNo: 'GHIJK7890L',
        uanNo: 'UAN7890123456',
        emergencyContactName: 'Susan Taylor',
        emergencyContactPhone: '+1-555-0307',
        emergencyContactRelation: 'Mother',
        skills: 'B2B Sales, Lead Generation, Client Relations, Presentation',
        experience: '4 years',
        education: 'BS in Marketing',
        certifications: 'Certified Sales Professional',
        languages: 'English',
        monthlyWage: 6000,
        yearlyWage: 72000,
        workingDaysPerWeek: 5,
        breakTimeHours: 1,
        basicSalary: 50000,
        basicSalaryPercent: 69.4,
        hra: 10500,
        hraPercent: 14.6,
        standardAllowance: 3600,
        standardAllowancePercent: 5,
        performanceBonus: 8000,
        performanceBonusPercent: 11,
        employeePF: 5760,
        employeePFPercent: 8,
        employerPF: 5760,
        employerPFPercent: 8,
        professionalTax: 1700,
      },
    });
    employees.push(employee7);

    // Design Team
    const employee8 = await prisma.user.create({
      data: {
        name: 'Angela White',
        email: 'angela.white@company.com',
        password: employeePassword,
        emailVerified: new Date(),
        role: 'EMPLOYEE',
        hrId: hr1.id,
        employeeId: 'EMP008',
        phoneNumber: '+1-555-0208',
        isPasswordChanged: true,
        jobPosition: 'UI/UX Designer',
        department: 'Design',
        manager: 'Sarah Johnson',
        location: 'New York Office',
        dateOfBirth: new Date('1995-09-14'),
        residingAddress: '111 Hudson St, New York, NY 10005',
        nationality: 'American',
        personalEmail: 'angela.design@gmail.com',
        gender: 'Female',
        maritalStatus: 'Single',
        dateOfJoining: new Date('2023-01-10'),
        accountNumber: '8901234567',
        bankName: 'Citibank',
        ifscCode: 'CITI0002345',
        panNo: 'HIJKL8901M',
        uanNo: 'UAN8901234567',
        emergencyContactName: 'Thomas White',
        emergencyContactPhone: '+1-555-0308',
        emergencyContactRelation: 'Father',
        skills: 'Figma, Adobe XD, User Research, Prototyping, HTML/CSS',
        experience: '3 years',
        education: 'BA in Graphic Design',
        certifications: 'Google UX Design Certificate',
        languages: 'English',
        monthlyWage: 6200,
        yearlyWage: 74400,
        workingDaysPerWeek: 5,
        breakTimeHours: 1,
        basicSalary: 52000,
        basicSalaryPercent: 69.9,
        hra: 10800,
        hraPercent: 14.5,
        standardAllowance: 3700,
        standardAllowancePercent: 5,
        performanceBonus: 8000,
        performanceBonusPercent: 10.6,
        employeePF: 5952,
        employeePFPercent: 8,
        employerPF: 5952,
        employerPFPercent: 8,
        professionalTax: 1800,
      },
    });
    employees.push(employee8);

    console.log(`✅ Created ${employees.length} employees\n`);

    // Create Attendance Records (last 30 days)
    console.log('📅 Creating attendance records...');
    let attendanceCount = 0;
    const today = new Date();
    
    for (const employee of employees) {
      // Create attendance for the last 30 days
      for (let i = 30; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        
        // Skip weekends
        if (date.getDay() === 0 || date.getDay() === 6) continue;
        
        // Random chance of being absent (5%)
        if (Math.random() < 0.05) {
          await prisma.attendance.create({
            data: {
              userId: employee.id,
              date: date,
              status: 'ABSENT',
              notes: 'Sick leave',
            },
          });
          attendanceCount++;
          continue;
        }
        
        // Normal working day
        const checkIn = new Date(date);
        checkIn.setHours(8 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 60), 0);
        
        const checkOut = new Date(date);
        checkOut.setHours(17 + Math.floor(Math.random() * 3), Math.floor(Math.random() * 60), 0);
        
        const workHours = (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60);
        const breakHours = employee.breakTimeHours || 1;
        const netWorkHours = workHours - breakHours;
        const extraHours = Math.max(0, netWorkHours - 8);
        
        await prisma.attendance.create({
          data: {
            userId: employee.id,
            date: date,
            checkIn: checkIn,
            checkOut: checkOut,
            workHours: netWorkHours,
            extraHours: extraHours,
            breakHours: breakHours,
            status: netWorkHours < 4 ? 'HALF_DAY' : 'PRESENT',
            notes: extraHours > 2 ? 'Worked on project deadline' : '',
          },
        });
        attendanceCount++;
      }
    }
    
    console.log(`✅ Created ${attendanceCount} attendance records\n`);

    // Create Time Off Requests
    console.log('🏖️ Creating time-off requests...');
    const timeOffTypes: ('PAID_TIME_OFF' | 'SICK_LEAVE' | 'UNPAID_LEAVE')[] = ['PAID_TIME_OFF', 'SICK_LEAVE', 'UNPAID_LEAVE'];
    const timeOffStatuses: ('PENDING' | 'APPROVED' | 'REJECTED')[] = ['PENDING', 'APPROVED', 'REJECTED'];
    
    let timeOffCount = 0;

    // Past approved requests
    for (let i = 0; i < 10; i++) {
      const employee = employees[Math.floor(Math.random() * employees.length)];
      const startDate = new Date(today);
      startDate.setDate(today.getDate() - Math.floor(Math.random() * 60) - 10);
      
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 5) + 1);
      
      const days = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
      
      const approver = employee.hrId === hr1.id ? hr1 : hr2;
      const approvedAt = new Date(startDate);
      approvedAt.setDate(startDate.getDate() - 5);
      
      await prisma.timeOff.create({
        data: {
          userId: employee.id,
          timeOffType: timeOffTypes[Math.floor(Math.random() * timeOffTypes.length)],
          startDate: startDate,
          endDate: endDate,
          days: days,
          status: 'APPROVED',
          notes: 'Family vacation / Personal matters',
          approvedBy: approver.id,
          approvedAt: approvedAt,
        },
      });
      timeOffCount++;
    }

    // Pending requests
    for (let i = 0; i < 5; i++) {
      const employee = employees[Math.floor(Math.random() * employees.length)];
      const startDate = new Date(today);
      startDate.setDate(today.getDate() + Math.floor(Math.random() * 30) + 5);
      
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 4) + 1);
      
      const days = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
      
      await prisma.timeOff.create({
        data: {
          userId: employee.id,
          timeOffType: timeOffTypes[Math.floor(Math.random() * timeOffTypes.length)],
          startDate: startDate,
          endDate: endDate,
          days: days,
          status: 'PENDING',
          notes: 'Planning ahead for personal time',
        },
      });
      timeOffCount++;
    }

    // Some rejected requests
    for (let i = 0; i < 3; i++) {
      const employee = employees[Math.floor(Math.random() * employees.length)];
      const startDate = new Date(today);
      startDate.setDate(today.getDate() + Math.floor(Math.random() * 15) + 1);
      
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 3) + 1);
      
      const days = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24) + 1;
      
      const rejector = employee.hrId === hr1.id ? hr1 : hr2;
      
      await prisma.timeOff.create({
        data: {
          userId: employee.id,
          timeOffType: timeOffTypes[Math.floor(Math.random() * timeOffTypes.length)],
          startDate: startDate,
          endDate: endDate,
          days: days,
          status: 'REJECTED',
          notes: 'Need time off for personal reasons',
          rejectedBy: rejector.id,
          rejectedAt: new Date(),
          rejectionReason: 'Critical project deadline during this period. Please reschedule.',
        },
      });
      timeOffCount++;
    }

    console.log(`✅ Created ${timeOffCount} time-off requests\n`);

    // Summary
    console.log('═══════════════════════════════════════════════════════');
    console.log('✅ DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log('═══════════════════════════════════════════════════════\n');
    
    console.log('📊 SUMMARY:');
    console.log(`   👨‍💼 HR Users: 2`);
    console.log(`   👥 Employees: ${employees.length}`);
    console.log(`   📅 Attendance Records: ${attendanceCount}`);
    console.log(`   🏖️  Time-off Requests: ${timeOffCount}\n`);
    
    console.log('🔐 LOGIN CREDENTIALS:');
    console.log('───────────────────────────────────────────────────────');
    console.log('   HR ACCOUNTS:');
    console.log('   📧 sarah.johnson@company.com | 🔑 Admin@123');
    console.log('   📧 michael.chen@company.com  | 🔑 Admin@123\n');
    console.log('   EMPLOYEE ACCOUNTS:');
    console.log('   📧 john.smith@company.com    | 🔑 Employee@123');
    console.log('   📧 emily.rodriguez@company.com | 🔑 Employee@123');
    console.log('   📧 david.kim@company.com     | 🔑 Employee@123');
    console.log('   📧 lisa.anderson@company.com | 🔑 Employee@123');
    console.log('   📧 james.wilson@company.com  | 🔑 Employee@123');
    console.log('   📧 jennifer.martinez@company.com | 🔑 Employee@123');
    console.log('   📧 robert.taylor@company.com | 🔑 Employee@123');
    console.log('   📧 angela.white@company.com  | 🔑 Employee@123');
    console.log('───────────────────────────────────────────────────────\n');
    
    console.log('🌐 Login at: http://localhost:3000/auth/login\n');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

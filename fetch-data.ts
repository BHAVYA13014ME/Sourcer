import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fetchAllData() {
  try {
    console.log('🔗 Connecting to Neon Database...\n');

    // Fetch all users
    const users = await prisma.user.findMany({
      include: {
        accounts: true,
        sessions: true,
        attendances: true,
        timeOffs: true,
        employees: true,
      },
    });

    console.log('👥 USERS:');
    console.log(`Total users: ${users.length}`);
    console.log(JSON.stringify(users, null, 2));
    console.log('\n' + '='.repeat(80) + '\n');

    // Fetch all attendance records
    const attendances = await prisma.attendance.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            employeeId: true,
          },
        },
      },
    });

    console.log('📅 ATTENDANCE RECORDS:');
    console.log(`Total records: ${attendances.length}`);
    console.log(JSON.stringify(attendances, null, 2));
    console.log('\n' + '='.repeat(80) + '\n');

    // Fetch all time off requests
    const timeOffs = await prisma.timeOff.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            employeeId: true,
          },
        },
        approver: {
          select: {
            name: true,
            email: true,
          },
        },
        rejector: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });

    console.log('🏖️ TIME OFF REQUESTS:');
    console.log(`Total requests: ${timeOffs.length}`);
    console.log(JSON.stringify(timeOffs, null, 2));
    console.log('\n' + '='.repeat(80) + '\n');

    // Fetch all tokens
    const tokens = await prisma.token.findMany();

    console.log('🔑 TOKENS:');
    console.log(`Total tokens: ${tokens.length}`);
    console.log(JSON.stringify(tokens, null, 2));
    console.log('\n' + '='.repeat(80) + '\n');

    // Summary statistics
    const hrUsers = users.filter(u => u.role === 'HR');
    const employees = users.filter(u => u.role === 'EMPLOYEE');
    const pendingTimeOffs = timeOffs.filter(t => t.status === 'PENDING');
    const approvedTimeOffs = timeOffs.filter(t => t.status === 'APPROVED');
    const rejectedTimeOffs = timeOffs.filter(t => t.status === 'REJECTED');

    console.log('📊 SUMMARY STATISTICS:');
    console.log({
      totalUsers: users.length,
      hrUsers: hrUsers.length,
      employees: employees.length,
      totalAttendance: attendances.length,
      totalTimeOffRequests: timeOffs.length,
      pendingTimeOffs: pendingTimeOffs.length,
      approvedTimeOffs: approvedTimeOffs.length,
      rejectedTimeOffs: rejectedTimeOffs.length,
      totalTokens: tokens.length,
    });

    console.log('\n✅ Data fetch completed successfully!');
  } catch (error) {
    console.error('❌ Error fetching data:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

fetchAllData()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function summary() {
  const users = await prisma.user.count();
  const hr = await prisma.user.count({ where: { role: 'HR' }});
  const emp = await prisma.user.count({ where: { role: 'EMPLOYEE' }});
  const att = await prisma.attendance.count();
  const timeoff = await prisma.timeOff.count();
  const pending = await prisma.timeOff.count({ where: { status: 'PENDING' }});
  const approved = await prisma.timeOff.count({ where: { status: 'APPROVED' }});
  
  console.log('\n╔═══════════════════════════════════════════╗');
  console.log('║     DATABASE SUMMARY - NEON DB            ║');
  console.log('╠═══════════════════════════════════════════╣');
  console.log(`║ 👥 Total Users:        ${users.toString().padEnd(18)}║`);
  console.log(`║    - HR:               ${hr.toString().padEnd(18)}║`);
  console.log(`║    - Employees:        ${emp.toString().padEnd(18)}║`);
  console.log(`║ 📅 Attendance Records: ${att.toString().padEnd(18)}║`);
  console.log(`║ 🏖️  Time-off Requests: ${timeoff.toString().padEnd(18)}║`);
  console.log(`║    - Pending:          ${pending.toString().padEnd(18)}║`);
  console.log(`║    - Approved:         ${approved.toString().padEnd(18)}║`);
  console.log('╚═══════════════════════════════════════════╝\n');
  
  await prisma.$disconnect();
}

summary();

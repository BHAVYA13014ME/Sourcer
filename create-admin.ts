import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const adminEmail = 'admin@company.com';
    const adminPassword = 'Admin@123'; // Strong password meeting all requirements
    const adminName = 'Admin User';

    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (existingAdmin) {
      console.log('⚠️  Admin user already exists! Updating password...');
      
      // Update password for existing admin
      const hashedPassword = await bcrypt.hash(adminPassword, 10);
      await prisma.user.update({
        where: { email: adminEmail },
        data: { 
          password: hashedPassword,
          emailVerified: new Date(),
        },
      });
      
      console.log('✅ Admin password updated successfully!');
      console.log('\n📋 Admin Credentials:');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📧 Email:    ', adminEmail);
      console.log('🔑 Password: ', adminPassword);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        name: adminName,
        email: adminEmail,
        password: hashedPassword,
        emailVerified: new Date(), // Verify email immediately
        role: 'HR', // HR role = Admin
        companyName: 'My Company',
        isPasswordChanged: false, // User should change password on first login
      },
    });

    console.log('✅ Admin user created successfully!');
    console.log('\n📋 Admin Credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:    ', adminEmail);
    console.log('🔑 Password: ', adminPassword);
    console.log('👤 Name:     ', adminName);
    console.log('🏢 Role:     ', 'HR (Admin)');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🌐 Login at: http://localhost:3000/auth/login');
    console.log('\n⚠️  Please change the password after first login!');

  } catch (error) {
    console.error('❌ Error creating admin:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

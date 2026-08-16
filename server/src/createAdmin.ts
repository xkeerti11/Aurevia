import bcrypt from 'bcryptjs';
import { prisma } from './db';

async function createOrUpdateAdmin() {
  const args = process.argv.slice(2);
  let email = 'admin@aureviahealth.com';
  let password = 'admin123';
  let name = 'Clinic Medical Director';
  let role = 'owner';

  // Parse arguments e.g. email=user@gmail.com password=mySecretPass
  args.forEach(arg => {
    if (arg.startsWith('email=')) email = arg.split('=')[1];
    if (arg.startsWith('password=')) password = arg.split('=')[1];
    if (arg.startsWith('name=')) name = arg.split('=')[1];
    if (arg.startsWith('role=')) role = arg.split('=')[1];
  });

  const normalizedEmail = email.toLowerCase().trim();
  console.log(`\n🔐 Setting up Admin account for: ${normalizedEmail}...`);

  const passwordHash = await bcrypt.hash(password, 12);

  const user = await prisma.user.upsert({
    where: { email: normalizedEmail },
    update: {
      passwordHash,
      name,
      role,
      isActive: true,
      failedLoginAttempts: 0,
      lockedUntil: null
    },
    create: {
      email: normalizedEmail,
      emailNormalized: normalizedEmail,
      passwordHash,
      name,
      role,
      isActive: true
    }
  });

  console.log('======================================================');
  console.log('✅ [ADMIN CREDENTIALS CONFIGURED SUCCESSFULLY]');
  console.log(`👤 Name: ${user.name}`);
  console.log(`✉️ Email: ${user.email}`);
  console.log(`🔑 Password: ${password}`);
  console.log(`🛡️ Role: ${user.role}`);
  console.log('======================================================\n');
}

createOrUpdateAdmin()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });

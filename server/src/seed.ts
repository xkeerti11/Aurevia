import bcrypt from 'bcryptjs';
import { prisma } from './db';

async function seed() {
  console.log('🌱 [SEEDING AUREVIA HEALTH DATABASE]...');

  // 1. Clean existing records
  await prisma.auditLog.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.patient.deleteMany();
  await prisma.doctorSchedule.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.service.deleteMany();
  await prisma.user.deleteMany();

  // 2. Create Admin User
  const passwordHash = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@aureviahealth.com',
      passwordHash,
      role: 'ADMIN',
      name: 'Clinic Medical Director',
      phone: '+91 124 498 7000'
    }
  });
  console.log('✓ Admin user created: admin@aureviahealth.com (Pass: admin123)');

  // 3. Create Doctors
  const doctorsData = [
    {
      slug: 'dr-rahul-sharma',
      name: 'Dr. Rahul Sharma',
      title: 'Senior Consultant Cardiologist',
      specialty: 'Cardiology',
      qualifications: 'MBBS, MD, DM (Cardiology), FESC',
      experienceYears: 16,
      consultationFee: 1500,
      bio: 'Pioneering cardiologist with 16+ years of expertise in preventive cardiovascular medicine.',
      avatarUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80'
    },
    {
      slug: 'dr-priya-nair',
      name: 'Dr. Priya Nair',
      title: 'Chief Dermatologist & Aesthetic Laser Surgeon',
      specialty: 'Dermatology',
      qualifications: 'MBBS, MD (Dermatology), FAAD',
      experienceYears: 12,
      consultationFee: 1200,
      bio: 'Board-certified dermatologist specializing in laser resurfacing and acne therapeutics.',
      avatarUrl: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80'
    },
    {
      slug: 'dr-amit-verma',
      name: 'Dr. Amit Verma',
      title: 'Senior Orthopedic Surgeon',
      specialty: 'Orthopedics',
      qualifications: 'MBBS, MS (Orthopedics), MCh Orth',
      experienceYears: 18,
      consultationFee: 1600,
      bio: 'Specialist in minimally invasive knee preservation and sports medicine injuries.',
      avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80'
    },
    {
      slug: 'dr-ananya-sen',
      name: 'Dr. Ananya Sen',
      title: 'Consultant Pediatrician',
      specialty: 'Pediatrics',
      qualifications: 'MBBS, MD (Pediatrics), MRCPCH (UK)',
      experienceYears: 10,
      consultationFee: 1000,
      bio: 'Dedicated to newborn wellness monitoring and developmental milestones.',
      avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80'
    },
    {
      slug: 'dr-vikram-mehta',
      name: 'Dr. Vikram Mehta',
      title: 'Director of Internal Medicine',
      specialty: 'General Medicine',
      qualifications: 'MBBS, MD (Internal Medicine), FACP (USA)',
      experienceYears: 22,
      consultationFee: 1400,
      bio: 'Master clinician in chronic disease management and comprehensive executive health screenings.',
      avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80'
    }
  ];

  const createdDoctors = [];
  for (const doc of doctorsData) {
    const created = await prisma.doctor.create({
      data: {
        ...doc,
        schedules: {
          create: [1, 2, 3, 4, 5, 6].map(day => ({
            dayOfWeek: day,
            startTime: '09:00',
            endTime: '18:00',
            slotDurationMin: 30
          }))
        }
      }
    });
    createdDoctors.push(created);
  }
  console.log(`✓ ${createdDoctors.length} Specialists & Schedules created`);

  // 4. Create Services
  const servicesData = [
    {
      slug: 'advanced-cardiology',
      name: 'Advanced Cardiology & Heart Screening',
      category: 'Cardiology',
      shortDescription: 'Comprehensive cardiovascular assessment, 2D Echo, Stress ECG, and lipid profiling.',
      fullDescription: 'Our Advanced Cardiology department integrates high-precision diagnostic equipment including color Doppler echocardiography.',
      durationMinutes: 45,
      startingPrice: 2499,
      isPopular: true
    },
    {
      slug: 'clinical-dermatology-aesthetics',
      name: 'Clinical Dermatology & Laser Aesthetics',
      category: 'Dermatology',
      shortDescription: 'Evidence-based skincare, acne scarring treatment, and laser resurfacing.',
      fullDescription: 'Target skin concerns with dermatologist-formulated protocols and US-FDA cleared lasers.',
      durationMinutes: 30,
      startingPrice: 1999,
      isPopular: true
    },
    {
      slug: 'executive-full-body-wellness',
      name: 'Executive Full Body Health Checkup',
      category: 'Preventive Care',
      shortDescription: '75+ vital parameters covering liver, kidney, thyroid, heart, and metabolic status.',
      fullDescription: 'Complete clarity on internal organ health and nutritional biomarkers.',
      durationMinutes: 60,
      startingPrice: 3999,
      isPopular: true
    },
    {
      slug: 'pediatric-wellness-immunization',
      name: 'Pediatric Care & Milestone Tracking',
      category: 'Pediatrics',
      shortDescription: 'Gentle newborn care, developmental monitoring, and safe vaccinations.',
      fullDescription: 'Child-friendly pediatric suite ensuring your little ones feel secure.',
      durationMinutes: 30,
      startingPrice: 1200,
      isPopular: false
    }
  ];

  const createdServices = [];
  for (const srv of servicesData) {
    const created = await prisma.service.create({ data: srv });
    createdServices.push(created);
  }
  console.log(`✓ ${createdServices.length} Clinical Services created`);

  // 5. Create Initial Patients & Appointments
  const patient1 = await prisma.patient.create({
    data: {
      name: 'Sarah Jenkins',
      phone: '+91 98112 34567',
      email: 'sarah.j@example.com',
      dateOfBirth: '1988-04-12'
    }
  });

  await prisma.appointment.create({
    data: {
      confirmationCode: 'AU-2026-0820-0215',
      patientId: patient1.id,
      doctorId: createdDoctors[0].id,
      serviceId: createdServices[0].id,
      appointmentDate: '2026-08-20',
      timeSlot: '11:30 AM',
      status: 'CONFIRMED',
      reasonForVisit: 'Annual cardiovascular risk screening and blood pressure review'
    }
  });

  const patient2 = await prisma.patient.create({
    data: {
      name: 'Ahmad Al-Mansoor',
      phone: '+91 98765 99881',
      email: 'ahmad.m@example.com',
      dateOfBirth: '1992-09-24'
    }
  });

  await prisma.appointment.create({
    data: {
      confirmationCode: 'AU-2026-0821-0318',
      patientId: patient2.id,
      doctorId: createdDoctors[1].id,
      serviceId: createdServices[1].id,
      appointmentDate: '2026-08-21',
      timeSlot: '02:00 PM',
      status: 'PENDING',
      reasonForVisit: 'Acne scarring laser therapy consultation'
    }
  });

  // 6. Create Initial Leads
  await prisma.lead.createMany({
    data: [
      {
        name: 'Rohit Batra',
        phone: '+91 98711 22334',
        email: 'rohit.b@example.com',
        source: 'Website Form',
        serviceInterested: 'Executive Full Body Health Checkup',
        status: 'NEW',
        notes: 'Inquired about corporate package for family'
      },
      {
        name: 'Meenakshi Iyer',
        phone: '+91 98200 44556',
        email: 'meenakshi.i@example.com',
        source: 'WhatsApp',
        serviceInterested: 'Clinical Dermatology & Laser Aesthetics',
        status: 'CONTACTED',
        notes: 'Sent price list via WhatsApp'
      },
      {
        name: 'Karan Grover',
        phone: '+91 97170 88990',
        email: 'karan.g@example.com',
        source: 'Direct Call',
        serviceInterested: 'Orthopedic Joint Preservation',
        status: 'QUALIFIED',
        notes: 'Suffering from sports knee injury'
      }
    ]
  });
  console.log('✓ Initial Patients, Appointments & Leads created');
  console.log('🎉 [SEEDING COMPLETED SUCCESSFULLY]');
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

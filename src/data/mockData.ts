import { Doctor, ServiceTreatment, Testimonial, Facility, Article, FAQItem, ClinicInfo, Appointment, Lead } from '../types';

export const CLINIC_INFO: ClinicInfo = {
  name: 'Aurevia Health',
  tagline: 'Modern Healthcare. Human Care.',
  address: 'Level 4, Pinnacle Medical Tower, Golf Course Road, Sector 54',
  city: 'Gurugram',
  state: 'Delhi NCR',
  pincode: '122002',
  phone: '+91 124 498 7000',
  emergencyPhone: '+91 124 498 7999',
  email: 'care@aureviahealth.com',
  whatsappNumber: '+919876543210',
  hours: {
    weekdays: '08:00 AM - 08:00 PM',
    saturday: '09:00 AM - 06:00 PM',
    sunday: '10:00 AM - 02:00 PM (Emergency Only)'
  },
  coordinates: {
    lat: 28.4357,
    lng: 77.1062
  },
  googleRating: 4.9,
  totalReviews: 1280
};

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    slug: 'dr-rahul-sharma',
    name: 'Dr. Rahul Sharma',
    title: 'Senior Consultant Cardiologist & Interventional Specialist',
    specialty: 'Cardiology',
    qualifications: 'MBBS, MD (Medicine), DM (Cardiology), FESC',
    experienceYears: 16,
    rating: 4.95,
    reviewCount: 340,
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80',
    bio: 'Pioneering cardiologist with 16+ years of expertise in preventive cardiovascular medicine and complex angiography.',
    fullBio: [
      'Dr. Rahul Sharma is a globally recognized cardiologist known for his patient-first approach and mastery in non-invasive and interventional cardiology.',
      'Having trained at premier institutions in the UK and AIIMS New Delhi, he has performed over 4,500 successful cardiac procedures with exceptional clinical outcomes.',
      'He currently chairs the Preventive Cardiology Council at Aurevia Health, dedicating his research to early cardiovascular risk screening.'
    ],
    education: [
      'DM Cardiology — All India Institute of Medical Sciences (AIIMS)',
      'MD General Medicine — King George Medical University',
      'Fellowship in Interventional Cardiology — Royal Brompton Hospital, London'
    ],
    awards: [
      'Best Cardiologist in Delhi NCR — National Healthcare Excellence 2024',
      'Distinguished Clinical Researcher Award 2022'
    ],
    consultationFee: 1500,
    availableToday: true,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availableSlots: ['09:00 AM', '10:00 AM', '11:30 AM', '02:30 PM', '04:00 PM', '05:30 PM'],
    location: 'Main Clinic - Consultation Suite 401'
  },
  {
    id: 'doc-2',
    slug: 'dr-priya-nair',
    name: 'Dr. Priya Nair',
    title: 'Chief Dermatologist & Aesthetic Laser Surgeon',
    specialty: 'Dermatology',
    qualifications: 'MBBS, MD (Dermatology, Venereology & Leprosy), FAAD',
    experienceYears: 12,
    rating: 4.92,
    reviewCount: 412,
    avatar: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=800&q=80',
    bio: 'Board-certified dermatologist specializing in advanced clinical dermatology, acne therapeutics, and anti-aging dermatology.',
    fullBio: [
      'Dr. Priya Nair combines clinical dermatology with state-of-the-art dermatological laser systems to treat intricate skin pathologies and aesthetic concerns.',
      'Her holistic protocols emphasize skin barrier restoration and evidence-backed medical skincare.'
    ],
    education: [
      'MD Dermatology — Christian Medical College (CMC), Vellore',
      'Advanced Aesthetic Fellowship — National Skin Centre, Singapore'
    ],
    awards: [
      'Top Dermatologist Award — Indian Medical Council 2023'
    ],
    consultationFee: 1200,
    availableToday: true,
    availableDays: ['Monday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    availableSlots: ['09:30 AM', '10:30 AM', '12:00 PM', '03:00 PM', '04:30 PM'],
    location: 'Aesthetics & Dermatology Wing - Suite 305'
  },
  {
    id: 'doc-3',
    slug: 'dr-amit-verma',
    name: 'Dr. Amit Verma',
    title: 'Senior Orthopedic & Joint Replacement Surgeon',
    specialty: 'Orthopedics',
    qualifications: 'MBBS, MS (Orthopedics), MCh Orth (UK), Robotic Joint Fellowship',
    experienceYears: 18,
    rating: 4.88,
    reviewCount: 298,
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    bio: 'Specialist in minimally invasive knee and hip preservation, sports medicine injuries, and robotic joint reconstructions.',
    fullBio: [
      'With over 3,000 joint reconstructions, Dr. Verma is an innovator in fast-track rehabilitation protocols, enabling patients to walk comfortably within hours post-procedure.'
    ],
    education: [
      'MS Orthopedics — Post Graduate Institute of Medical Education (PGIMER)',
      'MCh Orthopedics — University of Dundee, Scotland'
    ],
    awards: [
      'Surgical Innovation Medal — Indian Orthopaedic Association'
    ],
    consultationFee: 1600,
    availableToday: false,
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    availableSlots: ['10:00 AM', '11:00 AM', '02:00 PM', '03:30 PM', '05:00 PM'],
    location: 'Orthopedics & Spine Center - Suite 202'
  },
  {
    id: 'doc-4',
    slug: 'dr-ananya-sen',
    name: 'Dr. Ananya Sen',
    title: 'Consultant Pediatrician & Adolescent Care Specialist',
    specialty: 'Pediatrics',
    qualifications: 'MBBS, MD (Pediatrics), DNB (Pediatrics), MRCPCH (UK)',
    experienceYears: 10,
    rating: 4.97,
    reviewCount: 520,
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    bio: 'Dedicated to compassionate pediatric care, newborn wellness monitoring, developmental milestones, and childhood immunization.',
    fullBio: [
      'Dr. Ananya Sen brings unmatched empathy to children’s healthcare, fostering a warm, fear-free clinic experience for young patients and reassuring guidance for parents.'
    ],
    education: [
      'MD Pediatrics — Maulana Azad Medical College (MAMC)',
      'MRCPCH — Royal College of Paediatrics and Child Health, UK'
    ],
    awards: [
      'Excellence in Child Health & Immunization 2024'
    ],
    consultationFee: 1000,
    availableToday: true,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    availableSlots: ['08:30 AM', '09:30 AM', '11:00 AM', '03:00 PM', '04:30 PM'],
    location: 'Pediatric Care Pavilion - Suite 108'
  },
  {
    id: 'doc-5',
    slug: 'dr-vikram-mehta',
    name: 'Dr. Vikram Mehta',
    title: 'Director of Internal Medicine & Preventive Health',
    specialty: 'General Medicine',
    qualifications: 'MBBS, MD (Internal Medicine), FACP (USA)',
    experienceYears: 22,
    rating: 4.96,
    reviewCount: 680,
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
    bio: 'Master clinician in chronic disease management, metabolic syndrome, diabetic care, and comprehensive executive health screenings.',
    fullBio: [
      'Dr. Vikram Mehta is Aurevia’s Medical Director, specializing in multi-system chronic diagnostics and precision preventive health management.'
    ],
    education: [
      'MD Internal Medicine — Lady Hardinge Medical College & Associated Hospitals',
      'Fellowship of the American College of Physicians (FACP)'
    ],
    awards: [
      'Lifetime Achievement in Medical Practice 2023'
    ],
    consultationFee: 1400,
    availableToday: true,
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availableSlots: ['09:00 AM', '10:30 AM', '12:00 PM', '02:00 PM', '04:00 PM'],
    location: 'Executive Wellness & Diagnostic Suite 501'
  },
  {
    id: 'doc-6',
    slug: 'dr-kavita-deshmukh',
    name: 'Dr. Kavita Deshmukh',
    title: 'Senior Consultant Neurologist',
    specialty: 'Neurology',
    qualifications: 'MBBS, MD, DM (Neurology), Stroke & Epilepsy Specialist',
    experienceYears: 14,
    rating: 4.91,
    reviewCount: 245,
    avatar: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&w=800&q=80',
    bio: 'Specialist in migraine therapeutics, epilepsy management, neuromuscular disorders, and comprehensive stroke recovery care.',
    fullBio: [
      'Dr. Kavita Deshmukh is known for detailed neurological evaluations using digital EEG, EMG, and targeted therapy regimens.'
    ],
    education: [
      'DM Neurology — National Institute of Mental Health and Neurosciences (NIMHANS)',
      'MD Internal Medicine — Grant Medical College, Mumbai'
    ],
    awards: [
      'Neuro-Science Excellence Fellowship 2022'
    ],
    consultationFee: 1700,
    availableToday: false,
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    availableSlots: ['10:00 AM', '11:30 AM', '02:30 PM', '04:00 PM'],
    location: 'Neuro & Cognitive Sciences Wing - Suite 408'
  }
];

export const MOCK_SERVICES: ServiceTreatment[] = [
  {
    id: 'srv-1',
    slug: 'advanced-cardiology',
    name: 'Advanced Cardiology & Heart Screening',
    category: 'Cardiology',
    iconName: 'HeartPulse',
    shortDescription: 'Comprehensive cardiovascular assessment, 2D Echo, Stress ECG, and lipid profiling by senior cardiologists.',
    fullDescription: 'Our Advanced Cardiology department integrates high-precision diagnostic equipment including color Doppler echocardiography, digital Holter monitoring, and risk prediction algorithms to safeguard heart health.',
    symptoms: ['Chest discomfort or tightness', 'Shortness of breath with exertion', 'Palpitations or irregular heartbeat', 'High blood pressure', 'Family history of cardiac disease'],
    benefits: ['Early detection of arterial plaque', 'Personalized heart-healthy lifestyle roadmap', 'Same-day diagnostic reports', 'Direct consultation with lead cardiologist'],
    durationMinutes: 45,
    startingPrice: 2499,
    popular: true,
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    faqs: [
      { question: 'Do I need to fast before a cardiac checkup?', answer: 'Yes, a 10-12 hour overnight fast is recommended if your screening includes a fasting lipid profile and blood sugar test.' },
      { question: 'How long does the cardiac screening take?', answer: 'The comprehensive screening usually takes 45 to 60 minutes, including the 2D Echocardiogram and doctor consultation.' }
    ]
  },
  {
    id: 'srv-2',
    slug: 'clinical-dermatology-aesthetics',
    name: 'Clinical Dermatology & Laser Aesthetics',
    category: 'Dermatology',
    iconName: 'Sparkles',
    shortDescription: 'Evidence-based skincare, acne scarring treatment, laser resurfacing, and medical-grade dermatological procedures.',
    fullDescription: 'Target skin concerns with dermatologist-formulated protocols. From chronic eczema and psoriasis to acne scars, hyperpigmentation, and anti-aging laser therapy.',
    symptoms: ['Persistent acne or acne scarring', 'Uneven pigmentation and melasma', 'Hair thinning or scalp disorders', 'Chronic skin rashes, eczema, or psoriasis'],
    benefits: ['US-FDA approved laser technology', 'Personalized custom-tailored skin regimen', 'Safe for all skin types', 'Minimal to zero downtime'],
    durationMinutes: 30,
    startingPrice: 1999,
    popular: true,
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=800&q=80',
    faqs: [
      { question: 'Are laser treatments painful?', answer: 'Most of our treatments involve modern cooling tips and topical numbing creams to ensure near-painless experiences.' }
    ]
  },
  {
    id: 'srv-3',
    slug: 'executive-full-body-wellness',
    name: 'Executive Full Body Health Checkup',
    category: 'Preventive Care',
    iconName: 'ShieldCheck',
    shortDescription: '75+ vital parameters covering liver, kidney, thyroid, heart, vitamin levels, and complete physical assessment.',
    fullDescription: 'Designed for busy professionals and families, our Executive Wellness package gives complete clarity on metabolic function, internal organ health, and nutritional status with digital health scorecards.',
    symptoms: ['Chronic fatigue and low energy', 'Unexplained weight changes', 'Routine annual preventive health assessment', 'Sedentary desk lifestyle'],
    benefits: ['75+ biomarker blood tests', 'Abdominal ultrasound & chest imaging', 'Doctor consultation with report explanation', 'Digital health trends tracked in patient portal'],
    durationMinutes: 60,
    startingPrice: 3999,
    popular: true,
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    faqs: [
      { question: 'When will I receive my checkup reports?', answer: 'Digital reports are available in your portal within 6 hours, with hard copies provided during your same-day physician consultation.' }
    ]
  },
  {
    id: 'srv-4',
    slug: 'pediatric-wellness-immunization',
    name: 'Pediatric Care & Milestone Tracking',
    category: 'Pediatrics',
    iconName: 'Baby',
    shortDescription: 'Gentle newborn care, developmental milestone monitoring, painless vaccination schedules, and child wellness.',
    fullDescription: 'Our child-friendly pediatric suite ensures your little ones feel secure. Comprehensive tracking for growth curves, cognitive milestones, allergy management, and safe immunizations.',
    symptoms: ['Fever, cold, and seasonal allergies', 'Growth or developmental delays', 'Routine child vaccination schedule', 'Childhood nutrition & digestion issues'],
    benefits: ['Zero-wait appointment system for infants', 'Painless vaccination techniques', 'Warm, playful clinic environment', 'Direct WhatsApp line for pediatric emergencies'],
    durationMinutes: 30,
    startingPrice: 1200,
    popular: false,
    image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=800&q=80',
    faqs: [
      { question: 'Do you provide WHO-standard vaccination schedules?', answer: 'Yes, we strictly comply with WHO and IAP vaccination schedules with temperature-controlled cold chain logistics.' }
    ]
  },
  {
    id: 'srv-5',
    slug: 'orthopedic-joint-preservation',
    name: 'Orthopedic & Joint Preservation Clinic',
    category: 'Orthopedics',
    iconName: 'Activity',
    shortDescription: 'Advanced arthritis relief, joint injections, sports injury rehabilitation, and digital bone density DEXA scans.',
    fullDescription: 'Restore pain-free mobility with non-surgical joint preservation therapies, PRP regenerative injections, digital radiography, and personalized physiotherapy regimens.',
    symptoms: ['Knee, shoulder, or hip pain', 'Morning joint stiffness', 'Sports injuries and ligament strains', 'Lower back pain and sciatica'],
    benefits: ['High-resolution digital X-rays on site', 'Regenerative orthobiologic therapies', 'Integrated rehabilitation physiotherapy', 'Non-surgical preservation focus'],
    durationMinutes: 40,
    startingPrice: 1800,
    popular: false,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    faqs: [
      { question: 'Is surgery always required for severe knee pain?', answer: 'No. Over 80% of our patients achieve long-term pain relief through targeted physiotherapy, lifestyle changes, and regenerative joint therapies.' }
    ]
  },
  {
    id: 'srv-6',
    slug: 'comprehensive-neurology-headache',
    name: 'Neurology & Headache Management',
    category: 'Neurology',
    iconName: 'Brain',
    shortDescription: 'Targeted protocols for chronic migraines, peripheral neuropathy, sleep disorders, and cognitive wellness.',
    fullDescription: 'Specialized neurological diagnostic evaluations utilizing neuro-imaging review, nerve conduction studies, and advanced preventative migraine therapies.',
    symptoms: ['Frequent or severe headaches & migraines', 'Numbness or tingling in hands/feet', 'Dizziness, vertigo, or balance issues', 'Tremors or memory concerns'],
    benefits: ['Advanced migraine preventive therapy', 'Digital nerve conduction evaluations', 'Multidisciplinary neurological care team', 'Dedicated headache diary tracking'],
    durationMinutes: 45,
    startingPrice: 2100,
    popular: false,
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80',
    faqs: [
      { question: 'What triggers migraine attacks?', answer: 'Common triggers include stress, disrupted sleep cycles, bright lights, hormonal shifts, and specific dietary items. Our team works with you to identify your unique triggers.' }
    ]
  }
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    patientName: 'Sanjay Malhotra',
    patientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    serviceName: 'Cardiology Consultation',
    doctorName: 'Dr. Rahul Sharma',
    rating: 5,
    date: 'August 2026',
    verified: true,
    source: 'Google',
    comment: 'The level of care and precision at Aurevia Health is unlike any clinic I have visited. Dr. Rahul Sharma spent 40 minutes explaining my cardiac report without rushing. The entire clinic atmosphere is tranquil and supremely hygienic.'
  },
  {
    id: 't-2',
    patientName: 'Ritu Kapoor',
    patientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    serviceName: 'Dermatology Laser Treatment',
    doctorName: 'Dr. Priya Nair',
    rating: 5,
    date: 'July 2026',
    verified: true,
    source: 'Verified Patient',
    comment: 'I struggled with stubborn pigmentation for years. Dr. Priya designed a gentle 3-session laser therapy protocol that transformed my skin texture completely. The booking was effortless and zero wait times!'
  },
  {
    id: 't-3',
    patientName: 'Vikram & Sunita Mehra',
    patientAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    serviceName: 'Pediatric Care',
    doctorName: 'Dr. Ananya Sen',
    rating: 5,
    date: 'August 2026',
    verified: true,
    source: 'Google',
    comment: 'Dr. Ananya Sen is an angel with kids. My 4-year-old was terrified of doctor visits, but the child pavilion at Aurevia made him feel right at home. The vaccination was completely painless.'
  },
  {
    id: 't-4',
    patientName: 'Anil Singhania',
    patientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    serviceName: 'Executive Health Checkup',
    doctorName: 'Dr. Vikram Mehta',
    rating: 5,
    date: 'June 2026',
    verified: true,
    source: 'Trustpilot',
    comment: 'Flawless execution of their full body screening. From digital check-in to receiving all 75 parameters explained by Dr. Mehta in a private lounge with coffee. World-class medical infrastructure.'
  }
];

export const MOCK_FACILITIES: Facility[] = [
  {
    id: 'fac-1',
    title: 'Precision Diagnostic & Imaging Center',
    category: 'Diagnostics',
    description: 'Equipped with digital high-resolution 2D Echocardiography, DEXA bone densitometry, and automated biomarker laboratory analyzers.',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    features: ['Instant Digital Report Delivery', 'Zero Radiation Scatter Protocols', 'NABL Calibrated Instrumentation']
  },
  {
    id: 'fac-2',
    title: 'Private Consultation Suites',
    category: 'Patient Experience',
    description: 'Acoustically insulated, serene consultation rooms designed for deep patient-doctor dialogues and utmost confidentiality.',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
    features: ['Ergonomic Examination Lounges', 'Touchscreen Patient Education Displays', 'HEPA 14 Air Filtration']
  },
  {
    id: 'fac-3',
    title: 'Advanced Dermatological Laser Suite',
    category: 'Specialist Surgery',
    description: 'Sterile procedure suites hosting US-FDA cleared fractional lasers, radiofrequency microneedling, and photo-rejuvenation technology.',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80',
    features: ['Cryo-Cooling Patient Comfort Systems', 'Triple-Wavelength Laser Platforms', 'Positive Pressure Sterility']
  },
  {
    id: 'fac-4',
    title: 'Dedicated Pediatric Pavilion',
    category: 'Pediatrics',
    description: 'Vibrant, fear-free recovery and examination zone with interactive games, child-friendly scales, and peaceful immunization rooms.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    features: ['Child Play Discovery Area', 'Infant Feeding & Nursing Suites', 'Sanitized Interactive Toys']
  }
];

export const MOCK_ARTICLES: Article[] = [
  {
    id: 'art-1',
    slug: 'understanding-blood-pressure-preventive-guide',
    title: 'Beyond the Numbers: The Modern Guide to Optimal Blood Pressure Management',
    category: 'Cardiology',
    readTime: '5 min read',
    publishedDate: 'August 10, 2026',
    author: {
      name: 'Dr. Rahul Sharma',
      role: 'Lead Cardiologist',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=400&q=80'
    },
    summary: 'Why isolated high readings differ from arterial stiffness, and the 4 lifestyle shifts that lower cardiovascular risk by 35%.',
    content: [
      'Hypertension is often labeled the "silent epidemic" because it quietly exerts chronic shear stress on delicate blood vessel linings without noticeable early symptoms.',
      'Recent cardiology guidelines emphasize 24-hour ambulatory blood pressure monitoring over single in-clinic measurements. Factors like circadian dipping and morning surges offer crucial prognostic signals.',
      'Key actionable steps: Incorporate potassium-rich foods, maintain regular zone-2 cardiovascular exercise, optimize restorative deep sleep, and screen early if there is family history.'
    ],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    tags: ['Cardiology', 'Preventive Health', 'Blood Pressure', 'Wellness']
  },
  {
    id: 'art-2',
    slug: 'skin-barrier-restoration-dermatology-secrets',
    title: 'Restoring Your Skin Barrier: Dermatologist-Approved Protocols',
    category: 'Dermatology',
    readTime: '4 min read',
    publishedDate: 'August 4, 2026',
    author: {
      name: 'Dr. Priya Nair',
      role: 'Chief Dermatologist',
      avatar: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&w=400&q=80'
    },
    summary: 'How over-exfoliation compromises skin defenses and the scientifically proven lipid ratio needed for recovery.',
    content: [
      'The stratum corneum acts as your body’s primary defensive shield against environmental pollutants, oxidative stress, and microbial invasion.',
      'When this lipid matrix is stripped by harsh cleansers or excessive actives, transepidermal water loss surges, triggering inflammation and breakouts.',
      'Rebuild your barrier with ceramide-dominant moisturizers, niacinamide, and broad-spectrum zinc oxide sun protection daily.'
    ],
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    tags: ['Dermatology', 'Skincare', 'Aesthetics', 'Health Tips']
  },
  {
    id: 'art-3',
    slug: 'when-to-see-a-specialist-early-warning-signs',
    title: 'When to Consult a Specialist: 5 Overlooked Warning Signs',
    category: 'General Medicine',
    readTime: '6 min read',
    publishedDate: 'July 28, 2026',
    author: {
      name: 'Dr. Vikram Mehta',
      role: 'Internal Medicine Director',
      avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80'
    },
    summary: 'Recognizing subtle biomarker shifts and symptoms before they develop into chronic medical conditions.',
    content: [
      'Proactive healthcare shifts the paradigm from treating illnesses reactively to optimizing vitality proactively.',
      'Persistent morning joint stiffness, subtle exercise-induced breathlessness, unexplained metabolic fluctuations, and chronic digestive disturbances warrant comprehensive biomarker profiling.'
    ],
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
    tags: ['General Health', 'Diagnostics', 'Preventive Care']
  }
];

export const MOCK_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Appointments',
    question: 'How do I book and confirm an appointment at Aurevia Health?',
    answer: 'You can book seamlessly via our online 6-step booking wizard in under 2 minutes. Choose your doctor, pick your preferred date and time slot, enter patient details, and receive instant SMS and WhatsApp confirmations.'
  },
  {
    id: 'faq-2',
    category: 'Appointments',
    question: 'What is the cancellation or rescheduling policy?',
    answer: 'We offer hassle-free rescheduling up to 2 hours prior to your scheduled consultation through your confirmation link or by contacting our concierge desk.'
  },
  {
    id: 'faq-3',
    category: 'Consultation',
    question: 'What documents should I bring for my first consultation?',
    answer: 'Please bring any previous medical records, recent diagnostic blood tests, current medication prescriptions, and a government ID. Digital copies can also be shared directly with our reception.'
  },
  {
    id: 'faq-4',
    category: 'Billing & Insurance',
    question: 'Do you accept health insurance and cashless claims?',
    answer: 'Yes, Aurevia Health is empaneled with all major insurance providers and Third Party Administrators (TPAs) for cashless and reimbursement claim documentation.'
  },
  {
    id: 'faq-5',
    category: 'Facilities',
    question: 'Is valet parking and wheelchair access available on-site?',
    answer: 'Yes, our clinic building features complimentary valet parking, step-free wheelchair ramps, wide elevators, and dedicated accessibility assistance staff at the entrance.'
  },
  {
    id: 'faq-6',
    category: 'General',
    question: 'How does Aurevia protect patient medical privacy?',
    answer: 'We strictly adhere to healthcare data privacy regulations (HIPAA/GDPR principles). All electronic health records are encrypted in transit and at rest, and never shared with third parties.'
  }
];

export const INITIAL_ADMIN_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    confirmationCode: 'AU-2026-08-20-0215',
    patientName: 'Sarah Jenkins',
    patientPhone: '+91 98112 34567',
    patientEmail: 'sarah.j@example.com',
    patientDob: '1988-04-12',
    doctor: MOCK_DOCTORS[0],
    service: MOCK_SERVICES[0],
    date: '2026-08-20',
    timeSlot: '11:30 AM',
    reasonForVisit: 'Annual cardiovascular risk screening and blood pressure review',
    status: 'Confirmed',
    createdAt: '2026-08-15T10:30:00Z',
    notes: 'Patient requested reports via WhatsApp'
  },
  {
    id: 'apt-102',
    confirmationCode: 'AU-2026-08-21-0318',
    patientName: 'Ahmad Al-Mansoor',
    patientPhone: '+91 98765 99881',
    patientEmail: 'ahmad.m@example.com',
    patientDob: '1992-09-24',
    doctor: MOCK_DOCTORS[1],
    service: MOCK_SERVICES[1],
    date: '2026-08-21',
    timeSlot: '02:00 PM',
    reasonForVisit: 'Acne scarring laser therapy consultation',
    status: 'Pending',
    createdAt: '2026-08-15T12:45:00Z'
  },
  {
    id: 'apt-103',
    confirmationCode: 'AU-2026-08-22-0402',
    patientName: 'Priya Mukherjee',
    patientPhone: '+91 99543 21980',
    patientEmail: 'priya.m@example.com',
    doctor: MOCK_DOCTORS[3],
    service: MOCK_SERVICES[3],
    date: '2026-08-22',
    timeSlot: '03:30 PM',
    reasonForVisit: 'Toddler 2-year vaccination and growth chart review',
    status: 'Confirmed',
    createdAt: '2026-08-14T15:20:00Z'
  },
  {
    id: 'apt-104',
    confirmationCode: 'AU-2026-08-19-0112',
    patientName: 'Rajesh Khanna',
    patientPhone: '+91 98450 12345',
    patientEmail: 'rajesh.k@example.com',
    doctor: MOCK_DOCTORS[4],
    service: MOCK_SERVICES[2],
    date: '2026-08-19',
    timeSlot: '09:00 AM',
    reasonForVisit: 'Comprehensive Executive Health Screening',
    status: 'Completed',
    createdAt: '2026-08-13T09:15:00Z',
    notes: 'Report emailed to patient'
  }
];

export const INITIAL_ADMIN_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Rohit Batra',
    phone: '+91 98711 22334',
    email: 'rohit.b@example.com',
    source: 'Website Form',
    serviceInterested: 'Executive Full Body Health Checkup',
    status: 'New',
    createdAt: '2026-08-15T08:30:00Z',
    notes: 'Inquired about corporate package for 4 family members'
  },
  {
    id: 'lead-2',
    name: 'Meenakshi Iyer',
    phone: '+91 98200 44556',
    email: 'meenakshi.i@example.com',
    source: 'WhatsApp',
    serviceInterested: 'Clinical Dermatology & Laser Aesthetics',
    status: 'Contacted',
    createdAt: '2026-08-15T09:40:00Z',
    notes: 'Sent price list via WhatsApp; waiting on date confirmation'
  },
  {
    id: 'lead-3',
    name: 'Karan Grover',
    phone: '+91 97170 88990',
    email: 'karan.g@example.com',
    source: 'Direct Call',
    serviceInterested: 'Orthopedic Joint Preservation',
    status: 'Qualified',
    createdAt: '2026-08-14T16:00:00Z',
    notes: 'Suffering from sports knee injury; doctor slot recommended for Thursday'
  },
  {
    id: 'lead-4',
    name: 'Deepak Sharma',
    phone: '+91 98101 11223',
    email: 'deepak.s@example.com',
    source: 'Landing Page',
    serviceInterested: 'Advanced Cardiology & Heart Screening',
    status: 'Booked',
    createdAt: '2026-08-14T11:20:00Z',
    notes: 'Converted to appointment #AU-2026-08-20-0215'
  }
];

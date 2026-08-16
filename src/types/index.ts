export type Specialty = 
  | 'Cardiology' 
  | 'Dermatology' 
  | 'General Medicine' 
  | 'Pediatrics' 
  | 'Orthopedics' 
  | 'Dental Care' 
  | 'Neurology' 
  | 'Preventive Care';

export interface Doctor {
  id: string;
  slug: string;
  name: string;
  title: string;
  specialty: Specialty;
  qualifications: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  avatar: string;
  bio: string;
  fullBio: string[];
  education: string[];
  awards: string[];
  consultationFee: number;
  availableToday: boolean;
  availableDays: string[];
  availableSlots: string[];
  location: string;
}

export interface ServiceTreatment {
  id: string;
  slug: string;
  name: string;
  category: Specialty;
  iconName: string;
  shortDescription: string;
  fullDescription: string;
  symptoms: string[];
  benefits: string[];
  durationMinutes: number;
  startingPrice: number;
  popular: boolean;
  image: string;
  faqs: { question: string; answer: string }[];
}

export interface Testimonial {
  id: string;
  patientName: string;
  patientAvatar?: string;
  serviceName: string;
  doctorName: string;
  rating: number;
  date: string;
  verified: boolean;
  source: 'Google' | 'Verified Patient' | 'Trustpilot';
  comment: string;
}

export interface Facility {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  features: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  summary: string;
  content: string[];
  image: string;
  tags: string[];
}

export interface FAQItem {
  id: string;
  category: 'General' | 'Appointments' | 'Consultation' | 'Billing & Insurance' | 'Facilities';
  question: string;
  answer: string;
}

export type AppointmentStatus = 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled' | 'No-show';

export interface Appointment {
  id: string;
  confirmationCode: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  patientDob?: string;
  doctor: Doctor;
  service: ServiceTreatment;
  date: string;
  timeSlot: string;
  reasonForVisit?: string;
  status: AppointmentStatus;
  createdAt: string;
  notes?: string;
}

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Booked' | 'Lost';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  source: 'Website Form' | 'WhatsApp' | 'Direct Call' | 'Landing Page';
  serviceInterested: string;
  status: LeadStatus;
  createdAt: string;
  notes?: string;
}

export interface ClinicInfo {
  name: string;
  tagline: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  emergencyPhone: string;
  email: string;
  whatsappNumber: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  googleRating: number;
  totalReviews: number;
}

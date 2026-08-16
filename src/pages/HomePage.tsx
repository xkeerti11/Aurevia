import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { TrustMetricsSection } from '../components/home/TrustMetricsSection';
import { ServicesSection } from '../components/home/ServicesSection';
import { FeaturedDoctorsSection } from '../components/home/FeaturedDoctorsSection';
import { WhyAureviaSection } from '../components/home/WhyAureviaSection';
import { FeaturedTreatmentSection } from '../components/home/FeaturedTreatmentSection';
import { PatientJourneySection } from '../components/home/PatientJourneySection';
import { ReviewsSection } from '../components/home/ReviewsSection';
import { ClinicGallerySection } from '../components/home/ClinicGallerySection';
import { FAQSection } from '../components/home/FAQSection';
import { ContactMapSection } from '../components/home/ContactMapSection';
import { DarkCtaSection } from '../components/home/DarkCtaSection';
import { Doctor, ServiceTreatment } from '../types';

interface HomePageProps {
  onNavigate: (path: string) => void;
  onSelectDoctor: (doctor: Doctor) => void;
  onSelectService: (service: ServiceTreatment) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectDoctor,
  onSelectService
}) => {
  return (
    <div>
      {/* 01. Hero Section */}
      <HeroSection
        onBookClick={() => onNavigate('/appointment')}
        onExploreClick={() => onNavigate('/treatments')}
      />

      {/* 02. Trust Metrics */}
      <TrustMetricsSection />

      {/* 03. Medical Specialties & Services */}
      <ServicesSection
        onSelectService={(srv) => onSelectService(srv)}
        onViewAllClick={() => onNavigate('/treatments')}
      />

      {/* 04. Featured Specialists */}
      <FeaturedDoctorsSection
        onSelectDoctor={(doc) => onSelectDoctor(doc)}
        onBookDoctor={(doc) => {
          onSelectDoctor(doc);
          onNavigate('/appointment');
        }}
        onViewAllDoctors={() => onNavigate('/doctors')}
      />

      {/* 05. The Aurevia Advantage / Value Proposition */}
      <WhyAureviaSection />

      {/* 06. Editorial Spotlight */}
      <FeaturedTreatmentSection
        onSelectService={(srv) => onSelectService(srv)}
      />

      {/* 07. Interactive Patient Journey Timeline */}
      <PatientJourneySection />

      {/* 08. Patient Reviews & Testimonials Carousel */}
      <ReviewsSection />

      {/* 09. World-Class Clinic Infrastructure Gallery */}
      <ClinicGallerySection />

      {/* 10. Frequently Asked Questions Accordion */}
      <FAQSection />

      {/* 11. Location, Map & Timings */}
      <ContactMapSection />

      {/* 12. High-Conversion Final CTA */}
      <DarkCtaSection
        onBookClick={() => onNavigate('/appointment')}
      />
    </div>
  );
};

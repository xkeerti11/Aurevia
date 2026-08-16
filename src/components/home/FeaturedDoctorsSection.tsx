import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { DoctorCard } from '../cards/DoctorCard';
import { Doctor } from '../../types';
import { MOCK_DOCTORS } from '../../data/mockData';

interface FeaturedDoctorsSectionProps {
  onSelectDoctor: (doctor: Doctor) => void;
  onBookDoctor: (doctor: Doctor) => void;
  onViewAllDoctors: () => void;
}

export const FeaturedDoctorsSection: React.FC<FeaturedDoctorsSectionProps> = ({
  onSelectDoctor,
  onBookDoctor,
  onViewAllDoctors
}) => {
  return (
    <section className="section-padding" style={{ background: '#FFFFFF' }}>
      <div className="container">
        <SectionHeader
          eyebrow="DISTINGUISHED MEDICAL FACULTY"
          title="Consult with Senior Medical Specialists"
          description="Our physicians are alumni of premier global and Indian institutions, committed to evidence-based medicine and empathetic patient care."
          actionText="Meet All Doctors"
          onActionClick={onViewAllDoctors}
        />

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '28px'
          }}
        >
          {MOCK_DOCTORS.slice(0, 4).map(doctor => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onSelectDoctor={onSelectDoctor}
              onBookDoctor={onBookDoctor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

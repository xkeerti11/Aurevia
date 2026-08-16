import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { TreatmentCard } from '../cards/TreatmentCard';
import { ServiceTreatment } from '../../types';
import { MOCK_SERVICES } from '../../data/mockData';

interface ServicesSectionProps {
  onSelectService: (service: ServiceTreatment) => void;
  onViewAllClick: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onViewAllClick
}) => {
  return (
    <section className="section-padding" style={{ background: 'var(--background)' }}>
      <div className="container">
        <SectionHeader
          eyebrow="COMPREHENSIVE MEDICAL CARE"
          title="Specialized Departments Built Around Your Health"
          description="From preventive screenings to advanced surgical interventions, our multidisciplinary team delivers seamless care under one roof."
          actionText="View All Treatments & Services"
          onActionClick={onViewAllClick}
        />

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px'
          }}
        >
          {MOCK_SERVICES.map(service => (
            <TreatmentCard
              key={service.id}
              service={service}
              onSelectService={onSelectService}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

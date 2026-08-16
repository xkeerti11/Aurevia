import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { FacilityCard } from '../components/cards/FacilityCard';
import { MOCK_FACILITIES } from '../data/mockData';

export const FacilitiesPage: React.FC = () => {
  return (
    <div className="section-padding" style={{ background: 'var(--background)' }}>
      <div className="container">
        <SectionHeader
          eyebrow="INFRASTRUCTURE & SUITES"
          title="Designed for Sterile Precision & Patient Comfort"
          description="Explore our diagnostic laboratories, procedure suites, and child-friendly pavilions engineered for peace of mind."
        />

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px'
          }}
        >
          {MOCK_FACILITIES.map(facility => (
            <FacilityCard
              key={facility.id}
              facility={facility}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

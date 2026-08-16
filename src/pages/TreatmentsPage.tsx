import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { TreatmentCard } from '../components/cards/TreatmentCard';
import { ServiceTreatment, Specialty } from '../types';
import { MOCK_SERVICES } from '../data/mockData';
import { Search } from 'lucide-react';

interface TreatmentsPageProps {
  onSelectService: (service: ServiceTreatment) => void;
  onBookService: (service: ServiceTreatment) => void;
}

export const TreatmentsPage: React.FC<TreatmentsPageProps> = ({
  onSelectService,
  onBookService
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Specialty | 'All'>('All');

  const categories: (Specialty | 'All')[] = [
    'All',
    'Cardiology',
    'Dermatology',
    'General Medicine',
    'Pediatrics',
    'Orthopedics',
    'Neurology',
    'Preventive Care'
  ];

  const filteredServices = MOCK_SERVICES.filter(service => {
    const matchesSearch = 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="section-padding" style={{ background: 'var(--background)' }}>
      <div className="container">
        <SectionHeader
          eyebrow="TREATMENTS & CLINICAL DEPARTMENTS"
          title="Evidence-Based Specialized Medical Services"
          description="Explore our specialized clinical therapies, preventive checkups, and diagnostic screenings with transparent procedure information."
        />

        {/* Filters and Search Bar */}
        <div 
          style={{
            background: '#FFFFFF',
            padding: '20px 24px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--elevation-1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '36px'
          }}
        >
          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '13px',
                  fontWeight: '600',
                  background: selectedCategory === cat ? 'var(--primary)' : 'var(--surface-soft)',
                  color: selectedCategory === cat ? '#FFFFFF' : 'var(--text-secondary)',
                  border: '1px solid',
                  borderColor: selectedCategory === cat ? 'var(--primary)' : 'var(--border)',
                  transition: 'all 200ms var(--ease-out)'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <Search size={16} color="var(--text-tertiary)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search treatments or symptoms..."
              className="form-input"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '38px', height: '42px', fontSize: '13px' }}
            />
          </div>
        </div>

        {/* Services Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px'
          }}
        >
          {filteredServices.map(service => (
            <TreatmentCard
              key={service.id}
              service={service}
              onSelectService={onSelectService}
              onBookService={onBookService}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

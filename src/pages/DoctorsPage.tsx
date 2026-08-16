import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { DoctorCard } from '../components/cards/DoctorCard';
import { Doctor, Specialty } from '../types';
import { MOCK_DOCTORS } from '../data/mockData';
import { Search } from 'lucide-react';

interface DoctorsPageProps {
  onSelectDoctor: (doctor: Doctor) => void;
  onBookDoctor: (doctor: Doctor) => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({
  onSelectDoctor,
  onBookDoctor
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | 'All'>('All');

  const specialties: (Specialty | 'All')[] = [
    'All',
    'Cardiology',
    'Dermatology',
    'General Medicine',
    'Pediatrics',
    'Orthopedics',
    'Neurology'
  ];

  const filteredDoctors = MOCK_DOCTORS.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.qualifications.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesSpecialty = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;

    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="section-padding" style={{ background: 'var(--background)' }}>
      <div className="container">
        <SectionHeader
          eyebrow="MEDICAL BOARD & FACULTY"
          title="Meet Our Board-Certified Specialists"
          description="Experienced department heads and consultants dedicated to clinical accuracy, compassionate care, and personalized medical solutions."
        />

        {/* Filter & Search Toolbar */}
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
          {/* Specialty Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {specialties.map(spec => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '13px',
                  fontWeight: '600',
                  background: selectedSpecialty === spec ? 'var(--primary)' : 'var(--surface-soft)',
                  color: selectedSpecialty === spec ? '#FFFFFF' : 'var(--text-secondary)',
                  border: '1px solid',
                  borderColor: selectedSpecialty === spec ? 'var(--primary)' : 'var(--border)',
                  transition: 'all 200ms var(--ease-out)'
                }}
              >
                {spec}
              </button>
            ))}
          </div>

          {/* Search Field */}
          <div style={{ position: 'relative', minWidth: '260px' }}>
            <Search size={16} color="var(--text-tertiary)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by doctor name or specialty..."
              className="form-input"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '38px', height: '42px', fontSize: '13px' }}
            />
          </div>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length > 0 ? (
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px'
            }}
          >
            {filteredDoctors.map(doctor => (
              <DoctorCard
                key={doctor.id}
                doctor={doctor}
                onSelectDoctor={onSelectDoctor}
                onBookDoctor={onBookDoctor}
              />
            ))}
          </div>
        ) : (
          <div 
            style={{ 
              textAlign: 'center', 
              padding: '64px 20px', 
              background: '#FFFFFF', 
              borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--border)' 
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
              No Specialists Found
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Try adjusting your search keywords or specialty filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

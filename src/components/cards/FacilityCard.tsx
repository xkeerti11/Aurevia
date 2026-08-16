import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Facility } from '../../types';

interface FacilityCardProps {
  facility: Facility;
  onClick?: () => void;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({ facility, onClick }) => {
  return (
    <div
      className="card-luxury"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#FFFFFF',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default'
      }}
      onClick={onClick}
    >
      <div style={{ height: '240px', width: '100%', overflow: 'hidden', position: 'relative' }}>
        <img
          src={facility.image}
          alt={facility.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 400ms var(--ease-out)' }}
          loading="lazy"
        />
        <div
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            padding: '3px 10px',
            borderRadius: 'var(--radius-full)',
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          {facility.category}
        </div>
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px', color: 'var(--text-primary)' }}>
          {facility.title}
        </h3>

        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '16px', flex: 1 }}>
          {facility.description}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
          {facility.features.map((feat, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <CheckCircle size={13} color="var(--primary)" style={{ flexShrink: 0 }} />
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

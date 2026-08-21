import React from 'react';
import { Award, Users, Stethoscope, Star } from 'lucide-react';

export const TrustMetricsSection: React.FC = () => {
  const metrics = [
    {
      icon: <Award size={24} color="var(--primary)" />,
      number: '16+',
      label: 'Years of Clinical Care',
      sub: 'Serving NCR & global patients'
    },
    {
      icon: <Users size={24} color="var(--primary)" />,
      number: '25,000+',
      label: 'Patients Treated',
      sub: 'Across 8 core specialties'
    },
    {
      icon: <Stethoscope size={24} color="var(--primary)" />,
      number: '20+',
      label: 'Specialist Doctors',
      sub: 'AIIMS & UK trained alumni'
    },
    {
      icon: <Star size={24} color="#F59E0B" fill="#F59E0B" />,
      number: '4.95★',
      label: 'Patient Rating',
      sub: '1,280+ verified reviews'
    }
  ];

  return (
    <section 
      style={{
        background: '#FFFFFF',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: 'clamp(32px, 4vw, 56px) 0'
      }}
    >
      <div className="container">
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 140px), 1fr))',
            gap: 'clamp(16px, 3vw, 32px)'
          }}
        >
          {metrics.map((m, idx) => (
            <div 
              key={idx}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                padding: 'clamp(8px, 1.5vw, 16px)'
              }}
            >
              <div 
                style={{
                  width: 'clamp(44px, 5vw, 56px)',
                  height: 'clamp(44px, 5vw, 56px)',
                  borderRadius: '14px',
                  background: 'var(--surface-soft)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '12px'
                }}
              >
                {m.icon}
              </div>

              <div 
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'clamp(24px, 3.2vw, 38px)',
                  fontWeight: '800',
                  color: 'var(--primary)',
                  letterSpacing: '-0.8px',
                  lineHeight: '1.1',
                  marginBottom: '4px'
                }}
              >
                {m.number}
              </div>

              <div 
                style={{
                  fontSize: 'clamp(12.5px, 1.2vw, 14.5px)',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  marginBottom: '2px'
                }}
              >
                {m.label}
              </div>

              <div 
                style={{
                  fontSize: 'clamp(11px, 1vw, 12.5px)',
                  color: 'var(--text-tertiary)'
                }}
              >
                {m.sub}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

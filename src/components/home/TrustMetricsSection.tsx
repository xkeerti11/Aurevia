import React from 'react';
import { Award, Users, Stethoscope, Star } from 'lucide-react';

export const TrustMetricsSection: React.FC = () => {
  const metrics = [
    {
      icon: <Award size={28} color="var(--primary)" />,
      number: '16+',
      label: 'Years of Clinical Excellence',
      sub: 'Serving Delhi NCR & global patients'
    },
    {
      icon: <Users size={28} color="var(--primary)" />,
      number: '25,000+',
      label: 'Patients Healed & Treated',
      sub: 'Across 8 core clinical specialties'
    },
    {
      icon: <Stethoscope size={28} color="var(--primary)" />,
      number: '20+',
      label: 'Board-Certified Specialists',
      sub: 'Top medical university alumni'
    },
    {
      icon: <Star size={28} color="#F59E0B" fill="#F59E0B" />,
      number: '4.95★',
      label: 'Patient Trust & Satisfaction',
      sub: 'Based on 1,280+ verified reviews'
    }
  ];

  return (
    <section 
      style={{
        background: '#FFFFFF',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '56px 0'
      }}
    >
      <div className="container">
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '32px'
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
                padding: '16px'
              }}
            >
              <div 
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '16px',
                  background: 'var(--surface-soft)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px'
                }}
              >
                {m.icon}
              </div>

              <div 
                style={{
                  fontFamily: 'var(--font-primary)',
                  fontSize: 'clamp(32px, 3.5vw, 42px)',
                  fontWeight: '800',
                  color: 'var(--primary)',
                  letterSpacing: '-1px',
                  lineHeight: '1.1',
                  marginBottom: '6px'
                }}
              >
                {m.number}
              </div>

              <div 
                style={{
                  fontSize: '15px',
                  fontWeight: '700',
                  color: 'var(--text-primary)',
                  marginBottom: '4px'
                }}
              >
                {m.label}
              </div>

              <div 
                style={{
                  fontSize: '12px',
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

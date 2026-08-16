import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';
import { MOCK_SERVICES } from '../../data/mockData';
import { ServiceTreatment } from '../../types';

interface FeaturedTreatmentSectionProps {
  onSelectService: (service: ServiceTreatment) => void;
}

export const FeaturedTreatmentSection: React.FC<FeaturedTreatmentSectionProps> = ({ onSelectService }) => {
  const featured = MOCK_SERVICES[1]; // Clinical Dermatology & Laser Aesthetics

  return (
    <section className="section-padding" style={{ background: '#FFFFFF' }}>
      <div className="container">
        <div 
          style={{
            background: 'linear-gradient(135deg, #093D3B 0%, #0F766E 100%)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(32px, 5vw, 64px)',
            color: '#FFFFFF',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            alignItems: 'center',
            boxShadow: 'var(--elevation-4)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Background Glow */}
          <div 
            style={{
              position: 'absolute',
              top: '-50%',
              right: '-20%',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(20, 184, 166, 0.25) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          {/* Left Content */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(8px)',
                color: '#2DD4BF',
                fontSize: '11px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '16px'
              }}
            >
              <Sparkles size={14} />
              <span>EDITORIAL CLINICAL SPOTLIGHT</span>
            </div>

            <h2 className="display-lg" style={{ color: '#FFFFFF', marginBottom: '16px', fontSize: 'clamp(28px, 3.5vw, 42px)' }}>
              {featured.name}
            </h2>

            <p style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.6', marginBottom: '24px' }}>
              Experience customized dermatological care utilizing state-of-the-art fractional laser and pigment therapies overseen by lead specialist <strong>Dr. Priya Nair</strong>.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '32px' }}>
              {featured.benefits.map((benefit, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.9)' }}>
                  <CheckCircle2 size={16} color="#2DD4BF" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onSelectService(featured)}
              className="btn btn-secondary"
              style={{
                background: '#FFFFFF',
                color: 'var(--primary-darker)',
                border: 'none',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)'
              }}
            >
              <span>Explore Treatment Protocol</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Visual */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div 
              style={{
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 12px 36px rgba(0, 0, 0, 0.3)',
                border: '3px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              <img
                src={featured.image}
                alt={featured.name}
                style={{ width: '100%', height: '360px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

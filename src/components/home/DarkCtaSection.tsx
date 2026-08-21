import React from 'react';
import { Calendar, Phone, ShieldCheck } from 'lucide-react';
import { CLINIC_INFO } from '../../data/mockData';

interface DarkCtaSectionProps {
  onBookClick: () => void;
}

export const DarkCtaSection: React.FC<DarkCtaSectionProps> = ({ onBookClick }) => {
  return (
    <section 
      style={{
        background: 'linear-gradient(135deg, #093D3B 0%, #0F766E 100%)',
        color: '#FFFFFF',
        padding: 'clamp(48px, 6vw, 96px) 0',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Medical Environment Image Overlay */}
      <img
        src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80"
        alt="Medical Clinic Ambience"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.12,
          mixBlendMode: 'luminosity',
          pointerEvents: 'none'
        }}
      />

      {/* Background Ornaments */}
      <div 
        style={{
          position: 'absolute',
          top: '-30%',
          left: '-10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(20, 184, 166, 0.2) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '-30%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(2, 132, 199, 0.2) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', maxWidth: '780px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(8px)',
            color: '#2DD4BF',
            fontSize: 'clamp(10.5px, 1.2vw, 12px)',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '16px'
          }}
        >
          <ShieldCheck size={15} />
          <span>YOUR HEALTH DESERVES THE BEST</span>
        </div>

        <h2 
          className="display-lg"
          style={{
            color: '#FFFFFF',
            marginBottom: '16px',
            fontSize: 'clamp(26px, 3.8vw, 48px)'
          }}
        >
          Ready to Experience Healthcare Without Compromise?
        </h2>

        <p 
          style={{
            fontSize: 'clamp(14.5px, 1.2vw, 17px)',
            color: 'rgba(255, 255, 255, 0.88)',
            lineHeight: '1.6',
            marginBottom: '28px',
            maxWidth: '620px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}
        >
          Consult with our board-certified specialists. Book online in 2 minutes with instant confirmation and dedicated patient concierge support.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={onBookClick}
            className="btn btn-secondary btn-lg btn-mobile-block"
            style={{
              background: '#FFFFFF',
              color: 'var(--primary-darker)',
              border: 'none',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)'
            }}
          >
            <Calendar size={18} />
            <span>Book Appointment Online</span>
          </button>

          <a
            href={`tel:${CLINIC_INFO.phone}`}
            className="btn btn-ghost btn-lg btn-mobile-block"
            style={{
              color: '#FFFFFF',
              border: '1.5px solid rgba(255, 255, 255, 0.4)',
              background: 'rgba(255, 255, 255, 0.08)'
            }}
          >
            <Phone size={18} />
            <span>Call {CLINIC_INFO.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
};

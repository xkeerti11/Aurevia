import React from 'react';
import { ShieldCheck, Calendar, ArrowRight, Star, Award, CheckCircle2 } from 'lucide-react';
import { CLINIC_INFO } from '../../data/mockData';

interface HeroSectionProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onBookClick, onExploreClick }) => {
  return (
    <section 
      style={{
        position: 'relative',
        paddingTop: 'clamp(28px, 4.5vw, 64px)',
        paddingBottom: 'clamp(40px, 5.5vw, 80px)',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
            alignItems: 'center',
            gap: 'clamp(28px, 4vw, 56px)'
          }}
        >
          {/* Left Column (Content & CTAs) */}
          <div style={{ maxWidth: '620px' }}>
            <div 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)',
                background: 'var(--primary-alpha-10)',
                color: 'var(--primary)',
                border: '1px solid var(--primary-alpha-20)',
                fontSize: 'clamp(11px, 1.2vw, 12px)',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '16px'
              }}
            >
              <ShieldCheck size={15} />
              <span>Modern Healthcare. Human Care.</span>
            </div>

            <h1 
              className="display-lg"
              style={{ 
                color: 'var(--text-primary)', 
                marginBottom: '18px',
                letterSpacing: '-1.2px'
              }}
            >
              Exceptional Medical Care, <br />
              <span 
                style={{ 
                  background: 'linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Designed Around You.
              </span>
            </h1>

            <p 
              className="body-large"
              style={{ 
                color: 'var(--text-secondary)', 
                marginBottom: '28px',
                maxWidth: '540px'
              }}
            >
              Experience world-class multi-specialty clinical care. Verified board specialists, advanced same-day diagnostics, and frictionless appointment booking.
            </p>

            {/* CTAs (Stack on mobile, row on desktop) */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'stretch', 
                gap: '12px', 
                flexWrap: 'wrap', 
                marginBottom: '32px' 
              }}
            >
              <button 
                onClick={onBookClick}
                className="btn btn-primary btn-lg btn-mobile-block"
                style={{ boxShadow: 'var(--shadow-glow)' }}
              >
                <Calendar size={18} />
                <span>Book Consultation</span>
              </button>

              <button 
                onClick={onExploreClick}
                className="btn btn-secondary btn-lg btn-mobile-block"
              >
                <span>Explore Specialties</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Trust Markers */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '16px 20px', 
                paddingTop: '20px', 
                borderTop: '1px solid var(--border)',
                flexWrap: 'wrap'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--success)' }} />
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                  Same-Day Slots Available
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={15} color="var(--primary)" />
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                  Zero Wait-Time Guarantee
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={15} color="var(--primary)" />
                <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary)' }}>
                  NABH & NABL Accredited
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Safe Floating Glass Badges */}
          <div style={{ position: 'relative', width: '100%', maxWidth: '560px', margin: '0 auto' }}>
            <div 
              style={{
                borderRadius: 'clamp(18px, 3vw, 28px)',
                overflow: 'hidden',
                boxShadow: 'var(--elevation-4)',
                border: '3px solid #FFFFFF',
                position: 'relative'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80"
                alt="Aurevia Health Clinic Suite"
                style={{
                  width: '100%',
                  height: 'clamp(260px, 40vw, 460px)',
                  objectFit: 'cover'
                }}
              />
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 60%, rgba(15, 23, 42, 0.4) 100%)'
                }}
              />
            </div>

            {/* Floating Glass Badge 1: Rating (Safe Positioning) */}
            <div
              className="glass-panel"
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '12px',
                padding: '10px 16px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                maxWidth: 'calc(100% - 24px)',
                boxShadow: 'var(--elevation-3)'
              }}
            >
              <div 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'var(--primary-alpha-10)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  flexShrink: 0
                }}
              >
                <Star size={18} fill="#F59E0B" color="#F59E0B" />
              </div>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
                  4.9★ Google Rating
                </div>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                  1,280+ Verified Patients
                </div>
              </div>
            </div>

            {/* Floating Glass Badge 2: Specialists */}
            <div
              className="glass-panel"
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                padding: '8px 14px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: 'var(--elevation-3)'
              }}
            >
              <Award size={18} color="var(--primary)" />
              <div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-primary)' }}>
                  Top 1% Specialists
                </div>
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>
                  AIIMS & UK Trained
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { ShieldCheck, Award, Users, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { MOCK_DOCTORS } from '../data/mockData';

export const AboutPage: React.FC = () => {
  return (
    <div className="section-padding" style={{ background: 'var(--background)' }}>
      <div className="container" style={{ maxWidth: '1080px' }}>
        <SectionHeader
          eyebrow="ABOUT AUREVIA HEALTH"
          title="Clinical Excellence Founded on Trust & Medical Integrity"
          description="Built to bridge the gap between impersonal corporate hospitals and fragmented private clinics through verified expertise and luxury care standards."
          align="center"
        />

        {/* Hero Banner */}
        <div 
          style={{
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: 'var(--elevation-3)',
            marginBottom: '48px',
            position: 'relative'
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80"
            alt="Aurevia Health Leadership"
            style={{ width: '100%', height: '420px', objectFit: 'cover' }}
          />
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(15, 23, 42, 0.8) 0%, transparent 60%)',
              display: 'flex',
              alignItems: 'flex-end',
              padding: 'clamp(24px, 4vw, 40px)',
              color: '#FFFFFF'
            }}
          >
            <div>
              <div className="badge badge-teal" style={{ background: 'rgba(255,255,255,0.2)', color: '#FFFFFF', marginBottom: '8px' }}>
                Est. 2010 • Delhi NCR
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#FFFFFF' }}>
                Over 16 Years of Ethical, Evidence-Led Patient Care
              </h3>
            </div>
          </div>
        </div>

        {/* 3 Value Pillars */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '48px' }}>
          <div className="card-luxury" style={{ padding: '28px', background: '#FFFFFF' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--primary-alpha-10)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', marginBottom: '16px' }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
              Medical Integrity First
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              We never promote unnecessary investigations or unverified procedures. Every protocol is backed by clinical peer review and global safety guidelines.
            </p>
          </div>

          <div className="card-luxury" style={{ padding: '28px', background: '#FFFFFF' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--secondary-alpha-10)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--secondary)', marginBottom: '16px' }}>
              <Heart size={24} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
              Unhurried Compassion
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Our consultations are structured for deep dialogue. Specialists take time to listen, diagnose root causes, and explain management strategies clearly.
            </p>
          </div>

          <div className="card-luxury" style={{ padding: '28px', background: '#FFFFFF' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--success)', marginBottom: '16px' }}>
              <Sparkles size={24} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
              Modern Technology
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Investing in modern diagnostic instruments, digital ultrasound Doppler, and US-FDA cleared lasers to achieve world-class therapeutic outcomes.
            </p>
          </div>
        </div>

        {/* Clinical Leadership & Medical Faculty */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div className="eyebrow" style={{ marginBottom: '8px' }}>CLINICAL GOVERNANCE</div>
            <h3 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-primary)' }}>
              Meet Our Senior Medical Directors
            </h3>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '8px auto 0' }}>
              Led by nationally distinguished physicians and surgeons with over 90 combined years of tertiary clinical excellence.
            </p>
          </div>

          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '24px' 
            }}
          >
            {MOCK_DOCTORS.slice(0, 3).map((doctor) => (
              <div 
                key={doctor.id} 
                className="card-luxury" 
                style={{ 
                  background: '#FFFFFF', 
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80';
                    }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '12px',
                      left: '12px',
                      background: 'rgba(15, 23, 42, 0.75)',
                      backdropFilter: 'blur(6px)',
                      color: '#FFFFFF',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {doctor.specialty}
                  </div>
                </div>
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h4 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
                    {doctor.name}
                  </h4>
                  <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--primary)', marginBottom: '8px' }}>
                    {doctor.qualifications}
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {doctor.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Accreditations Banner */}
        <div className="card-luxury" style={{ padding: '36px', background: '#FFFFFF', textAlign: 'center' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px' }}>
            Accreditations & Empanelments
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 24px' }}>
            Aurevia Health is certified by national and international health quality boards, maintaining strict aseptic operating protocols.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '24px' }}>
            <div style={{ padding: '12px 20px', background: 'var(--surface-soft)', borderRadius: 'var(--radius-sm)', fontWeight: '700', color: 'var(--text-primary)', fontSize: '14px' }}>
              ✓ NABH Certified Clinic
            </div>
            <div style={{ padding: '12px 20px', background: 'var(--surface-soft)', borderRadius: 'var(--radius-sm)', fontWeight: '700', color: 'var(--text-primary)', fontSize: '14px' }}>
              ✓ NABL Calibrated Laboratories
            </div>
            <div style={{ padding: '12px 20px', background: 'var(--surface-soft)', borderRadius: 'var(--radius-sm)', fontWeight: '700', color: 'var(--text-primary)', fontSize: '14px' }}>
              ✓ Indian Medical Council Registered
            </div>
            <div style={{ padding: '12px 20px', background: 'var(--surface-soft)', borderRadius: 'var(--radius-sm)', fontWeight: '700', color: 'var(--text-primary)', fontSize: '14px' }}>
              ✓ ISO 9001:2015 Healthcare Standard
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

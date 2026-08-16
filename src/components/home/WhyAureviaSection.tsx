import React from 'react';
import { ShieldCheck, HeartHandshake, Microscope, Sparkles, Clock, CheckCircle } from 'lucide-react';

export const WhyAureviaSection: React.FC = () => {
  const pillars = [
    {
      num: '01',
      title: 'Top 1% Senior Specialists',
      desc: 'Direct consultation with seasoned clinicians holding fellowships from AIIMS, PGI, and UK Royal Colleges—never trainees.'
    },
    {
      num: '02',
      title: 'Zero Wait-Time Architecture',
      desc: 'Precision slot management ensures you are seated with your specialist within 5 minutes of your appointed time.'
    },
    {
      num: '03',
      title: 'Advanced In-House Diagnostics',
      desc: 'From 2D Echocardiograms to digital laser systems and automated biomarker labs, get same-day verified clinical answers.'
    },
    {
      num: '04',
      title: 'Empathetic & Transparent Care',
      desc: 'Clear explanations, transparent treatment plans, and post-consultation digital follow-ups without hidden costs.'
    }
  ];

  return (
    <section className="section-padding" style={{ background: 'var(--surface-soft)' }}>
      <div className="container">
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(32px, 5vw, 64px)',
            alignItems: 'center'
          }}
        >
          {/* Left Column Visual */}
          <div style={{ position: 'relative' }}>
            <div 
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: 'var(--elevation-3)',
                border: '4px solid #FFFFFF'
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80"
                alt="Aurevia Health Private Suite"
                style={{ width: '100%', height: '440px', objectFit: 'cover' }}
              />
            </div>

            <div
              className="glass-panel"
              style={{
                position: 'absolute',
                bottom: '24px',
                right: '24px',
                padding: '16px 20px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                maxWidth: '260px'
              }}
            >
              <ShieldCheck size={24} color="var(--primary)" />
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
                100% Medical Data Confidentiality
              </span>
            </div>
          </div>

          {/* Right Column Content */}
          <div>
            <div className="eyebrow" style={{ marginBottom: '12px' }}>
              THE AUREVIA ADVANTAGE
            </div>
            <h2 className="h2" style={{ marginBottom: '16px', color: 'var(--text-primary)' }}>
              Healthcare Elevated by Expertise and Compassion
            </h2>
            <p className="body-default" style={{ marginBottom: '32px' }}>
              We reimagined private clinic care to eliminate anxiety, long waiting queues, and fragmented records. Here is why patients choose Aurevia as their primary healthcare partner:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
              {pillars.map((pillar) => (
                <div
                  key={pillar.num}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '16px',
                    borderRadius: 'var(--radius-sm)',
                    background: '#FFFFFF',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--elevation-1)'
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-primary)',
                      fontSize: '18px',
                      fontWeight: '800',
                      color: 'var(--primary)',
                      background: 'var(--primary-alpha-10)',
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    {pillar.num}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
                      {pillar.title}
                    </h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

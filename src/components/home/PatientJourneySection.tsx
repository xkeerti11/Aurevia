import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { Search, Calendar, Stethoscope, FileCheck, RefreshCw, HeartPulse } from 'lucide-react';

export const PatientJourneySection: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: <Search size={22} color="var(--primary)" />,
      title: 'Discover & Match',
      desc: 'Browse certified specialists, clinical profiles, and diagnostic packages transparently online.'
    },
    {
      num: '02',
      icon: <Calendar size={22} color="var(--primary)" />,
      title: 'Instant 2-Min Booking',
      desc: 'Pick your confirmed slot with zero wait-time guarantee and instant WhatsApp alerts.'
    },
    {
      num: '03',
      icon: <Stethoscope size={22} color="var(--primary)" />,
      title: 'Deep Consultation',
      desc: 'Engage in a 30-45 minute unhurried clinical dialogue in private acoustic suites.'
    },
    {
      num: '04',
      icon: <FileCheck size={22} color="var(--primary)" />,
      title: 'Same-Day Diagnostics',
      desc: 'In-house digital laboratory testing with instant portal report generation.'
    },
    {
      num: '05',
      icon: <RefreshCw size={22} color="var(--primary)" />,
      title: 'Personalized Roadmap',
      desc: 'Custom medical prescription, lifestyle regimen, and transparent care milestones.'
    },
    {
      num: '06',
      icon: <HeartPulse size={22} color="var(--primary)" />,
      title: 'Continuous Follow-up',
      desc: 'Complimentary digital progress checks and dedicated clinical concierge support.'
    }
  ];

  return (
    <section className="section-padding" style={{ background: 'var(--background)' }}>
      <div className="container">
        <SectionHeader
          eyebrow="TRANSPARENT CLINICAL PATHWAY"
          title="Your Healthcare Journey with Aurevia"
          description="Designed to remove medical stress, providing clear and structured clinical milestones from first contact to complete recovery."
          align="center"
        />

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginTop: '32px'
          }}
        >
          {steps.map((step) => (
            <div
              key={step.num}
              className="card-luxury"
              style={{
                padding: '24px',
                background: '#FFFFFF',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'var(--surface-soft)',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {step.icon}
                </div>

                <span 
                  style={{ 
                    fontFamily: 'var(--font-primary)', 
                    fontSize: '20px', 
                    fontWeight: '800', 
                    color: 'var(--primary)', 
                    opacity: 0.8 
                  }}
                >
                  {step.num}
                </span>
              </div>

              <h4 style={{ fontSize: '17px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
                {step.title}
              </h4>

              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

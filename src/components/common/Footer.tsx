import React from 'react';
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Heart,
  Calendar
} from 'lucide-react';
import { CLINIC_INFO } from '../../data/mockData';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNav = (path: string) => {
    onNavigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        background: '#0F172A',
        color: '#F8FAFC',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        paddingTop: 'clamp(48px, 6vw, 80px)',
        paddingBottom: '36px',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Top 4-Column Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))',
            gap: 'clamp(28px, 4vw, 44px)',
            marginBottom: 'clamp(36px, 5vw, 64px)'
          }}
        >
          {/* Column 1: Brand & Philosophy */}
          <div style={{ maxWidth: '320px' }}>
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', cursor: 'pointer' }}
              onClick={() => handleNav('/')}
            >
              <div 
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  flexShrink: 0
                }}
              >
                <ShieldCheck size={20} />
              </div>
              <span style={{ fontSize: '19px', fontWeight: '800', letterSpacing: '-0.5px' }}>
                AUREVIA<span style={{ color: '#14B8A6' }}>HEALTH</span>
              </span>
            </div>
            
            <p style={{ fontSize: '13.5px', color: '#94A3B8', lineHeight: '1.6', marginBottom: '16px' }}>
              Transforming private clinical care into a high-trust, patient-first healthcare experience with verified specialists and precision diagnostics.
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(20, 184, 166, 0.12)', border: '1px solid rgba(20, 184, 166, 0.25)', padding: '6px 12px', borderRadius: 'var(--radius-full)', color: '#2DD4BF', fontSize: '12px', fontWeight: '600' }}>
              <span>★ 4.9 Rating (1,280+ Verified Patients)</span>
            </div>
          </div>

          {/* Column 2: Clinical Specialties */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#FFFFFF', marginBottom: '16px' }}>
              Specialties & Care
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px', color: '#94A3B8' }}>
              <li>
                <button onClick={() => handleNav('/treatments')} style={{ color: 'inherit', textAlign: 'left', cursor: 'pointer' }}>
                  Cardiology & Heart Screening
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/treatments')} style={{ color: 'inherit', textAlign: 'left', cursor: 'pointer' }}>
                  Clinical Dermatology & Lasers
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/treatments')} style={{ color: 'inherit', textAlign: 'left', cursor: 'pointer' }}>
                  Executive Full Body Checkups
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/treatments')} style={{ color: 'inherit', textAlign: 'left', cursor: 'pointer' }}>
                  Pediatric & Adolescent Medicine
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/treatments')} style={{ color: 'inherit', textAlign: 'left', cursor: 'pointer' }}>
                  Orthopedics & Joint Restoration
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Patient Care Links */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#FFFFFF', marginBottom: '16px' }}>
              Patient Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13.5px', color: '#94A3B8' }}>
              <li>
                <button onClick={() => handleNav('/appointment')} style={{ color: 'inherit', textAlign: 'left', cursor: 'pointer' }}>
                  Book Online Consultation
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/doctors')} style={{ color: 'inherit', textAlign: 'left', cursor: 'pointer' }}>
                  Our Specialist Directory
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/facilities')} style={{ color: 'inherit', textAlign: 'left', cursor: 'pointer' }}>
                  Clinic Suites & Diagnostic Tech
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/about')} style={{ color: 'inherit', textAlign: 'left', cursor: 'pointer' }}>
                  About Aurevia Healthcare
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/resources')} style={{ color: 'inherit', textAlign: 'left', cursor: 'pointer' }}>
                  Clinical Health Guides & Articles
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Clinical Hours */}
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#FFFFFF', marginBottom: '16px' }}>
              Clinic Access
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: '#94A3B8' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Phone size={17} color="#14B8A6" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <a href={`tel:${CLINIC_INFO.phone}`} style={{ color: '#F8FAFC', fontWeight: '600', display: 'block' }}>
                    {CLINIC_INFO.phone}
                  </a>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>Emergency: {CLINIC_INFO.emergencyPhone}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Clock size={17} color="#14B8A6" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ color: '#F8FAFC', fontWeight: '500' }}>Mon - Sat: 8:00 AM - 8:00 PM</div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>Sun: Emergency Diagnostics Only</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <MapPin size={17} color="#14B8A6" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '13px', lineHeight: '1.4' }}>
                  {CLINIC_INFO.address}, {CLINIC_INFO.city}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Security Strip */}
        <div
          style={{
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '14px',
            fontSize: '12.5px',
            color: '#64748B'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span>© 2026 Aurevia Health Technologies. All rights reserved.</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>•</span>
            <span style={{ color: '#E2E8F0', fontWeight: '500' }}>
              Made with <span style={{ color: '#EF4444' }}>❤️</span> by <strong style={{ color: '#38BDF8', fontWeight: '700' }}>Ktux</strong>
            </span>
          </div>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <span>Privacy Policy</span>
            <span>Terms of Care</span>
            <span>HIPAA/GDPR Data Shield</span>
            <span>Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

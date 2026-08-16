import React from 'react';
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowUpRight, 
  Heart,
  Calendar,
  Lock
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
        paddingTop: '80px',
        paddingBottom: '40px',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Top 5-Column Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '40px',
            marginBottom: '64px'
          }}
        >
          {/* Column 1: Brand & Philosophy */}
          <div style={{ maxWidth: '300px' }}>
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
                  color: '#fff'
                }}
              >
                <ShieldCheck size={20} />
              </div>
              <span style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.5px' }}>
                AUREVIA<span style={{ color: '#14B8A6' }}>HEALTH</span>
              </span>
            </div>
            
            <p style={{ fontSize: '14px', color: '#94A3B8', lineHeight: '1.6', marginBottom: '20px' }}>
              Transforming private clinical care into a high-trust, patient-first healthcare experience with verified specialists and precision diagnostics.
            </p>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(20, 184, 166, 0.12)', border: '1px solid rgba(20, 184, 166, 0.25)', padding: '6px 12px', borderRadius: 'var(--radius-full)', color: '#2DD4BF', fontSize: '12px', fontWeight: '600' }}>
              <span>★ 4.9 Rating (1,280+ Verified Patients)</span>
            </div>
          </div>

          {/* Column 2: Clinical Specialties */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#FFFFFF', marginBottom: '18px' }}>
              Specialties & Care
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#94A3B8' }}>
              <li>
                <button onClick={() => handleNav('/treatments')} style={{ color: 'inherit', textAlign: 'left' }}>
                  Cardiology & Heart Screening
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/treatments')} style={{ color: 'inherit', textAlign: 'left' }}>
                  Clinical Dermatology & Lasers
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/treatments')} style={{ color: 'inherit', textAlign: 'left' }}>
                  Executive Full Body Checkups
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/treatments')} style={{ color: 'inherit', textAlign: 'left' }}>
                  Pediatric Care & Immunization
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/treatments')} style={{ color: 'inherit', textAlign: 'left' }}>
                  Orthopedics & Joint Preservation
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/treatments')} style={{ color: 'inherit', textAlign: 'left' }}>
                  Neurology & Headache Clinic
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Navigation */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#FFFFFF', marginBottom: '18px' }}>
              Patient Platform
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px', color: '#94A3B8' }}>
              <li>
                <button onClick={() => handleNav('/doctors')} style={{ color: 'inherit' }}>
                  Meet Specialists
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/appointment')} style={{ color: 'inherit' }}>
                  Book Online Consultation
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/facilities')} style={{ color: 'inherit' }}>
                  Clinic Infrastructure & Suites
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/about')} style={{ color: 'inherit' }}>
                  Our Medical Board & Ethos
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/resources')} style={{ color: 'inherit' }}>
                  Medical Articles & Guides
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('/admin')} style={{ color: '#14B8A6', fontWeight: '600' }}>
                  Clinic Staff & Admin Portal ↗
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Emergency */}
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', color: '#FFFFFF', marginBottom: '18px' }}>
              Concierge & Hours
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '14px', color: '#94A3B8' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Phone size={18} color="#14B8A6" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <a href={`tel:${CLINIC_INFO.phone}`} style={{ color: '#FFFFFF', fontWeight: '600' }}>
                    {CLINIC_INFO.phone}
                  </a>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>Concierge Desk (8 AM - 8 PM)</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Mail size={18} color="#14B8A6" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <a href={`mailto:${CLINIC_INFO.email}`} style={{ color: '#F8FAFC' }}>
                    {CLINIC_INFO.email}
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <Clock size={18} color="#14B8A6" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <div style={{ color: '#F8FAFC', fontWeight: '500' }}>Mon - Sat: 8:00 AM - 8:00 PM</div>
                  <div style={{ fontSize: '12px', color: '#94A3B8' }}>Sun: Emergency Diagnostics Only</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <MapPin size={18} color="#14B8A6" style={{ flexShrink: 0, marginTop: '2px' }} />
                <div style={{ fontSize: '13px' }}>
                  {CLINIC_INFO.address}, {CLINIC_INFO.city}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Security Strip */}
        <div
          style={{
            paddingTop: '32px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            fontSize: '13px',
            color: '#64748B'
          }}
        >
          <div>
            © 2026 Aurevia Health Technologies. All rights reserved. Registered under Clinical Establishments Act.
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
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

import React from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { MapPin, Phone, Mail, Clock, Navigation, CheckCircle2 } from 'lucide-react';
import { CLINIC_INFO } from '../../data/mockData';

export const ContactMapSection: React.FC = () => {
  return (
    <section className="section-padding" style={{ background: 'var(--surface-soft)' }}>
      <div className="container">
        <SectionHeader
          eyebrow="LOCATION & CONCIERGE"
          title="Visit Our Specialist Clinic"
          description="Centrally located with direct metro access, complimentary valet parking, and wheelchair accessibility."
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '32px',
            alignItems: 'stretch'
          }}
        >
          {/* Contact Details Card */}
          <div
            className="card-luxury"
            style={{
              padding: '36px',
              background: '#FFFFFF',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '16px' }}>
                Aurevia Health Clinic & Suites
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '28px' }}>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--primary-alpha-10)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>Address</div>
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      {CLINIC_INFO.address}, {CLINIC_INFO.city}, {CLINIC_INFO.state} - {CLINIC_INFO.pincode}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--primary-alpha-10)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>Telephone & Emergency</div>
                    <div style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                      Desk: <a href={`tel:${CLINIC_INFO.phone}`} style={{ color: 'var(--primary)', fontWeight: '600' }}>{CLINIC_INFO.phone}</a>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--error)', fontWeight: '600' }}>
                      Emergency Line: {CLINIC_INFO.emergencyPhone}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--primary-alpha-10)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>Working Hours</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      Mon - Sat: {CLINIC_INFO.hours.weekdays}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      Sun: {CLINIC_INFO.hours.sunday}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '14px', background: 'var(--surface-soft)', borderRadius: 'var(--radius-sm)', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={14} color="var(--primary)" />
                  <span>Complimentary Valet Parking on Premises</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={14} color="var(--primary)" />
                  <span>Elevator & Wheelchair Access</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={14} color="var(--primary)" />
                  <span>2 Minutes Walk from Sector 54 Metro Station</span>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ width: '100%' }}
            >
              <Navigation size={16} />
              <span>Get GPS Directions on Google Maps</span>
            </a>
          </div>

          {/* Interactive Map Embed */}
          <div
            className="card-luxury"
            style={{
              overflow: 'hidden',
              minHeight: '380px',
              border: '1px solid var(--border)',
              position: 'relative'
            }}
          >
            <iframe
              title="Aurevia Health Clinic Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14030.344485641774!2d77.1062!3d28.4357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1f7c6a0c0001%3A0x89abcdef01234567!2sSector%2054%2C%20Gurugram!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

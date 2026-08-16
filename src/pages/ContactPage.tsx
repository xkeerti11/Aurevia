import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { CLINIC_INFO } from '../data/mockData';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSubmitted(true);
  };

  return (
    <div className="section-padding" style={{ background: 'var(--background)' }}>
      <div className="container" style={{ maxWidth: '1080px' }}>
        <SectionHeader
          eyebrow="PATIENT CONCIERGE & INQUIRIES"
          title="We Are Here to Assist Your Healthcare Needs"
          description="Reach out for appointment queries, corporate healthcare empanelments, or emergency specialist coordination."
          align="center"
        />

        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            marginBottom: '48px'
          }}
        >
          {/* Inquiry Form */}
          <div className="card-luxury" style={{ padding: '36px', background: '#FFFFFF' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
              Send a Direct Medical Inquiry
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
              Our concierge team responds within 2 hours during clinic hours.
            </p>

            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 16px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--success-bg)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <CheckCircle2 size={32} />
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
                  Inquiry Received
                </h4>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
                  Thank you, {name}. A senior healthcare concierge will contact you at <strong>{phone}</strong> shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn btn-secondary btn-sm"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="contactName">Full Name *</label>
                  <input
                    id="contactName"
                    type="text"
                    required
                    className="form-input"
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contactPhone">Phone Number *</label>
                  <input
                    id="contactPhone"
                    type="tel"
                    required
                    className="form-input"
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contactEmail">Email Address</label>
                  <input
                    id="contactEmail"
                    type="email"
                    className="form-input"
                    placeholder="name@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="contactMessage">How can we assist you?</label>
                  <textarea
                    id="contactMessage"
                    rows={4}
                    className="form-textarea"
                    placeholder="Describe your inquiry, specialty of interest, or preferred consultation timings..."
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                  <Send size={16} />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            )}
          </div>

          {/* Clinic Contact Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="card-luxury" style={{ padding: '0', background: '#FFFFFF', overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: '180px' }}>
                <img
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80"
                  alt="Aurevia Health Concierge Desk"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.7) 0%, transparent 60%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    padding: '16px 20px',
                    color: '#FFFFFF'
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '0.5px' }}>
                    Pinnacle Medical Tower, Sector 54, Gurugram
                  </span>
                </div>
              </div>

              <div style={{ padding: '24px' }}>
                <div style={{ display: 'flex', gap: '14px', marginBottom: '16px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--primary-alpha-10)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>Clinic Location</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                      {CLINIC_INFO.address}, {CLINIC_INFO.city}, {CLINIC_INFO.state} - {CLINIC_INFO.pincode}
                    </p>
                  </div>
                </div>

              <div style={{ display: 'flex', gap: '14px', marginBottom: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--primary-alpha-10)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                  <Phone size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>Direct Desk & WhatsApp</h4>
                  <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--primary)' }}>{CLINIC_INFO.phone}</div>
                  <div style={{ fontSize: '12px', color: 'var(--error)', fontWeight: '600' }}>Emergency: {CLINIC_INFO.emergencyPhone}</div>
                </div>
              </div>

                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--primary-alpha-10)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>Hours of Operation</h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      Mon - Sat: {CLINIC_INFO.hours.weekdays}<br />
                      Sun: {CLINIC_INFO.hours.sunday}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action Box */}
            <div className="card-luxury" style={{ padding: '24px', background: '#25D366', color: '#FFFFFF' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <MessageCircle size={24} />
                <h4 style={{ fontSize: '17px', fontWeight: '700', color: '#FFFFFF' }}>
                  Instant WhatsApp Helpdesk
                </h4>
              </div>
              <p style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.9)', marginBottom: '16px', lineHeight: '1.5' }}>
                Have a quick question about doctor availability or slot confirmation? Chat with our clinic coordinator now.
              </p>
              <a
                href={`https://wa.me/${CLINIC_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Aurevia%20Health,%20I%20have%20an%20inquiry.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
                style={{ background: '#FFFFFF', color: '#128C7E', border: 'none', width: '100%' }}
              >
                Start WhatsApp Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

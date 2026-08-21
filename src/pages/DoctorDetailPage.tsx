import React from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Award, 
  GraduationCap, 
  Star, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Phone
} from 'lucide-react';
import { Doctor } from '../types';
import { CLINIC_INFO } from '../data/mockData';

interface DoctorDetailPageProps {
  doctor: Doctor;
  onBack: () => void;
  onBook: (doctor: Doctor) => void;
}

export const DoctorDetailPage: React.FC<DoctorDetailPageProps> = ({
  doctor,
  onBack,
  onBook
}) => {
  return (
    <div className="section-padding" style={{ background: 'var(--background)' }}>
      <div className="container" style={{ maxWidth: '1080px' }}>
        {/* Back navigation */}
        <button
          onClick={onBack}
          className="btn btn-ghost"
          style={{ marginBottom: '20px', paddingLeft: 0, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Specialists</span>
        </button>

        {/* Doctor Header Profile Card */}
        <div 
          className="card-luxury"
          style={{
            background: '#FFFFFF',
            padding: 'clamp(20px, 3.5vw, 40px)',
            marginBottom: '28px'
          }}
        >
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(24px, 3.5vw, 36px)',
              alignItems: 'center'
            }}
          >
            {/* Portrait */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '380px', margin: '0 auto' }}>
              <div 
                style={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: 'var(--elevation-2)',
                  border: '3px solid var(--surface-soft)'
                }}
              >
                <img
                  src={doctor.avatar}
                  alt={doctor.name}
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80';
                  }}
                  style={{ width: '100%', height: 'clamp(260px, 38vw, 360px)', objectFit: 'cover' }}
                />
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  background: 'rgba(15, 23, 42, 0.85)',
                  backdropFilter: 'blur(8px)',
                  color: '#FFFFFF',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-full)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}
              >
                <Star size={14} fill="#F59E0B" color="#F59E0B" />
                <span>{doctor.rating} ({doctor.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Doctor Info & Booking CTA */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'var(--primary-alpha-10)', color: 'var(--primary)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '10px' }}>
                {doctor.specialty}
              </div>

              <h1 style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px' }}>
                {doctor.name}
              </h1>

              <div style={{ fontSize: '14.5px', fontWeight: '600', color: 'var(--primary)', marginBottom: '10px' }}>
                {doctor.title}
              </div>

              <div style={{ fontSize: '12.5px', color: 'var(--text-tertiary)', marginBottom: '16px' }}>
                {doctor.qualifications}
              </div>

              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px' }}>
                {doctor.bio}
              </p>

              {/* Badges / Key facts */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <Clock size={16} color="var(--primary)" />
                  <span>Next Slot: Today, 4:30 PM</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <Award size={16} color="var(--primary)" />
                  <span>{doctor.experienceYears}+ Years Clinical Practice</span>
                </div>
              </div>

              {/* Consultation Fee & CTA */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-tertiary)' }}>Consultation Fee</div>
                  <div style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary)' }}>
                    ₹{doctor.consultationFee}
                  </div>
                </div>

                <button
                  onClick={() => onBook(doctor)}
                  className="btn btn-primary btn-lg btn-mobile-block"
                  style={{ flex: 1, minWidth: '200px', boxShadow: 'var(--shadow-glow)' }}
                >
                  <Calendar size={18} />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections: Bio, Education, Awards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px' }}>
          {/* Biography */}
          <div className="card-luxury" style={{ padding: 'clamp(20px, 3vw, 32px)', background: '#FFFFFF' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} color="var(--primary)" />
              Clinical Biography & Philosophy
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.65' }}>
              {doctor.fullBio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Education & Accreditations */}
          <div className="card-luxury" style={{ padding: 'clamp(20px, 3vw, 32px)', background: '#FFFFFF' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <GraduationCap size={18} color="var(--primary)" />
              Academic Credentials & Fellowships
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
              {doctor.education.map((edu, i) => (
                <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={15} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{edu}</span>
                </div>
              ))}
            </div>

            <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Award size={16} color="#D97706" />
              Honors & Recognition
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {doctor.awards.map((award, i) => (
                <div key={i} style={{ fontSize: '12.5px', color: 'var(--text-secondary)', background: 'var(--surface-soft)', padding: '8px 12px', borderRadius: 'var(--radius-xs)' }}>
                  ★ {award}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

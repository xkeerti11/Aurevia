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
  MessageCircle,
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
          style={{ marginBottom: '24px', paddingLeft: 0, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Specialists</span>
        </button>

        {/* Doctor Header Profile Card */}
        <div 
          className="card-luxury"
          style={{
            background: '#FFFFFF',
            padding: 'clamp(24px, 4vw, 40px)',
            marginBottom: '32px'
          }}
        >
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '36px',
              alignItems: 'center'
            }}
          >
            {/* Portrait */}
            <div style={{ position: 'relative' }}>
              <div 
                style={{
                  borderRadius: '24px',
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
                  style={{ width: '100%', height: '360px', objectFit: 'cover' }}
                />
              </div>

              <div
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  background: doctor.availableToday ? 'var(--success)' : 'var(--text-secondary)',
                  color: '#FFFFFF',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '12px',
                  fontWeight: '700',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                }}
              >
                {doctor.availableToday ? '● Available Today' : '● Next Slot: Tomorrow'}
              </div>
            </div>

            {/* Main Info & Quick Booking */}
            <div>
              <div className="badge badge-teal" style={{ marginBottom: '12px' }}>
                {doctor.specialty} Specialist
              </div>

              <h1 style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
                {doctor.name}
              </h1>

              <div style={{ fontSize: '15px', color: 'var(--primary)', fontWeight: '600', marginBottom: '12px' }}>
                {doctor.title}
              </div>

              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px' }}>
                {doctor.qualifications}
              </div>

              {/* Badges Bar */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px', padding: '12px 16px', background: 'var(--surface-soft)', borderRadius: 'var(--radius-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600' }}>
                  <Star size={16} fill="#F59E0B" color="#F59E0B" />
                  <span>{doctor.rating} Rating ({doctor.reviewCount} reviews)</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <Award size={16} color="var(--primary)" />
                  <span>{doctor.experienceYears}+ Years Clinical Practice</span>
                </div>
              </div>

              {/* Consultation Fee & CTA */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Consultation Fee</div>
                  <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)' }}>
                    ₹{doctor.consultationFee}
                  </div>
                </div>

                <button
                  onClick={() => onBook(doctor)}
                  className="btn btn-primary btn-lg"
                  style={{ flex: 1, minWidth: '220px', boxShadow: 'var(--shadow-glow)' }}
                >
                  <Calendar size={18} />
                  <span>Book Consultation</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections: Bio, Education, Awards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px' }}>
          {/* Biography */}
          <div className="card-luxury" style={{ padding: '32px', background: '#FFFFFF' }}>
            <h3 style={{ fontSize: '19px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={20} color="var(--primary)" />
              Clinical Biography & Philosophy
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              {doctor.fullBio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Education & Accreditations */}
          <div className="card-luxury" style={{ padding: '32px', background: '#FFFFFF' }}>
            <h3 style={{ fontSize: '19px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <GraduationCap size={20} color="var(--primary)" />
              Academic Credentials & Fellowships
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {doctor.education.map((edu, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{edu}</span>
                </div>
              ))}
            </div>

            <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={18} color="#D97706" />
              Honors & Recognition
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {doctor.awards.map((award, i) => (
                <div key={i} style={{ fontSize: '13px', color: 'var(--text-secondary)', background: 'var(--surface-soft)', padding: '10px 14px', borderRadius: 'var(--radius-xs)' }}>
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

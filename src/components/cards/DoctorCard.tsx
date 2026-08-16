import React from 'react';
import { Star, Calendar, ArrowRight, CheckCircle2, Award, Clock } from 'lucide-react';
import { Doctor } from '../../types';

interface DoctorCardProps {
  doctor: Doctor;
  onSelectDoctor?: (doctor: Doctor) => void;
  onBookDoctor?: (doctor: Doctor) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({ 
  doctor, 
  onSelectDoctor,
  onBookDoctor 
}) => {
  return (
    <div 
      className="card-luxury"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#FFFFFF',
        position: 'relative'
      }}
    >
      {/* Availability Pill */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          zIndex: 2,
          background: doctor.availableToday ? 'rgba(22, 163, 74, 0.92)' : 'rgba(15, 23, 42, 0.75)',
          backdropFilter: 'blur(8px)',
          color: '#FFFFFF',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          fontSize: '11px',
          fontWeight: '700',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
        }}
      >
        {doctor.availableToday ? (
          <>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#86EFAC', display: 'inline-block' }}></span>
            Available Today
          </>
        ) : (
          <>
            <Clock size={12} />
            Next: Tomorrow
          </>
        )}
      </div>

      {/* Image Container */}
      <div 
        style={{ 
          position: 'relative', 
          height: '280px', 
          width: '100%', 
          overflow: 'hidden',
          background: 'var(--surface-soft)',
          cursor: onSelectDoctor ? 'pointer' : 'default'
        }}
        onClick={() => onSelectDoctor && onSelectDoctor(doctor)}
      >
        <img
          src={doctor.avatar}
          alt={doctor.name}
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80';
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top center',
            transition: 'transform 400ms var(--ease-out)'
          }}
          className="doctor-card-img"
          loading="lazy"
        />
        <div 
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '60px',
            background: 'linear-gradient(to top, rgba(15, 23, 42, 0.7) 0%, transparent 100%)',
            display: 'flex',
            alignItems: 'flex-end',
            padding: '12px 16px'
          }}
        >
          <div style={{ color: '#FFFFFF', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Award size={14} color="#2DD4BF" />
            <span>{doctor.experienceYears}+ Years Clinical Practice</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span 
            style={{ 
              fontSize: '12px', 
              fontWeight: '700', 
              textTransform: 'uppercase', 
              letterSpacing: '0.8px', 
              color: 'var(--primary)' 
            }}
          >
            {doctor.specialty}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '600', color: 'var(--text-primary)' }}>
            <Star size={14} fill="#F59E0B" color="#F59E0B" />
            <span>{doctor.rating}</span>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '400' }}>
              ({doctor.reviewCount})
            </span>
          </div>
        </div>

        <h3 
          style={{ 
            fontSize: '19px', 
            fontWeight: '700', 
            marginBottom: '6px',
            cursor: onSelectDoctor ? 'pointer' : 'default',
            color: 'var(--text-primary)'
          }}
          onClick={() => onSelectDoctor && onSelectDoctor(doctor)}
        >
          {doctor.name}
        </h3>

        <p style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '12px', lineHeight: '1.4' }}>
          {doctor.qualifications}
        </p>

        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '20px', flex: 1 }}>
          {doctor.bio}
        </p>

        {/* Action Buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '10px', marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
          <button
            onClick={() => onSelectDoctor && onSelectDoctor(doctor)}
            className="btn btn-secondary btn-sm"
            style={{ width: '100%', fontSize: '12px' }}
          >
            <span>Profile</span>
            <ArrowRight size={13} />
          </button>

          <button
            onClick={() => onBookDoctor && onBookDoctor(doctor)}
            className="btn btn-primary btn-sm"
            style={{ width: '100%', fontSize: '12px' }}
          >
            <Calendar size={13} />
            <span>Consult</span>
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';
import { Testimonial } from '../../types';

interface ReviewCardProps {
  testimonial: Testimonial;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ testimonial }) => {
  return (
    <div
      className="card-luxury"
      style={{
        padding: '32px',
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative'
      }}
    >
      <Quote 
        size={40} 
        color="rgba(15, 118, 110, 0.08)" 
        style={{ position: 'absolute', top: '24px', right: '24px' }} 
      />

      {/* Star Rating */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={16} 
            fill={i < testimonial.rating ? '#F59E0B' : '#E2E8F0'} 
            color={i < testimonial.rating ? '#F59E0B' : '#E2E8F0'} 
          />
        ))}
        <span style={{ fontSize: '13px', fontWeight: '700', marginLeft: '6px', color: 'var(--text-primary)' }}>
          {testimonial.rating}.0
        </span>
      </div>

      {/* Quote */}
      <p 
        style={{ 
          fontSize: '15px', 
          lineHeight: '1.7', 
          color: 'var(--text-primary)', 
          fontStyle: 'italic', 
          marginBottom: '24px',
          flex: 1 
        }}
      >
        "{testimonial.comment}"
      </p>

      {/* Patient & Consultation Meta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
        {testimonial.patientAvatar ? (
          <img
            src={testimonial.patientAvatar}
            alt={testimonial.patientName}
            style={{ width: '44px', height: '44px', borderRadius: '50%', objectFit: 'cover' }}
          />
        ) : (
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'var(--primary-alpha-10)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '16px'
            }}
          >
            {testimonial.patientName.charAt(0)}
          </div>
        )}

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>
              {testimonial.patientName}
            </h4>
            {testimonial.verified && (
              <span title="Verified Patient" style={{ display: 'flex', alignItems: 'center', color: 'var(--success)' }}>
                <CheckCircle2 size={14} />
              </span>
            )}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
            {testimonial.serviceName} • {testimonial.doctorName}
          </div>
        </div>

        <div 
          style={{ 
            fontSize: '11px', 
            fontWeight: '600', 
            color: 'var(--text-muted)', 
            background: 'var(--surface-soft)', 
            padding: '2px 8px', 
            borderRadius: '4px' 
          }}
        >
          {testimonial.source}
        </div>
      </div>
    </div>
  );
};

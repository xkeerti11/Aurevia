import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { ReviewCard } from '../cards/ReviewCard';
import { MOCK_TESTIMONIALS } from '../../data/mockData';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex(prev => (prev === 0 ? MOCK_TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => (prev === MOCK_TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="section-padding" style={{ background: '#FFFFFF' }}>
      <div className="container">
        <SectionHeader
          eyebrow="VERIFIED PATIENT EXPERIENCES"
          title="Stories of Healing, Precision & Trust"
          description="Read unedited reviews from real patients who experienced our consultation suites and specialized treatment protocols."
          align="center"
        />

        {/* Carousel Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
            marginBottom: '32px'
          }}
        >
          {MOCK_TESTIMONIALS.map((testimonial) => (
            <ReviewCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Google Reviews Trust Bar */}
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            padding: '16px 24px',
            background: 'var(--surface-soft)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '2px' }}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />
              ))}
            </div>
            <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>
              4.9 out of 5 Stars
            </span>
          </div>

          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
            Verified across Google Business Profile & Practo
          </span>
        </div>
      </div>
    </section>
  );
};

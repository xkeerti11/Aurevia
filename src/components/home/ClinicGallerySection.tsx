import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { X, ZoomIn, Eye } from 'lucide-react';
import { MOCK_FACILITIES } from '../../data/mockData';

export const ClinicGallerySection: React.FC = () => {
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);

  const galleryImages = [
    {
      title: 'Precision Diagnostics Lab',
      desc: 'NABL-calibrated automated biomarker testing',
      src: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80',
      span: 'tall'
    },
    {
      title: 'Private Patient Suites',
      desc: 'Acoustically insulated consultation lounges',
      src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
      span: 'normal'
    },
    {
      title: 'Laser Aesthetics Theatre',
      desc: 'US-FDA certified laser dermatology systems',
      src: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1000&q=80',
      span: 'normal'
    },
    {
      title: 'Pediatric Care Zone',
      desc: 'Child-friendly examination & play area',
      src: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80',
      span: 'wide'
    },
    {
      title: 'Concierge Reception Lounge',
      desc: 'Zero-crowd executive check-in experience',
      src: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80',
      span: 'normal'
    }
  ];

  return (
    <section className="section-padding" style={{ background: 'var(--surface-soft)' }}>
      <div className="container">
        <SectionHeader
          eyebrow="WORLD-CLASS INFRASTRUCTURE"
          title="Inside Aurevia Health"
          description="Designed by healthcare architects to promote clinical precision, sterile hygiene, and calm recovery."
        />

        {/* Masonry / Bento Visual Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px'
          }}
        >
          {galleryImages.map((item, idx) => (
            <div
              key={idx}
              className="card-luxury"
              style={{
                position: 'relative',
                height: '280px',
                cursor: 'pointer',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden'
              }}
              onClick={() => setActiveLightboxImage(item.src)}
            >
              <img
                src={item.src}
                alt={item.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 400ms var(--ease-out)'
                }}
              />
              
              {/* Overlay on hover */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(15, 23, 42, 0.85) 0%, transparent 60%)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '20px',
                  color: '#FFFFFF'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#FFFFFF', marginBottom: '4px' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)' }}>
                      {item.desc}
                    </p>
                  </div>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(8px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <ZoomIn size={18} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeLightboxImage && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1100,
              background: 'rgba(15, 23, 42, 0.9)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px'
            }}
            onClick={() => setActiveLightboxImage(null)}
          >
            <button
              onClick={() => setActiveLightboxImage(null)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.2)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <X size={24} />
            </button>

            <img
              src={activeLightboxImage}
              alt="Enlarged facility view"
              style={{
                maxWidth: '90vw',
                maxHeight: '85vh',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--elevation-5)',
                objectFit: 'contain'
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
    </section>
  );
};

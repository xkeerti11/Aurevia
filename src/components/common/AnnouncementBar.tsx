import React, { useState, useEffect } from 'react';
import { ChevronRight, X } from 'lucide-react';

interface AnnouncementBarProps {
  onCtaClick?: () => void;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onCtaClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dismissedUntil = localStorage.getItem('aurevia_announcement_dismissed');
    if (!dismissedUntil || new Date().getTime() > parseInt(dismissedUntil, 10)) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Dismiss for 7 days
    const expiry = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
    localStorage.setItem('aurevia_announcement_dismissed', expiry.toString());
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #0F766E 0%, #14B8A6 100%)',
        color: '#FFFFFF',
        padding: '6px 12px',
        fontSize: '12.5px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 101,
        lineHeight: 1.3
      }}
    >
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          cursor: onCtaClick ? 'pointer' : 'default',
          textAlign: 'center',
          paddingRight: '24px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}
        onClick={onCtaClick}
      >
        <span 
          style={{ 
            background: 'rgba(255, 255, 255, 0.22)', 
            padding: '2px 7px', 
            borderRadius: '10px', 
            fontSize: '10.5px', 
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.4px',
            flexShrink: 0
          }}
        >
          New Clinic Wing
        </span>
        <span style={{ fontSize: '12px' }}>
          Now welcoming patients to our <strong>Advanced Dermatological Laser & Diagnostics Suite</strong>
        </span>
        <ChevronRight size={14} style={{ flexShrink: 0 }} />
      </div>

      <button
        onClick={handleDismiss}
        style={{
          position: 'absolute',
          right: '8px',
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'none',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.8)',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        aria-label="Dismiss announcement"
      >
        <X size={15} />
      </button>
    </div>
  );
};

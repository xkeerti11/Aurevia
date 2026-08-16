import React, { useState, useEffect } from 'react';
import { Sparkles, X, ChevronRight } from 'lucide-react';

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

  const handleDismiss = () => {
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
        padding: '8px 16px',
        fontSize: '13px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1001
      }}
    >
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          cursor: onCtaClick ? 'pointer' : 'default',
          textAlign: 'center'
        }}
        onClick={onCtaClick}
      >
        <span 
          style={{ 
            background: 'rgba(255, 255, 255, 0.2)', 
            padding: '2px 8px', 
            borderRadius: '12px', 
            fontSize: '11px', 
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          New Clinic Wing
        </span>
        <span>
          Now welcoming patients to our <strong>Advanced Dermatological Laser & Diagnostics Suite</strong>
        </span>
        <ChevronRight size={15} />
      </div>

      <button
        onClick={handleDismiss}
        style={{
          position: 'absolute',
          right: '12px',
          background: 'transparent',
          color: 'rgba(255, 255, 255, 0.8)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4px',
          borderRadius: '4px'
        }}
        aria-label="Dismiss announcement"
      >
        <X size={16} />
      </button>
    </div>
  );
};

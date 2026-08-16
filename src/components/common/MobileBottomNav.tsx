import React from 'react';
import { Phone, MessageCircle, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../../data/mockData';

interface MobileBottomNavProps {
  onBookClick: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({ onBookClick }) => {
  return (
    <>
      <div className="mobile-bottom-bar">
        <a
          href={`tel:${CLINIC_INFO.phone}`}
          className="bottom-action-btn btn-call"
          aria-label="Call clinic directly"
        >
          <Phone size={18} />
          <span>Call Clinic</span>
        </a>

        <a
          href={`https://wa.me/${CLINIC_INFO.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hello%20Aurevia%20Health,%20I%20would%20like%20to%20inquire%20about%20an%20appointment.`}
          target="_blank"
          rel="noopener noreferrer"
          className="bottom-action-btn btn-whatsapp"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={18} />
          <span>WhatsApp</span>
        </a>

        <button
          onClick={onBookClick}
          className="bottom-action-btn btn-book"
          aria-label="Book an appointment"
        >
          <Calendar size={18} />
          <span>Book Now</span>
        </button>
      </div>

      <style>{`
        .mobile-bottom-bar {
          display: none;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 64px;
          background: #FFFFFF;
          border-top: 1px solid var(--border);
          box-shadow: 0 -4px 20px rgba(15, 23, 42, 0.08);
          z-index: 998;
          align-items: center;
          padding: 8px 12px;
          gap: 8px;
        }

        .bottom-action-btn {
          flex: 1;
          height: 48px;
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-family: var(--font-primary);
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          user-select: none;
        }

        .btn-call {
          background: var(--surface-soft);
          color: var(--text-primary);
          border: 1px solid var(--border);
        }

        .btn-whatsapp {
          background: #25D366;
          color: #FFFFFF;
        }

        .btn-book {
          background: var(--primary);
          color: #FFFFFF;
          box-shadow: 0 2px 8px rgba(15, 118, 110, 0.3);
        }

        @media (max-width: 768px) {
          .mobile-bottom-bar {
            display: flex;
          }
          body {
            padding-bottom: 68px;
          }
        }
      `}</style>
    </>
  );
};

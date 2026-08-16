import React from 'react';
import { BookingWizard } from '../components/booking/BookingWizard';
import { Doctor, ServiceTreatment, Appointment } from '../types';

interface BookingPageProps {
  initialDoctor?: Doctor | null;
  initialService?: ServiceTreatment | null;
  onBookingComplete?: (appointment: Appointment) => void;
  onNavigateHome: () => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({
  initialDoctor,
  initialService,
  onBookingComplete,
  onNavigateHome
}) => {
  return (
    <div className="section-padding" style={{ background: 'var(--background)', minHeight: '80vh' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            ONLINE APPOINTMENT PORTAL
          </div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: '800', color: 'var(--text-primary)', marginTop: '8px' }}>
            Schedule Your Specialist Consultation
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '560px', margin: '8px auto 0' }}>
            Instant confirmed slots with zero wait times. Select your required department or physician below.
          </p>
        </div>

        <BookingWizard
          initialDoctor={initialDoctor}
          initialService={initialService}
          onBookingComplete={onBookingComplete}
          onNavigateHome={onNavigateHome}
        />
      </div>
    </div>
  );
};

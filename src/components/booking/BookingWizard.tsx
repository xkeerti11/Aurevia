import React, { useState } from 'react';
import { 
  Check, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Stethoscope, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  MapPin
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Doctor, ServiceTreatment, Specialty, Appointment } from '../../types';
import { MOCK_DOCTORS, MOCK_SERVICES, CLINIC_INFO } from '../../data/mockData';

interface BookingWizardProps {
  initialDoctor?: Doctor | null;
  initialService?: ServiceTreatment | null;
  onBookingComplete?: (appointment: Appointment) => void;
  onNavigateHome?: () => void;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  initialDoctor = null,
  initialService = null,
  onBookingComplete,
  onNavigateHome
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | 'All'>('All');
  const [selectedService, setSelectedService] = useState<ServiceTreatment | null>(initialService || MOCK_SERVICES[0]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(initialDoctor || MOCK_DOCTORS[0]);
  
  // Date selection (default to tomorrow or today)
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(today.getTime() + 86400000).toISOString().split('T')[0]
  );
  
  const [selectedSlot, setSelectedSlot] = useState<string>('11:30 AM');
  
  // Patient details state
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientDob, setPatientDob] = useState('');
  const [reasonForVisit, setReasonForVisit] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Final confirmed booking data
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);

  const specialties: (Specialty | 'All')[] = [
    'All',
    'Cardiology',
    'Dermatology',
    'General Medicine',
    'Pediatrics',
    'Orthopedics',
    'Neurology'
  ];

  const filteredServices = selectedSpecialty === 'All' 
    ? MOCK_SERVICES 
    : MOCK_SERVICES.filter(s => s.category === selectedSpecialty);

  const filteredDoctors = selectedService
    ? MOCK_DOCTORS.filter(d => d.specialty === selectedService.category || selectedSpecialty === 'All')
    : MOCK_DOCTORS;

  const validateStep5 = () => {
    const errors: Record<string, string> = {};
    if (!patientName.trim()) {
      errors.name = 'Please enter your full name';
    } else if (patientName.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!patientPhone.trim()) {
      errors.phone = 'Please enter a valid phone number';
    } else if (!/^[0-9+ -]{10,15}$/.test(patientPhone.trim())) {
      errors.phone = 'Please enter a valid 10-digit mobile number';
    }

    if (patientEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patientEmail.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !selectedService) return;
    if (currentStep === 2 && !selectedDoctor) return;
    if (currentStep === 3 && !selectedDate) return;
    if (currentStep === 4 && !selectedSlot) return;
    if (currentStep === 5) {
      if (!validateStep5()) return;
      
      // Generate confirmation
      const dateParts = selectedDate.split('-');
      const refNum = `AU-${dateParts[0]}-${dateParts[1]}${dateParts[2]}-${Math.floor(1000 + Math.random() * 9000)}`;
      
      const newApt: Appointment = {
        id: `apt-${Date.now()}`,
        confirmationCode: refNum,
        patientName,
        patientPhone,
        patientEmail: patientEmail || 'patient@example.com',
        patientDob,
        doctor: selectedDoctor!,
        service: selectedService!,
        date: selectedDate,
        timeSlot: selectedSlot,
        reasonForVisit,
        status: 'Confirmed',
        createdAt: new Date().toISOString()
      };

      setConfirmedAppointment(newApt);
      if (onBookingComplete) onBookingComplete(newApt);
      
      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Fallback gracefully
      }
    }
    
    setCurrentStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const stepLabels = [
    'Service',
    'Specialist',
    'Date',
    'Time Slot',
    'Patient Info',
    'Confirmed'
  ];

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Responsive Progress Stepper Header */}
      <div 
        style={{ 
          background: '#FFFFFF', 
          borderRadius: 'var(--radius-md)', 
          padding: 'clamp(16px, 3vw, 24px)', 
          boxShadow: 'var(--elevation-1)',
          border: '1px solid var(--border)',
          marginBottom: '24px'
        }}
      >
        {/* Desktop Stepper View */}
        <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          {/* Connector Line behind steps */}
          <div 
            style={{
              position: 'absolute',
              top: '18px',
              left: '30px',
              right: '30px',
              height: '3px',
              background: 'var(--border)',
              zIndex: 1
            }}
          >
            <div 
              style={{
                height: '100%',
                background: 'var(--primary)',
                width: `${((currentStep - 1) / (stepLabels.length - 1)) * 100}%`,
                transition: 'width 300ms var(--ease-out)'
              }}
            />
          </div>

          {stepLabels.map((label, index) => {
            const stepNum = index + 1;
            const isCompleted = currentStep > stepNum;
            const isCurrent = currentStep === stepNum;

            return (
              <div 
                key={label}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  zIndex: 2,
                  position: 'relative'
                }}
              >
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: isCompleted ? 'var(--primary)' : isCurrent ? 'var(--primary)' : '#FFFFFF',
                    color: isCompleted || isCurrent ? '#FFFFFF' : 'var(--text-tertiary)',
                    border: isCompleted || isCurrent ? '2px solid var(--primary)' : '2px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '700',
                    fontSize: '14px',
                    boxShadow: isCurrent ? '0 0 0 4px var(--primary-alpha-20)' : 'none',
                    transition: 'all 250ms var(--ease-out)'
                  }}
                >
                  {isCompleted ? <Check size={18} strokeWidth={2.5} /> : stepNum}
                </div>
                <span 
                  style={{ 
                    fontSize: '12px', 
                    marginTop: '8px', 
                    fontWeight: isCurrent ? '700' : '500',
                    color: isCurrent ? 'var(--primary)' : isCompleted ? 'var(--text-primary)' : 'var(--text-muted)'
                  }}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Mobile Stepper View (Compact Clean Progress) */}
        <div className="mobile-only" style={{ flexDirection: 'column', gap: '8px', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Step {currentStep} of {stepLabels.length}
            </span>
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
              {stepLabels[currentStep - 1]}
            </span>
          </div>

          {/* Progress bar */}
          <div style={{ width: '100%', height: '6px', background: 'var(--surface-soft)', borderRadius: '3px', overflow: 'hidden', border: '1px solid var(--border)' }}>
            <div 
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, var(--primary) 0%, var(--primary-light) 100%)',
                width: `${(currentStep / stepLabels.length) * 100}%`,
                transition: 'width 250ms ease-out'
              }}
            />
          </div>
        </div>
      </div>

      {/* Main Step Card Container */}
      <div 
        className="card-luxury"
        style={{ 
          padding: 'clamp(24px, 4vw, 40px)', 
          background: '#FFFFFF',
          minHeight: '460px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* ================= STEP 1: SERVICE SELECTION ================= */}
        {currentStep === 1 && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <div className="eyebrow">STEP 1 OF 6</div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>
                Select Medical Specialty or Care Service
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                Choose the clinical department or health checkup package you require.
              </p>
            </div>

            {/* Specialty Category Pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
              {specialties.map(spec => (
                <button
                  key={spec}
                  onClick={() => setSelectedSpecialty(spec)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '13px',
                    fontWeight: '600',
                    background: selectedSpecialty === spec ? 'var(--primary)' : 'var(--surface-soft)',
                    color: selectedSpecialty === spec ? '#FFFFFF' : 'var(--text-secondary)',
                    border: '1px solid',
                    borderColor: selectedSpecialty === spec ? 'var(--primary)' : 'var(--border)',
                    transition: 'all 200ms var(--ease-out)'
                  }}
                >
                  {spec}
                </button>
              ))}
            </div>

            {/* Service Selection Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {filteredServices.map(srv => {
                const isSelected = selectedService?.id === srv.id;
                return (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedService(srv)}
                    style={{
                      padding: '20px',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                      background: isSelected ? 'var(--primary-alpha-10)' : '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 200ms var(--ease-out)',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative'
                    }}
                  >
                    {isSelected && (
                      <div 
                        style={{
                          position: 'absolute',
                          top: '12px',
                          right: '12px',
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          background: 'var(--primary)',
                          color: '#fff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <Check size={14} strokeWidth={3} />
                      </div>
                    )}
                    <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '4px' }}>
                      {srv.category}
                    </span>
                    <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '6px', color: 'var(--text-primary)' }}>
                      {srv.name}
                    </h4>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px', flex: 1 }}>
                      {srv.shortDescription}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '13px', color: 'var(--text-tertiary)' }}>
                      <span>Est. Duration: {srv.durationMinutes} mins</span>
                      <strong style={{ color: 'var(--primary)', fontSize: '14px' }}>₹{srv.startingPrice}</strong>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 2: DOCTOR SELECTION ================= */}
        {currentStep === 2 && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <div className="eyebrow">STEP 2 OF 6</div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>
                Choose Your Consulting Specialist
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                Showing specialists certified in {selectedService?.category || 'general medicine'}.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {filteredDoctors.map(doc => {
                const isSelected = selectedDoctor?.id === doc.id;
                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoctor(doc)}
                    style={{
                      padding: '20px',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                      background: isSelected ? 'var(--primary-alpha-10)' : '#FFFFFF',
                      cursor: 'pointer',
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'center',
                      position: 'relative'
                    }}
                  >
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80';
                      }}
                      style={{ width: '64px', height: '64px', borderRadius: '12px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)' }}>
                          {doc.name}
                        </h4>
                        {isSelected && <CheckCircle2 size={16} color="var(--primary)" />}
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--primary)' }}>
                        {doc.specialty}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                        {doc.experienceYears}+ Years Exp • ★ {doc.rating}
                      </div>
                      <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', marginTop: '4px' }}>
                        Fee: ₹{doc.consultationFee}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= STEP 3: DATE SELECTION ================= */}
        {currentStep === 3 && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <div className="eyebrow">STEP 3 OF 6</div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>
                Select Appointment Date
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                Consultation with <strong>{selectedDoctor?.name}</strong>. Clinic opens Mon - Sat.
              </p>
            </div>

            {/* Quick 7-Day Date Picker Strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px', marginBottom: '32px' }}>
              {[0, 1, 2, 3, 4, 5, 6].map(offset => {
                const d = new Date();
                d.setDate(d.getDate() + offset);
                const isoStr = d.toISOString().split('T')[0];
                const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
                const dayNum = d.getDate();
                const monthName = d.toLocaleDateString('en-US', { month: 'short' });
                const isSelected = selectedDate === isoStr;
                const isSunday = d.getDay() === 0;

                return (
                  <div
                    key={isoStr}
                    onClick={() => !isSunday && setSelectedDate(isoStr)}
                    style={{
                      padding: '16px 12px',
                      borderRadius: 'var(--radius-sm)',
                      textAlign: 'center',
                      cursor: isSunday ? 'not-allowed' : 'pointer',
                      opacity: isSunday ? 0.4 : 1,
                      border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                      background: isSelected ? 'var(--primary)' : isSunday ? 'var(--surface-soft)' : '#FFFFFF',
                      color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                      transition: 'all 200ms var(--ease-out)'
                    }}
                  >
                    <div style={{ fontSize: '12px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '4px', opacity: isSelected ? 0.9 : 0.7 }}>
                      {dayName}
                    </div>
                    <div style={{ fontSize: '22px', fontWeight: '700', lineHeight: 1.1 }}>
                      {dayNum}
                    </div>
                    <div style={{ fontSize: '11px', marginTop: '4px', opacity: isSelected ? 0.9 : 0.7 }}>
                      {isSunday ? 'Closed' : monthName}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Or custom date picker */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', background: 'var(--surface-soft)', borderRadius: 'var(--radius-sm)' }}>
              <CalendarIcon size={20} color="var(--primary)" />
              <div style={{ flex: 1 }}>
                <label className="form-label" style={{ marginBottom: '4px', display: 'block' }}>
                  Choose another date (Next 30 Days):
                </label>
                <input
                  type="date"
                  className="form-input"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setSelectedDate(e.target.value)}
                  style={{ maxWidth: '240px' }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 4: TIME SLOT SELECTION ================= */}
        {currentStep === 4 && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <div className="eyebrow">STEP 4 OF 6</div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>
                Select Consultation Time Slot
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                Selected Date: <strong>{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</strong>
              </p>
            </div>

            {/* Morning Slots */}
            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-tertiary)', letterSpacing: '0.5px', marginBottom: '12px' }}>
                Morning Slots (09:00 AM - 12:30 PM)
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '10px' }}>
                {['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM'].map(slot => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      style={{
                        padding: '12px',
                        borderRadius: 'var(--radius-xs)',
                        border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                        background: isSelected ? 'var(--primary)' : '#FFFFFF',
                        color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                        fontWeight: '600',
                        fontSize: '13px',
                        boxShadow: isSelected ? 'var(--shadow-glow)' : 'none',
                        transition: 'all 150ms var(--ease-out)'
                      }}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Afternoon & Evening Slots */}
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-tertiary)', letterSpacing: '0.5px', marginBottom: '12px' }}>
                Afternoon & Evening Slots (02:00 PM - 06:30 PM)
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: '10px' }}>
                {['02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'].map(slot => {
                  const isSelected = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      onClick={() => setSelectedSlot(slot)}
                      style={{
                        padding: '12px',
                        borderRadius: 'var(--radius-xs)',
                        border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                        background: isSelected ? 'var(--primary)' : '#FFFFFF',
                        color: isSelected ? '#FFFFFF' : 'var(--text-primary)',
                        fontWeight: '600',
                        fontSize: '13px',
                        boxShadow: isSelected ? 'var(--shadow-glow)' : 'none',
                        transition: 'all 150ms var(--ease-out)'
                      }}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 5: PATIENT DETAILS ================= */}
        {currentStep === 5 && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <div className="eyebrow">STEP 5 OF 6</div>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: 'var(--text-primary)' }}>
                Patient Contact & Consultation Details
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                Your appointment confirmation & reminder will be sent via SMS and WhatsApp.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="patientName">
                  Full Name <span style={{ color: 'var(--error)' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="patientName"
                    type="text"
                    className="form-input"
                    placeholder="e.g. Anjali Sharma"
                    value={patientName}
                    onChange={e => setPatientName(e.target.value)}
                    style={{ borderColor: formErrors.name ? 'var(--error)' : undefined }}
                  />
                </div>
                {formErrors.name && <span className="form-error">{formErrors.name}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="patientPhone">
                  Mobile Phone Number <span style={{ color: 'var(--error)' }}>*</span>
                </label>
                <input
                  id="patientPhone"
                  type="tel"
                  className="form-input"
                  placeholder="+91 98765 43210"
                  value={patientPhone}
                  onChange={e => setPatientPhone(e.target.value)}
                  style={{ borderColor: formErrors.phone ? 'var(--error)' : undefined }}
                />
                {formErrors.phone && <span className="form-error">{formErrors.phone}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="patientEmail">
                  Email Address (Optional)
                </label>
                <input
                  id="patientEmail"
                  type="email"
                  className="form-input"
                  placeholder="name@example.com"
                  value={patientEmail}
                  onChange={e => setPatientEmail(e.target.value)}
                  style={{ borderColor: formErrors.email ? 'var(--error)' : undefined }}
                />
                {formErrors.email && <span className="form-error">{formErrors.email}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="patientDob">
                  Date of Birth (Optional)
                </label>
                <input
                  id="patientDob"
                  type="date"
                  className="form-input"
                  value={patientDob}
                  onChange={e => setPatientDob(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: '24px' }}>
              <label className="form-label" htmlFor="reasonForVisit">
                Symptoms / Reason for Consultation (Optional)
              </label>
              <textarea
                id="reasonForVisit"
                className="form-textarea"
                rows={3}
                placeholder="Briefly describe your symptoms, previous reports, or questions for the doctor..."
                value={reasonForVisit}
                onChange={e => setReasonForVisit(e.target.value)}
              />
            </div>

            {/* Summary Box */}
            <div 
              style={{ 
                padding: '16px 20px', 
                background: 'var(--surface-soft)', 
                borderRadius: 'var(--radius-sm)', 
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px'
              }}
            >
              <div>
                <div style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>Consulting with:</div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)' }}>
                  {selectedDoctor?.name} ({selectedService?.name})
                </div>
              </div>
              <div>
                <div style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>Schedule:</div>
                <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--primary)' }}>
                  {selectedDate} at {selectedSlot}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 6: CONFIRMATION ================= */}
        {currentStep === 6 && confirmedAppointment && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div 
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'var(--success-bg)',
                color: 'var(--success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}
            >
              <CheckCircle2 size={44} strokeWidth={2.2} />
            </div>

            <div className="badge badge-success" style={{ marginBottom: '12px', fontSize: '13px', padding: '6px 14px' }}>
              ✓ Appointment Successfully Scheduled
            </div>

            <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '8px' }}>
              We Look Forward to Welcoming You
            </h2>

            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '540px', margin: '0 auto 28px' }}>
              A confirmation receipt with directions and pre-consultation guidelines has been sent to <strong>{confirmedAppointment.patientPhone}</strong>.
            </p>

            {/* Receipt Summary Card */}
            <div 
              style={{
                maxWidth: '560px',
                margin: '0 auto 32px',
                background: 'var(--surface-soft)',
                border: '1.5px dashed var(--border-strong)',
                borderRadius: 'var(--radius-md)',
                padding: '24px',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border)', paddingBottom: '12px', marginBottom: '16px' }}>
                <div>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: '700' }}>
                    Confirmation Ref
                  </span>
                  <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary)' }}>
                    {confirmedAppointment.confirmationCode}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-tertiary)', fontWeight: '700' }}>
                    Status
                  </span>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--success)' }}>
                    Confirmed ✓
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', fontSize: '14px' }}>
                <div>
                  <span style={{ color: 'var(--text-tertiary)', fontSize: '12px' }}>Specialist:</span>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{confirmedAppointment.doctor.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--primary)' }}>{confirmedAppointment.doctor.specialty}</div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-tertiary)', fontSize: '12px' }}>Date & Time:</span>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                    {confirmedAppointment.date}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{confirmedAppointment.timeSlot}</div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-tertiary)', fontSize: '12px' }}>Patient Name:</span>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{confirmedAppointment.patientName}</div>
                </div>

                <div>
                  <span style={{ color: 'var(--text-tertiary)', fontSize: '12px' }}>Clinic Location:</span>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{confirmedAppointment.doctor.location}</div>
                </div>
              </div>
            </div>

            {/* Done Action */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <button
                onClick={() => {
                  alert(`Downloading appointment slip for #${confirmedAppointment.confirmationCode}`);
                }}
                className="btn btn-secondary"
              >
                <Download size={16} />
                Download Slip (PDF)
              </button>

              <button
                onClick={onNavigateHome}
                className="btn btn-primary"
              >
                Return to Home
              </button>
            </div>
          </div>
        )}

        {/* Bottom Navigation Buttons (Step 1-5) */}
        {currentStep < 6 && (
          <div 
            style={{ 
              marginTop: 'auto', 
              paddingTop: '28px', 
              borderTop: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            {currentStep > 1 ? (
              <button
                onClick={handlePrevStep}
                className="btn btn-secondary"
                style={{ padding: '10px 20px' }}
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
            ) : (
              <div></div>
            )}

            <button
              onClick={handleNextStep}
              className="btn btn-primary"
              style={{ padding: '12px 28px' }}
            >
              <span>{currentStep === 5 ? 'Confirm & Book Appointment' : 'Continue'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .hide-on-very-small { display: none; }
        }
      `}</style>
    </div>
  );
};

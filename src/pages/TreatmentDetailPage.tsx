import React from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  HelpCircle 
} from 'lucide-react';
import { ServiceTreatment } from '../types';

interface TreatmentDetailPageProps {
  service: ServiceTreatment;
  onBack: () => void;
  onBook: (service: ServiceTreatment) => void;
}

export const TreatmentDetailPage: React.FC<TreatmentDetailPageProps> = ({
  service,
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
          <span>Back to All Treatments</span>
        </button>

        {/* Treatment Header Card */}
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '36px',
              alignItems: 'center'
            }}
          >
            {/* Visual */}
            <div 
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: 'var(--elevation-2)',
                border: '3px solid var(--surface-soft)'
              }}
            >
              <img
                src={service.image}
                alt={service.name}
                style={{ width: '100%', height: '340px', objectFit: 'cover' }}
              />
            </div>

            {/* Info */}
            <div>
              <div className="badge badge-teal" style={{ marginBottom: '12px' }}>
                {service.category} Department
              </div>

              <h1 style={{ fontSize: '30px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '12px' }}>
                {service.name}
              </h1>

              <p style={{ fontSize: '15px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
                {service.fullDescription}
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap', marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={18} color="var(--primary)" />
                  <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-primary)' }}>
                    Est. Duration: {service.durationMinutes} Mins
                  </span>
                </div>

                <div>
                  <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>Starting from: </span>
                  <strong style={{ fontSize: '20px', color: 'var(--primary)' }}>₹{service.startingPrice}</strong>
                </div>
              </div>

              <button
                onClick={() => onBook(service)}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', maxWidth: '320px', boxShadow: 'var(--shadow-glow)' }}
              >
                <Calendar size={18} />
                <span>Book This Procedure</span>
              </button>
            </div>
          </div>
        </div>

        {/* Symptoms & Clinical Advantages */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '28px', marginBottom: '32px' }}>
          {/* Symptoms Treated */}
          <div className="card-luxury" style={{ padding: '32px', background: '#FFFFFF' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertCircle size={20} color="#D97706" />
              Symptoms & Indications Treated
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {service.symptoms.map((sym, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#D97706', marginTop: '8px', flexShrink: 0 }} />
                  <span>{sym}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Clinical Benefits */}
          <div className="card-luxury" style={{ padding: '32px', background: '#FFFFFF' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={20} color="var(--primary)" />
              Clinical Benefits & Outcomes
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {service.benefits.map((ben, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', fontSize: '14px', color: 'var(--text-secondary)' }}>
                  <CheckCircle2 size={16} color="var(--primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{ben}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Treatment Specific FAQs */}
        {service.faqs && service.faqs.length > 0 && (
          <div className="card-luxury" style={{ padding: '32px', background: '#FFFFFF' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircle size={20} color="var(--primary)" />
              Frequently Asked Questions for {service.name}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {service.faqs.map((faq, i) => (
                <div key={i} style={{ padding: '16px', background: 'var(--surface-soft)', borderRadius: 'var(--radius-sm)' }}>
                  <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>
                    {faq.question}
                  </h4>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

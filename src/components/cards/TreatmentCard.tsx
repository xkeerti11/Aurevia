import React from 'react';
import { 
  HeartPulse, 
  Sparkles, 
  ShieldCheck, 
  Baby, 
  Activity, 
  Brain, 
  ArrowRight,
  Clock,
  CheckCircle
} from 'lucide-react';
import { ServiceTreatment } from '../../types';

interface TreatmentCardProps {
  service: ServiceTreatment;
  onSelectService?: (service: ServiceTreatment) => void;
  onBookService?: (service: ServiceTreatment) => void;
}

export const TreatmentCard: React.FC<TreatmentCardProps> = ({
  service,
  onSelectService,
  onBookService
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartPulse': return <HeartPulse size={26} color="var(--primary)" />;
      case 'Sparkles': return <Sparkles size={26} color="var(--primary)" />;
      case 'ShieldCheck': return <ShieldCheck size={26} color="var(--primary)" />;
      case 'Baby': return <Baby size={26} color="var(--primary)" />;
      case 'Activity': return <Activity size={26} color="var(--primary)" />;
      case 'Brain': return <Brain size={26} color="var(--primary)" />;
      default: return <Activity size={26} color="var(--primary)" />;
    }
  };

  return (
    <div 
      className="card-luxury"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Treatment Image Header */}
      <div 
        style={{ 
          position: 'relative', 
          height: '190px', 
          width: '100%', 
          overflow: 'hidden',
          background: 'var(--surface-soft)',
          cursor: onSelectService ? 'pointer' : 'default'
        }}
        onClick={() => onSelectService && onSelectService(service)}
      >
        <img
          src={service.image}
          alt={service.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 400ms var(--ease-out)'
          }}
          className="doctor-card-img"
          loading="lazy"
        />
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.1) 0%, rgba(15, 23, 42, 0.6) 100%)'
          }}
        />

        {service.popular && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: '#0F766E',
              color: '#FFFFFF',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              fontSize: '11px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.25)'
            }}
          >
            Most Requested
          </div>
        )}

        <div
          style={{
            position: 'absolute',
            bottom: '12px',
            left: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
          >
            {getIcon(service.iconName)}
          </div>
          <span 
            style={{ 
              fontSize: '11px', 
              fontWeight: '700', 
              textTransform: 'uppercase', 
              letterSpacing: '0.8px', 
              color: '#FFFFFF',
              background: 'rgba(15, 23, 42, 0.6)',
              padding: '3px 8px',
              borderRadius: '6px',
              backdropFilter: 'blur(4px)'
            }}
          >
            {service.category}
          </span>
        </div>
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 
          style={{ 
            fontSize: '18px', 
            fontWeight: '700', 
            marginBottom: '8px', 
            color: 'var(--text-primary)',
            cursor: onSelectService ? 'pointer' : 'default',
            lineHeight: 1.3
          }}
          onClick={() => onSelectService && onSelectService(service)}
        >
          {service.name}
        </h3>

        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
          {service.shortDescription}
        </p>

      {/* Key Benefits snippet */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '8px' }}>
          Key Advantages:
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {service.benefits.slice(0, 2).map((benefit, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <CheckCircle size={13} color="var(--primary)" style={{ flexShrink: 0 }} />
              <span>{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div 
        style={{ 
          marginTop: 'auto', 
          paddingTop: '16px', 
          borderTop: '1px solid var(--border)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between' 
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: 'var(--text-tertiary)' }}>
          <Clock size={14} />
          <span>{service.durationMinutes} Mins</span>
        </div>

        <button
          onClick={() => onSelectService && onSelectService(service)}
          className="btn btn-ghost btn-sm"
          style={{ padding: '4px 8px', fontSize: '13px', fontWeight: '700' }}
        >
          <span>Details</span>
          <ArrowRight size={14} />
        </button>
      </div>
      </div>
    </div>
  );
};

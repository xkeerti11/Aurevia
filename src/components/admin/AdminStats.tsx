import React from 'react';
import { Calendar, Users, TrendingUp, DollarSign, CheckCircle2, Clock } from 'lucide-react';

export const AdminStats: React.FC = () => {
  const stats = [
    {
      title: 'Total Appointments',
      value: '1,847',
      change: '+14.2%',
      trend: 'up',
      subtitle: 'vs last month (1,617)',
      icon: <Calendar size={22} color="var(--primary)" />,
      color: 'var(--primary-alpha-10)'
    },
    {
      title: 'Active Leads Pipeline',
      value: '428',
      change: '+8.5%',
      trend: 'up',
      subtitle: '72% qualified rate',
      icon: <Users size={22} color="var(--secondary)" />,
      color: 'var(--secondary-alpha-10)'
    },
    {
      title: 'Completed Consultations',
      value: '1,590',
      change: '96.2%',
      trend: 'up',
      subtitle: 'No-show rate < 3.8%',
      icon: <CheckCircle2 size={22} color="var(--success)" />,
      color: 'var(--success-bg)'
    },
    {
      title: 'Monthly Clinic Revenue',
      value: '₹28.4 L',
      change: '+18.6%',
      trend: 'up',
      subtitle: 'Average ₹1,780 / patient',
      icon: <TrendingUp size={22} color="#D97706" />,
      color: 'var(--warning-bg)'
    }
  ];

  return (
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '20px',
        marginBottom: '32px'
      }}
    >
      {stats.map((s, idx) => (
        <div 
          key={idx}
          className="card-luxury"
          style={{
            padding: '24px',
            background: '#FFFFFF',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <span style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-tertiary)' }}>
              {s.title}
            </span>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {s.icon}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-primary)', lineHeight: '1.1', marginBottom: '6px' }}>
              {s.value}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
              <span style={{ fontWeight: '700', color: 'var(--success)' }}>
                {s.change}
              </span>
              <span style={{ color: 'var(--text-tertiary)' }}>
                {s.subtitle}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

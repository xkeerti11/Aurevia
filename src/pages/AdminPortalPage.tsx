import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Calendar, 
  Users, 
  TrendingUp, 
  FileText, 
  Settings, 
  LogOut, 
  ChevronRight,
  UserCheck,
  Award,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Appointment, Lead, AppointmentStatus, LeadStatus } from '../types';
import { AdminStats } from '../components/admin/AdminStats';
import { AppointmentsTable } from '../components/admin/AppointmentsTable';
import { LeadsKanban } from '../components/admin/LeadsKanban';
import { MOCK_DOCTORS } from '../data/mockData';

interface AdminPortalPageProps {
  currentUser?: {
    id: string;
    email: string;
    name: string;
    role: string;
  } | null;
  appointments: Appointment[];
  leads: Lead[];
  onUpdateAppointmentStatus: (id: string, newStatus: AppointmentStatus) => void;
  onUpdateLeadStatus: (id: string, newStatus: LeadStatus) => void;
  onLogout: () => void;
  onNavigateHome: () => void;
}

export const AdminPortalPage: React.FC<AdminPortalPageProps> = ({
  currentUser = { id: 'admin-1', email: 'admin@aureviahealth.com', name: 'Dr. Vikram Mehta', role: 'owner' },
  appointments,
  leads,
  onUpdateAppointmentStatus,
  onUpdateLeadStatus,
  onLogout,
  onNavigateHome
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'appointments' | 'leads' | 'doctors' | 'settings'>('overview');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#F8FAFD' }}>
      {/* Admin Sidebar Navigation */}
      <aside 
        style={{
          width: '260px',
          background: '#0F172A',
          color: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '24px 16px',
          borderRight: '1px solid #1E293B',
          flexShrink: 0
        }}
      >
        <div>
          {/* Brand */}
          <div 
            onClick={onNavigateHome}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 8px', marginBottom: '32px', cursor: 'pointer' }}
          >
            <div 
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-sm)',
                background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '17px', fontWeight: '800', letterSpacing: '-0.02em', color: '#FFFFFF', lineHeight: 1.1 }}>
                AUREVIA<span style={{ color: 'var(--primary-light)' }}>HEALTH</span>
              </div>
              <div style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '0.12em', color: '#94A3B8', textTransform: 'uppercase' }}>
                Admin Operations
              </div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button
              onClick={() => setActiveTab('overview')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                fontWeight: activeTab === 'overview' ? '700' : '500',
                background: activeTab === 'overview' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'overview' ? '#FFFFFF' : '#94A3B8',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 180ms ease'
              }}
            >
              <TrendingUp size={18} />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('appointments')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                fontWeight: activeTab === 'appointments' ? '700' : '500',
                background: activeTab === 'appointments' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'appointments' ? '#FFFFFF' : '#94A3B8',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 180ms ease'
              }}
            >
              <Calendar size={18} />
              <span>Appointments</span>
              <span style={{ marginLeft: 'auto', background: 'rgba(255, 255, 255, 0.2)', padding: '2px 8px', borderRadius: '10px', fontSize: '11px' }}>
                {appointments.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                fontWeight: activeTab === 'leads' ? '700' : '500',
                background: activeTab === 'leads' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'leads' ? '#FFFFFF' : '#94A3B8',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 180ms ease'
              }}
            >
              <Users size={18} />
              <span>Leads Pipeline</span>
              <span style={{ marginLeft: 'auto', background: 'rgba(255, 255, 255, 0.2)', padding: '2px 8px', borderRadius: '10px', fontSize: '11px' }}>
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('doctors')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                fontWeight: activeTab === 'doctors' ? '700' : '500',
                background: activeTab === 'doctors' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'doctors' ? '#FFFFFF' : '#94A3B8',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 180ms ease'
              }}
            >
              <UserCheck size={18} />
              <span>Medical Staff CMS</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '12px 14px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '13px',
                fontWeight: activeTab === 'settings' ? '700' : '500',
                background: activeTab === 'settings' ? 'var(--primary)' : 'transparent',
                color: activeTab === 'settings' ? '#FFFFFF' : '#94A3B8',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 180ms ease'
              }}
            >
              <Settings size={18} />
              <span>Clinic Settings</span>
            </button>
          </nav>
        </div>

        {/* User Card & Logout */}
        <div style={{ borderTop: '1px solid #1E293B', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '13px' }}>
              {currentUser?.name?.charAt(0) || 'A'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '13px', fontWeight: '700', color: '#FFFFFF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {currentUser?.name || 'Administrator'}
              </div>
              <div style={{ fontSize: '11px', color: '#94A3B8', textTransform: 'uppercase', fontWeight: '600' }}>
                {currentUser?.role || 'Staff'}
              </div>
            </div>
          </div>

          <button
            onClick={onLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              padding: '10px',
              borderRadius: 'var(--radius-sm)',
              background: '#1E293B',
              color: '#F87171',
              border: 'none',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 180ms ease'
            }}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Administrative Work Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>
        {/* Top Header */}
        <header 
          style={{
            height: '70px',
            background: '#FFFFFF',
            borderBottom: '1px solid var(--border)',
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary)', textTransform: 'capitalize' }}>
              {activeTab === 'overview' ? 'Clinical Performance Dashboard' : activeTab}
            </h1>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Aurevia Health Specialty Clinic & Diagnostics • Operational Center
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#ECFDF5', color: '#059669', padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: '12px', fontWeight: '700' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#059669', display: 'inline-block' }} />
              <span>Live System Online</span>
            </div>

            <button
              onClick={onNavigateHome}
              style={{
                background: 'var(--surface-soft)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 14px',
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--primary)',
                cursor: 'pointer'
              }}
            >
              Public Website ↗
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div style={{ padding: '32px' }}>
          {activeTab === 'overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <AdminStats />

              <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--border)', boxShadow: 'var(--elevation-1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <h2 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-primary)' }}>
                      Recent Appointment Queue
                    </h2>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      Latest incoming consultation bookings requiring clinical coordination.
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveTab('appointments')}
                    style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    View All →
                  </button>
                </div>

                <AppointmentsTable
                  appointments={appointments.slice(0, 5)}
                  onUpdateStatus={onUpdateAppointmentStatus}
                />
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--border)', boxShadow: 'var(--elevation-1)' }}>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>
                  All Scheduled Consultations
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Search by patient name, confirmation code (#AU-), or filter by clinical status.
                </p>
              </div>
              <AppointmentsTable
                appointments={appointments}
                onUpdateStatus={onUpdateAppointmentStatus}
              />
            </div>
          )}

          {activeTab === 'leads' && (
            <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--border)', boxShadow: 'var(--elevation-1)' }}>
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)' }}>
                  Patient Enquiries & Conversion Pipeline
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Track potential consultations across inquiry lifecycle stages with quick WhatsApp and Direct Call action triggers.
                </p>
              </div>
              <LeadsKanban
                leads={leads}
                onUpdateLeadStatus={onUpdateLeadStatus}
              />
            </div>
          )}

          {activeTab === 'doctors' && (
            <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--border)', boxShadow: 'var(--elevation-1)' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '16px' }}>
                Specialist Physician Directory
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {MOCK_DOCTORS.map(doc => (
                  <div key={doc.id} style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', padding: '16px', display: 'flex', gap: '14px', alignItems: 'center' }}>
                    <img src={doc.avatar} alt={doc.name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)' }}>{doc.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600' }}>{doc.specialty}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{doc.experienceYears} Years Exp • Fee ₹{doc.consultationFee}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div style={{ background: '#FFFFFF', borderRadius: 'var(--radius-md)', padding: '24px', border: '1px solid var(--border)', boxShadow: 'var(--elevation-1)', maxWidth: '640px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '16px' }}>
                Clinic Operation Settings
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>Clinic Name</label>
                  <input type="text" className="form-input" defaultValue="Aurevia Health Specialist Clinic & Diagnostics" />
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>Contact Hotline</label>
                  <input type="text" className="form-input" defaultValue="+91 124 498 7000" />
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '6px' }}>Emergency Concierge Desk</label>
                  <input type="text" className="form-input" defaultValue="+91 98112 34567" />
                </div>
                <button className="btn-primary" style={{ alignSelf: 'flex-start', marginTop: '8px' }}>
                  Save Configuration
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

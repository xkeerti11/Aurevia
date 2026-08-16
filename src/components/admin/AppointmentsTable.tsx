import React, { useState } from 'react';
import { Search, Filter, Calendar, Clock, CheckCircle, XCircle, AlertCircle, Phone, Mail, MoreVertical } from 'lucide-react';
import { Appointment, AppointmentStatus } from '../../types';

interface AppointmentsTableProps {
  appointments: Appointment[];
  onUpdateStatus: (appointmentId: string, newStatus: AppointmentStatus) => void;
}

export const AppointmentsTable: React.FC<AppointmentsTableProps> = ({
  appointments,
  onUpdateStatus
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedAptForAction, setSelectedAptForAction] = useState<Appointment | null>(null);

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = 
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.confirmationCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: AppointmentStatus) => {
    switch (status) {
      case 'Confirmed':
        return <span className="badge badge-success">✓ Confirmed</span>;
      case 'Pending':
        return <span className="badge badge-warning">⏳ Pending</span>;
      case 'Completed':
        return <span className="badge badge-teal">★ Completed</span>;
      case 'Cancelled':
        return <span className="badge" style={{ background: 'var(--error-bg)', color: 'var(--error)' }}>✕ Cancelled</span>;
      case 'No-show':
        return <span className="badge" style={{ background: 'var(--surface-soft)', color: 'var(--text-muted)' }}>No-Show</span>;
    }
  };

  return (
    <div className="card-luxury" style={{ padding: '24px', background: '#FFFFFF' }}>
      {/* Header & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>
            Patient Appointments Management
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
            Showing {filteredAppointments.length} of {appointments.length} recorded consultations
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Search Box */}
          <div style={{ position: 'relative', minWidth: '240px' }}>
            <Search size={16} color="var(--text-tertiary)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search patient, doctor, ref..."
              className="form-input"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '36px', height: '40px', fontSize: '13px' }}
            />
          </div>

          {/* Status Filter */}
          <select
            className="form-select"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{ width: '150px', height: '40px', fontSize: '13px' }}
          >
            <option value="All">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
          <thead>
            <tr style={{ background: 'var(--surface-soft)', borderBottom: '2px solid var(--border)' }}>
              <th style={{ padding: '12px 16px', fontWeight: '700', color: 'var(--text-secondary)' }}>REF ID</th>
              <th style={{ padding: '12px 16px', fontWeight: '700', color: 'var(--text-secondary)' }}>PATIENT</th>
              <th style={{ padding: '12px 16px', fontWeight: '700', color: 'var(--text-secondary)' }}>DOCTOR & SPECIALTY</th>
              <th style={{ padding: '12px 16px', fontWeight: '700', color: 'var(--text-secondary)' }}>DATE & TIME</th>
              <th style={{ padding: '12px 16px', fontWeight: '700', color: 'var(--text-secondary)' }}>STATUS</th>
              <th style={{ padding: '12px 16px', fontWeight: '700', color: 'var(--text-secondary)', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(apt => (
              <tr key={apt.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background 150ms' }} className="table-row-hover">
                <td style={{ padding: '16px', fontWeight: '700', color: 'var(--primary)' }}>
                  {apt.confirmationCode}
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{apt.patientName}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{apt.patientPhone}</div>
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{apt.doctor.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--primary)' }}>{apt.doctor.specialty}</div>
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{apt.date}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{apt.timeSlot}</div>
                </td>
                <td style={{ padding: '16px' }}>
                  {getStatusBadge(apt.status)}
                </td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', gap: '6px' }}>
                    {apt.status === 'Pending' && (
                      <button
                        onClick={() => onUpdateStatus(apt.id, 'Confirmed')}
                        className="btn btn-sm"
                        style={{ background: 'var(--success-bg)', color: 'var(--success)', padding: '4px 8px', fontSize: '11px', fontWeight: '700' }}
                        title="Confirm Appointment"
                      >
                        Confirm
                      </button>
                    )}
                    {apt.status === 'Confirmed' && (
                      <button
                        onClick={() => onUpdateStatus(apt.id, 'Completed')}
                        className="btn btn-sm"
                        style={{ background: 'var(--primary-alpha-10)', color: 'var(--primary)', padding: '4px 8px', fontSize: '11px', fontWeight: '700' }}
                        title="Mark Complete"
                      >
                        Complete
                      </button>
                    )}
                    {apt.status !== 'Cancelled' && (
                      <button
                        onClick={() => onUpdateStatus(apt.id, 'Cancelled')}
                        className="btn btn-sm"
                        style={{ background: 'var(--surface-soft)', color: 'var(--error)', padding: '4px 8px', fontSize: '11px' }}
                        title="Cancel Appointment"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .table-row-hover:hover {
          background: var(--surface-soft);
        }
      `}</style>
    </div>
  );
};

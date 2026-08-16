import React from 'react';
import { Phone, MessageCircle, MoreVertical, Plus, ArrowRight, UserCheck } from 'lucide-react';
import { Lead, LeadStatus } from '../../types';

interface LeadsKanbanProps {
  leads: Lead[];
  onUpdateLeadStatus: (leadId: string, newStatus: LeadStatus) => void;
}

export const LeadsKanban: React.FC<LeadsKanbanProps> = ({ leads, onUpdateLeadStatus }) => {
  const columns: { status: LeadStatus; title: string; color: string }[] = [
    { status: 'New', title: 'New Enquiries', color: '#0369A1' },
    { status: 'Contacted', title: 'Contacted', color: '#D97706' },
    { status: 'Qualified', title: 'Qualified', color: '#0F766E' },
    { status: 'Booked', title: 'Booked / Converted', color: '#16A34A' },
    { status: 'Lost', title: 'Closed / Lost', color: '#64748B' }
  ];

  return (
    <div style={{ overflowX: 'auto', paddingBottom: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(260px, 1fr))', gap: '16px' }}>
        {columns.map(col => {
          const colLeads = leads.filter(l => l.status === col.status);

          return (
            <div
              key={col.status}
              style={{
                background: 'var(--surface-soft)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                border: '1px solid var(--border)',
                display: 'flex',
                flexDirection: 'column',
                minHeight: '520px'
              }}
            >
              {/* Column Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: col.color }} />
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)' }}>
                    {col.title}
                  </span>
                </div>
                <span
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid var(--border)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '11px',
                    fontWeight: '700',
                    color: 'var(--text-secondary)'
                  }}
                >
                  {colLeads.length}
                </span>
              </div>

              {/* Cards Container */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                {colLeads.map(lead => (
                  <div
                    key={lead.id}
                    className="card-luxury"
                    style={{
                      padding: '16px',
                      background: '#FFFFFF',
                      borderRadius: 'var(--radius-sm)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>
                        {lead.name}
                      </span>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: '700',
                          textTransform: 'uppercase',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: 'var(--surface-soft)',
                          color: 'var(--text-tertiary)'
                        }}
                      >
                        {lead.source}
                      </span>
                    </div>

                    <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: '600', marginBottom: '6px' }}>
                      {lead.serviceInterested}
                    </div>

                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '12px' }}>
                      {lead.notes || 'No preliminary notes'}
                    </div>

                    {/* Quick Trigger Bar */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <a
                          href={`tel:${lead.phone}`}
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            background: 'var(--surface-soft)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--text-primary)'
                          }}
                          title={`Call ${lead.phone}`}
                        >
                          <Phone size={13} />
                        </a>

                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '6px',
                            background: 'rgba(37, 211, 102, 0.15)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#128C7E'
                          }}
                          title={`WhatsApp ${lead.phone}`}
                        >
                          <MessageCircle size={13} />
                        </a>
                      </div>

                      {/* Advance Stage Button */}
                      {col.status === 'New' && (
                        <button
                          onClick={() => onUpdateLeadStatus(lead.id, 'Contacted')}
                          style={{ fontSize: '11px', fontWeight: '700', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '2px' }}
                        >
                          Contacted <ArrowRight size={11} />
                        </button>
                      )}
                      {col.status === 'Contacted' && (
                        <button
                          onClick={() => onUpdateLeadStatus(lead.id, 'Qualified')}
                          style={{ fontSize: '11px', fontWeight: '700', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '2px' }}
                        >
                          Qualify <ArrowRight size={11} />
                        </button>
                      )}
                      {col.status === 'Qualified' && (
                        <button
                          onClick={() => onUpdateLeadStatus(lead.id, 'Booked')}
                          style={{ fontSize: '11px', fontWeight: '700', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '2px' }}
                        >
                          Booked <UserCheck size={11} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

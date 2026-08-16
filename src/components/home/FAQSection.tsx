import React, { useState } from 'react';
import { SectionHeader } from '../common/SectionHeader';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { MOCK_FAQS } from '../../data/mockData';

export const FAQSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(MOCK_FAQS[0].id);

  const categories = ['All', 'Appointments', 'Consultation', 'Billing & Insurance', 'Facilities'];

  const filteredFaqs = activeCategory === 'All'
    ? MOCK_FAQS
    : MOCK_FAQS.filter(faq => faq.category === activeCategory);

  const toggleAccordion = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <section className="section-padding" style={{ background: '#FFFFFF' }}>
      <div className="container" style={{ maxWidth: '960px' }}>
        <SectionHeader
          eyebrow="FREQUENTLY ASKED QUESTIONS"
          title="Clear Answers to Your Healthcare Inquiries"
          description="Everything you need to know about our clinic appointments, insurance claims, and consultation protocols."
          align="center"
        />

        {/* Category Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px', marginBottom: '32px' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: 'var(--radius-full)',
                fontSize: '13px',
                fontWeight: '600',
                background: activeCategory === cat ? 'var(--primary)' : 'var(--surface-soft)',
                color: activeCategory === cat ? '#FFFFFF' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: activeCategory === cat ? 'var(--primary)' : 'var(--border)',
                transition: 'all 200ms var(--ease-out)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion Container */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filteredFaqs.map(faq => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                style={{
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid',
                  borderColor: isExpanded ? 'var(--primary)' : 'var(--border)',
                  background: isExpanded ? 'var(--surface-softer)' : '#FFFFFF',
                  overflow: 'hidden',
                  transition: 'all 200ms var(--ease-out)'
                }}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    background: 'transparent',
                    gap: '16px'
                  }}
                  aria-expanded={isExpanded}
                >
                  <span style={{ fontSize: '16px', fontWeight: '700', color: isExpanded ? 'var(--primary)' : 'var(--text-primary)' }}>
                    {faq.question}
                  </span>
                  <div
                    style={{
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 250ms var(--ease-out)',
                      color: isExpanded ? 'var(--primary)' : 'var(--text-tertiary)',
                      flexShrink: 0
                    }}
                  >
                    <ChevronDown size={20} />
                  </div>
                </button>

                {isExpanded && (
                  <div
                    style={{
                      padding: '0 24px 20px',
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.7'
                    }}
                  >
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

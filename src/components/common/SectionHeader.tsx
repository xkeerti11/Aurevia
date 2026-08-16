import React from 'react';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  actionText?: string;
  onActionClick?: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = 'left',
  actionText,
  onActionClick
}) => {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: align === 'center' ? 'column' : 'row',
        alignItems: align === 'center' ? 'center' : 'flex-end',
        justifyContent: 'space-between',
        textAlign: align,
        marginBottom: '44px',
        gap: '20px',
        flexWrap: 'wrap'
      }}
    >
      <div style={{ maxWidth: align === 'center' ? '720px' : '680px' }}>
        {eyebrow && (
          <div className="eyebrow" style={{ marginBottom: '12px' }}>
            {eyebrow}
          </div>
        )}
        <h2 className="h2" style={{ color: 'var(--text-primary)', marginBottom: description ? '12px' : '0' }}>
          {title}
        </h2>
        {description && (
          <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
            {description}
          </p>
        )}
      </div>

      {actionText && onActionClick && align !== 'center' && (
        <button
          onClick={onActionClick}
          className="btn btn-secondary"
          style={{ padding: '10px 20px', fontSize: '14px' }}
        >
          <span>{actionText}</span>
          <ArrowRight size={16} />
        </button>
      )}
    </div>
  );
};

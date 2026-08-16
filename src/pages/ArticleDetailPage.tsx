import React from 'react';
import { ArrowLeft, Clock, Calendar, User, Share2, Tag, ShieldCheck } from 'lucide-react';
import { Article } from '../types';

interface ArticleDetailPageProps {
  article: Article;
  onBack: () => void;
  onBookAppointment: () => void;
}

export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({
  article,
  onBack,
  onBookAppointment
}) => {
  return (
    <div className="section-padding" style={{ background: 'var(--background)' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        <button
          onClick={onBack}
          className="btn btn-ghost"
          style={{ marginBottom: '24px', paddingLeft: 0, display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeft size={16} />
          <span>Back to Health Guide</span>
        </button>

        <article className="card-luxury" style={{ padding: 'clamp(24px, 5vw, 48px)', background: '#FFFFFF' }}>
          <div className="badge badge-teal" style={{ marginBottom: '16px' }}>
            {article.category}
          </div>

          <h1 style={{ fontSize: 'clamp(26px, 3.5vw, 36px)', fontWeight: '800', color: 'var(--text-primary)', lineHeight: '1.25', marginBottom: '16px' }}>
            {article.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap', paddingBottom: '20px', borderBottom: '1px solid var(--border)', marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={article.author.avatar}
                alt={article.author.name}
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>{article.author.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{article.author.role}</div>
              </div>
            </div>

            <div style={{ fontSize: '13px', color: 'var(--text-tertiary)', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Clock size={14} />
              <span>{article.readTime}</span>
              <span>•</span>
              <span>{article.publishedDate}</span>
            </div>
          </div>

          <div style={{ borderRadius: '16px', overflow: 'hidden', marginBottom: '32px' }}>
            <img
              src={article.image}
              alt={article.title}
              style={{ width: '100%', maxHeight: '420px', objectFit: 'cover' }}
            />
          </div>

          <div style={{ fontSize: '16px', lineHeight: '1.8', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
            {article.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {/* Tags */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', paddingTop: '20px', borderTop: '1px solid var(--border)', marginBottom: '32px' }}>
            <Tag size={16} color="var(--text-tertiary)" />
            {article.tags.map(tag => (
              <span key={tag} style={{ fontSize: '12px', background: 'var(--surface-soft)', padding: '4px 10px', borderRadius: 'var(--radius-xs)', color: 'var(--text-secondary)' }}>
                #{tag}
              </span>
            ))}
          </div>

          {/* Consultation Callout */}
          <div 
            style={{
              padding: '24px',
              background: 'var(--surface-soft)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <div>
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
                Need personalized medical consultation?
              </h4>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                Speak directly with {article.author.name} or our specialist board.
              </p>
            </div>

            <button
              onClick={onBookAppointment}
              className="btn btn-primary btn-sm"
            >
              Book Specialist Visit
            </button>
          </div>
        </article>
      </div>
    </div>
  );
};

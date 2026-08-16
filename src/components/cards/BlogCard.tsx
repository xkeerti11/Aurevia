import React from 'react';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Article } from '../../types';

interface BlogCardProps {
  article: Article;
  onSelectArticle?: (article: Article) => void;
}

export const BlogCard: React.FC<BlogCardProps> = ({ article, onSelectArticle }) => {
  return (
    <div
      className="card-luxury"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '#FFFFFF',
        overflow: 'hidden'
      }}
    >
      <div 
        style={{ 
          height: '210px', 
          width: '100%', 
          overflow: 'hidden', 
          position: 'relative',
          cursor: onSelectArticle ? 'pointer' : 'default'
        }}
        onClick={() => onSelectArticle && onSelectArticle(article)}
      >
        <img
          src={article.image}
          alt={article.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          loading="lazy"
        />
        <span
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            padding: '3px 10px',
            borderRadius: 'var(--radius-full)',
            fontSize: '11px',
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}
        >
          {article.category}
        </span>
      </div>

      <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '10px' }}>
          <span>{article.publishedDate}</span>
          <span>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={13} />
            {article.readTime}
          </span>
        </div>

        <h3
          style={{
            fontSize: '17px',
            fontWeight: '700',
            lineHeight: '1.4',
            marginBottom: '10px',
            color: 'var(--text-primary)',
            cursor: onSelectArticle ? 'pointer' : 'default'
          }}
          onClick={() => onSelectArticle && onSelectArticle(article)}
        >
          {article.title}
        </h3>

        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '20px', flex: 1 }}>
          {article.summary}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img
              src={article.author.avatar}
              alt={article.author.name}
              style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-primary)' }}>
              {article.author.name}
            </span>
          </div>

          <button
            onClick={() => onSelectArticle && onSelectArticle(article)}
            className="btn btn-ghost btn-sm"
            style={{ padding: '4px 8px', fontSize: '13px', fontWeight: '700' }}
          >
            <span>Read</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

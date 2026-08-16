import React, { useState } from 'react';
import { SectionHeader } from '../components/common/SectionHeader';
import { BlogCard } from '../components/cards/BlogCard';
import { Article } from '../types';
import { MOCK_ARTICLES } from '../data/mockData';
import { Search } from 'lucide-react';

interface ResourcesPageProps {
  onSelectArticle: (article: Article) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onSelectArticle }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');

  const tags = ['All', 'Cardiology', 'Dermatology', 'Preventive Health', 'General Health'];

  const filteredArticles = MOCK_ARTICLES.filter(art => {
    const matchesSearch = 
      art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTag = selectedTag === 'All' || art.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });

  return (
    <div className="section-padding" style={{ background: 'var(--background)' }}>
      <div className="container">
        <SectionHeader
          eyebrow="HEALTH RESOURCES & GUIDES"
          title="Evidence-Based Medical Articles & Wellness Insights"
          description="Written directly by Aurevia Health specialists to empower you with medically accurate health information."
        />

        {/* Filter bar */}
        <div 
          style={{
            background: '#FFFFFF',
            padding: '20px 24px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border)',
            boxShadow: 'var(--elevation-1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
            marginBottom: '36px'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '13px',
                  fontWeight: '600',
                  background: selectedTag === tag ? 'var(--primary)' : 'var(--surface-soft)',
                  color: selectedTag === tag ? '#FFFFFF' : 'var(--text-secondary)',
                  border: '1px solid',
                  borderColor: selectedTag === tag ? 'var(--primary)' : 'var(--border)',
                  transition: 'all 200ms var(--ease-out)'
                }}
              >
                {tag}
              </button>
            ))}
          </div>

          <div style={{ position: 'relative', minWidth: '260px' }}>
            <Search size={16} color="var(--text-tertiary)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search medical guides..."
              className="form-input"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{ paddingLeft: '38px', height: '42px', fontSize: '13px' }}
            />
          </div>
        </div>

        {/* Articles Grid */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px'
          }}
        >
          {filteredArticles.map(article => (
            <BlogCard
              key={article.id}
              article={article}
              onSelectArticle={onSelectArticle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

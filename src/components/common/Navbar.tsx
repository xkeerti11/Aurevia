import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Calendar } from 'lucide-react';
import { CLINIC_INFO } from '../../data/mockData';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Specialties & Care', path: '/treatments' },
    { label: 'Specialists', path: '/doctors' },
    { label: 'Facilities', path: '/facilities' },
    { label: 'About Clinic', path: '/about' },
    { label: 'Health Guide', path: '/resources' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        boxShadow: isScrolled ? 'var(--elevation-2)' : 'none',
        transition: 'all 240ms var(--ease-out)'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '76px' }}>
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div 
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: 'var(--elevation-1)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '20px', fontWeight: '800', letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1.1 }}>
              AUREVIA<span style={{ color: 'var(--primary)' }}>HEALTH</span>
            </div>
            <div style={{ fontSize: '10px', fontWeight: '600', letterSpacing: '0.12em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Specialist Clinic & Diagnostics
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links (NO Admin link visible to public) */}
        <nav className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: '8px 0',
                  position: 'relative',
                  transition: 'color 180ms var(--ease-out)'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = isActive ? 'var(--primary)' : 'var(--text-secondary)')}
              >
                {item.label}
                {isActive && (
                  <span 
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2.5px',
                      borderRadius: '2px',
                      backgroundColor: 'var(--primary)'
                    }} 
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action CTA & Mobile Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => onNavigate('/appointment')}
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '14px' }}
          >
            <Calendar size={16} />
            <span>Book Appointment</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              padding: '6px',
              display: 'none'
            }}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            background: '#FFFFFF',
            borderTop: '1px solid var(--border)',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: 'var(--elevation-3)'
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => {
                onNavigate(item.path);
                setMobileMenuOpen(false);
              }}
              style={{
                textAlign: 'left',
                background: 'none',
                border: 'none',
                fontSize: '15px',
                fontWeight: currentPath === item.path ? '700' : '500',
                color: currentPath === item.path ? 'var(--primary)' : 'var(--text-primary)',
                padding: '8px 0',
                cursor: 'pointer'
              }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              onNavigate('/appointment');
              setMobileMenuOpen(false);
            }}
            className="btn-primary"
            style={{ marginTop: '8px', width: '100%', justifyContent: 'center' }}
          >
            <Calendar size={16} />
            <span>Book Appointment</span>
          </button>
        </div>
      )}
    </header>
  );
};

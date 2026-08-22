import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
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
    { label: 'Specialties', path: '/treatments' },
    { label: 'Specialists', path: '/doctors' },
    { label: 'Facilities', path: '/facilities' },
    { label: 'About Clinic', path: '/about' },
    { label: 'Health Guide', path: '/resources' },
    { label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.96)' : '#FFFFFF',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        boxShadow: isScrolled ? 'var(--elevation-2)' : 'none',
        transition: 'all 200ms ease-out'
      }}
    >
      <div 
        className="container" 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          height: '68px' 
        }}
      >
        {/* Brand Logo */}
        <div 
          onClick={() => handleNavClick('/')}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}
        >
          <div 
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: 'var(--elevation-1)',
              flexShrink: 0
            }}
          >
            <ShieldCheck size={22} color="#FFFFFF" />
          </div>
          <div>
            <div style={{ fontSize: 'clamp(16px, 2.2vw, 19px)', fontWeight: '800', letterSpacing: '-0.03em', color: 'var(--text-primary)', lineHeight: 1.1 }}>
              AUREVIA<span style={{ color: 'var(--primary)' }}>HEALTH</span>
            </div>
            <div style={{ fontSize: '9px', fontWeight: '700', letterSpacing: '0.12em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Specialist Clinic
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="desktop-only" style={{ alignItems: 'center', gap: '22px' }}>
          {navItems.map((item) => {
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => handleNavClick(item.path)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '14px',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? 'var(--primary)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  padding: '6px 0',
                  position: 'relative',
                  transition: 'color 160ms ease-out'
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

        {/* Action CTAs & Mobile Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => handleNavClick('/appointment')}
            className="btn btn-primary btn-sm desktop-only"
            style={{ fontSize: '13.5px', padding: '9px 18px' }}
          >
            <Calendar size={15} />
            <span>Book Appointment</span>
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            className="mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              background: 'var(--surface-soft)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              padding: '8px',
              minWidth: '42px',
              minHeight: '42px',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} color="var(--text-primary)" /> : <Menu size={22} color="var(--text-primary)" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Attached Directly to Navbar Bottom) */}
      {mobileMenuOpen && (
        <div
          className="mobile-only"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#FFFFFF',
            borderBottom: '2px solid var(--border)',
            boxShadow: '0 12px 32px rgba(15, 23, 42, 0.15)',
            maxHeight: 'calc(100vh - 80px)',
            overflowY: 'auto',
            zIndex: 1002,
            flexDirection: 'column',
            padding: '16px 20px 24px'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavClick(item.path)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    background: isActive ? 'var(--primary-alpha-10)' : 'transparent',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '15px',
                    fontWeight: isActive ? '700' : '500',
                    color: isActive ? 'var(--primary)' : 'var(--text-primary)',
                    padding: '12px 14px',
                    cursor: 'pointer',
                    transition: 'background 160ms ease'
                  }}
                >
                  <span>{item.label}</span>
                  <ArrowRight size={16} color={isActive ? 'var(--primary)' : 'var(--text-muted)'} />
                </button>
              );
            })}
          </div>

          <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border)', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={() => handleNavClick('/appointment')}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', minHeight: '46px', fontSize: '14.5px' }}
            >
              <Calendar size={17} />
              <span>Book Consultation Slot</span>
            </button>

            <a
              href={`tel:${CLINIC_INFO.phone}`}
              className="btn btn-secondary"
              style={{ width: '100%', justifyContent: 'center', minHeight: '44px', fontSize: '13.5px' }}
            >
              <Phone size={15} />
              <span>Emergency: {CLINIC_INFO.emergencyPhone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

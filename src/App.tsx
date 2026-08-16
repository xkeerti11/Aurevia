import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { AnnouncementBar } from './components/common/AnnouncementBar';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { DoctorsPage } from './pages/DoctorsPage';
import { DoctorDetailPage } from './pages/DoctorDetailPage';
import { TreatmentsPage } from './pages/TreatmentsPage';
import { TreatmentDetailPage } from './pages/TreatmentDetailPage';
import { AboutPage } from './pages/AboutPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { ContactPage } from './pages/ContactPage';
import { BookingPage } from './pages/BookingPage';
import { AdminPortalPage } from './pages/AdminPortalPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { 
  Doctor, 
  ServiceTreatment, 
  Article, 
  Appointment, 
  Lead, 
  AppointmentStatus, 
  LeadStatus 
} from './types';
import { 
  INITIAL_ADMIN_APPOINTMENTS, 
  INITIAL_ADMIN_LEADS
} from './data/mockData';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceTreatment | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  
  // Admin Auth State
  const [authToken, setAuthToken] = useState<string | null>(() => localStorage.getItem('aurevia_admin_token'));
  const [currentUser, setCurrentUser] = useState<any>(() => {
    const saved = localStorage.getItem('aurevia_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  // Query params for reset password
  const [resetToken, setResetToken] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('token') || 'demo_token';
  });
  const [resetEmail, setResetEmail] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('email') || 'admin@aureviahealth.com';
  });

  // Listen to browser Back/Forward navigation
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const params = new URLSearchParams(window.location.search);
      if (params.get('token')) setResetToken(params.get('token')!);
      if (params.get('email')) setResetEmail(params.get('email')!);
      setCurrentPath(path || '/');
    };

    window.addEventListener('popstate', handleLocationChange);
    // Trigger once on initial load
    handleLocationChange();

    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  // Dynamic application state
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_ADMIN_APPOINTMENTS);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_ADMIN_LEADS);

  // Sync browser path navigation with History API
  const navigate = (path: string) => {
    let targetPath = path;
    if (path.includes('?')) {
      const [basePath, queryString] = path.split('?');
      const params = new URLSearchParams(queryString);
      if (params.get('token')) setResetToken(params.get('token')!);
      if (params.get('email')) setResetEmail(params.get('email')!);
      targetPath = basePath;
    }

    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(targetPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    navigate(`/doctors/${doctor.slug}`);
  };

  const handleSelectService = (service: ServiceTreatment) => {
    setSelectedService(service);
    navigate(`/treatments/${service.slug}`);
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    navigate(`/resources/${article.slug}`);
  };

  const handleBookingComplete = (newAppointment: Appointment) => {
    setAppointments(prev => [newAppointment, ...prev]);
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name: newAppointment.patientName,
      phone: newAppointment.patientPhone,
      email: newAppointment.patientEmail,
      source: 'Website Form',
      serviceInterested: newAppointment.service.name,
      status: 'Booked',
      createdAt: new Date().toISOString(),
      notes: `Appointment ref #${newAppointment.confirmationCode}`
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const handleUpdateAppointmentStatus = (id: string, newStatus: AppointmentStatus) => {
    setAppointments(prev => prev.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt));
  };

  const handleUpdateLeadStatus = (id: string, newStatus: LeadStatus) => {
    setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, status: newStatus } : lead));
  };

  const handleLoginSuccess = (user: any, token: string) => {
    setCurrentUser(user);
    setAuthToken(token);
    navigate('/admin');
  };

  const handleLogout = () => {
    localStorage.removeItem('aurevia_admin_token');
    localStorage.removeItem('aurevia_admin_user');
    setAuthToken(null);
    setCurrentUser(null);
    navigate('/admin/login');
  };

  const isAdminRoute = currentPath.startsWith('/admin');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Public Site Global Chrome (Only on patient-facing routes) */}
      {!isAdminRoute && (
        <>
          <AnnouncementBar onCtaClick={() => navigate('/treatments')} />
          <Navbar currentPath={currentPath} onNavigate={navigate} />
        </>
      )}

      {/* Main View Router */}
      <main style={{ flex: 1 }}>
        {/* PUBLIC ROUTES */}
        {currentPath === '/' && (
          <HomePage
            onNavigate={navigate}
            onSelectDoctor={handleSelectDoctor}
            onSelectService={handleSelectService}
          />
        )}

        {currentPath === '/doctors' && (
          <DoctorsPage
            onSelectDoctor={handleSelectDoctor}
            onBookDoctor={(doc) => {
              setSelectedDoctor(doc);
              navigate('/appointment');
            }}
          />
        )}

        {currentPath.startsWith('/doctors/') && selectedDoctor && (
          <DoctorDetailPage
            doctor={selectedDoctor}
            onBack={() => navigate('/doctors')}
            onBook={(doc) => {
              setSelectedDoctor(doc);
              navigate('/appointment');
            }}
          />
        )}

        {currentPath === '/treatments' && (
          <TreatmentsPage
            onSelectService={handleSelectService}
            onBookService={(srv) => {
              setSelectedService(srv);
              navigate('/appointment');
            }}
          />
        )}

        {currentPath.startsWith('/treatments/') && selectedService && (
          <TreatmentDetailPage
            service={selectedService}
            onBack={() => navigate('/treatments')}
            onBook={(srv) => {
              setSelectedService(srv);
              navigate('/appointment');
            }}
          />
        )}

        {currentPath === '/about' && (
          <AboutPage />
        )}

        {currentPath === '/facilities' && (
          <FacilitiesPage />
        )}

        {currentPath === '/resources' && (
          <ResourcesPage
            onSelectArticle={handleSelectArticle}
          />
        )}

        {currentPath.startsWith('/resources/') && selectedArticle && (
          <ArticleDetailPage
            article={selectedArticle}
            onBack={() => navigate('/resources')}
            onBookAppointment={() => navigate('/appointment')}
          />
        )}

        {currentPath === '/contact' && (
          <ContactPage />
        )}

        {currentPath === '/appointment' && (
          <BookingPage
            initialDoctor={selectedDoctor}
            initialService={selectedService}
            onBookingComplete={handleBookingComplete}
            onNavigateHome={() => navigate('/')}
          />
        )}

        {/* SECURE ADMIN AUTHENTICATION ROUTES */}
        {currentPath === '/admin/login' && (
          <AdminLoginPage
            onLoginSuccess={handleLoginSuccess}
            onNavigateHome={() => navigate('/')}
            onNavigateForgotPassword={() => navigate('/admin/forgot-password')}
          />
        )}

        {currentPath === '/admin/forgot-password' && (
          <ForgotPasswordPage
            onNavigateLogin={() => navigate('/admin/login')}
            onNavigateResetPasswordWithToken={(token, email) => {
              setResetToken(token);
              setResetEmail(email);
              navigate('/admin/reset-password');
            }}
          />
        )}

        {currentPath === '/admin/reset-password' && (
          <ResetPasswordPage
            token={resetToken}
            email={resetEmail}
            onNavigateLogin={() => navigate('/admin/login')}
          />
        )}

        {/* PROTECTED ADMIN DASHBOARD ROUTE */}
        {(currentPath === '/admin' || currentPath === '/admin/dashboard') && (
          currentUser && authToken ? (
            <AdminPortalPage
              currentUser={currentUser}
              appointments={appointments}
              leads={leads}
              onUpdateAppointmentStatus={handleUpdateAppointmentStatus}
              onUpdateLeadStatus={handleUpdateLeadStatus}
              onLogout={handleLogout}
              onNavigateHome={() => navigate('/')}
            />
          ) : (
            <AdminLoginPage
              onLoginSuccess={handleLoginSuccess}
              onNavigateHome={() => navigate('/')}
              onNavigateForgotPassword={() => navigate('/admin/forgot-password')}
            />
          )
        )}
      </main>

      {/* Patient Site Global Footer & Bottom Nav */}
      {!isAdminRoute && (
        <>
          <Footer onNavigate={navigate} />
          <MobileBottomNav onBookClick={() => navigate('/appointment')} />
        </>
      )}
    </div>
  );
}

export default App;

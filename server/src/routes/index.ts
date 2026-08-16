import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { AppointmentController } from '../controllers/appointmentController';
import { DoctorController } from '../controllers/doctorController';
import { ServiceController } from '../controllers/serviceController';
import { LeadController } from '../controllers/leadController';
import { AnalyticsController } from '../controllers/analyticsController';
import { generalLimiter, bookingLimiter, authLimiter } from '../middleware/rateLimiter';
import { authenticateToken, requireRole } from '../middleware/auth';

const router = Router();

// --- Auth Endpoints ---
router.post('/auth/login', authLimiter, AuthController.login);
router.post('/auth/forgot-password', authLimiter, AuthController.forgotPassword);
router.post('/auth/reset-password', authLimiter, AuthController.resetPassword);
router.post('/auth/logout', AuthController.logout);
router.get('/auth/me', authenticateToken, AuthController.getMe);

// --- Public Availability & Booking Endpoints ---
router.get('/appointments/available-slots', generalLimiter, AppointmentController.getAvailableSlots);
router.post('/appointments/book', bookingLimiter, AppointmentController.bookAppointment);
router.get('/appointments/confirmation/:code', generalLimiter, AppointmentController.getAppointmentByCode);

// --- Admin Appointment Management ---
router.get('/appointments', AppointmentController.getAllAppointments);
router.patch('/appointments/:id/status', AppointmentController.updateStatus);

// --- Doctors & Services Endpoints ---
router.get('/doctors', generalLimiter, DoctorController.getAllDoctors);
router.get('/doctors/:slug', generalLimiter, DoctorController.getDoctorBySlug);

router.get('/services', generalLimiter, ServiceController.getAllServices);
router.get('/services/:slug', generalLimiter, ServiceController.getServiceBySlug);

// --- Leads Pipeline & Contact Form ---
router.post('/leads', bookingLimiter, LeadController.createLead);
router.get('/leads', LeadController.getAllLeads);
router.patch('/leads/:id/status', LeadController.updateLeadStatus);

// --- Admin Analytics & Stats ---
router.get('/admin/stats', AnalyticsController.getStats);

export default router;

import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../db';
import { SlotService } from '../services/slotService';
import { NotificationService } from '../services/notificationService';
import { EncryptionService } from '../services/encryptionService';

const bookAppointmentSchema = z.object({
  doctorId: z.string(),
  serviceId: z.string(),
  appointmentDate: z.string(), // "YYYY-MM-DD"
  timeSlot: z.string(),        // "11:30 AM"
  patientName: z.string().min(2),
  patientPhone: z.string().min(10),
  patientEmail: z.string().email().optional().or(z.literal('')),
  patientDob: z.string().optional().or(z.literal('')),
  reasonForVisit: z.string().optional().or(z.literal(''))
});

export class AppointmentController {
  public static async getAvailableSlots(req: Request, res: Response): Promise<void> {
    try {
      const { doctorId, date } = req.query;
      if (!doctorId || !date) {
        res.status(400).json({ success: false, error: 'doctorId and date query parameters are required' });
        return;
      }

      const availableSlots = await SlotService.getAvailableSlots(
        doctorId.toString(),
        date.toString()
      );

      res.json({
        success: true,
        doctorId,
        date,
        availableSlots
      });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public static async bookAppointment(req: Request, res: Response): Promise<void> {
    try {
      const parsed = bookAppointmentSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ success: false, error: 'Invalid booking data', details: parsed.error.format() });
        return;
      }

      const {
        doctorId,
        serviceId,
        appointmentDate,
        timeSlot,
        patientName,
        patientPhone,
        patientEmail,
        patientDob,
        reasonForVisit
      } = parsed.data;

      // 1. Acquire Anti-Double Booking Lock
      const lockAcquired = SlotService.acquireLock(doctorId, appointmentDate, timeSlot);
      if (!lockAcquired) {
        res.status(409).json({
          success: false,
          error: 'This time slot is currently being reserved by another patient. Please choose another slot.'
        });
        return;
      }

      try {
        // 2. Verify doctor and service exist
        const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
        if (!doctor) {
          SlotService.releaseLock(doctorId, appointmentDate, timeSlot);
          res.status(404).json({ success: false, error: 'Doctor not found' });
          return;
        }

        const service = await prisma.service.findUnique({ where: { id: serviceId } });
        if (!service) {
          SlotService.releaseLock(doctorId, appointmentDate, timeSlot);
          res.status(404).json({ success: false, error: 'Service not found' });
          return;
        }

        // 3. Upsert Patient
        let patient = await prisma.patient.findUnique({
          where: { phone: patientPhone }
        });

        if (!patient) {
          patient = await prisma.patient.create({
            data: {
              name: patientName,
              phone: patientPhone,
              email: patientEmail || null,
              dateOfBirth: patientDob || null,
              encryptedNotes: reasonForVisit ? EncryptionService.encrypt(reasonForVisit) : null
            }
          });
        }

        // 4. Generate Confirmation Code e.g. "AU-2026-0820-4821"
        const dateClean = appointmentDate.replace(/-/g, '');
        const randomPin = Math.floor(1000 + Math.random() * 9000);
        const confirmationCode = `AU-${dateClean.slice(0, 4)}-${dateClean.slice(4)}-${randomPin}`;

        // 5. Create Appointment in DB
        const appointment = await prisma.appointment.create({
          data: {
            confirmationCode,
            patientId: patient.id,
            doctorId: doctor.id,
            serviceId: service.id,
            appointmentDate,
            timeSlot,
            status: 'CONFIRMED',
            reasonForVisit: reasonForVisit || null
          },
          include: {
            doctor: true,
            service: true,
            patient: true
          }
        });

        // 6. Also create Lead record for clinic CRM
        await prisma.lead.create({
          data: {
            name: patientName,
            phone: patientPhone,
            email: patientEmail || null,
            source: 'Website Booking Wizard',
            serviceInterested: service.name,
            status: 'BOOKED',
            notes: `Auto-converted from Appointment #${confirmationCode}`
          }
        });

        // 7. Trigger async notification
        NotificationService.sendBookingConfirmation({
          recipientName: patientName,
          recipientPhone: patientPhone,
          recipientEmail: patientEmail,
          confirmationCode,
          doctorName: doctor.name,
          specialty: doctor.specialty,
          date: appointmentDate,
          timeSlot,
          location: 'Main Clinic - Floor 4'
        }).catch(err => console.error('Notification dispatch error:', err));

        // Release slot lock
        SlotService.releaseLock(doctorId, appointmentDate, timeSlot);

        res.status(201).json({
          success: true,
          message: 'Appointment successfully scheduled and confirmed',
          appointment
        });
      } catch (innerErr: any) {
        SlotService.releaseLock(doctorId, appointmentDate, timeSlot);
        if (innerErr.code === 'P2002') {
          res.status(409).json({ success: false, error: 'Double booking conflict: This slot is already booked.' });
          return;
        }
        throw innerErr;
      }
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public static async getAppointmentByCode(req: Request, res: Response): Promise<void> {
    try {
      const { code } = req.params;
      const appointment = await prisma.appointment.findUnique({
        where: { confirmationCode: code },
        include: { doctor: true, service: true, patient: true }
      });

      if (!appointment) {
        res.status(404).json({ success: false, error: 'Appointment not found' });
        return;
      }

      res.json({ success: true, appointment });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public static async getAllAppointments(req: Request, res: Response): Promise<void> {
    try {
      const { status, doctorId, search } = req.query;

      const whereClause: any = {};
      if (status && status !== 'All') {
        whereClause.status = status.toString().toUpperCase();
      }
      if (doctorId) {
        whereClause.doctorId = doctorId.toString();
      }
      if (search) {
        whereClause.OR = [
          { confirmationCode: { contains: search.toString() } },
          { patient: { name: { contains: search.toString() } } },
          { doctor: { name: { contains: search.toString() } } }
        ];
      }

      const appointments = await prisma.appointment.findMany({
        where: whereClause,
        include: { doctor: true, service: true, patient: true },
        orderBy: { createdAt: 'desc' }
      });

      res.json({ success: true, count: appointments.length, appointments });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public static async updateStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const validStatuses = ['CONFIRMED', 'PENDING', 'COMPLETED', 'CANCELLED', 'NO_SHOW'];
      const normalizedStatus = status?.toUpperCase();

      if (!validStatuses.includes(normalizedStatus)) {
        res.status(400).json({ success: false, error: 'Invalid status' });
        return;
      }

      const appointment = await prisma.appointment.update({
        where: { id },
        data: { status: normalizedStatus },
        include: { patient: true, doctor: true }
      });

      NotificationService.sendStatusUpdateNotification(
        appointment.patient.phone,
        appointment.confirmationCode,
        normalizedStatus
      );

      res.json({ success: true, appointment });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

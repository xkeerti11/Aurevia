import { Request, Response } from 'express';
import { prisma } from '../db';

export class DoctorController {
  public static async getAllDoctors(req: Request, res: Response): Promise<void> {
    try {
      const { specialty } = req.query;
      const whereClause: any = { isActive: true };

      if (specialty && specialty !== 'All') {
        whereClause.specialty = specialty.toString();
      }

      const doctors = await prisma.doctor.findMany({
        where: whereClause,
        include: { schedules: true },
        orderBy: { experienceYears: 'desc' }
      });

      res.json({ success: true, count: doctors.length, doctors });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public static async getDoctorBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const doctor = await prisma.doctor.findUnique({
        where: { slug },
        include: { schedules: true }
      });

      if (!doctor) {
        res.status(404).json({ success: false, error: 'Doctor not found' });
        return;
      }

      res.json({ success: true, doctor });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

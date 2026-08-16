import { Request, Response } from 'express';
import { prisma } from '../db';

export class ServiceController {
  public static async getAllServices(req: Request, res: Response): Promise<void> {
    try {
      const { category } = req.query;
      const whereClause: any = { isActive: true };

      if (category && category !== 'All') {
        whereClause.category = category.toString();
      }

      const services = await prisma.service.findMany({
        where: whereClause,
        orderBy: { isPopular: 'desc' }
      });

      res.json({ success: true, count: services.length, services });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public static async getServiceBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const service = await prisma.service.findUnique({
        where: { slug }
      });

      if (!service) {
        res.status(404).json({ success: false, error: 'Service not found' });
        return;
      }

      res.json({ success: true, service });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

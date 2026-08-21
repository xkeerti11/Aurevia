import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../db';

const createLeadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(10),
  email: z.string().email().optional().or(z.literal('')),
  source: z.string().default('Website Contact Form'),
  serviceInterested: z.string().default('General Inquiry'),
  notes: z.string().optional()
});

export class LeadController {
  public static async createLead(req: Request, res: Response): Promise<void> {
    try {
      const parsed = createLeadSchema.safeParse(req.body);
      if (!parsed.success) {
        res.status(400).json({ success: false, error: 'Invalid lead details', details: parsed.error.format() });
        return;
      }

      const { name, phone, email, source, serviceInterested, notes } = parsed.data;

      const lead = await prisma.lead.create({
        data: {
          name,
          phone,
          email: email || null,
          source,
          serviceInterested,
          status: 'NEW',
          notes: notes || null
        }
      });

      console.log(`📥 [LEAD CAPTURED]: New inquiry from ${name} (${phone}) - Service: ${serviceInterested}`);

      res.status(201).json({ success: true, lead });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public static async getAllLeads(req: Request, res: Response): Promise<void> {
    try {
      const { status } = req.query;
      const whereClause: any = {};

      if (status && status !== 'All') {
        whereClause.status = status.toString().toUpperCase();
      }

      const leads = await prisma.lead.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' }
      });

      res.json({ success: true, count: leads.length, leads });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }

  public static async updateLeadStatus(req: Request, res: Response): Promise<void> {
    try {
      const id = String(req.params.id || '');
      const { status } = req.body;

      const validStatuses = ['NEW', 'CONTACTED', 'QUALIFIED', 'BOOKED', 'LOST'];
      const normalizedStatus = status?.toUpperCase();

      if (!validStatuses.includes(normalizedStatus)) {
        res.status(400).json({ success: false, error: 'Invalid lead status' });
        return;
      }

      const lead = await prisma.lead.update({
        where: { id },
        data: { status: normalizedStatus }
      });

      res.json({ success: true, lead });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  }
}

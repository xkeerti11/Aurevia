import { prisma } from '../db';

interface SlotLock {
  doctorId: string;
  date: string;
  timeSlot: string;
  lockedAt: number;
}

// In-memory slot locks (with 5-minute TTL)
const slotLocks = new Map<string, SlotLock>();

export class SlotService {
  private static getLockKey(doctorId: string, date: string, timeSlot: string): string {
    return `${doctorId}:${date}:${timeSlot}`;
  }

  public static cleanExpiredLocks(): void {
    const now = Date.now();
    const FIVE_MINUTES = 5 * 60 * 1000;
    for (const [key, lock] of slotLocks.entries()) {
      if (now - lock.lockedAt > FIVE_MINUTES) {
        slotLocks.delete(key);
      }
    }
  }

  public static acquireLock(doctorId: string, date: string, timeSlot: string): boolean {
    this.cleanExpiredLocks();
    const key = this.getLockKey(doctorId, date, timeSlot);
    if (slotLocks.has(key)) {
      return false; // Already locked by another booking in progress
    }
    slotLocks.set(key, { doctorId, date, timeSlot, lockedAt: Date.now() });
    return true;
  }

  public static releaseLock(doctorId: string, date: string, timeSlot: string): void {
    const key = this.getLockKey(doctorId, date, timeSlot);
    slotLocks.delete(key);
  }

  public static async getAvailableSlots(doctorId: string, dateStr: string): Promise<string[]> {
    this.cleanExpiredLocks();

    // Default morning & evening slots
    const standardSlots = [
      '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM',
      '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM'
    ];

    // Find confirmed or pending appointments for this doctor on this date
    const bookedAppointments = await prisma.appointment.findMany({
      where: {
        doctorId,
        appointmentDate: dateStr,
        status: { in: ['CONFIRMED', 'PENDING'] }
      },
      select: { timeSlot: true }
    });

    const bookedSlotsSet = new Set(bookedAppointments.map(a => a.timeSlot));

    // Filter out already booked slots or currently locked slots
    return standardSlots.filter(slot => {
      const isBooked = bookedSlotsSet.has(slot);
      const isLocked = slotLocks.has(this.getLockKey(doctorId, dateStr, slot));
      return !isBooked && !isLocked;
    });
  }
}

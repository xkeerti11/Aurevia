export interface NotificationPayload {
  recipientName: string;
  recipientPhone: string;
  recipientEmail?: string;
  confirmationCode: string;
  doctorName: string;
  specialty: string;
  date: string;
  timeSlot: string;
  location: string;
}

export class NotificationService {
  public static async sendBookingConfirmation(payload: NotificationPayload): Promise<{
    whatsappSent: boolean;
    smsSent: boolean;
    emailSent: boolean;
  }> {
    console.log('\n=========================================');
    console.log('🔔 [NOTIFICATION DISPATCH ENGINE]');
    console.log(`📱 WhatsApp -> ${payload.recipientPhone}: "Hello ${payload.recipientName}, your appointment with ${payload.doctorName} (${payload.specialty}) is CONFIRMED for ${payload.date} at ${payload.timeSlot}. Ref: #${payload.confirmationCode}. Clinic: ${payload.location}"`);
    console.log(`💬 SMS -> ${payload.recipientPhone}: "Aurevia Health: Consultation confirmed for ${payload.date} ${payload.timeSlot} with ${payload.doctorName}. Ref: ${payload.confirmationCode}"`);
    if (payload.recipientEmail) {
      console.log(`✉️ Email -> ${payload.recipientEmail}: "[Confirmed] Aurevia Health Consultation #${payload.confirmationCode}"`);
    }
    console.log('=========================================\n');

    return {
      whatsappSent: true,
      smsSent: true,
      emailSent: !!payload.recipientEmail
    };
  }

  public static async sendStatusUpdateNotification(
    patientPhone: string,
    confirmationCode: string,
    newStatus: string
  ): Promise<void> {
    console.log(`🔔 [NOTIFICATION] Status for Appointment #${confirmationCode} changed to: ${newStatus}. Alert sent to ${patientPhone}`);
  }
}

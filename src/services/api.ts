const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1').replace(/\/$/, '');

export class ApiClient {
  private static getHeaders(token?: string): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json'
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  }

  // --- Doctors ---
  public static async getDoctors(specialty?: string) {
    try {
      const url = specialty && specialty !== 'All' 
        ? `${API_BASE_URL}/doctors?specialty=${encodeURIComponent(specialty)}`
        : `${API_BASE_URL}/doctors`;
      const res = await fetch(url);
      return await res.json();
    } catch (e) {
      console.warn('Backend API unavailable, falling back to cached state:', e);
      return null;
    }
  }

  // --- Services ---
  public static async getServices(category?: string) {
    try {
      const url = category && category !== 'All'
        ? `${API_BASE_URL}/services?category=${encodeURIComponent(category)}`
        : `${API_BASE_URL}/services`;
      const res = await fetch(url);
      return await res.json();
    } catch (e) {
      console.warn('Backend API unavailable:', e);
      return null;
    }
  }

  // --- Available Slots ---
  public static async getAvailableSlots(doctorId: string, date: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments/available-slots?doctorId=${doctorId}&date=${date}`);
      return await res.json();
    } catch (e) {
      return null;
    }
  }

  // --- Booking ---
  public static async bookAppointment(payload: {
    doctorId: string;
    serviceId: string;
    appointmentDate: string;
    timeSlot: string;
    patientName: string;
    patientPhone: string;
    patientEmail?: string;
    patientDob?: string;
    reasonForVisit?: string;
  }) {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments/book`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(payload)
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  }

  // --- Appointments ---
  public static async getAllAppointments(status?: string) {
    try {
      const url = status && status !== 'All'
        ? `${API_BASE_URL}/appointments?status=${status}`
        : `${API_BASE_URL}/appointments`;
      const res = await fetch(url);
      return await res.json();
    } catch (e) {
      return null;
    }
  }

  public static async updateAppointmentStatus(id: string, status: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/appointments/${id}/status`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify({ status })
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  }

  // --- Leads ---
  public static async createLead(leadData: {
    name: string;
    phone: string;
    email?: string;
    source?: string;
    serviceInterested?: string;
    notes?: string;
  }) {
    try {
      const res = await fetch(`${API_BASE_URL}/leads`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(leadData)
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  }

  public static async getAllLeads(status?: string) {
    try {
      const url = status && status !== 'All'
        ? `${API_BASE_URL}/leads?status=${status}`
        : `${API_BASE_URL}/leads`;
      const res = await fetch(url);
      return await res.json();
    } catch (e) {
      return null;
    }
  }

  public static async updateLeadStatus(id: string, status: string) {
    try {
      const res = await fetch(`${API_BASE_URL}/leads/${id}/status`, {
        method: 'PATCH',
        headers: this.getHeaders(),
        body: JSON.stringify({ status })
      });
      return await res.json();
    } catch (e) {
      return null;
    }
  }

  // --- Admin Analytics ---
  public static async getAdminStats() {
    try {
      const res = await fetch(`${API_BASE_URL}/admin/stats`);
      return await res.json();
    } catch (e) {
      return null;
    }
  }
}

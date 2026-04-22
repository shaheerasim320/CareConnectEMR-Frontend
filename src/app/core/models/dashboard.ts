export interface DashboardMetric {
    count: number;
    previousCount: number;
    trendPercent: number | null;
    trendDirection: 'up' | 'down' | 'neutral';
}

export interface AppointmentBreakdown {
    scheduled: number;
    confirmed: number; 
    checkedIn: number;
    completed: number;
    cancelled: number;
    noShow: number;
    total: number;
}

export interface DoctorLoad {
    doctorId: string;
    doctorName: string;
    appointmentCount: number;
    completedCount: number;
}

export interface RecentPatient {
    id: string;
    fullName: string;
    mrn: string;
    gender: string;
    registeredAt: Date;
}

export interface AdminDashboardResponse {
    totalPatients: DashboardMetric;
    appointmentsToday: DashboardMetric;
    completedToday: DashboardMetric;
    cancellationRate: DashboardMetric;
    breakdownToday: AppointmentBreakdown;
    topDoctorsToday: DoctorLoad[];
    recentRegistrations: RecentPatient[];
}

export interface StatCard {
    label: string;
    value: string;
    trend: string;
    trendDirection: 'up' | 'down' | 'neutral';
    theme: string;
    icon: string;
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
    totalPatients: StatCard;
    appointmentsToday: StatCard;
    completedToday: StatCard;
    cancellationRate: StatCard;
    breakdownToday: AppointmentBreakdown;
    topDoctorsToday: DoctorLoad[];
    recentRegistrations: RecentPatient[];
}
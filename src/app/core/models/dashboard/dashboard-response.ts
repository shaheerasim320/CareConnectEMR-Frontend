import { AppointmentBreakdown } from "./appointment-breakdown";
import { DoctorLoad } from "./doctor-load";
import { RecentPatient } from "./recent-patient";
import { StatCard } from "./stat-card";

export interface AdminDashboardResponse {
    totalPatients: StatCard;
    appointmentsToday: StatCard;
    completedToday: StatCard;
    cancellationRate: StatCard;
    breakdownToday: AppointmentBreakdown;
    topDoctorsToday: DoctorLoad[];
    recentRegistrations: RecentPatient[];
}

import { AppointmentBreakdown } from "./appointment-breakdown";
import { AppointmentQueue } from "./appointment-queue";
import { DoctorLoad } from "./doctor-load";
import { NextAppointment } from "./next-appointment";
import { RecentPatient } from "./recent-patient";
import { StatCard } from "./stat-card";
import { TodaySchedule } from "./today-schedule";

export interface AdminDashboardResponse {
    totalPatients: StatCard;
    appointmentsToday: StatCard;
    completedToday: StatCard;
    cancellationRate: StatCard;
    breakdownToday: AppointmentBreakdown;
    topDoctorsToday: DoctorLoad[];
    recentRegistrations: RecentPatient[];
}

export interface DoctorDashboardResponse{
    myAppointmentsToday: StatCard;
    myCompletedToday: StatCard;
    totalPatientsSeen: StatCard;
    nextAppointment: NextAppointment | null;
    todaySchedule: TodaySchedule[];
}

export interface ReceptionistDashboardResponse{
    appointmentsToday: StatCard;
    checkedInNow: StatCard;
    newPatientsToday: StatCard;
    todayQueue: AppointmentQueue[]; 
}
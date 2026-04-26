export interface AppointmentBreakdown {
    scheduled: number;
    confirmed: number; 
    checkedIn: number;
    completed: number;
    cancelled: number;
    noShow: number;
    total: number;
}
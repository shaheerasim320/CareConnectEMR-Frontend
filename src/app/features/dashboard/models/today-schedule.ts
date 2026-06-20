export interface TodaySchedule{
    id: string;
    patientName: string;
    patientMRN: string;
    startTime: string;
    endTime: string;
    status: string;
    reason?: string | null;
}
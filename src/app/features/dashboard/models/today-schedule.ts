export interface TodaySchedule{
    id: string;
    patientId: string;
    patientName: string;
    patientMRN: string;
    startTime: string;
    endTime: string;
    status: string;
    reason?: string | null;
}
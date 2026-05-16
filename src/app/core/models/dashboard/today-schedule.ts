export interface TodaySchedule{
    id: string;
    patientName: string;
    patientMRN: string;
    startTime: Date | string;
    endTime: Date | string;
    status: string;
    reason?: string | null;
}
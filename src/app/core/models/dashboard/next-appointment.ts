export interface NextAppointment {
    id: string;
    patientName: string;
    patientMRN: string;
    startTime: Date | string;
    endTime: Date | string;
    reason?: string | null;
    status: string;
}
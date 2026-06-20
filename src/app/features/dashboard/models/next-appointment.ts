export interface NextAppointment {
    id: string;
    patientName: string;
    patientMRN: string;
    startTime: string;
    endTime: string;
    reason?: string | null;
    status: string;
}
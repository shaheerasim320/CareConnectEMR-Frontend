export interface NextAppointment {
    id: string;
    patientId: string;
    patientName: string;
    patientMRN: string;
    startTime: string;
    endTime: string;
    reason?: string | null;
    status: string;
}
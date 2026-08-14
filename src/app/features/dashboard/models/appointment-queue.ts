export interface AppointmentQueue {
    id: string;
    patientId: string;
    patientName: string;
    patientMRN: string;
    doctorName: string;
    startTime: string;
    endTime: string;
    status: string;
    reason?: string;
}
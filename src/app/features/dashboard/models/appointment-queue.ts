export interface AppointmentQueue {
    id: string;
    patientName: string;
    patientMRN: string;
    doctorName: string;
    startTime: string;
    endTime: string;
    status: string;
    reason?: string;
}
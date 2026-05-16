export interface AppointmentQueue {
    id: string;
    patientName: string;
    patientMRN: string;
    doctorName: string;
    startTime: Date | string;
    endTime: Date | string;
    status: string;
    reason?: string;
}
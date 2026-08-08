export type PatientStatus = 'Active' | 'Deactivated';

export interface Patient{
    id: string;
    mrn: string;
    fullName: string;
    age: number;
    gender: string;
    phoneNumber: string;
    bloodType: string | null;
    createdAt: string;
    status: PatientStatus
}
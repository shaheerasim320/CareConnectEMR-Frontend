import { PatientStatus } from "./patient";

export interface PatientDetail {
    id: string;
    mrn: string;

    firstName: string;
    lastName: string;

    age: number;
    gender: string;

    phoneNumber: string;
    email: string | null;

    bloodType: string | null;
    allergies: string | null;

    emergencyContactName: string | null;
    emergencyContactNumber: string | null;

    createdAt: string;
    updatedAt: string;
    status: PatientStatus;
}
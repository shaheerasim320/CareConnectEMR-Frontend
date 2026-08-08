export interface PatientStats {
    totalPatients: number | null;
    registeredToday: number | null;
    incompleteRecords: number | null;
    patientsWaiting: number | null;
    seenToday: number | null;
    followUpsDue: number | null;
}
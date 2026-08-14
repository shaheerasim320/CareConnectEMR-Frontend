export interface PatientAuditLog {
    action: string;
    changedProperties: string;
    oldValues: string | null;
    newValues: string | null;
    performedBy: string | null;
    occurredAt: string;
}
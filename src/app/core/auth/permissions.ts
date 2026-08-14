export const PERMISSIONS = {
    ViewDashboard: 'dashboard:view',

    ViewPatients: 'patients:view',
    ViewPatientDetail: 'patients:view-detail',
    CreatePatient: 'patients:create',
    UpdatePatientIdentity: 'patients:update-identity',
    UpdatePatientContact: 'patients:update-contact',
    UpdatePatientClinical: 'patients:update-clinical',
    ManagePatientStatus: 'patients:manage-status',

    ViewAppointments: 'appointments:view',
    BookAppointment: 'appointments:book',
    RescheduleAppointment: 'appointments:reschedule',
    UpdateAppointmentStatus: 'appointments:update-status',
    CompleteAppointment: 'appointments:complete',
    CancelAppointment: 'appointments:cancel',

    ManageUsers: 'users:manage',
    ExportData: 'data:export',

    ViewAuditLogs: 'audit-logs:view',

} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

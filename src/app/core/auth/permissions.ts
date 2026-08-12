export const PERMISSIONS = {
    ViewDashboard: 'dashboard:view',

    ViewPatients: 'patients:view',
    CreatePatient: 'patients:create',
    UpdatePatientIdentity: 'patients:update-identity',
    UpdatePatientContact: 'patients:update-contact',
    UpdatePatientClinical: 'patients:update-clinical',
    DeletePatient: 'patients:delete',

    ViewAppointments: 'appointments:view',
    BookAppointment: 'appointments:book',
    RescheduleAppointment: 'appointments:reschedule',
    UpdateAppointmentStatus: 'appointments:update-status',
    CompleteAppointment: 'appointments:complete',
    CancelAppointment: 'appointments:cancel',

    ManageUsers: 'users:manage'

} as const;

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS];

import { Permission, PERMISSIONS } from "./permissions";
import { USER_ROLES, UserRole } from "./roles";

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
 [USER_ROLES.Admin]: [
    PERMISSIONS.ViewDashboard,

    PERMISSIONS.ViewPatients,
    PERMISSIONS.ViewPatientDetail,
    PERMISSIONS.CreatePatient,
    PERMISSIONS.UpdatePatientIdentity,
    PERMISSIONS.UpdatePatientContact,
    PERMISSIONS.UpdatePatientClinical,
    PERMISSIONS.ManagePatientStatus,

    PERMISSIONS.ViewAppointments,
    PERMISSIONS.BookAppointment,
    PERMISSIONS.RescheduleAppointment,
    PERMISSIONS.UpdateAppointmentStatus,
    PERMISSIONS.CompleteAppointment,
    PERMISSIONS.CancelAppointment,

    PERMISSIONS.ManageUsers,
    PERMISSIONS.ExportData,
    PERMISSIONS.ViewAuditLogs
 ],

 [USER_ROLES.Doctor]: [
    PERMISSIONS.ViewDashboard,

    PERMISSIONS.ViewPatients,
    PERMISSIONS.ViewPatientDetail,
    PERMISSIONS.UpdatePatientClinical,

    PERMISSIONS.ViewAppointments,
    PERMISSIONS.UpdateAppointmentStatus,
    PERMISSIONS.CompleteAppointment,
 ],

 [USER_ROLES.Receptionist]: [
    PERMISSIONS.ViewDashboard,

    PERMISSIONS.ViewPatients,
    PERMISSIONS.ViewPatientDetail,
    PERMISSIONS.CreatePatient,
    PERMISSIONS.UpdatePatientIdentity,
    PERMISSIONS.UpdatePatientContact,

    PERMISSIONS.ViewAppointments,
    PERMISSIONS.BookAppointment,
    PERMISSIONS.RescheduleAppointment,
    PERMISSIONS.UpdateAppointmentStatus,
    PERMISSIONS.CancelAppointment,
 ]
};

export function hasPermission(role: UserRole | null | undefined, permission: Permission): boolean{
    if(!role) return false;

    return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}
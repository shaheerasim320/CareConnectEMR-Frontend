import { Routes } from "@angular/router";
import { permissionGuard } from "../../core/guards/permission-guard";
import { PERMISSIONS } from "../../core/auth/permissions";

export const patientRoutes: Routes = [
    { path: '', loadComponent: () => import('./patient-list/patient-list').then(m => m.PatientList), canActivate: [permissionGuard], data: { permission: PERMISSIONS.ViewPatients } },

]
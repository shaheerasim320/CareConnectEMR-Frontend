import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';
import { Shell } from './layout/shell/shell';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login, canActivate: [guestGuard], title: 'Login' },
    {
        path: '', component: Shell, canActivate: [authGuard], children: [
            { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard), title: 'Dashboard' },
            { path: 'patients', loadChildren: () => import('./features/patients/patients.routes').then(m => m.patientRoutes), title: 'Patients' },
        ]
    },
    { path: '**', redirectTo: 'login' }
];

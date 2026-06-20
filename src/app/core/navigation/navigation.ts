import { PERMISSIONS } from "../auth/permissions";
import { NavItem } from "./nav-item";

export const NAV_ITEMS: NavItem[] = [
    {
        label: 'Dashboard',
        icon: 'dashboard',
        route: '/dashboard',
        permission: PERMISSIONS.ViewDashboard,
    },
    {
        label: 'Patients',
        icon: 'people',
        route: '/patients',
        permission: PERMISSIONS.ViewPatients,
    },
    {
        label: 'Appointments',
        icon: 'event',
        route: '/appointments',
        permission: PERMISSIONS.ViewAppointments,
    },
    {
        label: 'Users',
        icon: 'person',
        route: '/users',
        permission: PERMISSIONS.ManageUsers,
    },
    
]
import { NavItem } from "../models/nav-item";

export const NAV_ITEMS: NavItem[] = [
    {
        label: 'Dashboard',
        icon: 'dashboard',
        route: '/dashboard',
        roles: ['Admin', 'Doctor', 'Receptionist']
    },
    {
        label: 'Patients',
        icon: 'people',
        route: '/patients',
        roles: ['Admin', 'Doctor', 'Receptionist']
    },
    {
        label: 'Appointments',
        icon: 'event',
        route: '/appointments',
        roles: ['Admin', 'Doctor', 'Receptionist']
    },
    {
        label: 'Users',
        icon: 'person',
        route: '/users',
        roles: ['Admin']
    },
    
]
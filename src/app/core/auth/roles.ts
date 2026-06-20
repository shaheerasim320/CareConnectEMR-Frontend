export const USER_ROLES = {
    Admin: 'Admin',
    Doctor: 'Doctor',
    Receptionist: 'Receptionist',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
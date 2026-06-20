import { UserRole } from "../roles";

export interface User {
    id: string;
    fullName: string;
    role: UserRole;
}

import { UserRole } from "../roles";

export interface AuthResponse {
    accessToken: string;
    userId: string;
    fullName: string;
    role: UserRole;
}

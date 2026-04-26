export interface AuthResponse {
    accessToken: string;
    userId: string;
    fullName: string;
    role: string;
    refreshToken?: string; 
}

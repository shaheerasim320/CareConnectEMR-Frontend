export interface AuthResponse {
    accessToken: string;
    refreshToken?: string;
    accessTokenExpiry: string;
    userId: string;
    fullName: string;
    role: string;
}

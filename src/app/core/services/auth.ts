import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/auth/login-request';
import { AuthResponse } from '../models/auth/auth-response';
import { RefreshTokenRequest } from '../models/auth/refresh-token-request';
import { User } from '../models/auth/user';
import { environment } from '../../../environments/environment';
import { map, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private api = `${environment.apiUrl}/Auth`;

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  currentUser = signal<User | null>(null);

  login(data: LoginRequest) {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.api}/login`, data);
  }

  refreshToken(data: RefreshTokenRequest) {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.api}/refresh-token`, data);
  }

  storeAuth(response: AuthResponse) {
    localStorage.setItem('accessToken', response.accessToken);
    if (response.refreshToken) {
      localStorage.setItem('refreshToken', response.refreshToken);
    }

    this.currentUser.set({
      id: response.userId,
      email: '',
      fullName: response.fullName,
      role: response.role
    });

  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  loadCurrentUser() {
    return this.getCurrentUser().pipe(
      map(res => res.data),
      tap(user => this.currentUser.set(user))
    );
  }

  getCurrentUser() {
    return this.http.get<ApiResponse<User>>(`${this.api}/me`);
  }

  logout() {

    this.http.post(`${this.api}/logout`, {}).subscribe({
      error: () => {}
    });

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    this.currentUser.set(null);

    this.router.navigate(['/login']);

  }

}
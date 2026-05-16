import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/auth/login-request';
import { AuthResponse } from '../models/auth/auth-response';
import { User } from '../models/auth/user';
import { environment } from '../../../environments/environment';
import { catchError, finalize, of, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private api = `${environment.apiUrl}/Auth`;

  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private accessToken: string | null = null;
  currentUser = signal<User | null>(null);
  isLoggingOut = signal(false);

  private setSession(auth: AuthResponse) {
    this.accessToken = auth.accessToken;
    this.currentUser.set({
      id: auth.userId,
      fullName: auth.fullName,
      role: auth.role
    });
  }

  clearSession() {
    this.accessToken = null;
    this.currentUser.set(null);
  }

  login(request: LoginRequest) {
    return this.http.post<ApiResponse<AuthResponse>>(
      `${this.api}/login`,
      request,
      { withCredentials: true }
    ).pipe(
      tap(res => {
        if (!res.isSuccess) return;
        this.setSession(res.data);
      })
    );
  }

  getAccessToken() {
    return this.accessToken;
  }

  logout() {
    this.isLoggingOut.set(true);
    return this.http
      .post(`${this.api}/logout`, {}, { withCredentials: true })
      .pipe(
        catchError(() => of(null)),
        finalize(() => {
          this.isLoggingOut.set(false);
          this.clearSession();
          this.router.navigate(['/login']);
        })
      );
  }

  refreshToken() {
    return this.http.post<ApiResponse<AuthResponse>>(
      `${this.api}/refresh-token`,
      {},
      { withCredentials: true }
    ).pipe(
      tap(res => {
        if (res.isSuccess) this.setSession(res.data);
      }),
      catchError(err => {
        this.clearSession();
        return throwError(() => err);
      })
    );
  }

  isAuthenticated() {
    return this.currentUser() !== null;
  }
}


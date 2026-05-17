import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError } from 'rxjs';
import { Auth } from '../services/auth';

let isRefreshing = false;
let refreshSubject = new BehaviorSubject<string | null>(null);
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const urlLower = req.url.toLowerCase();
  if ( urlLower.includes('/auth/login') || urlLower.includes('/auth/logout') || urlLower.includes('/auth/refresh-token') || urlLower.includes('/auth/me')) {
    return next(req);
  }
  const authService = inject(Auth);
  const router = inject(Router);

  const token = authService.getAccessToken();

  const authReq = token ? req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  }) : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {

      if (error.status !== 401) {
        return throwError(() => error);
      }

      if (!isRefreshing) {

        isRefreshing = true;
        refreshSubject.next(null);

        return authService.refreshToken().pipe(
          switchMap(res => {

            const newToken = res.data.accessToken;

            refreshSubject.next(newToken);
            isRefreshing = false;

            const retryReq = req.clone({
              setHeaders: {
                Authorization: `Bearer ${newToken}`
              }
            });

            return next(retryReq);
          }),
          catchError(err => {

            isRefreshing = false;
            authService.clearSession();
            router.navigate(['/login']);

            return throwError(() => err);
          })
        );
      }

      return refreshSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => {

          const retryReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
            }
          });

          return next(retryReq);
        })
      );

    })
  );
};

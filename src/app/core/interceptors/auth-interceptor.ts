import { HttpInterceptorFn, HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, switchMap, take, throwError, Observable, finalize } from 'rxjs';
import { Auth } from '../services/auth';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const authService = inject(Auth);
  const token = authService.getAccessToken();

  let authReq = req;

  if (token && !req.url.includes('/Auth/login') && !req.url.includes('/Auth/refresh-token')) {
    authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !req.url.includes('/Auth/login') &&
        !req.url.includes('/Auth/refresh-token')
      ) {
        return handle401Error(authReq, next, authService);
      }
      return throwError(() => error);
    })
  );
};

const handle401Error = (req: HttpRequest<any>, next: HttpHandlerFn, authService: Auth): Observable<HttpEvent<any>> => {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    const refreshToken = authService.getRefreshToken();
    const accessToken = authService.getAccessToken();

    if (!refreshToken) {
      authService.logout();
      return throwError(() => new Error('Session expired'));
    }

    return authService.refreshToken({
      refreshToken,
      accessToken: accessToken!
    }).pipe(
      switchMap((res) => {
        const newAuth = res.data;
        authService.storeAuth(newAuth);
        refreshTokenSubject.next(newAuth.accessToken);

        return next(req.clone({
          setHeaders: { Authorization: `Bearer ${newAuth.accessToken}` }
        }));
      }),
      catchError((err) => {
        authService.logout();
        return throwError(() => err);
      }),
      finalize(() => {
        isRefreshing = false;
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) =>
        next(req.clone({
          setHeaders: { Authorization: `Bearer ${token}` }
        }))
      )
    );
  }
};
import { ApplicationConfig, APP_INITIALIZER, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';

import { routes } from './app.routes';
import { AppTitleStrategy } from './core/strategies/page-title';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { Auth } from './core/services/auth';
import { catchError, firstValueFrom, of, timeout } from 'rxjs';

export function initializeApp(auth: Auth) {
  return () =>
    firstValueFrom(
      auth.refreshToken().pipe(
        timeout(5000), // Prevent infinite loading if backend hangs
        catchError(() => of(null))
      )
    );
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: TitleStrategy, useClass: AppTitleStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [Auth],
      multi: true
    }
  ]
};

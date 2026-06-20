import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';

import { routes } from './app.routes';
import { AppTitleStrategy } from './core/strategies/page-title';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { AuthService } from './core/services/auth.service';
import { catchError, firstValueFrom, of, timeout } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: TitleStrategy, useClass: AppTitleStrategy },
    provideAppInitializer(() => {
      const auth = inject(AuthService);

      return firstValueFrom(
        auth.refreshToken().pipe(
          timeout(5000),
          catchError(() => of(null))
        )
      );
    }),
  ],
};
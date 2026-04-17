import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  const allowedRoles = route.data?.['roles'] as string[];
  const userRole = authService.currentUser()?.role;

  if(allowedRoles?.includes(userRole ?? '')){
    return true;
  }

  router.navigate(['/dashboard']);
  return false;
};

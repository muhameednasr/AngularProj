import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth-service';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn) {
    return true;
  }

  // not logged in -> redirect to login and include return url
  const returnUrl = state?.url || '/';
  router.navigate(['/login'], { queryParams: { returnUrl } });
  return false;
};

import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAdmin()) {
    return true;
  }

  // Redirect to home if not admin, or login if not authenticated
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
  } else {
    router.navigate(['/']);
  }
  return false;
};

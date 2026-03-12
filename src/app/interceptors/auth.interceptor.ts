import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

const PUBLIC_URLS = ['/api/auth/login', '/api/auth/register', '/api/auth/activate'];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isPublic = PUBLIC_URLS.some(url => req.url.includes(url));
  const token = authService.getToken();

  const authReq = token && !isPublic
    ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isPublic) {
        authService.clearSession();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};

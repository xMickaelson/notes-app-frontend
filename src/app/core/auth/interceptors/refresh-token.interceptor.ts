import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const tokenStorage = inject(TokenStorageService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const isAuthRequest =
        req.url.includes('/login') ||
        req.url.includes('/register') ||
        req.url.includes('refresh');

      const refreshToken = tokenStorage.getRefreshToken();

      if (isAuthRequest || error.status != 401 || !refreshToken) {
        return throwError(() => error);
      }

      return authService.refreshToken(refreshToken).pipe(
        switchMap((response) => {
          tokenStorage.saveAccessToken(response.accessToken);
          tokenStorage.saveRefreshToken(response.refreshToken);

          const clonedRequest = req.clone({
            setHeaders: {
              Authorization: `Bearer ${response.accessToken}`,
            },
          });
          return next(clonedRequest);
        }),
        catchError((refreshToken) => {
          tokenStorage.clear();
          router.navigate(['/login']);
          return throwError(() => error);
        }),
      );
    }),
  );
};

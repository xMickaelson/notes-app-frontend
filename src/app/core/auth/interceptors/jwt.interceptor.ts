import { HttpInterceptorFn } from '@angular/common/http';
import { TokenStorageService } from '../services/token-storage.service';
import { inject } from '@angular/core';

export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
  if (
    request.url.includes('/api/auth/login') ||
    request.url.includes('/api/auth/register')
  ) {
    return next(request);
  }
  const tokenStorage = inject(TokenStorageService);
  const token = tokenStorage.getAccessToken();

  if (!token) {
    return next(request);
  }

  const cloneRquest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(cloneRquest);
};

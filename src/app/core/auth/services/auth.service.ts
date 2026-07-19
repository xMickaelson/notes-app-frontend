import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { LoginRequest } from '../models/login-request';
import { finalize, Observable, of } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { RegisterRequest } from '../models/register-request';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private tokenStorageService = inject(TokenStorageService);
  private readonly API = `${environment.apiUrl}/auth`;

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API}/login`, request);
  }

  register(request: RegisterRequest): Observable<string> {
    return this.http.post(`${this.API}/register`, request, {
      responseType: 'text',
    });
  }

  logout(): Observable<void> {
    const refreshToken = this.tokenStorageService.getRefreshToken();
    if (!refreshToken) {
      this.tokenStorageService.clear();
      return of(void 0);
    }
    return this.http
      .post<void>(`${this.API}/logout`, {
        refreshToken,
      })
      .pipe(
        finalize(() => {
          this.tokenStorageService.clear();
        }),
      );
  }

  refresh(refreshToken: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API}/refresh`, {
      refreshToken,
    });
  }

  refreshToken(refreshToken: string) {
    return this.http.post<AuthResponse>(`${this.API}/refresh`, {
      refreshToken,
    });
  }

  get userInitials(): string {
    const token = this.tokenStorageService.getAccessToken();
    if (!token) {
      return '?';
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub.charAt(0).toUpperCase();
  }
}

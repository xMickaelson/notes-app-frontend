import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  private readonly ACCESS_TOKEN = 'access_token';
  private readonly REFRESH_TOKEN = 'refresh_token';

  saveAccessToken(accessToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN, accessToken);
  }

  saveRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.REFRESH_TOKEN, refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  clear(): void {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }

  isLoggedIn(): boolean {
    return this.getAccessToken() ? true : false;
  }
}

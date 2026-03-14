import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  institution?: string;
  department?: string;
  academicTitle?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = `${environment.apiUrl}/api/auth`;
  private readonly TOKEN_KEY = 'fasolib_jwt';
  private readonly USER_KEY = 'fasolib_user';

  // Reactive signals
  user = signal<User | null>(this.getStoredUser());
  isAuthenticated = computed(() => this.user() !== null && !this.isTokenExpired());
  isAdmin = computed(() => this.user()?.role === 'ADMIN');
  isLoading = signal<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {}

  // ── Token helpers ──────────────────────────────────────

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private storeSession(token: string, user: User): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.user.set(user);
  }

  private getStoredUser(): User | null {
    const stored = localStorage.getItem(this.USER_KEY);
    const token = localStorage.getItem(this.TOKEN_KEY);

    if (!stored || !token || this.isTokenExpiredRaw(token)) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
      return null;
    }

    return JSON.parse(stored);
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    return !token || this.isTokenExpiredRaw(token);
  }

  private isTokenExpiredRaw(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  clearSession(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.user.set(null);
  }

  // ── Auth operations ────────────────────────────────────

  register(request: RegisterRequest): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, request);
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, request).pipe(
      tap(response => {
        this.storeSession(response.token, response.user);
      })
    );
  }

  activateAccount(token: string): Observable<any> {
    return this.http.get(`${this.API_URL}/activate`, { params: { token } });
  }

  logout(): Observable<any> {
    return this.http.post(`${this.API_URL}/logout`, {}).pipe(
      tap(() => {
        this.clearSession();
        this.router.navigate(['/login']);
      })
    );
  }

  refreshProfile(updatedUser: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(updatedUser));
    this.user.set(updatedUser);
  }
}

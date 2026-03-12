import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { environment } from '../../environments/environment';

export interface ProfileUpdateRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  bio?: string;
  institution?: string;
  department?: string;
  academicTitle?: string;
  orcid?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = `${environment.apiUrl}/api/users`;
  private http = inject(HttpClient);

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.API_URL}/profile`);
  }

  updateProfile(data: ProfileUpdateRequest): Observable<User> {
    return this.http.put<User>(`${this.API_URL}/profile`, data);
  }

  uploadProfilePicture(file: File): Observable<{ message: string; url: string }> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<{ message: string; url: string }>(
      `${this.API_URL}/profile/picture`,
      formData,
    );
  }

  // --- Admin Methods ---

  adminGetUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.API_URL}/admin/users`);
  }

  adminUpdateStatus(userId: number, status: string): Observable<User> {
    return this.http.patch<User>(`${this.API_URL}/admin/users/${userId}/status`, null, {
      params: { status },
    });
  }

  adminUpdateRole(userId: number, role: string): Observable<User> {
    return this.http.patch<User>(`${this.API_URL}/admin/users/${userId}/role`, null, {
      params: { role },
    });
  }
}

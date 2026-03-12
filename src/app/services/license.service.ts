import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { License } from '../models/license.model';

@Injectable({ providedIn: 'root' })
export class LicenseService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api';

  /** Public — active licenses only */
  getActive(): Observable<License[]> {
    return this.http.get<License[]>(`${this.baseUrl}/licenses`);
  }

  /** Admin — all licenses */
  getAll(): Observable<License[]> {
    return this.http.get<License[]>(`${this.baseUrl}/admin/licenses`);
  }

  /** Admin — get one */
  getById(id: number): Observable<License> {
    return this.http.get<License>(`${this.baseUrl}/admin/licenses/${id}`);
  }

  /** Admin — create */
  create(dto: Partial<License>): Observable<License> {
    return this.http.post<License>(`${this.baseUrl}/admin/licenses`, dto);
  }

  /** Admin — update */
  update(id: number, dto: Partial<License>): Observable<License> {
    return this.http.put<License>(`${this.baseUrl}/admin/licenses/${id}`, dto);
  }

  /** Admin — delete */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/licenses/${id}`);
  }
}

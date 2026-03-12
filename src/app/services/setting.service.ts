import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Setting } from '../models/setting.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private readonly API_URL = `${environment.apiUrl}/api/settings`;
  private http = inject(HttpClient);

  getPublicSettings(): Observable<Setting[]> {
    return this.http.get<Setting[]>(`${this.API_URL}/public`);
  }

  getAllSettings(): Observable<Setting[]> {
    return this.http.get<Setting[]>(this.API_URL);
  }

  getByKey(key: string): Observable<Setting> {
    return this.http.get<Setting>(`${this.API_URL}/${key}`);
  }

  createOrUpdate(setting: Partial<Setting>): Observable<Setting> {
    return this.http.post<Setting>(this.API_URL, setting);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}

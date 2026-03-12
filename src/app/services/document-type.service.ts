import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentType } from '../models/document-type.model';

@Injectable({ providedIn: 'root' })
export class DocumentTypeService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:8080/api';

  /** Public — active types only */
  getActive(): Observable<DocumentType[]> {
    return this.http.get<DocumentType[]>(`${this.baseUrl}/document-types`);
  }

  /** Admin — all types */
  getAll(): Observable<DocumentType[]> {
    return this.http.get<DocumentType[]>(`${this.baseUrl}/admin/document-types`);
  }

  /** Admin — get one */
  getById(id: number): Observable<DocumentType> {
    return this.http.get<DocumentType>(`${this.baseUrl}/admin/document-types/${id}`);
  }

  /** Admin — create */
  create(dto: Partial<DocumentType>): Observable<DocumentType> {
    return this.http.post<DocumentType>(`${this.baseUrl}/admin/document-types`, dto);
  }

  /** Admin — update */
  update(id: number, dto: Partial<DocumentType>): Observable<DocumentType> {
    return this.http.put<DocumentType>(`${this.baseUrl}/admin/document-types/${id}`, dto);
  }

  /** Admin — delete */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/admin/document-types/${id}`);
  }
}

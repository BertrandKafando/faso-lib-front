import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { Document } from '../models/document';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/documents`;

  getDocuments(filters?: { 
    search?: string; 
    categoryId?: string;
    minPrice?: string;
    maxPrice?: string;
  }): Observable<Document[]> {
    let params = new HttpParams();
    if (filters?.search) params = params.set('search', filters.search);
    if (filters?.categoryId) params = params.set('categoryId', filters.categoryId);
    if (filters?.minPrice) params = params.set('minPrice', filters.minPrice);
    if (filters?.maxPrice) params = params.set('maxPrice', filters.maxPrice);

    return this.http.get<Document[]>(this.apiUrl, { params });
  }

  getDocument(id: number): Observable<Document> {
    return this.http.get<Document>(`${this.apiUrl}/${id}`);
  }
}

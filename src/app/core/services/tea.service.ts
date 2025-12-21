import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Tea, ApiResponse, PagedResponse } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeaService {
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) { }

  // Legacy method for dashboard/products page compatibility
  getTeas(): Observable<Tea[]> {
    return this.getPublishedTeas(0, 1000).pipe(
      map(response => response.data?.content || [])
    );
  }

  // Public endpoints
  getPublishedTeas(page: number = 0, size: number = 10, sort: string = 'createdAt,desc'): Observable<ApiResponse<PagedResponse<Tea>>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    return this.http.get<ApiResponse<PagedResponse<Tea>>>(`${this.apiUrl}/products`, { params });
  }

  getFeaturedTeas(): Observable<Tea[]> {
    return this.getPublishedTeas(0, 10).pipe(
      map(response => (response.data?.content || []).filter(tea => tea.active))
    );
  }

  getTeaById(id: number | string): Observable<Tea | undefined> {
    return this.http.get<ApiResponse<Tea>>(`${this.apiUrl}/products/${id}`).pipe(
      map(response => response.data)
    );
  }

  getTeasByCategory(category: string, page: number = 0, size: number = 10): Observable<ApiResponse<PagedResponse<Tea>>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<ApiResponse<PagedResponse<Tea>>>(`${this.apiUrl}/products/category/${category}`, { params });
  }

  // Admin endpoints (assuming standard patterns)
  getAllTeas(page: number = 0, size: number = 10, sort: string = 'createdAt,desc'): Observable<ApiResponse<PagedResponse<Tea>>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    return this.http.get<ApiResponse<PagedResponse<Tea>>>(`${this.apiUrl}/admin/products`, { params });
  }

  addTea(tea: any): Observable<ApiResponse<Tea>> {
    return this.http.post<ApiResponse<Tea>>(`${this.apiUrl}/admin/products`, tea);
  }

  updateTea(id: number | string, tea: any): Observable<ApiResponse<Tea>> {
    return this.http.put<ApiResponse<Tea>>(`${this.apiUrl}/admin/products/${id}`, tea);
  }

  deleteTea(id: number | string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/admin/products/${id}`);
  }
}

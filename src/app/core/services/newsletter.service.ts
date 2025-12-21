import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsletterRequestDTO, SubscriberResponseDTO, ApiResponse } from '../models/newsletter.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  subscribe(email: string): Observable<ApiResponse<SubscriberResponseDTO>> {
    const requestDTO: NewsletterRequestDTO = { email };
    return this.http.post<ApiResponse<SubscriberResponseDTO>>(
      `${this.apiUrl}/newsletter/subscribe`,
      requestDTO
    );
  }

  getAllSubscribers(page: number = 0, size: number = 10): Observable<ApiResponse<any>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<ApiResponse<any>>(
      `${this.apiUrl}/admin/subscribers`,
      { params }
    );
  }

  deleteSubscriber(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(
      `${this.apiUrl}/admin/subscribers/${id}`
    );
  }

  unsubscribe(email: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(
      `${this.apiUrl}/admin/subscribers/email/${email}`
    );
  }
}

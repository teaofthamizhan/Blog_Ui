import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactForm, ContactRequestDTO, ContactResponseDTO } from '../models/contact.model';
import { ApiResponse } from '../models/common.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  submitContactForm(form: ContactForm): Observable<ApiResponse<ContactResponseDTO>> {
    const requestDTO: ContactRequestDTO = {
      name: form.name,
      email: form.email,
      message: form.message
    };

    return this.http.post<ApiResponse<ContactResponseDTO>>(
      `${this.apiUrl}/contact`,
      requestDTO
    );
  }

  getAllContactMessages(page: number = 0, size: number = 10): Observable<ApiResponse<any>> {
    return this.http.get<ApiResponse<any>>(
      `${this.apiUrl}/admin/contact-messages`,
      { params: { page, size } }
    );
  }

  getContactMessageById(id: number): Observable<ApiResponse<ContactResponseDTO>> {
    return this.http.get<ApiResponse<ContactResponseDTO>>(
      `${this.apiUrl}/admin/contact-messages/${id}`
    );
  }

  deleteContactMessage(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(
      `${this.apiUrl}/admin/contact-messages/${id}`
    );
  }
}

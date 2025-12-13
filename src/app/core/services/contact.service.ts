import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ContactForm } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor() {}

  submitContactForm(form: ContactForm): Observable<{ success: boolean; message: string }> {
    // Mock API call - replace with actual HTTP call to backend
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          success: true,
          message: 'Thank you for reaching out! We will get back to you soon.'
        });
        observer.complete();
      }, 1000);
    });
  }
}

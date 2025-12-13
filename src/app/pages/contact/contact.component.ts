import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';
import { ContactForm } from '../../core/models/contact.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm: ContactForm = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };
  submitted = false;
  isSubmitting = false;
  submitMessage = '';

  constructor(private contactService: ContactService) {}

  onSubmit() {
    if (this.contactForm.name && this.contactForm.email && this.contactForm.message) {
      this.isSubmitting = true;
      this.contactService.submitContactForm(this.contactForm).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.submitted = true;
          this.submitMessage = response.message;
          this.contactForm = {
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
          };
          setTimeout(() => {
            this.submitted = false;
          }, 5000);
        },
        error: () => {
          this.isSubmitting = false;
          this.submitMessage = 'An error occurred. Please try again.';
        }
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';
import { ContactForm } from '../../core/models/contact.model';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
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
  errorMessage = '';
  errors: { [key: string]: string } = {};

  constructor(
    private contactService: ContactService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Contact Us - Tea of Thamizhan');
    this.metaService.updateTag({ name: 'description', content: 'Get in touch with us for bulk orders, collaborations, or just to say hello. We would love to hear from our fellow tea enthusiasts.' });
  }

  onSubmit() {
    this.errors = {};
    this.errorMessage = '';

    if (!this.validateForm()) {
      return;
    }

    this.isSubmitting = true;
    this.contactService.submitContactForm(this.contactForm).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.submitted = true;
        this.submitMessage = response.message || 'Thank you for reaching out! We will get back to you soon.';
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
      error: (error) => {
        this.isSubmitting = false;
        this.handleError(error);
      }
    });
  }

  private validateForm(): boolean {
    const nameRegex = /^.{2,200}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const messageRegex = /^.{10,5000}$/;

    if (!this.contactForm.name) {
      this.errors['name'] = 'Name is required';
    } else if (!nameRegex.test(this.contactForm.name)) {
      this.errors['name'] = 'Name must be between 2 and 200 characters';
    }

    if (!this.contactForm.email) {
      this.errors['email'] = 'Email is required';
    } else if (!emailRegex.test(this.contactForm.email)) {
      this.errors['email'] = 'Email must be valid';
    }

    if (!this.contactForm.message) {
      this.errors['message'] = 'Message is required';
    } else if (!messageRegex.test(this.contactForm.message)) {
      this.errors['message'] = 'Message must be between 10 and 5000 characters';
    }

    return Object.keys(this.errors).length === 0;
  }

  private handleError(error: any): void {
    console.error('Contact form submission error:', error);

    if (error.status === 400 && error.error?.data) {
      const errorData = error.error.data;
      if (Array.isArray(errorData)) {
        errorData.forEach((err: any) => {
          const field = err.field || 'general';
          this.errors[field] = err.message;
        });
      } else {
        this.errorMessage = error.error.message || 'Validation error. Please check your input.';
      }
    } else if (error.status === 0) {
      this.errorMessage = 'Cannot connect to server. Please check your connection and try again.';
    } else {
      this.errorMessage = error.error?.message || 'An error occurred. Please try again later.';
    }
  }
}

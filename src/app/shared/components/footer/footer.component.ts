import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NewsletterService } from '../../../core/services/newsletter.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
  email = '';
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(private newsletterService: NewsletterService) {}

  onSubscribe(event: Event) {
    event.preventDefault();
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.email) {
      this.errorMessage = 'Please enter your email address';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Please enter a valid email address';
      return;
    }

    this.isSubmitting = true;

    this.newsletterService.subscribe(this.email).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.successMessage = response.message || 'Successfully subscribed to our newsletter!';
        this.email = '';
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Newsletter subscription error:', error);
        
        if (error.status === 400 && error.error?.message) {
          this.errorMessage = error.error.message;
        } else if (error.status === 0) {
          this.errorMessage = 'Cannot connect to server. Please try again.';
        } else {
          this.errorMessage = error.error?.message || 'An error occurred. Please try again later.';
        }

        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      }
    });
  }
}

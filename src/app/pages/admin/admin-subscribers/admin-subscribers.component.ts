import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NewsletterService } from '../../../core/services/newsletter.service';
import { SubscriberResponseDTO } from '../../../core/models/newsletter.model';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-admin-subscribers',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './admin-subscribers.component.html',
  styleUrl: './admin-subscribers.component.scss'
})
export class AdminSubscribersComponent implements OnInit {
  subscribers: SubscriberResponseDTO[] = [];
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';
  showAddModal = false;
  subscriberEmail = '';
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;
  searchTerm = '';

  constructor(
    private newsletterService: NewsletterService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.loadSubscribers();
  }

  loadSubscribers(page: number = 0) {
    this.isLoading = true;
    this.errorMessage = '';

    this.newsletterService.getAllSubscribers(page, this.pageSize).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.data && response.data.content) {
          this.subscribers = response.data.content;
          this.totalPages = response.data.totalPages;
          this.totalElements = response.data.totalElements;
          this.currentPage = page;
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error loading subscribers:', error);
        this.errorMessage = error.error?.message || 'Failed to load subscribers. Please try again.';
      }
    });
  }

  deleteSubscriber(id: number, email: string) {
    if (confirm(`Are you sure you want to delete "${email}" from the newsletter?`)) {
      this.newsletterService.deleteSubscriber(id).subscribe({
        next: (response) => {
          this.subscribers = this.subscribers.filter(s => s.id !== id);
          this.toastService.showSuccess('Subscriber removed successfully');
        },
        error: (error) => {
          console.error('Error deleting subscriber:', error);
          this.toastService.showError(error.error?.message || 'Failed to delete subscriber');
        }
      });
    }
  }

  unsubscribe(email: string) {
    if (confirm(`Are you sure you want to unsubscribe "${email}"?`)) {
      this.newsletterService.unsubscribe(email).subscribe({
        next: (response) => {
          this.subscribers = this.subscribers.filter(s => s.email !== email);
          this.toastService.showSuccess('Subscriber unsubscribed successfully');
        },
        error: (error) => {
          console.error('Error unsubscribing:', error);
          this.toastService.showError(error.error?.message || 'Failed to unsubscribe');
        }
      });
    }
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.loadSubscribers(page);
    }
  }

  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages - 1;
  }

  get hasPreviousPage(): boolean {
    return this.currentPage > 0;
  }

  openAddModal() {
    this.showAddModal = true;
    this.subscriberEmail = '';
    this.errorMessage = '';
  }

  closeAddModal() {
    this.showAddModal = false;
    this.subscriberEmail = '';
  }

  addSubscriber() {
    if (!this.subscriberEmail || !this.subscriberEmail.includes('@')) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.newsletterService.subscribe(this.subscriberEmail).subscribe({
      next: (response) => {
        if (response.success) {
          this.loadSubscribers(this.currentPage);
          this.closeAddModal();
          this.toastService.showSuccess('Subscriber added successfully!');
        }
        this.isSubmitting = false;
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error adding subscriber:', error);
        this.toastService.showError(error.error?.message || 'Failed to add subscriber');
      }
    });
  }

  get filteredSubscribers(): SubscriberResponseDTO[] {
    return this.subscribers.filter(sub =>
      sub.email.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

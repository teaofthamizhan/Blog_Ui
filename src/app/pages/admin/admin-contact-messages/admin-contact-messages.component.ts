import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../../core/services/contact.service';
import { ContactResponseDTO } from '../../../core/models/contact.model';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-admin-contact-messages',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './admin-contact-messages.component.html',
  styleUrl: './admin-contact-messages.component.scss'
})
export class AdminContactMessagesComponent implements OnInit {
  contactMessages: any[] = [];
  isLoading = false;
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  showModal = false;
  selectedMessage: any = null;
  searchTerm = '';

  constructor(
    private contactService: ContactService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.loadContactMessages();
  }

  loadContactMessages(page: number = 0) {
    this.isLoading = true;
    this.contactService.getAllContactMessages(page, this.pageSize).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        if (response.data && response.data.content) {
          this.contactMessages = response.data.content;
          this.totalPages = response.data.totalPages;
          this.currentPage = page;
        } else {
          this.contactMessages = [];
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error loading contact messages:', error);
        this.toastService.showError('Failed to load contact messages');
      }
    });
  }

  deleteContactMessage(id: number) {
    if (confirm('Are you sure you want to delete this message?')) {
      this.contactService.deleteContactMessage(id).subscribe({
        next: () => {
          this.contactMessages = this.contactMessages.filter(m => m.id !== id);
          this.toastService.showSuccess('Message deleted successfully');
          if (this.selectedMessage?.id === id) {
            this.closeModal();
          }
        },
        error: (error) => {
          console.error('Error deleting message:', error);
          this.toastService.showError('Failed to delete message');
        }
      });
    }
  }

  viewMessage(message: any) {
    this.selectedMessage = message;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedMessage = null;
  }

  nextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.loadContactMessages(this.currentPage + 1);
    }
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.loadContactMessages(this.currentPage - 1);
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  get filteredMessages(): any[] {
    return this.contactMessages.filter(msg =>
      msg.name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      msg.email?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      msg.subject?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      msg.message?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TeaService } from '../../../core/services/tea.service';
import { BlogService } from '../../../core/services/blog.service';
import { ContactService } from '../../../core/services/contact.service';
import { NewsletterService } from '../../../core/services/newsletter.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  teaCount = 0;
  blogCount = 0;
  contactMessageCount = 0;
  subscriberCount = 0;

  recentBlogs: any[] = [];
  recentMessages: any[] = [];

  constructor(
    private teaService: TeaService,
    private blogService: BlogService,
    private contactService: ContactService,
    private newsletterService: NewsletterService
  ) { }

  ngOnInit() {
    this.teaService.getTeas().subscribe(teas => {
      this.teaCount = teas.length;
    });

    this.blogService.getAllBlogs(0, 5).subscribe(response => {
      if (response.data && response.data.content) {
        this.recentBlogs = response.data.content;
        this.blogCount = response.data.totalElements;
      }
    });

    this.contactService.getAllContactMessages(0, 5).subscribe({
      next: (response: any) => {
        if (response.data && response.data.content) {
          this.recentMessages = response.data.content;
          this.contactMessageCount = response.data.totalElements;
        }
      },
      error: (error) => {
        console.error('Error loading contact message stats:', error);
      }
    });

    this.newsletterService.getAllSubscribers(0, 5).subscribe({
      next: (response: any) => {
        if (response.data) {
          this.subscriberCount = response.data.totalElements || 0;
        }
      },
      error: (error) => {
        console.error('Error loading subscriber count:', error);
      }
    });
  }
}

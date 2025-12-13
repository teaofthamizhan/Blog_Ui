import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TeaService } from '../../../core/services/tea.service';
import { BlogService } from '../../../core/services/blog.service';

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

  constructor(
    private teaService: TeaService,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    this.teaService.getTeas().subscribe(teas => {
      this.teaCount = teas.length;
    });

    this.blogService.getBlogs().subscribe(blogs => {
      this.blogCount = blogs.length;
    });
  }
}

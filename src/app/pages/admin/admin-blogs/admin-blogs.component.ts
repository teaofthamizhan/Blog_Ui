import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogService } from '../../../core/services/blog.service';
import { BlogPost } from '../../../core/models/blog.model';

@Component({
  selector: 'app-admin-blogs',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-blogs.component.html',
  styleUrl: './admin-blogs.component.scss'
})
export class AdminBlogsComponent implements OnInit {
  blogs: BlogPost[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.getBlogs().subscribe(blogs => {
      this.blogs = blogs.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    });
  }

  deleteBlog(id: string) {
    if (confirm('Are you sure you want to delete this blog post?')) {
      this.blogService.deleteBlog(id).subscribe(() => {
        this.blogs = this.blogs.filter(b => b.id !== id);
      });
    }
  }
}

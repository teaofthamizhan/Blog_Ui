import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from '../../../shared/components/blog-card/blog-card.component';
import { BlogService } from '../../../core/services/blog.service';
import { BlogPost } from '../../../core/models/blog.model';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, BlogCardComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit {
  blogs: BlogPost[] = [];

  constructor(private blogService: BlogService) {}

  ngOnInit() {
    this.blogService.getBlogs().subscribe(blogs => {
      this.blogs = blogs.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    });
  }
}

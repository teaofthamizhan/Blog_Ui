import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogService } from '../../../core/services/blog.service';
import { BlogResponseDTO } from '../../../core/models/blog.model';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent implements OnInit {
  blog: BlogResponseDTO | undefined;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadBlog(slug);
    } else {
      this.isLoading = false;
      this.errorMessage = 'Blog slug not found';
    }
  }

  loadBlog(slug: string) {
    this.isLoading = true;
    this.errorMessage = '';

    this.blogService.getBlogBySlug(slug).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.blog = response.data;
        if (this.blog) {
          this.titleService.setTitle(`${this.blog.title} - Tea of Thamizhan`);
          this.metaService.updateTag({ name: 'description', content: this.blog.summary || this.blog.title });
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error loading blog:', error);
        this.errorMessage = error.error?.message || 'Blog not found. Please try again.';
      }
    });
  }

  get tags(): string[] {
    if (!this.blog?.tags) return [];
    return typeof this.blog.tags === 'string'
      ? this.blog.tags.split(',').map(tag => tag.trim())
      : [];
  }

  get estimatedReadTime(): number {
    if (!this.blog?.content) return 1;
    const wordsPerMinute = 200;
    const wordCount = this.blog.content.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  }

  onImageError(event: any) {
    event.target.src = 'https://via.placeholder.com/1200x600?text=Blog+Header+Image';
  }
}

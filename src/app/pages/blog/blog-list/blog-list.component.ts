import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogCardComponent } from '../../../shared/components/blog-card/blog-card.component';
import { BlogService } from '../../../core/services/blog.service';
import { BlogResponseDTO } from '../../../core/models/blog.model';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, BlogCardComponent],
  templateUrl: './blog-list.component.html',
  styleUrl: './blog-list.component.scss'
})
export class BlogListComponent implements OnInit {
  blogs: BlogResponseDTO[] = [];
  isLoading = true;
  errorMessage = '';
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;

  constructor(
    private blogService: BlogService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Tea Wisdom & Stories - Blog - Tea of Thamizhan');
    this.metaService.updateTag({ name: 'description', content: 'Read latest articles about tea culture, wellness benefits, brewing guides, and the heritage of artisan tea.' });
    this.loadBlogs();
  }

  loadBlogs(page: number = 0) {
    this.isLoading = true;
    this.errorMessage = '';

    this.blogService.getPublishedBlogs(page, this.pageSize).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.data && response.data.content) {
          this.blogs = response.data.content;
          this.totalPages = response.data.totalPages;
          this.currentPage = page;
        }
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error loading blogs:', error);
        this.errorMessage = error.error?.message || 'Failed to load blogs. Please try again.';
      }
    });
  }

  goToPage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.loadBlogs(page);
    }
  }

  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages - 1;
  }

  get hasPreviousPage(): boolean {
    return this.currentPage > 0;
  }
}

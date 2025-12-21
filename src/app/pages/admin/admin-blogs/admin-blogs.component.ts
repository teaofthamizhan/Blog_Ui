import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BlogService } from '../../../core/services/blog.service';
import { BlogResponseDTO, BlogStatus } from '../../../core/models/blog.model';
import { ToastService } from '../../../core/services/toast.service';

// Custom URL validator
function urlValidator(control: any) {
  if (!control.value) return null;
  try {
    new URL(control.value);
    return null;
  } catch {
    return { invalidUrl: true };
  }
}

@Component({
  selector: 'app-admin-blogs',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './admin-blogs.component.html',
  styleUrl: './admin-blogs.component.scss'
})
export class AdminBlogsComponent implements OnInit {
  blogs: BlogResponseDTO[] = [];
  isLoading = false;
  isSubmitting = false;
  errorMessage = '';
  showModal = false;
  editingBlog: BlogResponseDTO | null = null;
  blogForm: FormGroup;

  searchTerm = '';
  selectedCategory = '';

  categories = ['knowledge', 'lifestyle', 'recipe', 'news'];

  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;

  blogStatuses = Object.values(BlogStatus);

  constructor(
    private blogService: BlogService,
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.blogForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(200)]],
      slug: ['', [Validators.required, Validators.pattern(/^[a-z0-9-]*$/)]],
      summary: ['', [Validators.maxLength(500)]],
      content: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', [Validators.maxLength(100)]],
      tags: ['', [Validators.maxLength(500)]],
      featuredImage: ['', [Validators.maxLength(500), urlValidator]],
      status: [BlogStatus.DRAFT, Validators.required]
    });
  }

  ngOnInit() {
    this.loadBlogs();
  }

  loadBlogs(page: number = 0) {
    this.isLoading = true;
    this.errorMessage = '';

    this.blogService.getAllBlogs(page, this.pageSize).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.data && response.data.content) {
          this.blogs = response.data.content;
          this.totalPages = response.data.totalPages;
          this.totalElements = response.data.totalElements;
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

  openModal(blog?: BlogResponseDTO) {
    this.editingBlog = blog || null;
    if (blog) {
      this.blogForm.patchValue(blog);
    } else {
      this.blogForm.reset({
        status: BlogStatus.DRAFT
      });
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingBlog = null;
    this.blogForm.reset();
  }

  generateSlug() {
    const title = this.blogForm.get('title')?.value;
    if (title) {
      const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      this.blogForm.patchValue({ slug });
    }
  }

  onSubmit() {
    if (this.blogForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    const blogData = this.blogForm.value;

    const request = this.editingBlog
      ? this.blogService.updateBlog(this.editingBlog.id, blogData)
      : this.blogService.createBlog(blogData);

    request.subscribe({
      next: (response) => {
        if (response.success) {
          this.loadBlogs(this.currentPage);
          this.closeModal();
          this.toastService.showSuccess(this.editingBlog ? 'Blog updated successfully' : 'Blog created successfully');
        }
        this.isSubmitting = false;
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error saving blog:', error);
        this.toastService.showError(error.error?.message || 'Failed to save blog');
      }
    });
  }

  deleteBlog(id: number, title: string) {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      this.blogService.deleteBlog(id).subscribe({
        next: (response) => {
          this.blogs = this.blogs.filter(b => b.id !== id);
          this.toastService.showSuccess('Blog deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting blog:', error);
          this.toastService.showError(error.error?.message || 'Failed to delete blog. Please try again.');
        }
      });
    }
  }

  onImageError(event: any) {
    event.target.src = 'https://via.placeholder.com/800x400?text=Blog+Image+Preview';
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

  get filteredBlogs(): BlogResponseDTO[] {
    return this.blogs.filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        blog.summary?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        blog.content?.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesCategory = !this.selectedCategory || blog.category === this.selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }
}

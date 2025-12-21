import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogRequestDTO, BlogResponseDTO, ApiResponse, PagedResponse, BlogPost } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private apiUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  // Legacy method for dashboard compatibility
  getBlogs(): Observable<BlogResponseDTO[]> {
    return new Observable(observer => {
      this.getAllBlogs(0, 1000).subscribe({
        next: (response) => {
          if (response.data && response.data.content) {
            observer.next(response.data.content);
          } else {
            observer.next([]);
          }
          observer.complete();
        },
        error: (error) => {
          observer.error(error);
        }
      });
    });
  }

  // Public endpoints
  getPublishedBlogs(page: number = 0, size: number = 10, sort: string = 'createdAt,desc'): Observable<ApiResponse<any>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/blogs`, { params });
  }

  getLatestBlogs(limit: number = 3): Observable<ApiResponse<any>> {
    return this.getPublishedBlogs(0, limit, 'createdAt,desc');
  }

  getBlogBySlug(slug: string): Observable<ApiResponse<BlogResponseDTO>> {
    return this.http.get<ApiResponse<BlogResponseDTO>>(`${this.apiUrl}/blogs/${slug}`);
  }

  getBlogsByCategory(category: string, page: number = 0, size: number = 10): Observable<ApiResponse<any>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/blogs/category/${category}`, { params });
  }

  // Admin endpoints
  getAllBlogs(page: number = 0, size: number = 10, sort: string = 'createdAt,desc'): Observable<ApiResponse<any>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sort', sort);

    return this.http.get<ApiResponse<any>>(`${this.apiUrl}/admin/blogs`, { params });
  }

  createBlog(blog: BlogRequestDTO): Observable<ApiResponse<BlogResponseDTO>> {
    return this.http.post<ApiResponse<BlogResponseDTO>>(`${this.apiUrl}/admin/blogs`, blog);
  }

  updateBlog(id: number, blog: BlogRequestDTO): Observable<ApiResponse<BlogResponseDTO>> {
    return this.http.put<ApiResponse<BlogResponseDTO>>(`${this.apiUrl}/admin/blogs/${id}`, blog);
  }

  deleteBlog(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/admin/blogs/${id}`);
  }
}

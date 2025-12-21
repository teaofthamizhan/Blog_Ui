import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogResponseDTO } from '../../../core/models/blog.model';

@Component({
  selector: 'app-blog-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog-card.component.html',
  styleUrl: './blog-card.component.scss'
})
export class BlogCardComponent {
  @Input() blog!: BlogResponseDTO;

  get tags(): string[] {
    if (!this.blog.tags) return [];
    return typeof this.blog.tags === 'string'
      ? this.blog.tags.split(',').map(tag => tag.trim())
      : [];
  }

  get estimatedReadTime(): number {
    if (!this.blog.content) return 1;
    const wordsPerMinute = 200;
    const wordCount = this.blog.content.split(/\s+/).length;
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  }

  onImageError(event: any) {
    event.target.src = 'images/default-tea.png';
  }
}

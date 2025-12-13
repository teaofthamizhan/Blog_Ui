import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { BlogCardComponent } from '../../shared/components/blog-card/blog-card.component';
import { TeaService } from '../../core/services/tea.service';
import { BlogService } from '../../core/services/blog.service';
import { Tea } from '../../core/models/tea.model';
import { BlogPost } from '../../core/models/blog.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent, BlogCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  featuredTeas: Tea[] = [];
  latestBlogs: BlogPost[] = [];

  constructor(
    private teaService: TeaService,
    private blogService: BlogService
  ) {}

  ngOnInit() {
    this.teaService.getFeaturedTeas().subscribe(teas => {
      this.featuredTeas = teas;
    });

    this.blogService.getLatestBlogs(3).subscribe(blogs => {
      this.latestBlogs = blogs;
    });
  }

  downloadBrochure() {
    // Mock PDF download - in production, would link to actual PDF
    const link = document.createElement('a');
    link.href = 'data:application/pdf,%PDF-mock';
    link.download = 'My-Tea-of-Thamizhan-Brochure.pdf';
    link.click();
  }
}

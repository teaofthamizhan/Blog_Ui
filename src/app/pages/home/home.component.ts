import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { BlogCardComponent } from '../../shared/components/blog-card/blog-card.component';
import { TeaService } from '../../core/services/tea.service';
import { BlogService } from '../../core/services/blog.service';
import { Tea } from '../../core/models/tea.model';
import { BlogResponseDTO } from '../../core/models/blog.model';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent, BlogCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  featuredTeas: Tea[] = [];
  latestBlogs: BlogResponseDTO[] = [];

  constructor(
    private teaService: TeaService,
    private blogService: BlogService,
    private titleService: Title,
    private metaService: Meta
  ) { }

  ngOnInit() {
    this.titleService.setTitle('Tea of Thamizhan - Premium Artisan Teas & Stories');
    this.metaService.updateTag({ name: 'description', content: 'Discover the finest collection of premium Indian teas. From Darjeeling to Assam, explore our curated selection and deep-dive into the world of tea culture.' });

    this.teaService.getFeaturedTeas().subscribe(teas => {
      this.featuredTeas = teas;
    });

    this.blogService.getLatestBlogs(3).subscribe(response => {
      if (response.data && response.data.content) {
        this.latestBlogs = response.data.content;
      }
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

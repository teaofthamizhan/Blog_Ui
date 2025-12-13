import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogPost } from '../models/blog.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private mockBlogs: BlogPost[] = [
    {
      id: '1',
      title: 'The Ancient Art of Tamil Tea Tradition',
      excerpt: 'Discover how tea culture has been woven into Tamil heritage for centuries.',
      content: `Tea has been an integral part of Tamil culture for over two millennia. From the 
        ancient Sangam period to modern times, tea (or "chai" as it's lovingly called) represents 
        more than just a beverage—it's a cultural symbol of hospitality, togetherness, and tradition.
        
        In Tamil Nadu, tea plantations cover the misty hills of the Nilgiris, 
        where our finest teas are cultivated with care and respect for nature. Each cup tells 
        a story of heritage, passion, and the land's rich biodiversity.`,
      author: 'Aarjun Desikan',
      date: new Date('2024-01-15'),
      image: 'https://images.unsplash.com/photo-1597318972157-3b911f4af589?w=600&h=400&fit=crop',
      tags: ['tradition', 'culture', 'heritage'],
      category: 'Culture',
      readTime: 5
    },
    {
      id: '2',
      title: 'Health Benefits of Green Tea: Science Meets Tradition',
      excerpt: 'Explore the scientifically-proven health benefits of green tea enjoyed for centuries.',
      content: `Green tea is not just a beverage; it's a wellness elixir backed by modern science. 
        Rich in antioxidants called catechins, green tea has been shown to support metabolism, 
        improve focus, and promote heart health.
        
        Our Jasmine Green Tea combines the delicate flavors of green tea with aromatic jasmine flowers, 
        creating a drink that pleases both the palate and the body. Whether enjoyed in the morning 
        for a gentle energy boost or in the afternoon for relaxation, green tea adapts to your needs.`,
      author: 'Priya Shankar',
      date: new Date('2024-01-10'),
      image: 'https://images.unsplash.com/photo-1597318972157-3b911f4af589?w=600&h=400&fit=crop',
      tags: ['health', 'wellness', 'science'],
      category: 'Wellness',
      readTime: 6
    },
    {
      id: '3',
      title: 'Brewing the Perfect Cup: A Beginner\'s Guide',
      excerpt: 'Learn the secrets to brewing the perfect cup of tea at home.',
      content: `The art of brewing tea is simple yet nuanced. Temperature, steeping time, and water quality 
        all play crucial roles in extracting the perfect flavor from your tea leaves.
        
        Different teas require different approaches: delicate white teas prefer cooler water and shorter 
        steep times, while robust black teas thrive in hotter water. Our guide provides specific recommendations 
        for each tea variety, ensuring you get the most from your cup.`,
      author: 'Rajesh Kumar',
      date: new Date('2024-01-05'),
      image: 'https://images.unsplash.com/photo-1597318972157-3b911f4af589?w=600&h=400&fit=crop',
      tags: ['brewing', 'guide', 'tips'],
      category: 'How-To',
      readTime: 4
    },
    {
      id: '4',
      title: 'Sustainable Tea Sourcing: Our Commitment',
      excerpt: 'How we ensure our tea is sourced responsibly and sustainably.',
      content: `At My Tea of Thamizhan, sustainability isn't just a buzzword—it's our commitment 
        to future generations. We work directly with tea farmers in Tamil Nadu to ensure fair wages, 
        proper working conditions, and environmentally conscious practices.
        
        By choosing our teas, you're supporting local communities and preserving the natural ecosystems 
        that make Tamil Nadu's tea regions so special.`,
      author: 'Ananya Iyer',
      date: new Date('2023-12-28'),
      image: 'https://images.unsplash.com/photo-1597318972157-3b911f4af589?w=600&h=400&fit=crop',
      tags: ['sustainability', 'environment', 'community'],
      category: 'Impact',
      readTime: 7
    }
  ];

  private blogsSubject = new BehaviorSubject<BlogPost[]>(this.mockBlogs);

  constructor() {}

  getBlogs(): Observable<BlogPost[]> {
    return this.blogsSubject.asObservable();
  }

  getBlogById(id: string): Observable<BlogPost | undefined> {
    return new Observable(observer => {
      const blog = this.mockBlogs.find(b => b.id === id);
      observer.next(blog);
      observer.complete();
    });
  }

  getLatestBlogs(limit: number = 3): Observable<BlogPost[]> {
    const latest = this.mockBlogs
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
    return new Observable(observer => {
      observer.next(latest);
      observer.complete();
    });
  }

  addBlog(blog: BlogPost): Observable<BlogPost> {
    this.mockBlogs.push(blog);
    this.blogsSubject.next([...this.mockBlogs]);
    return new Observable(observer => {
      observer.next(blog);
      observer.complete();
    });
  }

  updateBlog(id: string, blog: Partial<BlogPost>): Observable<BlogPost | undefined> {
    const index = this.mockBlogs.findIndex(b => b.id === id);
    if (index !== -1) {
      this.mockBlogs[index] = { ...this.mockBlogs[index], ...blog };
      this.blogsSubject.next([...this.mockBlogs]);
    }
    return new Observable(observer => {
      observer.next(this.mockBlogs[index]);
      observer.complete();
    });
  }

  deleteBlog(id: string): Observable<boolean> {
    const index = this.mockBlogs.findIndex(b => b.id === id);
    if (index !== -1) {
      this.mockBlogs.splice(index, 1);
      this.blogsSubject.next([...this.mockBlogs]);
      return new Observable(observer => {
        observer.next(true);
        observer.complete();
      });
    }
    return new Observable(observer => {
      observer.next(false);
      observer.complete();
    });
  }
}

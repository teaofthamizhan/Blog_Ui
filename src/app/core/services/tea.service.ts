import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tea } from '../models/tea.model';

@Injectable({
  providedIn: 'root'
})
export class TeaService {
  private mockTeas: Tea[] = [
    {
      id: '1',
      name: 'Nilgiri Black Tea',
      description: 'Premium black tea from the misty hills of Nilgiri with a smooth, malty flavor profile.',
      category: 'black',
      price: 450,
      image: 'https://images.unsplash.com/photo-1597318972157-3b911f4af589?w=500&h=500&fit=crop',
      benefits: ['Energy Boost', 'Antioxidants', 'Heart Health'],
      origin: 'Nilgiri Mountains, Tamil Nadu',
      steep_time: '3-5 minutes',
      temperature: '90-95°C',
      featured: true
    },
    {
      id: '2',
      name: 'Jasmine Green Tea',
      description: 'Delicate green tea infused with aromatic jasmine flowers from our heritage gardens.',
      category: 'green',
      price: 550,
      image: 'https://images.unsplash.com/photo-1597318972157-3b911f4af589?w=500&h=500&fit=crop',
      benefits: ['Metabolism', 'Relaxation', 'Brain Health'],
      origin: 'Ooty, Tamil Nadu',
      steep_time: '2-3 minutes',
      temperature: '70-80°C',
      featured: true
    },
    {
      id: '3',
      name: 'Hibiscus Herbal Blend',
      description: 'Vibrant herbal infusion with hibiscus flowers, perfect for cooling summer afternoons.',
      category: 'herbal',
      price: 380,
      image: 'https://images.unsplash.com/photo-1597318972157-3b911f4af589?w=500&h=500&fit=crop',
      benefits: ['Vitamin C', 'Cooling', 'Immunity'],
      origin: 'Coonoor, Tamil Nadu',
      steep_time: '3-4 minutes',
      temperature: '80-90°C',
      featured: true
    },
    {
      id: '4',
      name: 'White Peony Tea',
      description: 'Delicate white tea with subtle floral notes and natural sweetness.',
      category: 'white',
      price: 650,
      image: 'https://images.unsplash.com/photo-1597318972157-3b911f4af589?w=500&h=500&fit=crop',
      benefits: ['Antioxidants', 'Gentle Caffeine', 'Skin Health'],
      origin: 'Kanyakumari District',
      steep_time: '4-5 minutes',
      temperature: '60-70°C',
      featured: false
    },
    {
      id: '5',
      name: 'Oolong Paradise',
      description: 'Semi-oxidized oolong with fruity undertones and smooth finish.',
      category: 'oolong',
      price: 580,
      image: 'https://images.unsplash.com/photo-1597318972157-3b911f4af589?w=500&h=500&fit=crop',
      benefits: ['Fat Burning', 'Mental Clarity', 'Bone Health'],
      origin: 'Tirunelveli, Tamil Nadu',
      steep_time: '3-5 minutes',
      temperature: '80-90°C',
      featured: false
    },
    {
      id: '6',
      name: 'Cardamom Chai Blend',
      description: 'Traditional spiced tea blend with cardamom, cinnamon, and ginger.',
      category: 'black',
      price: 420,
      image: 'https://images.unsplash.com/photo-1597318972157-3b911f4af589?w=500&h=500&fit=crop',
      benefits: ['Digestion', 'Warmth', 'Spice'],
      origin: 'Madurai Region, Tamil Nadu',
      steep_time: '4-6 minutes',
      temperature: '90-95°C',
      featured: false
    }
  ];

  private teasSubject = new BehaviorSubject<Tea[]>(this.mockTeas);

  constructor() {}

  getTeas(): Observable<Tea[]> {
    return this.teasSubject.asObservable();
  }

  getTeaById(id: string): Observable<Tea | undefined> {
    return new Observable(observer => {
      const tea = this.mockTeas.find(t => t.id === id);
      observer.next(tea);
      observer.complete();
    });
  }

  getFeaturedTeas(): Observable<Tea[]> {
    const featured = this.mockTeas.filter(t => t.featured);
    return new Observable(observer => {
      observer.next(featured);
      observer.complete();
    });
  }

  getTeasByCategory(category: string): Observable<Tea[]> {
    const filtered = this.mockTeas.filter(t => t.category === category);
    return new Observable(observer => {
      observer.next(filtered);
      observer.complete();
    });
  }

  addTea(tea: Tea): Observable<Tea> {
    this.mockTeas.push(tea);
    this.teasSubject.next([...this.mockTeas]);
    return new Observable(observer => {
      observer.next(tea);
      observer.complete();
    });
  }

  updateTea(id: string, tea: Partial<Tea>): Observable<Tea | undefined> {
    const index = this.mockTeas.findIndex(t => t.id === id);
    if (index !== -1) {
      this.mockTeas[index] = { ...this.mockTeas[index], ...tea };
      this.teasSubject.next([...this.mockTeas]);
    }
    return new Observable(observer => {
      observer.next(this.mockTeas[index]);
      observer.complete();
    });
  }

  deleteTea(id: string): Observable<boolean> {
    const index = this.mockTeas.findIndex(t => t.id === id);
    if (index !== -1) {
      this.mockTeas.splice(index, 1);
      this.teasSubject.next([...this.mockTeas]);
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

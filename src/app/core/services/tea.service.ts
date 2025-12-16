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
      description: 'A magnificent tea from the legendary Nilgiri hills, cultivated in misty slopes where tradition meets excellence. Each leaf carries the essence of pristine mountain gardens, carefully handpicked and processed to preserve their natural character.',
      aromaProfile: 'Smooth, malty, with hints of cocoa and honey',
      tasteProfile: 'Rich, bold, and rounded with natural sweetness and subtle spice notes',
      category: 'black',
      price: 450,
      image: 'https://images.unsplash.com/photo-1597318972157-3b911f4af589?w=500&h=500&fit=crop',
      benefits: ['Energy Boost', 'Antioxidants', 'Heart Health'],
      origin: 'Nilgiri Mountains, Tamil Nadu - The Queen of Tea Estates',
      bestTime: 'morning',
      culturalReference: 'A beloved choice in Tamil households for morning rituals, symbolizing warmth and togetherness.',
      steep_time: '3-5 minutes',
      temperature: '90-95°C',
      featured: true
    },
    {
      id: '2',
      name: 'Jasmine Green Tea',
      description: 'An exquisite harmony of delicate green tea leaves and fragrant jasmine flowers, hand-scented using traditional methods passed down through generations. This blend represents the poetic soul of Tamil tea culture.',
      aromaProfile: 'Fragrant jasmine with grassy undertones and floral elegance',
      tasteProfile: 'Gentle, slightly sweet with floral complexity and a clean finish',
      category: 'green',
      price: 550,
      image: 'https://images.unsplash.com/photo-1597318972157-3b911f4af589?w=500&h=500&fit=crop',
      benefits: ['Metabolism', 'Relaxation', 'Brain Health'],
      origin: 'Ooty, Tamil Nadu - The Paradise of the South',
      bestTime: 'afternoon',
      culturalReference: 'In Tamil tradition, jasmine symbolizes purity and beauty, making this tea perfect for moments of reflection and peace.',
      steep_time: '2-3 minutes',
      temperature: '70-80°C',
      featured: true
    },
    {
      id: '3',
      name: 'Hibiscus Herbal Blend',
      description: 'A vibrant infusion of crimson hibiscus flowers, nature\'s gift to the weary soul. This caffeine-free blend celebrates Tamil Nadu\'s ancient knowledge of healing plants and their restorative powers.',
      aromaProfile: 'Bright, tart, with subtle tropical and floral notes',
      tasteProfile: 'Refreshingly tart with natural sweetness and a smooth finish',
      category: 'herbal',
      price: 380,
      image: 'https://images.unsplash.com/photo-1597318972157-3b911f4af589?w=500&h=500&fit=crop',
      benefits: ['Vitamin C', 'Cooling', 'Immunity'],
      origin: 'Coonoor, Tamil Nadu - Land of Eternal Spring',
      bestTime: 'evening',
      culturalReference: 'Revered in Tamil Ayurvedic traditions for its cooling properties, this blend honors centuries of ancient wellness wisdom.',
      steep_time: '3-4 minutes',
      temperature: '80-90°C',
      featured: true
    },
    {
      id: '4',
      name: 'White Peony Tea',
      description: 'The most delicate and precious of all teas, White Peony is a masterpiece of minimal processing. Each unfurled leaf is a testament to the craftsmanship and patience of our master tea artisans.',
      aromaProfile: 'Subtle, sweet, with peachy and honeyed undertones',
      tasteProfile: 'Silky smooth with natural sweetness, delicate floral notes, and a lasting fragrance',
      category: 'white',
      price: 650,
      image: 'https://images.unsplash.com/photo-1597318972157-3b911f4af589?w=500&h=500&fit=crop',
      benefits: ['Antioxidants', 'Gentle Caffeine', 'Skin Health'],
      origin: 'Kanyakumari District - South India\'s Crown Jewel',
      bestTime: 'anytime',
      culturalReference: 'In Tamil philosophy, white represents purity and peace. This rare tea is a gift for those seeking moments of serenity.',
      steep_time: '4-5 minutes',
      temperature: '60-70°C',
      featured: false
    },
    {
      id: '5',
      name: 'Oolong Paradise',
      description: 'A semi-oxidized treasure that dances between the worlds of green and black teas. Our Oolong combines the complexity of tradition with the vibrancy of nature, creating a truly transcendent experience.',
      aromaProfile: 'Fruity, floral with notes of stone fruits and orchids',
      tasteProfile: 'Complex, smooth with fruity undertones, slight sweetness, and a mineral finish',
      category: 'oolong',
      price: 580,
      image: 'https://images.unsplash.com/photo-1597318972157-3b911f4af589?w=500&h=500&fit=crop',
      benefits: ['Fat Burning', 'Mental Clarity', 'Bone Health'],
      origin: 'Tirunelveli, Tamil Nadu - Gateway to Tea Paradise',
      bestTime: 'afternoon',
      culturalReference: 'A bridge between ancient wisdom and modern wellness, Oolong embodies the Tamil philosophy of balance and harmony.',
      steep_time: '3-5 minutes',
      temperature: '80-90°C',
      featured: false
    },
    {
      id: '6',
      name: 'Cardamom Chai Blend',
      description: 'The soul of Tamil tradition, this masterfully spiced blend carries the warmth of ancient spice routes and the comfort of generations of shared moments. Every sip tells stories of Tamil hospitality.',
      aromaProfile: 'Warm spices with prominent cardamom, cinnamon, and ginger fragrance',
      tasteProfile: 'Bold, warming with aromatic spice complexity, natural sweetness, and a lingering warmth',
      category: 'black',
      price: 420,
      image: 'https://images.unsplash.com/photo-1597318972157-3b911f4af589?w=500&h=500&fit=crop',
      benefits: ['Digestion', 'Warmth', 'Comfort'],
      origin: 'Madurai Region, Tamil Nadu - The Land of Jasmine and Spice',
      bestTime: 'morning',
      culturalReference: 'Chai is the heartbeat of Tamil households - served during celebrations, shared with loved ones, and brewed with affection.',
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

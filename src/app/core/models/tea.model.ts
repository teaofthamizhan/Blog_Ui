export interface Tea {
  id: number;
  name: string;
  description: string;
  aromaProfile?: string;
  tasteProfile?: string;
  category: 'green' | 'black' | 'herbal' | 'white' | 'oolong';
  price: number;
  image: string;
  benefits: string[];
  origin: string;
  bestTime?: 'morning' | 'afternoon' | 'evening' | 'anytime';
  culturalReference?: string;
  steep_time: string;
  temperature: string;
  active: boolean;
}

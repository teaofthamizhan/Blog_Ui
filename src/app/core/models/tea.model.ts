export interface Tea {
  id: string;
  name: string;
  description: string;
  category: 'green' | 'black' | 'herbal' | 'white' | 'oolong';
  price: number;
  image: string;
  benefits: string[];
  origin: string;
  steep_time: string;
  temperature: string;
  featured: boolean;
}

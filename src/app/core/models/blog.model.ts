export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: Date;
  image: string;
  tags: string[];
  category: string;
  readTime: number;
}

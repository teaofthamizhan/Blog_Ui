export enum BlogStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED'
}

export interface BlogRequestDTO {
  title: string;
  slug: string;
  summary?: string;
  content: string;
  category?: string;
  tags?: string;
  featuredImage?: string;
  status?: BlogStatus;
}

export interface BlogResponseDTO {
  id: number;
  title: string;
  slug: string;
  summary?: string;
  content: string;
  category?: string;
  tags?: string;
  featuredImage?: string;
  status: BlogStatus;
  createdAt: string;
  updatedAt: string;
}

// PagedResponse moved to common.model.ts

// Legacy interface for internal use (can be phased out)
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

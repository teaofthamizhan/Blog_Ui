export interface NewsletterRequestDTO {
  email: string;
}

export interface SubscriberResponseDTO {
  id: number;
  email: string;
  subscribedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

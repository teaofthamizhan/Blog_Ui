export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ContactRequestDTO {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponseDTO {
  id?: number;
  name: string;
  email: string;
  message: string;
  createdAt?: string;
}

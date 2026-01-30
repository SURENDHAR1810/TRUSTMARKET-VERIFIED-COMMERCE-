export enum VerificationStatus {
  IDLE = 'IDLE',
  CONNECTING = 'CONNECTING',
  GENERATING = 'GENERATING',
  REVIEWING = 'REVIEWING',
  APPROVED = 'APPROVED',
  PURCHASED = 'PURCHASED'
}

export type ViewState = 'SPLASH' | 'LOGIN' | 'HOME' | 'PRODUCT_DETAIL' | 'CHECKOUT' | 'DASHBOARD' | 'USER_PROFILE' | 'CUSTOMER_CARE';

export interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface HistoricalVideo {
  id: string;
  thumbnail: string;
  date: string;
  productName: string;
  duration: string;
}

export interface Seller {
  id: string;
  name: string;
  verified: boolean;
  joinedDate: string;
  rating: number;
  completedVerifications: number;
  trustHistory: { date: string; score: number }[];
  historicalVideos: HistoricalVideo[];
}

export interface Product {
  id: string;
  name: string;
  description: string;
  features: string[];
  price: number;
  category: 'Electronics' | 'Fashion' | 'Home' | 'Accessories' | 'Beauty' | 'Sports' | 'Automotive';
  imageUrl: string;
  images: string[];
  staticVideoUrl: string; // New: Standard product video
  seller: Seller;
  reviews: Review[];
}
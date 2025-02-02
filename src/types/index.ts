export interface Step {
  id: string;
  title: string;
  description: string;
  isOnline: boolean;
  officialLink?: string;
  documents?: Document[];
  children?: Step[];
}

export interface Document {
  id: string;
  title: string;
  url: string;
  type: 'form' | 'guide' | 'official';
}

export interface Expert {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  pricePerMinute: number;
  availability: boolean;
  nextAvailableSlot?: Date;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  walletBalance: number;
  bookmarks: string[];
  subscription?: 'free' | 'premium' | 'enterprise';
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot' | 'expert';
  timestamp: Date;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  isPopular?: boolean;
}
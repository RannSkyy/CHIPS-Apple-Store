/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  price: number; // in KD
  originalPrice?: number; // in KD
  discountPercent?: number; // e.g., 15
  imageUrl: string;
  category: string;
  brand: string;
  badge?: "New Arrival" | "Best Seller" | "Hot Pick" | null;
  colors?: string[]; // hex codes for display
  rating?: number;
  modelFamily?: string; // e.g., "iPhone 15", "iPhone 14", "iPhone 13", "iPhone 12", "iPhone 11", "iPhone X", "iPhone 8", "iPhone 7"
}

export interface Category {
  id: string;
  name: string;
  name_id: string; // Indonesian Translation
  iconName: string; // Lucide icon key
  count?: number;
}

export interface Brand {
  id: string;
  name: string;
  logoUrl?: string;
  badgeCount?: number;
}

export interface Store {
  id: string;
  name: string;
  name_id?: string;
  address: string;
  address_id?: string;
  city: string;
  phone: string;
  hours: string;
  imageUrl: string;
  mapEmbedUrl?: string;
  lat: number;
  lng: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatarUrl: string;
}

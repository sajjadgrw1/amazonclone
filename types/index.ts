// Shared domain types for the Nuvara marketplace prototype.
// Referenced by CLAUDE.md "Data models" — mock data and components should
// consume these types rather than inlining ad-hoc shapes.

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  imageUrl?: string;
}

export interface ProductVariant {
  id: string;
  label: string; // e.g. "Color: Black / Size: M"
  priceOverride?: number;
  imageUrl?: string;
  inStock: boolean;
}

export interface Review {
  id: string;
  productId: string;
  authorName: string;
  rating: number; // 1-5
  title?: string;
  body: string;
  createdAt: string; // ISO timestamp
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  brand?: string;
  categoryId: string;
  images: string[];
  price: number;
  compareAtPrice?: number;
  currency: string; // ISO 4217, e.g. "USD"
  rating: number; // average, 0-5
  reviewCount: number;
  description: string;
  specifications?: Record<string, string>;
  variants?: ProductVariant[];
  inStock: boolean;
  deliveryEstimate?: string;
  tags?: string[];
}

export interface CartItem {
  productId: string;
  variantId?: string;
  quantity: number;
  savedForLater: boolean;
}

export interface WishlistItem {
  productId: string;
  addedAt: string; // ISO timestamp
}

export interface Address {
  id: string;
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
  isDefault?: boolean;
}

export type PaymentMethodType = "mock-card" | "mock-wallet" | "cash-on-delivery";

export interface PaymentMethod {
  id: string;
  type: PaymentMethodType;
  label: string; // e.g. "Mock Visa ending in 4242"
  isDefault?: boolean;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "returned";

export interface OrderItem {
  productId: string;
  variantId?: string;
  title: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  status: OrderStatus;
  placedAt: string; // ISO timestamp
  subtotal: number;
  discount: number;
  tax: number;
  deliveryFee: number;
  total: number;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
}

export type CouponType = "percentage" | "fixed";

export interface Coupon {
  id: string;
  code: string;
  type: CouponType;
  value: number;
  expiresAt: string; // ISO timestamp
  eligibleProductIds?: string[];
  eligibleCategoryIds?: string[];
  clipped?: boolean;
}

export type DealStatus = "active" | "upcoming" | "expired" | "sold-out";

export interface Deal {
  id: string;
  productId: string;
  discountPercent: number;
  startAt: string; // ISO timestamp
  endAt: string; // ISO timestamp
  claimedPercent: number; // 0-100
  status: DealStatus;
  isLightningDeal?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  addresses: Address[];
  defaultPaymentMethodId?: string;
}

export type ListPrivacy = "private" | "shared";

export interface ProductList {
  id: string;
  name: string;
  privacy: ListPrivacy;
  productIds: string[];
  createdAt: string;
}

export interface Registry {
  id: string;
  occasion: string;
  ownerName: string;
  eventDate?: string;
  productIds: string[];
  createdAt: string;
}

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  children?: NavigationItem[];
}

export interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Internship";
  postedAt: string; // ISO timestamp
  description: string;
}

export interface PressRelease {
  id: string;
  slug: string;
  title: string;
  publishedAt: string; // ISO timestamp
  category: string;
  excerpt: string;
  body: string;
}

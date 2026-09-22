import type { Category } from "@/types";

export const categories: Category[] = [
  { id: "electronics", name: "Electronics", slug: "electronics" },
  { id: "home-kitchen", name: "Home & Kitchen", slug: "home-kitchen" },
  { id: "fashion", name: "Fashion", slug: "fashion" },
  { id: "beauty", name: "Beauty & Personal Care", slug: "beauty" },
  { id: "sports-outdoors", name: "Sports & Outdoors", slug: "sports-outdoors" },
  { id: "books", name: "Books", slug: "books" },
  { id: "toys-games", name: "Toys & Games", slug: "toys-games" },
  { id: "grocery", name: "Grocery", slug: "grocery" },
  { id: "automotive", name: "Automotive", slug: "automotive" },
  { id: "pet-supplies", name: "Pet Supplies", slug: "pet-supplies" },
];

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

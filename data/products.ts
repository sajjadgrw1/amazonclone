import type { Product } from "@/types";

interface ProductSeed {
  id: string;
  title: string;
  brand: string;
  categoryId: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  deliveryEstimate?: string;
  tags?: string[];
  hasVariants?: boolean;
}

function image(seed: string, w = 600, h = 600) {
  return `https://picsum.photos/seed/${seed}/${w}/${h}`;
}

const seeds: ProductSeed[] = [
  // Electronics
  { id: "voltix-wireless-headphones", title: "Voltix Over-Ear Wireless Headphones", brand: "Voltix", categoryId: "electronics", price: 79.99, compareAtPrice: 119.99, rating: 4.4, reviewCount: 2183, inStock: true, deliveryEstimate: "Arrives in 2 days", tags: ["bestseller"], hasVariants: true },
  { id: "voltix-smartwatch-se", title: "Voltix Smartwatch SE, Fitness & Sleep Tracking", brand: "Voltix", categoryId: "electronics", price: 129.0, compareAtPrice: 159.0, rating: 4.2, reviewCount: 984, inStock: true, deliveryEstimate: "Arrives tomorrow", hasVariants: true },
  { id: "brightline-27-monitor", title: "Brightline 27\" QHD Monitor, 100Hz", brand: "Brightline", categoryId: "electronics", price: 189.99, rating: 4.6, reviewCount: 512, inStock: true, deliveryEstimate: "Arrives in 3 days" },
  { id: "portaflow-power-bank", title: "Portaflow 20,000mAh Fast-Charge Power Bank", brand: "Portaflow", categoryId: "electronics", price: 34.5, compareAtPrice: 45.0, rating: 4.3, reviewCount: 3390, inStock: true, tags: ["bestseller"] },

  // Home & Kitchen
  { id: "hearthlane-stand-mixer", title: "Hearthlane Stand Mixer, 6-Quart", brand: "Hearthlane", categoryId: "home-kitchen", price: 219.99, compareAtPrice: 279.99, rating: 4.7, reviewCount: 1420, inStock: true, deliveryEstimate: "Arrives in 2 days", hasVariants: true },
  { id: "hearthlane-air-fryer", title: "Hearthlane 6-Quart Digital Air Fryer", brand: "Hearthlane", categoryId: "home-kitchen", price: 69.99, compareAtPrice: 99.99, rating: 4.5, reviewCount: 5210, inStock: true, tags: ["bestseller"] },
  { id: "linenwood-sheet-set", title: "Linenwood Brushed Microfiber Sheet Set, Queen", brand: "Linenwood", categoryId: "home-kitchen", price: 28.99, rating: 4.4, reviewCount: 8890, inStock: true, hasVariants: true },
  { id: "cozynest-throw-blanket", title: "Cozynest Sherpa Throw Blanket", brand: "Cozynest", categoryId: "home-kitchen", price: 22.0, rating: 4.6, reviewCount: 2640, inStock: false },

  // Fashion
  { id: "northfield-mens-jacket", title: "Northfield Men's Water-Resistant Jacket", brand: "Northfield", categoryId: "fashion", price: 59.99, compareAtPrice: 89.99, rating: 4.3, reviewCount: 761, inStock: true, hasVariants: true },
  { id: "aurelia-womens-dress", title: "Aurelia Women's Midi Wrap Dress", brand: "Aurelia", categoryId: "fashion", price: 44.0, rating: 4.1, reviewCount: 398, inStock: true, hasVariants: true },
  { id: "strideline-running-shoes", title: "Strideline Men's Running Shoes", brand: "Strideline", categoryId: "fashion", price: 54.99, compareAtPrice: 74.99, rating: 4.5, reviewCount: 2977, inStock: true, tags: ["bestseller"], hasVariants: true },
  { id: "northfield-canvas-backpack", title: "Northfield Canvas Everyday Backpack", brand: "Northfield", categoryId: "fashion", price: 38.5, rating: 4.4, reviewCount: 1105, inStock: true },

  // Beauty
  { id: "aurelia-vitamin-c-serum", title: "Aurelia Vitamin C Brightening Serum", brand: "Aurelia", categoryId: "beauty", price: 18.99, compareAtPrice: 24.99, rating: 4.3, reviewCount: 4460, inStock: true, tags: ["bestseller"] },
  { id: "purelume-shampoo-set", title: "Purelume Sulfate-Free Shampoo & Conditioner Set", brand: "Purelume", categoryId: "beauty", price: 21.5, rating: 4.2, reviewCount: 1876, inStock: true },
  { id: "purelume-electric-toothbrush", title: "Purelume Rechargeable Electric Toothbrush", brand: "Purelume", categoryId: "beauty", price: 32.0, compareAtPrice: 49.99, rating: 4.5, reviewCount: 3021, inStock: true },

  // Sports & Outdoors
  { id: "trailhead-yoga-mat", title: "Trailhead Extra-Thick Yoga Mat", brand: "Trailhead", categoryId: "sports-outdoors", price: 24.99, rating: 4.6, reviewCount: 6120, inStock: true },
  { id: "trailhead-camping-tent", title: "Trailhead 4-Person Dome Camping Tent", brand: "Trailhead", categoryId: "sports-outdoors", price: 89.0, compareAtPrice: 119.0, rating: 4.4, reviewCount: 843, inStock: true },
  { id: "trailhead-insulated-bottle", title: "Trailhead Insulated Steel Water Bottle, 32oz", brand: "Trailhead", categoryId: "sports-outdoors", price: 16.99, rating: 4.7, reviewCount: 9930, inStock: true, tags: ["bestseller"], hasVariants: true },

  // Books
  { id: "bookhaven-midnight-orchard", title: "The Midnight Orchard: A Novel", brand: "Bookhaven Press", categoryId: "books", price: 12.99, rating: 4.5, reviewCount: 1240, inStock: true },
  { id: "bookhaven-focus-habit", title: "The Focus Habit: A Practical Guide", brand: "Bookhaven Press", categoryId: "books", price: 14.99, compareAtPrice: 19.99, rating: 4.3, reviewCount: 782, inStock: true },
  { id: "bookhaven-kids-atlas", title: "Wonders of the World: A Kids' Atlas", brand: "Bookhaven Press", categoryId: "books", price: 17.5, rating: 4.8, reviewCount: 465, inStock: true },

  // Toys & Games
  { id: "playtown-building-blocks", title: "Playtown 500-Piece Building Block Set", brand: "Playtown", categoryId: "toys-games", price: 29.99, compareAtPrice: 39.99, rating: 4.7, reviewCount: 2210, inStock: true, tags: ["bestseller"] },
  { id: "playtown-board-game-night", title: "Playtown Family Game Night Bundle", brand: "Playtown", categoryId: "toys-games", price: 24.0, rating: 4.4, reviewCount: 690, inStock: true },
  { id: "playtown-remote-car", title: "Playtown Off-Road Remote Control Car", brand: "Playtown", categoryId: "toys-games", price: 42.99, rating: 4.2, reviewCount: 355, inStock: false },

  // Grocery
  { id: "farmstead-coffee-beans", title: "Farmstead Single-Origin Coffee Beans, 2lb", brand: "Farmstead", categoryId: "grocery", price: 15.99, rating: 4.6, reviewCount: 3110, inStock: true, hasVariants: true },
  { id: "farmstead-trail-mix", title: "Farmstead Protein Trail Mix, 6-Pack", brand: "Farmstead", categoryId: "grocery", price: 13.49, rating: 4.3, reviewCount: 890, inStock: true },
  { id: "farmstead-olive-oil", title: "Farmstead Cold-Pressed Extra Virgin Olive Oil, 1L", brand: "Farmstead", categoryId: "grocery", price: 11.99, compareAtPrice: 15.99, rating: 4.5, reviewCount: 1420, inStock: true },

  // Automotive
  { id: "roadwise-dash-cam", title: "Roadwise 4K Dash Camera with Night Vision", brand: "Roadwise", categoryId: "automotive", price: 64.99, compareAtPrice: 89.99, rating: 4.3, reviewCount: 1290, inStock: true, tags: ["bestseller"] },
  { id: "roadwise-car-vacuum", title: "Roadwise Portable Car Vacuum Cleaner", brand: "Roadwise", categoryId: "automotive", price: 27.99, rating: 4.1, reviewCount: 645, inStock: true },
  { id: "roadwise-phone-mount", title: "Roadwise Magnetic Phone Mount", brand: "Roadwise", categoryId: "automotive", price: 12.99, rating: 4.4, reviewCount: 2980, inStock: true },

  // Pet Supplies
  { id: "pawshire-dog-bed", title: "Pawshire Orthopedic Dog Bed, Large", brand: "Pawshire", categoryId: "pet-supplies", price: 39.99, compareAtPrice: 54.99, rating: 4.6, reviewCount: 1770, inStock: true, hasVariants: true },
  { id: "pawshire-cat-tree", title: "Pawshire Multi-Level Cat Tree", brand: "Pawshire", categoryId: "pet-supplies", price: 58.0, rating: 4.5, reviewCount: 940, inStock: true },
  { id: "pawshire-dog-treats", title: "Pawshire Grain-Free Dog Treats, 3-Pack", brand: "Pawshire", categoryId: "pet-supplies", price: 16.49, rating: 4.7, reviewCount: 2510, inStock: true, tags: ["bestseller"] },
];

export const products: Product[] = seeds.map((seed) => {
  const images = [image(seed.id, 700, 700), image(`${seed.id}-2`, 700, 700), image(`${seed.id}-3`, 700, 700)];

  return {
    id: seed.id,
    slug: seed.id,
    title: seed.title,
    brand: seed.brand,
    categoryId: seed.categoryId,
    images,
    price: seed.price,
    compareAtPrice: seed.compareAtPrice,
    currency: "USD",
    rating: seed.rating,
    reviewCount: seed.reviewCount,
    description: `${seed.title} from ${seed.brand}. Designed for everyday reliability with a focus on quality materials and consistent performance. This listing uses mock demo content for the Nuvara prototype.`,
    specifications: {
      Brand: seed.brand,
      Model: seed.id,
      "Item weight": "1.2 lb",
      "Country of origin": "Imported",
    },
    variants: seed.hasVariants
      ? [
          { id: `${seed.id}-default`, label: "Standard", inStock: seed.inStock },
          { id: `${seed.id}-alt`, label: "Alternate", priceOverride: +(seed.price + 5).toFixed(2), inStock: seed.inStock },
        ]
      : undefined,
    inStock: seed.inStock,
    deliveryEstimate: seed.deliveryEstimate ?? "Arrives in 4-6 days",
    tags: seed.tags,
  };
});

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId);
}

export function getRelatedProducts(product: Product, limit = 6): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, limit);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q) ||
      p.categoryId.toLowerCase().includes(q)
  );
}

export type SortOption = "relevance" | "price-asc" | "price-desc" | "rating" | "newest";

export interface SearchFilters {
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  brands?: string[];
  inStockOnly?: boolean;
  sort?: SortOption;
}

export function getAvailableBrands(list: Product[]): string[] {
  return Array.from(new Set(list.map((p) => p.brand).filter((b): b is string => !!b))).sort();
}

export function filterAndSortProducts(filters: SearchFilters): Product[] {
  let result = filters.q ? searchProducts(filters.q) : [...products];

  if (filters.category) {
    result = result.filter((p) => p.categoryId === filters.category);
  }
  if (typeof filters.minPrice === "number") {
    result = result.filter((p) => p.price >= (filters.minPrice as number));
  }
  if (typeof filters.maxPrice === "number") {
    result = result.filter((p) => p.price <= (filters.maxPrice as number));
  }
  if (typeof filters.rating === "number") {
    result = result.filter((p) => p.rating >= (filters.rating as number));
  }
  if (filters.brands && filters.brands.length > 0) {
    result = result.filter((p) => p.brand && filters.brands!.includes(p.brand));
  }
  if (filters.inStockOnly) {
    result = result.filter((p) => p.inStock);
  }

  switch (filters.sort) {
    case "price-asc":
      result = [...result].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result = [...result].sort((a, b) => b.price - a.price);
      break;
    case "rating":
      result = [...result].sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      result = [...result].sort((a, b) => (a.id < b.id ? 1 : -1));
      break;
    default:
      break; // relevance: keep search/filter order
  }

  return result;
}

import type { NavigationItem } from "@/types";
import { categories } from "@/data/categories";

export const primaryNavigation: NavigationItem[] = [
  {
    id: "all-categories",
    label: "All",
    href: "/categories",
    children: categories.map((c) => ({
      id: c.id,
      label: c.name,
      href: `/search?category=${c.slug}`,
    })),
  },
  { id: "deals", label: "Today's Deals", href: "/deals/todays-deals" },
  { id: "lightning-deals", label: "Lightning Deals", href: "/deals/lightning-deals" },
  { id: "coupons", label: "Coupons", href: "/coupons" },
  { id: "gift-cards", label: "Gift Cards", href: "/gift-cards" },
  { id: "sell", label: "Sell", href: "/sell" },
  { id: "prime", label: "Nuvara+", href: "/prime" },
];

export const footerColumns: { title: string; items: NavigationItem[] }[] = [
  {
    title: "Get to Know Us",
    items: [
      { id: "about", label: "About Nuvara", href: "/help" },
      { id: "careers", label: "Careers", href: "/help" },
      { id: "sell-landing", label: "Sell on Nuvara", href: "/sell" },
    ],
  },
  {
    title: "Customer Service",
    items: [
      { id: "help", label: "Help", href: "/help" },
      { id: "customer-service", label: "Customer Service", href: "/customer-service" },
      { id: "orders", label: "Your Orders", href: "/orders" },
      { id: "returns", label: "Returns & Refunds", href: "/customer-service" },
    ],
  },
  {
    title: "Shop & Save",
    items: [
      { id: "gift-cards-footer", label: "Gift Cards", href: "/gift-cards" },
      { id: "coupons-footer", label: "Coupons", href: "/coupons" },
      { id: "deals-footer", label: "Today's Deals", href: "/deals/todays-deals" },
      { id: "prime-footer", label: "Nuvara+ Membership", href: "/prime" },
    ],
  },
  {
    title: "Let Us Help You",
    items: [
      { id: "account", label: "Your Account", href: "/account" },
      { id: "lists", label: "Your Lists", href: "/lists" },
      { id: "registry", label: "Registry", href: "/registry" },
      { id: "wishlist-footer", label: "Wishlist", href: "/wishlist" },
    ],
  },
];

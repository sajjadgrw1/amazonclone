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
    title: "Make Money with Us",
    items: [
      { id: "sell-footer", label: "Sell products", href: "/sell" },
      { id: "sell-register-footer", label: "Become an affiliate", href: "/sell/register" },
      { id: "sell-pricing-footer", label: "Advertise", href: "/sell/pricing" },
    ],
  },
  {
    title: "Payment Products",
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
      { id: "orders-footer", label: "Your Orders", href: "/orders" },
      { id: "help-footer", label: "Help", href: "/help" },
      { id: "returns-footer", label: "Returns", href: "/customer-service" },
      { id: "lists-footer", label: "Your Lists", href: "/lists" },
    ],
  },
];

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
      { id: "careers", label: "Careers", href: "/careers" },
      { id: "newsletter", label: "Nuvara Newsletter", href: "/newsletter" },
      { id: "about", label: "About Nuvara", href: "/about" },
      { id: "accessibility", label: "Accessibility", href: "/accessibility" },
      { id: "sustainability", label: "Sustainability", href: "/sustainability" },
      { id: "press", label: "Press Center", href: "/press" },
      { id: "investor-relations", label: "Investor Relations", href: "/investor-relations" },
    ],
  },
  {
    title: "Make Money with Us",
    items: [
      { id: "sell-landing", label: "Sell on Nuvara", href: "/sell" },
      { id: "sell-register-footer", label: "Become an Affiliate", href: "/sell/register" },
      { id: "supply", label: "Supply to Nuvara", href: "/sell" },
      { id: "protect-brand", label: "Protect & Build Your Brand", href: "/sell" },
      { id: "delivery-driver", label: "Become a Delivery Driver", href: "/help" },
      { id: "advertise", label: "Advertise Your Products", href: "/sell/pricing" },
    ],
  },
  {
    title: "Nuvara Payment Products",
    items: [
      { id: "nuvara-card", label: "Nuvara Store Card", href: "/help" },
      { id: "shop-points", label: "Shop with Points", href: "/help" },
      { id: "reload-balance", label: "Reload Your Balance", href: "/help" },
      { id: "gift-cards-footer", label: "Gift Cards", href: "/gift-cards" },
      { id: "currency-converter", label: "Currency Converter", href: "/help" },
    ],
  },
  {
    title: "Let Us Help You",
    items: [
      { id: "account", label: "Your Account", href: "/account" },
      { id: "orders-footer", label: "Your Orders", href: "/orders" },
      { id: "shipping", label: "Shipping Rates & Policies", href: "/help" },
      { id: "prime-footer", label: "Nuvara+", href: "/prime" },
      { id: "returns-footer", label: "Returns & Replacements", href: "/customer-service" },
      { id: "recalls", label: "Recalls and Product Safety Alerts", href: "/help" },
      { id: "lists-footer", label: "Your Lists", href: "/lists" },
      { id: "help-footer", label: "Customer Service", href: "/help" },
    ],
  },
];

"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent, type SyntheticEvent } from "react";
import Link from "next/link";
import { ChevronLeft, CreditCard, Package, Search, Sparkles, Truck, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

const sidebarTopics = [
  { label: "Shipping and Delivery", href: "/help/shipping", active: true },
  { label: "Returns and Refunds", href: "/customer-service" },
  { label: "Payment, Pricing and Promotions", href: "/help?topic=Account+%26+Payment" },
  { label: "Security and Privacy", href: "/account#security" },
  { label: "Ordering", href: "/help?topic=Orders" },
  { label: "Managing Your Account", href: "/account" },
  { label: "Gifts, Gift Cards and Registries", href: "/gift-cards" },
  { label: "Site Features", href: "/help" },
  { label: "Nuvara Global Store", href: "/categories" },
  { label: "Nuvara Business Help", href: "/help" },
  { label: "Digital Services and Device Support", href: "/help" },
  { label: "Author, Publisher and Vendor Guides", href: "/sell" },
];

const quickSolutions = [
  { icon: Package, title: "Your Orders", body: "Track or cancel orders", href: "/orders" },
  { icon: Undo2, title: "Returns & Refunds", body: "Exchange or return items", href: "/customer-service" },
  { icon: Sparkles, title: "Manage Nuvara+", body: "Cancel or view benefits", href: "/prime" },
  { icon: CreditCard, title: "Payment Settings", body: "Add or edit payment methods", href: "/account#payment" },
  { icon: Truck, title: "Carrier Info", body: "Shipping rates and delivery times", href: "#shipping-rates" },
];

const topics = [
  {
    id: "missing-package",
    title: "Find a Missing Package That Shows as Delivered",
    body: "Check nearby delivery spots first — packages are sometimes left with a neighbor or building manager. If it's still missing 48 hours after the delivered status, contact Customer Service to file a mock investigation.",
  },
  {
    id: "late-deliveries",
    title: "Late Deliveries",
    body: "Delivery estimates shown at checkout are based on mock carrier data and can shift due to demand or weather. Track your package from Your Orders for the latest estimated date.",
  },
  {
    id: "missing-item",
    title: "Find a Missing Item from Your Package",
    body: "Multi-item orders sometimes ship in separate mock packages. Check Your Orders to see if an item is still in transit before reporting it missing.",
  },
  {
    id: "undeliverable",
    title: "Undeliverable Packages",
    body: "A package can be marked undeliverable if the mock address is incomplete or access was restricted. It will be rerouted to the nearest fulfillment center and a redelivery will be scheduled automatically.",
  },
  {
    id: "delivery-guarantees",
    title: "Delivery Guarantees",
    body: "Standard mock delivery estimates are 4-6 business days. Nuvara+ members get mock free 2-day delivery on eligible items, shown on the product page before you buy.",
  },
  {
    id: "ships-with-other-items",
    title: "Ships with Other Items in the Cart",
    body: "Items from different mock sellers or warehouses may arrive in separate packages, even when ordered together. Each shipment gets its own tracking link in Your Orders.",
  },
  {
    id: "general-shipping-info",
    title: "General Shipping Information",
    body: "Nuvara ships to mock addresses across the regions listed at checkout. Delivery fees, when they apply, are calculated from your cart weight and destination and shown before you place an order.",
  },
  {
    id: "shipping-times",
    title: "Shipping Times to the Contiguous U.S.",
    body: "Standard mock shipping typically takes 4-6 business days. Faster mock options (2-day, next-day) are offered at checkout where available, at an additional cost unless you're a Nuvara+ member.",
  },
  {
    id: "shipping-rates",
    title: "Shipping Rates and Times",
    body: "Shipping is mock-free on eligible orders over $35, or free on all eligible items for Nuvara+ members. Rates for faster delivery speeds are calculated at checkout based on your order.",
  },
];

export default function ShippingHelpPage() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  function openTopic(id: string) {
    setOpenIds((prev) => new Set(prev).add(id));
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function handleToggle(id: string, e: SyntheticEvent<HTMLDetailsElement>) {
    const isOpen = e.currentTarget.open;
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (isOpen) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  function handleSearchSubmit(e: FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/help?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6">
      <h1 className="mb-6 text-3xl font-bold text-text">Help &amp; Customer Service</h1>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <aside className="w-full shrink-0 lg:w-64">
          <Link href="/help" className="flex items-center gap-1 pb-3 text-sm font-medium text-link hover:text-link-hover">
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            All Help Topics
          </Link>
          <nav aria-label="Help topics" className="flex flex-col divide-y divide-border rounded-lg border border-border bg-surface">
            {sidebarTopics.map((t) => (
              <Link
                key={t.label}
                href={t.href}
                aria-current={t.active ? "page" : undefined}
                className={`px-4 py-2.5 text-sm hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-inset ${t.active ? "font-bold text-text" : "text-link hover:text-link-hover"}`}
              >
                {t.label}
              </Link>
            ))}
          </nav>

          <h2 className="mb-3 mt-8 text-lg font-semibold text-text">Quick solutions</h2>
          <div className="flex flex-col gap-3">
            {quickSolutions.map((qs) => (
              <Link
                key={qs.title}
                href={qs.href}
                className="flex items-center gap-3 rounded-md p-2 hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-link/10 text-link">
                  <qs.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-medium text-text">{qs.title}</span>
                  <span className="block text-xs text-muted">{qs.body}</span>
                </span>
              </Link>
            ))}
          </div>
        </aside>

        <div className="min-w-0 flex-1">
          <h2 className="text-xl font-bold text-text">Find more solutions</h2>
          <p className="mb-2 mt-4 font-semibold text-text">Search our help content</p>
          <form onSubmit={handleSearchSubmit} className="relative max-w-xl">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              aria-label="Search our help content"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search our help content"
              className="h-11 w-full rounded-md border border-border bg-surface pl-9 pr-3 text-sm text-text placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            />
          </form>

          <h1 className="mb-2 mt-10 text-3xl font-bold text-text">Shipping and Delivery</h1>
          <p className="max-w-2xl text-muted">
            Learn how to check the status of your order and find more information about late deliveries or
            undeliverable orders. This is a UX prototype — all shipping data below is mock.
          </p>

          <div className="mt-6 max-w-2xl rounded-lg border border-border bg-background p-6 text-center">
            <p className="text-text">
              Want to check the status of your order? Go to Your Orders to find tracking information and order
              details.
            </p>
            <Link href="/orders" className="mt-4 inline-block">
              <Button type="button" className="rounded-full bg-primary text-header-dark hover:bg-primary-hover">
                Your Orders
              </Button>
            </Link>
          </div>

          <TopicRow
            label="Popular Topics"
            items={[
              { title: "Find a Missing Package That Shows as Delivered", onClick: () => openTopic("missing-package") },
              { title: "Late Deliveries", onClick: () => openTopic("late-deliveries") },
              { title: "Find a Missing Item from Your Package", onClick: () => openTopic("missing-item") },
              { title: "Determine Shipping Rates and Times", onClick: () => openTopic("shipping-rates") },
              { title: "Returns and Refunds", href: "/customer-service" },
            ]}
          />

          <TopicRow
            label="Where's My Stuff?"
            items={[
              { title: "Undeliverable Packages", onClick: () => openTopic("undeliverable") },
              { title: "Track your Package", href: "/orders" },
            ]}
          />

          <TopicRow
            label="Shipping Policy for Nuvara+"
            items={[
              { title: "Order with Nuvara+ free same-day delivery", href: "/prime" },
              { title: "Nuvara+ Shipping Benefits", href: "/prime" },
            ]}
          />

          <TopicRow
            label="General Shipping Policies"
            items={[
              { title: "Delivery Guarantees", onClick: () => openTopic("delivery-guarantees") },
              { title: "Ships with Other Items in the Cart", onClick: () => openTopic("ships-with-other-items") },
              { title: "General Shipping Information", onClick: () => openTopic("general-shipping-info") },
            ]}
          />

          <TopicRow
            label="Shipping Rates and Times"
            items={[
              { title: "Shipping Times to the Contiguous U.S.", onClick: () => openTopic("shipping-times") },
              { title: "Shipping Rates and Times", onClick: () => openTopic("shipping-rates") },
            ]}
          />

          <div className="mt-10 flex flex-col divide-y divide-border rounded-lg border border-border bg-surface">
            {topics.map((topic) => (
              <details
                key={topic.id}
                id={topic.id}
                open={openIds.has(topic.id)}
                onToggle={(e) => handleToggle(topic.id, e)}
                className="scroll-mt-4 p-4"
              >
                <summary className="cursor-pointer text-sm font-semibold text-text">{topic.title}</summary>
                <p className="mt-2 text-sm text-muted">{topic.body}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TopicRow({
  label,
  items,
}: {
  label: string;
  items: { title: string; href?: string; onClick?: () => void }[];
}) {
  return (
    <div className="mt-8 flex max-w-3xl flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:gap-8">
      <p className="w-full shrink-0 font-semibold text-text sm:w-56">{label}</p>
      <ul className="flex flex-col gap-2">
        {items.map((item) =>
          item.href ? (
            <li key={item.title}>
              <Link href={item.href} className="text-sm text-link underline hover:text-link-hover">
                {item.title}
              </Link>
            </li>
          ) : (
            <li key={item.title}>
              <button type="button" onClick={item.onClick} className="text-left text-sm text-link underline hover:text-link-hover">
                {item.title}
              </button>
            </li>
          )
        )}
      </ul>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

const occasions = ["Birthday", "Thank You", "Congratulations", "Just Because", "Holiday", "Wedding"];

const faqs = [
  { q: "How do I redeem a gift card?", a: "Go to Redeem a Gift Card and enter your mock claim code — balance is applied to your Nuvara account instantly (demo only)." },
  { q: "Do gift cards expire?", a: "No — in this prototype, mock gift card balances never expire." },
  { q: "Can I send a digital gift card by email?", a: "Yes, choose the digital option on the purchase page and enter a recipient email (mock delivery, no email is actually sent)." },
];

export default function GiftCardsLandingPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-4 py-6">
      <h1 className="text-2xl font-semibold text-text">Gift Cards</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted">
        Nuvara Gift Cards are a mock demo feature — no real monetary value is ever exchanged.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-md bg-secondary">
            <Image src="https://picsum.photos/seed/giftcard-digital/500/300" alt="" fill className="object-cover opacity-60" />
            <p className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white">Digital Gift Card</p>
          </div>
          <p className="text-sm text-muted">Delivered by mock email, ready to use immediately.</p>
          <Link href="/gift-cards/buy?type=digital">
            <Button type="button">Buy a digital gift card</Button>
          </Link>
        </div>
        <div className="flex flex-col gap-3 rounded-lg border border-border bg-surface p-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-md bg-primary">
            <Image src="https://picsum.photos/seed/giftcard-physical/500/300" alt="" fill className="object-cover opacity-60" />
            <p className="absolute inset-0 flex items-center justify-center text-lg font-semibold text-white">Physical Gift Card</p>
          </div>
          <p className="text-sm text-muted">A mock printable card you can present in person.</p>
          <Link href="/gift-cards/buy?type=physical">
            <Button type="button">Buy a physical gift card</Button>
          </Link>
        </div>
      </div>

      <h2 className="mb-3 mt-8 text-lg font-semibold text-text">Shop by occasion</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {occasions.map((occasion) => (
          <Link
            key={occasion}
            href={`/gift-cards/buy?occasion=${encodeURIComponent(occasion)}`}
            className="flex items-center justify-center rounded-lg border border-border bg-surface p-4 text-center text-sm font-medium text-text hover:shadow-md"
          >
            {occasion}
          </Link>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/gift-cards/redeem">
          <Button type="button" variant="outline">Redeem a gift card</Button>
        </Link>
        <Link href="/gift-cards/balance">
          <Button type="button" variant="outline">Check gift card balance</Button>
        </Link>
      </div>

      <h2 className="mb-3 mt-10 text-lg font-semibold text-text">Frequently asked questions</h2>
      <div className="flex flex-col divide-y divide-border rounded-lg border border-border bg-surface">
        {faqs.map((faq) => (
          <details key={faq.q} className="group p-4">
            <summary className="cursor-pointer text-sm font-medium text-text">{faq.q}</summary>
            <p className="mt-2 text-sm text-muted">{faq.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

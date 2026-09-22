"use client";

import { useState, type FormEvent } from "react";
import { Keyboard, Eye, MousePointerClick, Volume2 } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const commitments = [
  { icon: Keyboard, title: "Keyboard navigation", body: "Every menu, modal, and carousel can be operated with a keyboard alone." },
  { icon: Eye, title: "Visible focus", body: "Interactive elements show a clear focus ring so keyboard users always know where they are." },
  { icon: MousePointerClick, title: "Large touch targets", body: "Buttons and links keep at least a 44x44px hit area across the site." },
  { icon: Volume2, title: "Screen reader support", body: "Semantic HTML, labelled controls, and alt text describe every meaningful element." },
];

export default function AccessibilityPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors: { email?: string; message?: string } = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (!message.trim()) nextErrors.message = "Describe the issue you ran into.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  }

  return (
    <div className="mx-auto max-w-[900px] px-4 py-6">
      <PageHero
        title="Accessibility at Nuvara"
        subtitle="This prototype aims to follow WCAG-inspired practices throughout. Tell us where we fall short."
      />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {commitments.map((c) => (
          <div key={c.title} className="flex flex-col gap-2 rounded-lg border border-border bg-surface p-4">
            <c.icon className="h-6 w-6 text-primary" aria-hidden="true" />
            <p className="font-semibold text-text">{c.title}</p>
            <p className="text-sm text-muted">{c.body}</p>
          </div>
        ))}
      </div>

      <h2 className="mb-3 mt-10 text-lg font-semibold text-text">Report an accessibility issue</h2>
      <div className="rounded-lg border border-border bg-surface p-6">
        {submitted ? (
          <p className="text-sm text-text">
            Thanks — this mock report has been recorded locally for this demo session. No real report was sent.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input label="Name (optional)" value={name} onChange={(e) => setName(e.target.value)} />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
            />
            <label className="flex flex-col gap-1.5 text-sm font-medium text-text">
              What happened?
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
                placeholder="Describe the page and the issue you encountered"
              />
              {errors.message && <span className="text-sm text-danger">{errors.message}</span>}
            </label>
            <Button type="submit" isLoading={isSubmitting} className="self-start">
              Send report
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}

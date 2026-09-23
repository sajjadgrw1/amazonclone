"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { helpArticles, searchHelpArticles } from "@/data/help-articles";
import { Input } from "@/components/ui/Input";

const topics = Array.from(new Set(helpArticles.map((a) => a.topic)));

function HelpPageContent() {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [activeTopic, setActiveTopic] = useState<string | null>(searchParams.get("topic"));

  const results = searchHelpArticles(query).filter((a) => !activeTopic || a.topic === activeTopic);

  return (
    <div className="mx-auto max-w-[900px] px-4 py-6">
      <h1 className="text-2xl font-semibold text-text">Help Center</h1>

      <div className="relative mt-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
        <Input
          aria-label="Search help articles"
          placeholder="Search help articles"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTopic(null)}
          className={`rounded-md px-3 py-1.5 text-sm font-medium ${!activeTopic ? "bg-primary text-white" : "text-muted hover:bg-background"}`}
        >
          All topics
        </button>
        {topics.map((topic) => (
          <button
            key={topic}
            onClick={() => setActiveTopic(topic)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium ${activeTopic === topic ? "bg-primary text-white" : "text-muted hover:bg-background"}`}
          >
            {topic}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col divide-y divide-border rounded-lg border border-border bg-surface">
        {results.length === 0 ? (
          <p className="p-4 text-sm text-muted">No help articles match &ldquo;{query}&rdquo;.</p>
        ) : (
          results.map((article) => (
            <details key={article.id} className="p-4">
              <summary className="cursor-pointer text-sm font-medium text-text">{article.title}</summary>
              <p className="mt-2 text-sm text-muted">{article.body}</p>
            </details>
          ))
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-4 rounded-lg border border-border bg-surface p-4">
        <div className="flex-1">
          <p className="font-semibold text-text">Need more help?</p>
          <p className="text-sm text-muted">Contact our mock customer service team directly.</p>
        </div>
        <Link href="/customer-service" className="self-center text-sm font-medium text-primary hover:underline">
          Contact support
        </Link>
      </div>
    </div>
  );
}

export default function HelpPage() {
  return (
    <Suspense fallback={null}>
      <HelpPageContent />
    </Suspense>
  );
}

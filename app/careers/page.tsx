"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, MapPin, Briefcase, Clock, Search, ChevronDown, User as UserIcon } from "lucide-react";
import { jobs } from "@/data/jobs";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { Dropdown } from "@/components/ui/Dropdown";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { JobPosting } from "@/types";

const departments = Array.from(new Set(jobs.map((j) => j.department))).sort();

type QuickFilter = "student" | "hourly" | "tech" | null;

const quickLinkCards: { id: QuickFilter; title: string; body: string }[] = [
  {
    id: "student",
    title: "Student opportunities",
    body: "Explore mock internships and entry-level roles where you can learn from others and make an impact.",
  },
  {
    id: "hourly",
    title: "Hourly jobs",
    body: "From the warehouse floor to customer doorsteps, search mock operations and logistics roles.",
  },
  {
    id: "tech",
    title: "Tech careers",
    body: "From storefront UX to seller analytics, our mock engineering teams shape how customers shop.",
  },
];

const exploreLinks = [
  { title: "Life at Nuvara", href: "/about", seed: "life-at-nuvara" },
  { title: "Diversity & inclusion", href: "/about", seed: "diversity" },
  { title: "Our campuses", href: "/about", seed: "campuses" },
];

export default function CareersPage() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState<string | null>(null);
  const [quickFilter, setQuickFilter] = useState<QuickFilter>(null);
  const [activeJob, setActiveJob] = useState<JobPosting | null>(null);
  const [readMore, setReadMore] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const loc = location.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesQuery = q.length === 0 || job.title.toLowerCase().includes(q);
      const matchesLocation = loc.length === 0 || job.location.toLowerCase().includes(loc);
      const matchesDept = !department || job.department === department;
      const matchesQuickFilter =
        !quickFilter ||
        (quickFilter === "student" && job.employmentType === "Internship") ||
        (quickFilter === "hourly" && (job.department === "Operations" || job.department === "Logistics")) ||
        (quickFilter === "tech" && job.department === "Engineering");
      return matchesQuery && matchesLocation && matchesDept && matchesQuickFilter;
    });
  }, [query, location, department, quickFilter]);

  function jumpToResults(next?: QuickFilter) {
    if (next !== undefined) {
      setQuickFilter(next);
      setDepartment(null);
    }
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function handleSearchSubmit(e: FormEvent) {
    e.preventDefault();
    jumpToResults();
  }

  return (
    <div className="flex flex-col">
      <div className="bg-header-dark text-white">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => jumpToResults()}
              aria-label="Jump to job search"
              className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring lg:hidden"
            >
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
            <Link href="/careers" className="flex items-baseline gap-1 rounded-md px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring">
              <span className="text-xl font-bold italic tracking-tight">nuvara</span>
              <span className="text-xl font-light">jobs</span>
            </Link>
          </div>

          <Dropdown
            align="right"
            trigger={({ open, toggle }) => (
              <button
                type="button"
                onClick={toggle}
                aria-expanded={open}
                aria-haspopup="menu"
                className="flex items-center gap-1 rounded-md px-2 py-2 text-sm font-medium hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                My career
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          >
            {(close) => (
              <div role="menu" className="flex flex-col py-1">
                <Link
                  role="menuitem"
                  href="/login"
                  onClick={close}
                  className="px-4 py-2 text-sm text-text hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-inset"
                >
                  Sign in
                </Link>
                <Link
                  role="menuitem"
                  href="/account"
                  onClick={close}
                  className="px-4 py-2 text-sm text-text hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-inset"
                >
                  Track your application
                </Link>
              </div>
            )}
          </Dropdown>
        </div>
      </div>

      <div className="bg-header-nav">
        <form onSubmit={handleSearchSubmit} className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-6 sm:flex-row">
          <label htmlFor="jobs-keyword" className="sr-only">
            Search for jobs by title or keyword
          </label>
          <input
            id="jobs-keyword"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for jobs by title or keyword"
            className="h-12 flex-1 rounded-md border-0 bg-white px-4 text-sm text-text placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
          />
          <label htmlFor="jobs-location" className="sr-only">
            Location
          </label>
          <div className="relative flex-1 sm:max-w-xs">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" aria-hidden="true" />
            <input
              id="jobs-location"
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
              className="h-12 w-full rounded-md border-0 bg-white pl-9 pr-3 text-sm text-text placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            />
          </div>
          <button
            type="submit"
            aria-label="Search jobs"
            className="flex h-12 w-12 shrink-0 items-center justify-center self-start rounded-md bg-primary text-white hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring sm:self-auto"
          >
            <Search className="h-5 w-5" aria-hidden="true" />
          </button>
        </form>
      </div>

      <div className="bg-header-dark text-white">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-4 py-8 lg:flex-row lg:items-center">
          <div className="flex gap-2">
            {["hardware", "code", "logistics"].map((seed) => (
              <div key={seed} className="relative h-28 w-28 shrink-0 overflow-hidden rounded-md sm:h-36 sm:w-36">
                <Image src={`https://picsum.photos/seed/jobs-${seed}/200/200`} alt="" fill sizes="150px" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="flex flex-1 flex-col items-start gap-3">
            <p className="text-2xl font-bold sm:text-3xl">
              Build next-gen storefronts
              <br />
              <span className="text-primary">and the mock code to power them.</span>
            </p>
            <p className="text-white/70">Co-design tomorrow&rsquo;s shopping experience with the Nuvara platform team.</p>
          </div>
          <Button type="button" variant="outline" className="border-white bg-transparent text-white hover:bg-white/10" onClick={() => jumpToResults("tech")}>
            Find jobs
          </Button>
        </div>
      </div>

      <div className="bg-background">
        <div className="mx-auto grid max-w-[1440px] gap-6 px-4 py-10 sm:grid-cols-3">
          {quickLinkCards.map((card) => (
            <div key={card.id} className="flex flex-col items-center gap-4 rounded-lg bg-surface p-6 text-center">
              <h2 className="text-xl font-semibold text-text">{card.title}</h2>
              <p className="text-sm text-muted">{card.body}</p>
              <Button type="button" variant="outline" onClick={() => jumpToResults(card.id)}>
                Find your role
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-surface">
        <div className="mx-auto max-w-[1440px] px-4 py-10">
          <h2 className="text-center text-2xl font-semibold text-text">Explore Nuvara</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {exploreLinks.map((link) => (
              <Link
                key={link.seed}
                href={link.href}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
              >
                <Image
                  src={`https://picsum.photos/seed/${link.seed}/400/300`}
                  alt=""
                  fill
                  sizes="360px"
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-black/50 px-3 py-2 text-sm font-medium text-white">
                  {link.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-background">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-8 px-4 py-10 sm:flex-row sm:items-start">
          <div className="flex h-40 w-40 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
            <UserIcon className="h-16 w-16" aria-hidden="true" />
          </div>
          <div className="flex flex-1 flex-col gap-2">
            <h2 className="text-2xl font-semibold text-text">Priya has grown from intern to lead engineer</h2>
            <p className="text-sm text-muted">Engineer &middot; Nuvara Platform Team &middot; Nashville, TN</p>
            <p className={cn("text-sm text-text", !readMore && "line-clamp-2")}>
              I started as an intern on the storefront team and have grown my skills ever since. What I enjoy most is
              collaborating with senior engineers across teams and using what I learn to solve real UX problems. This
              is a fictional mock testimonial written for the Nuvara prototype — not a real employee.
            </p>
            <Button type="button" variant="outline" className="mt-2 self-start" onClick={() => setReadMore((v) => !v)}>
              {readMore ? "Show less" : "Read more"}
            </Button>
          </div>
        </div>
      </div>

      <div ref={resultsRef} className="mx-auto w-full max-w-[1100px] scroll-mt-4 px-4 py-10">
        <h2 className="text-2xl font-bold text-text">Open roles</h2>
        <p className="mt-1 text-sm text-muted">
          Mock open roles used to demonstrate a careers page — applying here does not create a real application.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Input
            aria-label="Search roles"
            placeholder="Search job title"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="sm:max-w-xs"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setDepartment(null)}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium",
                !department ? "bg-primary text-white" : "border border-border text-muted hover:bg-background"
              )}
            >
              All departments
            </button>
            {departments.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => {
                  setDepartment(d);
                  setQuickFilter(null);
                }}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium",
                  department === d ? "bg-primary text-white" : "border border-border text-muted hover:bg-background"
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm text-muted">
          {results.length} {results.length === 1 ? "role" : "roles"} found
        </p>

        <div className="mt-3 flex flex-col divide-y divide-border rounded-lg border border-border bg-surface">
          {results.length === 0 ? (
            <p className="p-6 text-center text-sm text-muted">No roles match your search. Try a different keyword.</p>
          ) : (
            results.map((job) => (
              <div key={job.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-text">{job.title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                    <span className="flex items-center gap-1">
                      <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      Posted {formatDate(job.postedAt)}
                    </span>
                    <Badge variant="neutral">{job.employmentType}</Badge>
                  </div>
                </div>
                <Button type="button" variant="outline" onClick={() => setActiveJob(job)}>
                  View &amp; apply
                </Button>
              </div>
            ))
          )}
        </div>
      </div>

      <JobModal job={activeJob} onClose={() => setActiveJob(null)} />
    </div>
  );
}

function JobModal({ job, onClose }: { job: JobPosting | null; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function handleClose() {
    onClose();
    setTimeout(() => {
      setName("");
      setEmail("");
      setErrors({});
      setSubmitted(false);
    }, 200);
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const nextErrors: { name?: string; email?: string } = {};
    if (!name.trim()) nextErrors.name = "Enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  }

  if (!job) return null;

  return (
    <Modal isOpen={!!job} onClose={handleClose} title={job.title} description={job.description}>
      {submitted ? (
        <div className="flex flex-col items-center gap-3 py-6 text-center">
          <p className="text-lg font-semibold text-text">Mock application received</p>
          <p className="max-w-sm text-sm text-muted">
            This is a demo — no real application was submitted and no one will contact you. Nuvara has no real hiring
            pipeline.
          </p>
          <Button type="button" variant="outline" onClick={handleClose}>
            Close
          </Button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
            <span>{job.department}</span>
            <span>&middot;</span>
            <span>{job.location}</span>
            <span>&middot;</span>
            <span>{job.employmentType}</span>
          </div>
          <p className="text-sm text-text">{job.description}</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 border-t border-border pt-4">
            <Input
              label="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={errors.name}
              autoComplete="name"
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              autoComplete="email"
              helperText="Mock application only — you won't receive any real email."
            />
            <Button type="submit" isLoading={isSubmitting} fullWidth>
              Submit mock application
            </Button>
          </form>
        </div>
      )}
    </Modal>
  );
}

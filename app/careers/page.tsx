"use client";

import { useMemo, useState, type FormEvent } from "react";
import { MapPin, Briefcase, Clock } from "lucide-react";
import { jobs } from "@/data/jobs";
import { PageHero } from "@/components/layout/PageHero";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { JobPosting } from "@/types";

const departments = Array.from(new Set(jobs.map((j) => j.department))).sort();

export default function CareersPage() {
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState<string | null>(null);
  const [activeJob, setActiveJob] = useState<JobPosting | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return jobs.filter((job) => {
      const matchesQuery =
        q.length === 0 || job.title.toLowerCase().includes(q) || job.location.toLowerCase().includes(q);
      const matchesDept = !department || job.department === department;
      return matchesQuery && matchesDept;
    });
  }, [query, department]);

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-6">
      <PageHero
        title="Careers at Nuvara"
        subtitle="Mock open roles used to demonstrate a careers page — applying here does not create a real application."
      />

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <Input
          aria-label="Search roles"
          placeholder="Search job title or location"
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
              onClick={() => setDepartment(d)}
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

"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/store/app-store";

export default function SignupPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Enter your full name.";
    if (!/^\S+@\S+\.\S+$/.test(email)) next.email = "Enter a valid email address.";
    if (password.length < 6) next.password = "Password must be at least 6 characters.";
    if (confirmPassword !== password) next.confirmPassword = "Passwords do not match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    window.setTimeout(() => {
      setIsLoading(false);
      login();
      router.push("/");
    }, 600);
  }

  return (
    <div className="mx-auto flex max-w-md flex-col gap-6 px-4 py-12">
      <div className="text-center">
        <Link href="/" className="text-2xl font-bold text-text">
          nuvara
        </Link>
      </div>

      <div className="rounded-lg border border-border bg-surface p-6">
        <h1 className="mb-4 text-xl font-semibold text-text">Create account</h1>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <Input label="Your name" value={name} onChange={(e) => setName(e.target.value)} error={errors.name} required />
          <Input
            label="Email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            required
          />
          <PasswordInput
            label="Password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            helperText={!errors.password ? "At least 6 characters." : undefined}
            required
          />
          <PasswordInput
            label="Re-enter password"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            required
          />

          <Button type="submit" isLoading={isLoading} fullWidth>
            Create your Nuvara account
          </Button>

          <p className="text-xs text-muted">
            This is a mock sign-up for the Nuvara prototype — no real account is created and no
            passwords are stored anywhere.
          </p>
        </form>
      </div>

      <div className="text-center text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}

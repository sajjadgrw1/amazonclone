"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/lib/store/app-store";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  function validate(): boolean {
    let valid = true;
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Enter a valid email address.");
      valid = false;
    } else {
      setEmailError(undefined);
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    } else {
      setPasswordError(undefined);
    }
    return valid;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(undefined);
    if (!validate()) return;

    setIsLoading(true);
    window.setTimeout(() => {
      setIsLoading(false);
      if (email.toLowerCase() === "fail@example.com") {
        setFormError("Invalid email or password. This is a mock error state — try any other email.");
        return;
      }
      login();
      const redirectTo = searchParams.get("next") || "/";
      router.push(redirectTo);
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
        <h1 className="mb-4 text-xl font-semibold text-text">Sign in</h1>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <Input
            label="Email or mobile phone number"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            required
          />
          <PasswordInput
            label="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            required
          />

          {formError && (
            <p role="alert" className="text-sm text-danger">
              {formError}
            </p>
          )}

          <Button type="submit" isLoading={isLoading} fullWidth>
            Sign In
          </Button>

          <p className="text-xs text-muted">
            This is a mock sign-in for the Nuvara prototype — no real credentials are stored. Try
            <code className="mx-1 rounded bg-background px-1">fail@example.com</code>
            to preview the error state.
          </p>
        </form>
      </div>

      <div className="text-center text-sm text-muted">
        New to Nuvara?{" "}
        <Link href="/signup" className="font-medium text-primary hover:underline">
          Create your account
        </Link>
      </div>

      <p className="text-center text-xs text-muted">
        By continuing, you agree to Nuvara&rsquo;s Conditions of Use and Privacy Notice (demo copy).
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

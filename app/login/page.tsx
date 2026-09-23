"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";
import { demoCredentials } from "@/data/mock-account";
import { useAuth } from "@/lib/store/app-store";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [step, setStep] = useState<"identifier" | "password">("identifier");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  function handleContinue(e: FormEvent) {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Enter a valid email address.");
      return;
    }
    if (email.trim().toLowerCase() !== demoCredentials.email) {
      setEmailError("We cannot find an account with that email address.");
      return;
    }
    setEmailError(undefined);
    setStep("password");
  }

  function handleSignIn(e: FormEvent) {
    e.preventDefault();
    setFormError(undefined);
    if (!password) {
      setPasswordError("Enter your password.");
      return;
    }
    setPasswordError(undefined);

    setIsLoading(true);
    window.setTimeout(() => {
      setIsLoading(false);
      if (password !== demoCredentials.password) {
        setFormError("Your password is incorrect. Check it and try again.");
        return;
      }
      login();
      const redirectTo = searchParams.get("next") || "/";
      router.push(redirectTo);
    }, 600);
  }

  return (
    <div className="mx-auto flex max-w-sm flex-col gap-4 px-4 py-12">
      <div className="rounded-lg border border-border bg-surface p-6">
        <div className="mb-4 text-center">
          <Link href="/" className="text-2xl font-bold text-text">
            nuvara
          </Link>
        </div>

        <h1 className="mb-4 text-xl font-semibold text-text">Sign in</h1>

        {step === "identifier" ? (
          <form onSubmit={handleContinue} noValidate className="flex flex-col gap-4">
            <Input
              label="Email or mobile phone number"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              required
              autoFocus
            />
            <Button type="submit" fullWidth>
              Continue
            </Button>
            <p className="text-xs text-muted">
              By continuing, you agree to Nuvara&rsquo;s Conditions of Use and Privacy Notice (demo copy).
            </p>

            <DemoCredentialsHint />

            <div className="border-t border-border pt-4">
              <p className="mb-2 text-sm font-semibold text-text">New to Nuvara?</p>
              <Link href="/signup">
                <Button type="button" variant="outline" fullWidth>
                  Create your account
                </Button>
              </Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignIn} noValidate className="flex flex-col gap-4">
            <div className="flex items-center justify-between rounded-md bg-background px-3 py-2 text-sm">
              <span className="text-text">{email}</span>
              <button
                type="button"
                onClick={() => {
                  setStep("identifier");
                  setFormError(undefined);
                }}
                className="font-medium text-primary hover:underline"
              >
                Change
              </button>
            </div>

            <PasswordInput
              label="Password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              required
              autoFocus
            />

            {formError && (
              <p role="alert" className="text-sm text-danger">
                {formError}
              </p>
            )}

            <Button type="submit" isLoading={isLoading} fullWidth>
              Sign In
            </Button>

            <DemoCredentialsHint />
          </form>
        )}
      </div>
    </div>
  );
}

function DemoCredentialsHint() {
  return (
    <div className="rounded-md bg-background p-3 text-xs text-muted">
      <p className="font-semibold text-text">Demo account</p>
      <p className="mt-1">
        Email: <code className="rounded bg-surface px-1">{demoCredentials.email}</code>
        <br />
        Password: <code className="rounded bg-surface px-1">{demoCredentials.password}</code>
      </p>
      <p className="mt-1">
        Mock sign-in only — no real account exists and nothing you type is stored or sent anywhere.
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

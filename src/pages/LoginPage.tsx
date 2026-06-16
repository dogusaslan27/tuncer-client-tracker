import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import type { AppError } from "@/types";

interface LoginPageProps {
  onSubmit: (email: string, password: string) => Promise<boolean>;
  error: AppError | null;
}

/**
 * Employee sign-in screen. There is no self-service sign-up — accounts are
 * created per employee in the Supabase Auth dashboard.
 * @example
 * <LoginPage onSubmit={signIn} error={authError} />
 */
export function LoginPage({ onSubmit, error }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await onSubmit(email, password);
    setSubmitting(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-tuncer-offwhite px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-card border border-tuncer-border bg-white p-8 shadow-card"
      >
        <div className="mb-6 text-center">
          <h1 className="text-lg font-semibold text-tuncer-blue">Tuncer Turizm</h1>
          <p className="mt-1 text-[13px] text-tuncer-gray">Internal Tools — sign in</p>
        </div>

        {error && (
          <div className="mb-4">
            <ErrorBanner message={error.message} />
          </div>
        )}

        <div className="flex flex-col gap-4">
          <Input
            label="Email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@tuncerturizm.com"
            required
          />
          <Input
            label="Password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <Button type="submit" disabled={submitting} className="mt-1 w-full">
            {submitting ? "Signing in..." : "Sign in"}
          </Button>
        </div>
      </form>
    </div>
  );
}

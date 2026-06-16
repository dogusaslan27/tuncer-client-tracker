import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import type { AppError } from "@/types";

interface UseAuthResult {
  session: Session | null;
  loading: boolean;
  error: AppError | null;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

/**
 * Tracks the current Supabase Auth session and exposes sign-in/sign-out
 * helpers. Every employee logs in with the email/password account created
 * for them in the Supabase dashboard — there is no public sign-up.
 * @returns Current session, loading state, last auth error, and auth actions.
 * @example
 * const { session, signIn, signOut } = useAuth();
 */
export function useAuth(): UseAuthResult {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<boolean> => {
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) {
      setError({ message: "Incorrect email or password.", code: signInError.name });
      return false;
    }
    return true;
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);

  return { session, loading, error, signIn, signOut };
}

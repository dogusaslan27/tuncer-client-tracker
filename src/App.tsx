import { LogOut } from "lucide-react";
import { ClientsPage } from "@/pages/ClientsPage";
import { LoginPage } from "@/pages/LoginPage";
import { Spinner } from "@/components/ui/Spinner";
import { useAuth } from "@/hooks/useAuth";

/**
 * App root. Gates all tools behind a Supabase Auth session — every
 * employee signs in with the email/password account created for them.
 * Single-route shell for now; extend with a router once more pages
 * (e.g. documents, dashboard) are added.
 */
export function App() {
  const { session, loading, error, signIn, signOut } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-tuncer-offwhite">
        <Spinner size={28} />
      </div>
    );
  }

  if (!session) {
    return <LoginPage onSubmit={signIn} error={error} />;
  }

  return (
    <div className="min-h-screen bg-tuncer-offwhite">
      <header className="border-b border-tuncer-border bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div>
            <span className="text-base font-semibold text-tuncer-blue">Tuncer Turizm</span>
            <span className="ml-2 text-[13px] text-tuncer-gray">Internal Tools</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-tuncer-gray">{session.user.email}</span>
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 rounded-btn px-2 py-1.5 text-[13px] text-tuncer-gray hover:bg-tuncer-offwhite hover:text-tuncer-text"
            >
              <LogOut size={15} /> Sign out
            </button>
          </div>
        </div>
      </header>
      <ClientsPage />
    </div>
  );
}

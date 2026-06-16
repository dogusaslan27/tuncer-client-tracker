import { AlertTriangle } from "lucide-react";

/**
 * Red error banner shown on any failed async operation. Errors are never
 * silently swallowed in this app.
 * @example
 * {error && <ErrorBanner message={error.message} />}
 */
export function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 rounded-input border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
      <AlertTriangle size={16} />
      <span>{message}</span>
    </div>
  );
}

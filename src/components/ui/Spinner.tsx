/**
 * Simple loading spinner shown during async operations.
 * @example
 * {loading && <Spinner />}
 */
export function Spinner({ size = 24 }: { size?: number }) {
  return (
    <div
      className="animate-spin rounded-full border-2 border-tuncer-border border-t-tuncer-blue"
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    />
  );
}

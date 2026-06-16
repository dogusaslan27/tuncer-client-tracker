import type { ClientMetrics } from "@/types";

interface MetricCardProps {
  label: string;
  value: number;
  accent?: string;
}

function MetricCard({ label, value, accent }: MetricCardProps) {
  return (
    <div className="flex-1 rounded-card border border-tuncer-border bg-white p-4 shadow-card">
      <div className="text-[13px] font-medium text-tuncer-gray">{label}</div>
      <div className="mt-1 text-2xl font-semibold" style={{ color: accent ?? "#1A202C" }}>
        {value}
      </div>
    </div>
  );
}

/**
 * Metrics summary row shown above the clients table: total, active,
 * overdue, and high priority counts.
 * @example
 * <MetricsRow metrics={computeMetrics(clients)} />
 */
export function MetricsRow({ metrics }: { metrics: ClientMetrics }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <MetricCard label="Total Clients" value={metrics.total} />
      <MetricCard label="Active Cases" value={metrics.active} accent="#0067B4" />
      <MetricCard label="Overdue" value={metrics.overdue} accent="#B91C1C" />
      <MetricCard label="High Priority" value={metrics.highPriority} accent="#B8912A" />
    </div>
  );
}

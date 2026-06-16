import { Search } from "lucide-react";
import { Select } from "@/components/ui/Select";
import { PRIORITY_LEVELS, STATUS_TYPES, VISA_TYPES } from "@/lib/constants";
import type { ClientFilters } from "@/types";

interface FilterBarProps {
  filters: ClientFilters;
  onChange: (filters: ClientFilters) => void;
}

/**
 * Search bar + filter dropdowns shown at the top of the clients list view.
 * @example
 * <FilterBar filters={filters} onChange={setFilters} />
 */
export function FilterBar({ filters, onChange }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-tuncer-border bg-white p-4 shadow-card sm:flex-row sm:items-end">
      <div className="flex-1">
        <label className="text-[13px] font-medium text-tuncer-gray">Search</label>
        <div className="relative mt-1.5">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-tuncer-gray" />
          <input
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder="Search by name or nationality..."
            className="h-10 w-full rounded-input border border-tuncer-border bg-white pl-9 pr-3 text-sm text-tuncer-text placeholder:text-tuncer-gray focus:outline-none focus:ring-2 focus:ring-tuncer-blue/30 focus:border-tuncer-blue"
          />
        </div>
      </div>

      <div className="w-full sm:w-44">
        <Select
          label="Visa Type"
          value={filters.visaType}
          onChange={(e) => onChange({ ...filters, visaType: e.target.value as ClientFilters["visaType"] })}
          options={[{ value: "All", label: "All Types" }, ...VISA_TYPES.map((v) => ({ value: v, label: v }))]}
        />
      </div>

      <div className="w-full sm:w-44">
        <Select
          label="Status"
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value as ClientFilters["status"] })}
          options={[{ value: "All", label: "All Statuses" }, ...STATUS_TYPES.map((s) => ({ value: s, label: s }))]}
        />
      </div>

      <div className="w-full sm:w-36">
        <Select
          label="Priority"
          value={filters.priority}
          onChange={(e) => onChange({ ...filters, priority: e.target.value as ClientFilters["priority"] })}
          options={[{ value: "All", label: "All" }, ...PRIORITY_LEVELS.map((p) => ({ value: p, label: p }))]}
        />
      </div>

      <label className="flex h-10 w-full items-center gap-2 rounded-input border border-tuncer-border px-3 text-sm text-tuncer-text sm:w-auto">
        <input
          type="checkbox"
          checked={filters.overdueOnly}
          onChange={(e) => onChange({ ...filters, overdueOnly: e.target.checked })}
          className="accent-tuncer-blue"
        />
        Overdue only
      </label>
    </div>
  );
}

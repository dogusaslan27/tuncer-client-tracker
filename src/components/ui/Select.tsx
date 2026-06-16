import type { SelectHTMLAttributes } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
}

/**
 * Standard labeled select/dropdown, used for filters and form fields.
 * @example
 * <Select label="Status" options={statusOptions} value={status} onChange={(e) => setStatus(e.target.value)} />
 */
export function Select({ label, options, className = "", id, ...rest }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-[13px] font-medium text-tuncer-gray">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`h-10 w-full rounded-input border border-tuncer-border bg-white px-3 text-sm text-tuncer-text focus:outline-none focus:ring-2 focus:ring-tuncer-blue/30 focus:border-tuncer-blue ${className}`}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

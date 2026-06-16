import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/**
 * Standard labeled text input, 36–40px height, full width on mobile.
 * @example
 * <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
 */
export function Input({ label, error, className = "", id, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-[13px] font-medium text-tuncer-gray">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`h-10 w-full rounded-input border border-tuncer-border bg-white px-3 text-sm text-tuncer-text placeholder:text-tuncer-gray focus:outline-none focus:ring-2 focus:ring-tuncer-blue/30 focus:border-tuncer-blue ${className}`}
        {...rest}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

/**
 * Standard labeled textarea, used for notes fields.
 * @example
 * <Textarea label="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
 */
export function Textarea({ label, error, className = "", id, ...rest }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={id} className="text-[13px] font-medium text-tuncer-gray">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={`min-h-[88px] w-full rounded-input border border-tuncer-border bg-white px-3 py-2 text-sm text-tuncer-text placeholder:text-tuncer-gray focus:outline-none focus:ring-2 focus:ring-tuncer-blue/30 focus:border-tuncer-blue ${className}`}
        {...rest}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}

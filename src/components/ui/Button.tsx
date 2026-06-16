import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  children: ReactNode;
}

const VARIANT_CLASSES: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-tuncer-blue text-white hover:bg-tuncer-navy",
  secondary:
    "bg-white text-tuncer-text border border-tuncer-border hover:bg-tuncer-offwhite",
  danger: "bg-white text-red-700 border border-red-200 hover:bg-red-50",
  ghost: "bg-transparent text-tuncer-blue hover:bg-tuncer-blue-tint",
};

/**
 * Standard Tuncer Turizm button. Use `variant` to pick the visual style.
 * @param variant - primary | secondary | danger | ghost
 * @example
 * <Button variant="primary" onClick={save}>Save</Button>
 */
export function Button({ variant = "primary", className = "", children, ...rest }: ButtonProps) {
  return (
    <button
      className={`rounded-btn px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

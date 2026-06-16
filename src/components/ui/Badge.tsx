import type { ReactNode } from "react";

export interface BadgeProps {
  bg: string;
  text: string;
  children: ReactNode;
}

/**
 * Pill-shaped status/priority badge. Background and text colors are passed
 * explicitly so badges never render black text on a colored background.
 * @example
 * <Badge bg="#DCFCE7" text="#15803D">Approved</Badge>
 */
export function Badge({ bg, text, children }: BadgeProps) {
  return (
    <span
      className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
      style={{ backgroundColor: bg, color: text }}
    >
      {children}
    </span>
  );
}

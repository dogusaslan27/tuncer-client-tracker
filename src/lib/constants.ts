import type { PriorityType, StatusType, VisaType } from "@/types";

/** All visa types supported by Tuncer Turizm, in display order. */
export const VISA_TYPES: VisaType[] = [
  "Schengen",
  "UK",
  "USA",
  "Canada",
  "Australia",
  "France VLS-TS",
  "Other",
];

/** All case statuses, in flow order: Documents Pending -> Submitted -> Waiting Decision -> [Approved | Refused | Interview]. */
export const STATUS_TYPES: StatusType[] = [
  "Documents Pending",
  "Submitted",
  "Waiting Decision",
  "Approved",
  "Refused",
  "Interview",
];

/** Statuses considered "closed" — overdue highlighting does not apply to these. */
export const CLOSED_STATUSES: StatusType[] = ["Approved", "Refused"];

/** Statuses considered "active" (not yet closed) for the metrics summary row. */
export const ACTIVE_STATUSES: StatusType[] = STATUS_TYPES.filter(
  (s) => !CLOSED_STATUSES.includes(s)
);

/** All priority levels, in display order (highest first). */
export const PRIORITY_LEVELS: PriorityType[] = ["High", "Medium", "Low"];

/** Tuncer Turizm brand color tokens. Mirror tailwind.config.ts — keep in sync. */
export const BRAND_COLORS = {
  blue: "#0067B4",
  navy: "#004A82",
  blueTint: "#E6F1FB",
  gold: "#B8912A",
  white: "#FFFFFF",
  offWhite: "#F7F8FA",
  gray: "#6B7280",
  border: "#E2E8F0",
  text: "#1A202C",
} as const;

/** Badge color tokens per status — background + matching dark text, never black on color. */
export const STATUS_COLORS: Record<StatusType, { bg: string; text: string }> = {
  "Documents Pending": { bg: "#FBEFD9", text: "#8A6516" },
  Submitted: { bg: "#E6F1FB", text: "#004A82" },
  "Waiting Decision": { bg: "#EDE9FE", text: "#5B21B6" },
  Approved: { bg: "#DCFCE7", text: "#15803D" },
  Refused: { bg: "#FEE2E2", text: "#B91C1C" },
  Interview: { bg: "#FEF3C7", text: "#92400E" },
};

/** Badge color tokens per priority level. */
export const PRIORITY_COLORS: Record<PriorityType, { bg: string; text: string }> = {
  High: { bg: "#FEE2E2", text: "#B91C1C" },
  Medium: { bg: "#FEF3C7", text: "#92400E" },
  Low: { bg: "#E6F1FB", text: "#004A82" },
};

/** Color used to flag an overdue case (past next_action_date, non-closed status). */
export const OVERDUE_COLOR = { bg: "#FEE2E2", text: "#B91C1C" };

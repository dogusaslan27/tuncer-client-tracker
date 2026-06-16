import { format, isBefore, parseISO, startOfDay } from "date-fns";
import { tr } from "date-fns/locale";
import { CLOSED_STATUSES, STATUS_COLORS } from "./constants";
import type { Client, ClientMetrics, StatusType } from "@/types";

/**
 * Formats an ISO date string using Turkish locale conventions (dd.MM.yyyy).
 * @param isoDate - ISO date/timestamp string, or null/undefined.
 * @returns Formatted date string, or "—" if no date is provided.
 * @example
 * formatDate("2026-06-20") // "20.06.2026"
 */
export function formatDate(isoDate: string | null | undefined): string {
  if (!isoDate) return "—";
  try {
    return format(parseISO(isoDate), "dd.MM.yyyy", { locale: tr });
  } catch {
    return "—";
  }
}

/**
 * Determines whether a client case is overdue: next_action_date is in the
 * past and the case status is not a closed status (Approved/Refused).
 * @param client - The client record to check.
 * @returns True if the case is overdue.
 * @example
 * isOverdue({ next_action_date: "2020-01-01", status: "Submitted", ... }) // true
 */
export function isOverdue(client: Pick<Client, "next_action_date" | "status">): boolean {
  if (!client.next_action_date) return false;
  if (CLOSED_STATUSES.includes(client.status)) return false;
  try {
    return isBefore(parseISO(client.next_action_date), startOfDay(new Date()));
  } catch {
    return false;
  }
}

/**
 * Returns the badge color tokens for a given status.
 * @param status - The case status.
 * @returns Object with bg/text hex colors for the status badge.
 * @example
 * getStatusColor("Approved") // { bg: "#DCFCE7", text: "#15803D" }
 */
export function getStatusColor(status: StatusType): { bg: string; text: string } {
  return STATUS_COLORS[status];
}

/**
 * Computes the metrics summary (total, active, overdue, high priority) for
 * a list of clients. Used in the metrics row above the client table.
 * @param clients - Full list of clients to summarize.
 * @returns Aggregate counts for the metrics row.
 * @example
 * computeMetrics(clients) // { total: 42, active: 30, overdue: 5, highPriority: 8 }
 */
export function computeMetrics(clients: Client[]): ClientMetrics {
  let active = 0;
  let overdue = 0;
  let highPriority = 0;

  for (const client of clients) {
    if (!CLOSED_STATUSES.includes(client.status)) active += 1;
    if (isOverdue(client)) overdue += 1;
    if (client.priority === "High") highPriority += 1;
  }

  return {
    total: clients.length,
    active,
    overdue,
    highPriority,
  };
}

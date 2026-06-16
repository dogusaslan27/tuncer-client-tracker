/**
 * Supported visa types Tuncer Turizm processes for clients.
 */
export type VisaType =
  | "Schengen"
  | "UK"
  | "USA"
  | "Canada"
  | "Australia"
  | "France VLS-TS"
  | "Other";

/**
 * Status flow for a visa application case.
 * Flow: Documents Pending -> Submitted -> Waiting Decision -> [Approved | Refused | Interview]
 */
export type StatusType =
  | "Documents Pending"
  | "Submitted"
  | "Waiting Decision"
  | "Approved"
  | "Refused"
  | "Interview";

/**
 * Priority level for a client case. Always visible in the UI, never hidden.
 */
export type PriorityType = "High" | "Medium" | "Low";

/**
 * A single client record tracked by the internal tool.
 */
export interface Client {
  id: string;
  full_name: string;
  nationality: string;
  visa_type: VisaType;
  status: StatusType;
  priority: PriorityType;
  next_action_date: string | null; // ISO date string, null if no action scheduled
  notes: string;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}

/**
 * Shape used when creating a new client (server fills id/created_at/updated_at).
 */
export type NewClient = Omit<Client, "id" | "created_at" | "updated_at">;

/**
 * Shape used when updating an existing client. All fields optional except id.
 */
export type ClientUpdate = Partial<Omit<Client, "id" | "created_at">> & {
  id: string;
};

/**
 * Filters applied to the client list view.
 */
export interface ClientFilters {
  search: string;
  visaType: VisaType | "All";
  status: StatusType | "All";
  priority: PriorityType | "All";
  overdueOnly: boolean;
}

/**
 * Aggregate counts shown in the metrics summary row above the client table.
 */
export interface ClientMetrics {
  total: number;
  active: number;
  overdue: number;
  highPriority: number;
}

/**
 * Standard shape for typed API/data errors surfaced in the UI.
 */
export interface AppError {
  message: string;
  code?: string;
}

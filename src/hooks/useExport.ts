import { useCallback } from "react";
import Papa from "papaparse";
import type { Client } from "@/types";

/**
 * Exports a list of clients to a downloaded CSV file using papaparse.
 * @returns exportToCsv — function that triggers the download.
 * @example
 * const { exportToCsv } = useExport();
 * exportToCsv(filteredClients, "tuncer-clients.csv");
 */
export function useExport() {
  const exportToCsv = useCallback((clients: Client[], filename = "clients.csv") => {
    const rows = clients.map((c) => ({
      "Full Name": c.full_name,
      Nationality: c.nationality,
      "Visa Type": c.visa_type,
      Status: c.status,
      Priority: c.priority,
      "Next Action Date": c.next_action_date ?? "",
      Notes: c.notes,
    }));

    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return { exportToCsv };
}

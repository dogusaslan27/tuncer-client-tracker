import { useMemo, useState } from "react";
import { isOverdue } from "@/lib/utils";
import type { Client, ClientFilters } from "@/types";

const DEFAULT_FILTERS: ClientFilters = {
  search: "",
  visaType: "All",
  status: "All",
  priority: "All",
  overdueOnly: false,
};

interface UseFiltersResult {
  filters: ClientFilters;
  setFilters: React.Dispatch<React.SetStateAction<ClientFilters>>;
  filteredClients: Client[];
  resetFilters: () => void;
}

/**
 * Applies search + dropdown filters to a client list. Search matches
 * full_name and nationality (case-insensitive).
 * @param clients - Full, unfiltered client list.
 * @returns Current filters, setter, the filtered list, and a reset helper.
 * @example
 * const { filters, setFilters, filteredClients } = useFilters(clients);
 */
export function useFilters(clients: Client[]): UseFiltersResult {
  const [filters, setFilters] = useState<ClientFilters>(DEFAULT_FILTERS);

  const filteredClients = useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    return clients.filter((client) => {
      if (search) {
        const matches =
          client.full_name.toLowerCase().includes(search) ||
          client.nationality.toLowerCase().includes(search);
        if (!matches) return false;
      }
      if (filters.visaType !== "All" && client.visa_type !== filters.visaType) return false;
      if (filters.status !== "All" && client.status !== filters.status) return false;
      if (filters.priority !== "All" && client.priority !== filters.priority) return false;
      if (filters.overdueOnly && !isOverdue(client)) return false;
      return true;
    });
  }, [clients, filters]);

  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  return { filters, setFilters, filteredClients, resetFilters };
}

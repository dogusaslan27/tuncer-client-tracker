import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { AppError, Client, NewClient } from "@/types";

interface UseClientsResult {
  clients: Client[];
  loading: boolean;
  error: AppError | null;
  refetch: () => Promise<void>;
  addClient: (client: NewClient) => Promise<Client | null>;
  updateClient: (id: string, updates: Partial<NewClient>) => Promise<Client | null>;
  deleteClient: (id: string) => Promise<boolean>;
}

/**
 * Loads and manages the full client list from Supabase, exposing CRUD
 * helpers with typed loading/error state for the Clients page.
 * @returns Client list state plus add/update/delete/refetch helpers.
 * @example
 * const { clients, loading, error, addClient } = useClients();
 */
export function useClients(): UseClientsResult {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setClients(data ?? []);
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Failed to load clients.",
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const addClient = useCallback(async (client: NewClient): Promise<Client | null> => {
    setError(null);
    try {
      const { data, error: insertError } = await supabase
        .from("clients")
        .insert(client)
        .select()
        .single();

      if (insertError) throw insertError;
      setClients((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Failed to add client.",
      });
      return null;
    }
  }, []);

  const updateClient = useCallback(
    async (id: string, updates: Partial<NewClient>): Promise<Client | null> => {
      setError(null);
      try {
        const { data, error: updateError } = await supabase
          .from("clients")
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq("id", id)
          .select()
          .single();

        if (updateError) throw updateError;
        setClients((prev) => prev.map((c) => (c.id === id ? data : c)));
        return data;
      } catch (err) {
        setError({
          message: err instanceof Error ? err.message : "Failed to update client.",
        });
        return null;
      }
    },
    []
  );

  const deleteClient = useCallback(async (id: string): Promise<boolean> => {
    setError(null);
    try {
      const { error: deleteError } = await supabase.from("clients").delete().eq("id", id);
      if (deleteError) throw deleteError;
      setClients((prev) => prev.filter((c) => c.id !== id));
      return true;
    } catch (err) {
      setError({
        message: err instanceof Error ? err.message : "Failed to delete client.",
      });
      return false;
    }
  }, []);

  return { clients, loading, error, refetch: fetchClients, addClient, updateClient, deleteClient };
}

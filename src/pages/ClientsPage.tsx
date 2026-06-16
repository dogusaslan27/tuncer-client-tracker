import { useState } from "react";
import { Plus, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { ErrorBanner } from "@/components/ui/ErrorBanner";
import { EmptyState } from "@/components/ui/EmptyState";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { MetricsRow } from "@/components/features/MetricsRow";
import { FilterBar } from "@/components/features/FilterBar";
import { ClientsTable } from "@/components/features/ClientsTable";
import { ClientFormModal } from "@/components/features/ClientFormModal";
import { useClients } from "@/hooks/useClients";
import { useFilters } from "@/hooks/useFilters";
import { useExport } from "@/hooks/useExport";
import { computeMetrics } from "@/lib/utils";
import type { Client, NewClient } from "@/types";

/**
 * Top-level Clients page: metrics row, search/filter bar, table, and
 * add/edit/delete modals wired to the useClients hook.
 */
export function ClientsPage() {
  const { clients, loading, error, addClient, updateClient, deleteClient } = useClients();
  const { filters, setFilters, filteredClients } = useFilters(clients);
  const { exportToCsv } = useExport();

  const [formOpen, setFormOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [deletingClient, setDeletingClient] = useState<Client | null>(null);

  const openAdd = () => {
    setEditingClient(null);
    setFormOpen(true);
  };

  const openEdit = (client: Client) => {
    setEditingClient(client);
    setFormOpen(true);
  };

  const handleSave = async (data: NewClient) => {
    if (editingClient) {
      await updateClient(editingClient.id, data);
    } else {
      await addClient(data);
    }
  };

  const handleConfirmDelete = async () => {
    if (deletingClient) {
      await deleteClient(deletingClient.id);
      setDeletingClient(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-tuncer-text">Clients</h1>
          <p className="text-[13px] text-tuncer-gray">Visa application tracking and follow-up</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => exportToCsv(filteredClients, "tuncer-clients.csv")}
          >
            <span className="flex items-center gap-1.5">
              <Download size={16} /> Export CSV
            </span>
          </Button>
          <Button onClick={openAdd}>
            <span className="flex items-center gap-1.5">
              <Plus size={16} /> Add Client
            </span>
          </Button>
        </div>
      </div>

      {error && (
        <div className="mb-4">
          <ErrorBanner message={error.message} />
        </div>
      )}

      <div className="mb-6">
        <MetricsRow metrics={computeMetrics(clients)} />
      </div>

      <div className="mb-4">
        <FilterBar filters={filters} onChange={setFilters} />
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size={28} />
        </div>
      ) : clients.length === 0 ? (
        <EmptyState
          message="No clients yet. Add your first client to get started."
          action={<Button onClick={openAdd}>Add Client</Button>}
        />
      ) : (
        <ClientsTable
          clients={filteredClients}
          onEdit={openEdit}
          onDelete={setDeletingClient}
          onAddClick={openAdd}
        />
      )}

      <ClientFormModal
        open={formOpen}
        client={editingClient}
        onClose={() => setFormOpen(false)}
        onSave={handleSave}
      />

      <ConfirmDialog
        open={!!deletingClient}
        title="Delete Client"
        message={`Are you sure you want to delete ${deletingClient?.full_name}? This cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingClient(null)}
      />
    </div>
  );
}

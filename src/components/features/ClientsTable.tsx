import { Pencil, Trash2 } from "lucide-react";
import { Table, type Column } from "@/components/ui/Table";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { VisaStatusBadge } from "./VisaStatusBadge";
import { PriorityBadge } from "./PriorityBadge";
import { formatDate, isOverdue } from "@/lib/utils";
import type { Client } from "@/types";

interface ClientsTableProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
  onAddClick: () => void;
}

/**
 * Main clients table: name, nationality, visa type, status, priority,
 * next action date (highlighted red if overdue), and row actions.
 * Editing is always done via modal, never inline.
 * @example
 * <ClientsTable clients={filteredClients} onEdit={openEdit} onDelete={openDelete} onAddClick={openAdd} />
 */
export function ClientsTable({ clients, onEdit, onDelete, onAddClick }: ClientsTableProps) {
  const columns: Column<Client>[] = [
    { key: "full_name", header: "Name", render: (c) => <span className="font-medium">{c.full_name}</span> },
    { key: "nationality", header: "Nationality", render: (c) => c.nationality },
    { key: "visa_type", header: "Visa Type", render: (c) => c.visa_type },
    { key: "status", header: "Status", render: (c) => <VisaStatusBadge client={c} /> },
    { key: "priority", header: "Priority", render: (c) => <PriorityBadge priority={c.priority} /> },
    {
      key: "next_action_date",
      header: "Next Action",
      render: (c) => (
        <span className={isOverdue(c) ? "font-medium text-red-700" : ""}>
          {formatDate(c.next_action_date)}
        </span>
      ),
    },
    {
      key: "actions",
      header: "",
      className: "text-right",
      render: (c) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => onEdit(c)}
            aria-label="Edit client"
            className="rounded-btn p-1.5 text-tuncer-gray hover:bg-tuncer-blue-tint hover:text-tuncer-blue"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete(c)}
            aria-label="Delete client"
            className="rounded-btn p-1.5 text-tuncer-gray hover:bg-red-50 hover:text-red-700"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      rows={clients}
      rowKey={(c) => c.id}
      emptyState={
        <EmptyState
          message="No clients match your filters yet."
          action={<Button onClick={onAddClick}>Add Client</Button>}
        />
      }
    />
  );
}

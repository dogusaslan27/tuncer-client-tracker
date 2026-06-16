import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { PRIORITY_LEVELS, STATUS_TYPES, VISA_TYPES } from "@/lib/constants";
import type { Client, NewClient } from "@/types";

interface ClientFormModalProps {
  open: boolean;
  client: Client | null; // null = add mode, otherwise edit mode
  onClose: () => void;
  onSave: (data: NewClient) => Promise<void>;
}

const EMPTY_FORM: NewClient = {
  full_name: "",
  nationality: "",
  visa_type: "Schengen",
  status: "Documents Pending",
  priority: "Medium",
  next_action_date: null,
  notes: "",
};

/**
 * Add/Edit client modal form. Used for both create and update flows —
 * the app never allows inline table editing.
 * @example
 * <ClientFormModal open={open} client={editingClient} onClose={close} onSave={save} />
 */
export function ClientFormModal({ open, client, onClose, onSave }: ClientFormModalProps) {
  const [form, setForm] = useState<NewClient>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    if (client) {
      setForm({
        full_name: client.full_name,
        nationality: client.nationality,
        visa_type: client.visa_type,
        status: client.status,
        priority: client.priority,
        next_action_date: client.next_action_date,
        notes: client.notes,
      });
    } else {
      setForm(EMPTY_FORM);
    }
    setValidationError(null);
  }, [client, open]);

  const handleSubmit = async () => {
    if (!form.full_name.trim() || !form.nationality.trim()) {
      setValidationError("Full name and nationality are required.");
      return;
    }
    setValidationError(null);
    setSaving(true);
    try {
      await onSave(form);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      title={client ? "Edit Client" : "Add Client"}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        {validationError && (
          <p className="text-xs text-red-600">{validationError}</p>
        )}
        <Input
          label="Full Name"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          placeholder="e.g. Ayşe Yılmaz"
        />
        <Input
          label="Nationality"
          value={form.nationality}
          onChange={(e) => setForm({ ...form, nationality: e.target.value })}
          placeholder="e.g. Turkish"
        />
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Visa Type"
            value={form.visa_type}
            onChange={(e) => setForm({ ...form, visa_type: e.target.value as NewClient["visa_type"] })}
            options={VISA_TYPES.map((v) => ({ value: v, label: v }))}
          />
          <Select
            label="Status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as NewClient["status"] })}
            options={STATUS_TYPES.map((s) => ({ value: s, label: s }))}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Priority"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value as NewClient["priority"] })}
            options={PRIORITY_LEVELS.map((p) => ({ value: p, label: p }))}
          />
          <Input
            label="Next Action Date"
            type="date"
            value={form.next_action_date ?? ""}
            onChange={(e) => setForm({ ...form, next_action_date: e.target.value || null })}
          />
        </div>
        <Textarea
          label="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder="Internal notes about this case..."
        />
      </div>
    </Modal>
  );
}

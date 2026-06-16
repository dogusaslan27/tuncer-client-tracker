import type { ReactNode } from "react";
import { Users } from "lucide-react";

export interface EmptyStateProps {
  message: string;
  action?: ReactNode;
}

/**
 * Friendly empty state with a message and optional call-to-action,
 * shown whenever a list view has no data.
 * @example
 * <EmptyState message="No clients yet." action={<Button onClick={openAdd}>Add Client</Button>} />
 */
export function EmptyState({ message, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-8 text-center">
      <Users size={32} className="text-tuncer-gray" />
      <p className="text-sm text-tuncer-gray">{message}</p>
      {action}
    </div>
  );
}

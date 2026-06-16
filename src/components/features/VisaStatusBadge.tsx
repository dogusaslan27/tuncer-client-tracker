import { Badge } from "@/components/ui/Badge";
import { OVERDUE_COLOR, STATUS_COLORS } from "@/lib/constants";
import { isOverdue } from "@/lib/utils";
import type { Client } from "@/types";

/**
 * Status badge for a client's case. Renders the "Overdue" variant instead
 * of the normal status color when the case is past its next_action_date.
 * @example
 * <VisaStatusBadge client={client} />
 */
export function VisaStatusBadge({ client }: { client: Client }) {
  if (isOverdue(client)) {
    return (
      <Badge bg={OVERDUE_COLOR.bg} text={OVERDUE_COLOR.text}>
        Overdue
      </Badge>
    );
  }

  const color = STATUS_COLORS[client.status];
  return (
    <Badge bg={color.bg} text={color.text}>
      {client.status}
    </Badge>
  );
}

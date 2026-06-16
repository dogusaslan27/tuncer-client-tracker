import { Badge } from "@/components/ui/Badge";
import { PRIORITY_COLORS } from "@/lib/constants";
import type { PriorityType } from "@/types";

/**
 * Priority badge — always visible, never hidden, per Tuncer requirements.
 * @example
 * <PriorityBadge priority="High" />
 */
export function PriorityBadge({ priority }: { priority: PriorityType }) {
  const color = PRIORITY_COLORS[priority];
  return (
    <Badge bg={color.bg} text={color.text}>
      {priority}
    </Badge>
  );
}

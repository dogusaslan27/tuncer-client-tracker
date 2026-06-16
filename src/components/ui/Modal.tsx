import type { ReactNode } from "react";
import { X } from "lucide-react";

export interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

/**
 * Standard modal dialog used for all add/edit forms — the app never edits
 * inline in tables.
 * @example
 * <Modal open={isOpen} title="Add Client" onClose={close}>...</Modal>
 */
export function Modal({ open, title, onClose, children, footer }: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-card border border-tuncer-border bg-white shadow-card"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-tuncer-border px-5 py-4">
          <h2 className="text-base font-semibold text-tuncer-text">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-btn p-1 text-tuncer-gray hover:bg-tuncer-offwhite"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-5 py-4">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 border-t border-tuncer-border px-5 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

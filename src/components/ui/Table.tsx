import type { ReactNode } from "react";

export interface Column<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  className?: string;
}

export interface TableProps<T> {
  columns: Column<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  emptyState?: ReactNode;
  rowClassName?: (row: T) => string;
}

/**
 * Generic data table with the Tuncer brand styling: blue header row,
 * alternating white/off-white rows.
 * @example
 * <Table columns={columns} rows={clients} rowKey={(c) => c.id} />
 */
export function Table<T>({ columns, rows, rowKey, emptyState, rowClassName }: TableProps<T>) {
  if (rows.length === 0 && emptyState) {
    return <div className="rounded-card border border-tuncer-border bg-white p-10">{emptyState}</div>;
  }

  return (
    <div className="overflow-x-auto rounded-card border border-tuncer-border shadow-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-tuncer-blue text-white">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={rowKey(row)}
              className={`${idx % 2 === 0 ? "bg-white" : "bg-tuncer-offwhite"} ${rowClassName ? rowClassName(row) : ""}`}
            >
              {columns.map((col) => (
                <td key={col.key} className={`px-4 py-3 ${col.className ?? ""}`}>
                  {col.render(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

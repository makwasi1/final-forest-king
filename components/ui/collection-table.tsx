import React from "react";
import { Button } from "@/components/ui/button"
import { Delete, Edit, Trash } from "lucide-react";


interface CollectionTableProps {
    data: any[];
    columns: { key: string; label: string }[];
    onEdit: (row: any) => void;
    onDelete: (id: string) => void;
}
export function CollectionTable({ data, columns, onEdit, onDelete }: CollectionTableProps) {

  // If more than 2 columns, make the table horizontally scrollable and sticky actions column
  const isScrollable = columns.length > 2;
  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full border text-xs sm:text-sm md:text-base relative">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="border px-2 py-1 sm:px-4 sm:py-2 bg-background"
              >
                {col.label}
              </th>
            ))}
            <th
              className={
                isScrollable
                  ? "border px-2 py-1 sm:px-4 sm:py-2 bg-background sticky right-0 z-10"
                  : "border px-2 py-1 sm:px-4 sm:py-2 bg-background"
              }
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((col) => (
                <td
                  key={col.key}
                  className="border px-2 py-1 sm:px-4 sm:py-2 bg-white"
                >
                  {row[col.key]}
                </td>
              ))}
              <td
                className={
                  isScrollable
                    ? "border px-2 py-1 sm:px-4 sm:py-2 flex gap-2 sm:flex-row bg-white sticky right-0 z-10"
                    : "border px-2 py-1 sm:px-4 sm:py-2 flex gap-2 sm:flex-row bg-white"
                }
              >
                <Edit onClick={() => onEdit(row)} className="h-4 w-4 cursor-pointer" />
                <Trash className="h-4 w-4 text-red-500 cursor-pointer" onClick={() => onDelete(row.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
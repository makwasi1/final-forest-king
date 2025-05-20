import React from "react";
import { Button } from "@/components/ui/button"


interface CollectionTableProps {
    data: any[];
    columns: { key: string; label: string }[];
    onEdit: (row: any) => void;
    onDelete: (id: string) => void;
}

export function CollectionTable({ data, columns, onEdit, onDelete }: CollectionTableProps) {
  return (
    <table className="min-w-full border">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key} className="border px-4 py-2">{col.label}</th>
          ))}
          <th className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {columns.map((col) => (
              <td key={col.key} className="border px-4 py-2">{row[col.key]}</td>
            ))}
            <td className="border px-4 py-2 flex gap-2">
              <Button variant="outline" onClick={() => onEdit(row)}>Edit</Button>
              <Button variant="destructive" onClick={() => onDelete(row.id)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
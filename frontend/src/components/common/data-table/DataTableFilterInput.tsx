import { Table } from '@tanstack/react-table';

interface DataTableFilterInputProps<TData> {
  table: Table<TData>;
}

export function DataTableFilterInput<TData>({ table }: DataTableFilterInputProps<TData>) {
  return (
    <input
      placeholder="Filter..."
      onChange={({ target }) => table.setGlobalFilter(String(target.value))}
      className="my-4 w-full rounded border-2 p-2"
    />
  );
}

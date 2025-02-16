export interface DataTableColumn<T> {
  colId: string;
  header: React.ReactNode;
  headerClassName?: string;
  className?: string;
  accessorKey?: string;
  cell: (row: T) => React.ReactNode;
}

export type SortDirection = "asc" | "desc";

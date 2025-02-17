import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTableHead } from "./data-table-header";
import { DataTableColumn } from "./types";
import { DataTablePagination } from "./data-table-pagination";
import { useSearchParams } from "next/navigation";

export interface DataTableProps<TData> {
  columns: DataTableColumn<TData>[];
  data: TData[];
  className?: string;
}

export default function DataTable<T>({
  columns,
  data,
  className,
}: DataTableProps<T>) {
  const searchParams = useSearchParams();
  const limit = parseInt(searchParams.get("limit") ?? "10");
  const page = parseInt(searchParams.get("page") ?? "1");

  const start = (page - 1) * limit;
  const end = start + limit;

  return (
    <>
      {/* TODO: Global filters (search etc) */}
      {/* TODO: Bulk actions */}
      <Table className={className}>
        <TableHeader>
          <TableRow>
            {columns.map((column, idx) => (
              <TableHead key={idx} className={column.headerClassName}>
                <DataTableHead colId={column.colId}>
                  {column.header}
                </DataTableHead>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.slice(start, end).map((row, idx) => (
            <TableRow key={idx}>
              {columns.map((column, idx) => (
                <TableCell key={idx} className={column.className}>
                  {column.cell(row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DataTablePagination total={data.length} />
    </>
  );
}

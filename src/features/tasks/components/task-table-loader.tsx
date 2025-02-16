import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TaskTableLoading() {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>
            <Skeleton className="h-4 rounded-full" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 rounded-full" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-4 rounded-full" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...new Array(10)].map((_, idx) => (
          <TableRow key={idx}>
            <TableCell>
              <Skeleton className="h-4 rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 rounded-full" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-4 rounded-full" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default TaskTableLoading;

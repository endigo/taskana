import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface DataTablePaginationProps {
  total: number;
  pageSizeOptions?: number[];
}

export function DataTablePagination({
  total,
  pageSizeOptions = [10, 20, 30, 40, 50],
}: DataTablePaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const limit = searchParams.get("limit") ?? "10";
  const page = parseInt(searchParams.get("page") ?? "1");

  const totalPages = Math.ceil(total / parseInt(limit));

  const handlePageChange = (newPage: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", newPage.toString());
    router.push(`?${newSearchParams.toString()}`);
  };

  const handleLimitChange = (newLimit: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("limit", newLimit.toString());
    // Reset page to 1 when changing limit
    newSearchParams.set("page", "1");
    router.push(`?${newSearchParams.toString()}`);
  };

  return (
    <div className="flex items-center justify-between space-x-6 lg:space-x-8 w-full mt-2">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={limit}
          onValueChange={(value) => {
            handleLimitChange(value);
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={limit} />
          </SelectTrigger>
          <SelectContent side="top">
            {pageSizeOptions.map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        Page {page} of {totalPages}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => handlePageChange(1)}
          disabled={page === 1}
        >
          <span className="sr-only">Go to first page</span>
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => handlePageChange(totalPages)}
          disabled={page === totalPages}
        >
          <span className="sr-only">Go to last page</span>
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

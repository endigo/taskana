import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SortDirection } from "./types";
import { useRouter, useSearchParams } from "next/navigation";

interface DataTableHeadProps {
  colId: string;
  className?: string;
  children: React.ReactNode;
}

export const DataTableHead = ({
  colId,
  className,
  children,
}: DataTableHeadProps) => {
  const router = useRouter();
  const params = useSearchParams();

  let sortDirection: SortDirection | undefined;

  const sortParams = params.getAll("sort");
  const sortParam = sortParams.find((param) => param.startsWith(colId));

  if (sortParam) {
    sortDirection = sortParam.split("_")[1] as SortDirection;
  }

  const handleSortChange = (direction?: SortDirection) => {
    const nextParams = new URLSearchParams(params);
    nextParams.delete("sort");
    // TODO: Implement multiple columns sorting
    if (direction) {
      nextParams.append("sort", `${colId}_${direction}`);
    }

    router.push(`?${nextParams.toString()}`);
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{children}</span>
            {sortDirection === "desc" ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            ) : sortDirection === "asc" ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronsUpDown className="ml-2 h-4 w-4" aria-hidden="true" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem
            aria-label="Clear Sort"
            onClick={() => handleSortChange()}
          >
            <ChevronsUpDown
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
              aria-hidden="true"
            />
            None
          </DropdownMenuItem>
          <DropdownMenuItem
            aria-label="Sort ascending"
            onClick={() => handleSortChange("asc")}
          >
            <ArrowUpIcon
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
              aria-hidden="true"
            />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem
            aria-label="Sort descending"
            onClick={() => handleSortChange("desc")}
          >
            <ArrowDownIcon
              className="mr-2 h-3.5 w-3.5 text-muted-foreground/70"
              aria-hidden="true"
            />
            Desc
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

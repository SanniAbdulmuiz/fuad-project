import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginationProps {
  table: any; // keep loose typing here to avoid heavy generics
}

export default function Pagination({ table }: PaginationProps) {
  const pageCount = table.options.pageCount ?? 0;
  const currentPage = table.getState().pagination.pageIndex + 1; // 1-based
  const pageSize = table.getState().pagination.pageSize;
  const totalRecords: number = table.options.meta?.totalRecords ?? 0;
  const start = totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalRecords);

  return (
    <div className="flex items-center justify-between mt-4">
      {/* Left: Items per page select + label + range */}
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Select
          value={String(pageSize)}
          onValueChange={(val) => table.setPageSize(Number(val))}
        >
          <SelectTrigger className="w-[72px]">
            <SelectValue placeholder={String(pageSize)} />
          </SelectTrigger>
          <SelectContent>
            {[10, 15, 20, 25, 30, 40].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span>Items per page</span>
        <span className="text-foreground">
          {start}-{end} of {totalRecords} items
        </span>
      </div>

      {/* Right: Page select + of pages + chevrons */}
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Select
          value={String(currentPage)}
          onValueChange={(val) => table.setPageIndex(Number(val) - 1)}
        >
          <SelectTrigger className="w-[56px]">
            <SelectValue placeholder={String(currentPage)} />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: pageCount }, (_, i) => (
              <SelectItem key={i} value={String(i + 1)}>
                {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <span className="text-foreground">of {pageCount} pages</span>

        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

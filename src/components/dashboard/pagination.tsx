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
  table: any; // Replace with correct TanStack Table type if needed
}

export default function Pagination({ table }: PaginationProps) {
  const pageCount = table.getPageCount();
  const currentPage = table.getState().pagination.pageIndex + 1; // 1-based
  const totalItems = table.getRowModel().rows.length; // only current page, we need full dataset size
  const totalRecords = table.options.data.length; // all rows from dataset

  const pageSize = table.getState().pagination.pageSize;
  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(start + pageSize - 1, totalRecords);

  return (
    <div className="flex items-center justify-between mt-4">
      {/* Left side: Page dropdown + arrows */}
      <div className="flex items-center gap-2">
        <Select
          value={String(currentPage)}
          onValueChange={(val) => table.setPageIndex(Number(val) - 1)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder={`${currentPage} of ${pageCount} pages`} />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: pageCount }, (_, i) => (
              <SelectItem key={i} value={String(i + 1)}>
                {i + 1} of {pageCount} pages
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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

      {/* Right side: Items per page */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Select
          value={String(pageSize)}
          onValueChange={(val) => table.setPageSize(Number(val))}
        >
          <SelectTrigger className="w-[80px]">
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
        <span>items per page</span>
        <span>
          {start}–{end} of {totalRecords} items
        </span>
      </div>
    </div>
  );
}

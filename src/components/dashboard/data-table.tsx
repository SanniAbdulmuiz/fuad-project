"use client";

import * as React from "react";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search, Filter, Calendar } from "lucide-react";

import SortIcon from "@/assets/sort.svg";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FilterModal } from "./filterModal";
import Pagination from "./pagination";
import { api } from "@/lib/api";
import { session } from "@/lib/session";
import type { Transaction as RowTransaction, TransactionsResponse, ApiTransaction } from "@/types/transaction";
import { format } from "date-fns";

type Transaction = RowTransaction;

// ---------- Columns (with checkbox + sort icon + channel pill) ----------
const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div>
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  },
  {
    accessorKey: "gymName",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0 text-sm font-medium text-[#2C2D33] hover:bg-transparent"
      >
        Gym Name
        <Image
          src={SortIcon}
          alt="Sort"
          className="ml-2"
          width={14}
          height={14}
        />
      </Button>
    ),
    filterFn: "includesString",
    cell: ({ row }) => (
      <div className="text-[14px] leading-[100%] font-normal text-[#6E7079]">{row.getValue("gymName")}</div>
    ),
  },
  {
    accessorKey: "eventDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0 text-sm font-medium text-[#2C2D33] hover:bg-transparent"
      >
        Event Date
        <Image
          src={SortIcon}
          alt="Sort"
          className="ml-2"
          width={14}
          height={14}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-[14px] leading-[100%] font-normal text-[#6E7079]">{row.getValue("eventDate")}</div>
    ),
  },
  {
    accessorKey: "eventType",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0 text-sm font-medium text-[#2C2D33] hover:bg-transparent"
      >
        Event Type
        <Image
          src={SortIcon}
          alt="Sort"
          className="ml-2"
          width={14}
          height={14}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-[14px] leading-[100%] font-normal text-[#6E7079]">{row.getValue("eventType")}</div>
    ),
  },
  {
    accessorKey: "trackingId",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0 text-sm font-medium text-[#2C2D33] hover:bg-transparent"
      >
        Tracking ID
        <Image
          src={SortIcon}
          alt="Sort"
          className="ml-2"
          width={14}
          height={14}
        />
      </Button>
    ),
    cell: ({ row }) => {
      const shortId = row.getValue("trackingId") as string;
      const fullId = (row.original as any).trackingIdFull as string | undefined;
      return (
        <div className="flex items-center gap-2">
          <span title={fullId || shortId} className="text-[14px] leading-[100%] font-normal text-[#6E7079]">
            {shortId}
          </span>
          <button
            type="button"
            aria-label="Copy tracking ID"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(fullId || shortId);
                toast.success("Tracking ID copied");
              } catch {
                toast.error("Failed to copy");
              }
            }}
            className="p-1 rounded hover:bg-muted/50"
          >
            <Image src={require("@/assets/copy.svg")} alt="Copy" width={12} height={14} />
          </button>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0 text-sm font-medium text-[#2C2D33] hover:bg-transparent w-full justify-end"
      >
        Amount
        <Image
          src={SortIcon}
          alt="Sort"
          className="ml-2"
          width={14}
          height={14}
        />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(amount);
      return (
        <div className="text-right font-normal text-[14px] leading-[100%] text-[#6E7079]">
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "paymentDate",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0 text-sm font-medium text-[#2C2D33] hover:bg-transparent"
      >
        Payment Date
        <Image
          src={SortIcon}
          alt="Sort"
          className="ml-2"
          width={14}
          height={14}
        />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-[14px] leading-[100%] font-normal text-[#6E7079]">
        {row.getValue("paymentDate")}
      </div>
    ),
  },
  {
    accessorKey: "channel",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="px-0 text-sm font-medium text-[#2C2D33] hover:bg-transparent"
      >
        Channel
        <Image
          src={SortIcon}
          alt="Sort"
          className="ml-2"
          width={14}
          height={14}
        />
      </Button>
    ),
    cell: ({ row }) => {
      const channel = row.getValue("channel") as string;
      const pill =
        channel === "Card"
          ? "bg-green-100 text-green-800"
          : "bg-orange-100 text-orange-800";
      return (
        <span className={`px-2 py-1 rounded-full text-xs ${pill}`}>
          {channel}
        </span>
      );
    },
  },
];

type FiltersState = {
  eventType?: string;
  channel?: string;
  gym?: string;
  amountFrom?: string;
  amountTo?: string;
  search?: string;
};

export function DataTable() {
  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const token = session.getToken();
  const [pagination, setPagination] = React.useState({ pageIndex: 0, pageSize: 10 });

  const [filters, setFilters] = React.useState<FiltersState>({});
  const [searchText, setSearchText] = React.useState("");

  React.useEffect(() => {
    const id = setTimeout(() => {
      setFilters((prev) => ({ ...prev, search: searchText || undefined }));
    }, 400);
    return () => clearTimeout(id);
  }, [searchText]);

  const { data: trxResponse, isLoading, isFetching, isError } = useQuery<TransactionsResponse>({
    queryKey: ["transactions", pagination.pageIndex, pagination.pageSize, token, filters],
    queryFn: () => {
      const common = { page: pagination.pageIndex + 1, limit: pagination.pageSize };
      const hasAnyFilter = Boolean(
        filters.eventType || filters.channel || filters.gym || filters.amountFrom || filters.amountTo || filters.search
      );
      if (hasAnyFilter) {
        const minAmount = filters.amountFrom ? Number(filters.amountFrom) : undefined;
        const maxAmount = filters.amountTo ? Number(filters.amountTo) : undefined;
        const search = (filters.search && filters.search.length > 0)
          ? filters.search
          : (filters.gym && filters.gym !== "all" ? filters.gym : undefined);
        return api.filterTransactions(token!, {
          ...common,
          eventType: filters.eventType,
          channel: filters.channel,
          minAmount,
          maxAmount,
          search,
        });
      }
      return api.getTransactions(token!, common);
    },
    enabled: !!token && isClient,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 30,
  });

  const data = React.useMemo<Transaction[]>(() => {
    const rows: any[] = (trxResponse as any)?.data ?? [];
    return rows.map((t: any) => ({
      id: t.transactionId || t._id || "",
      gymName: (t.gym && t.gym.name) || t.gymName || "—",
      eventDate: formatDateTime(t.bookingDate),
      eventType: t.eventType || t.className || "",
      trackingId: ((t.transactionId || t._id || "") as string).slice(0, 9),
      trackingIdFull: t.transactionId || t._id || "",
      amount: String(t.amountPaid ?? 0),
      paymentDate: formatYear(t.bookingDate),
      channel: "Card",
    }));
  }, [trxResponse]);

  const pageCount = (trxResponse as any)?.pagination?.totalPages ?? (trxResponse as any)?.totalPages ?? 0;
  const totalRecords = (trxResponse as any)?.pagination?.total ?? (trxResponse as any)?.total ?? data.length;

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    pageCount,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onPaginationChange: setPagination,
    meta: { totalRecords, isFetching },
    enableRowSelection: true,
  });

  function formatDateTime(dateIso: string) {
    try {
      const d = new Date(dateIso);
      return format(d, "dd MMM yyyy - hh:mm a");
    } catch {
      return dateIso;
    }
  }

  function formatYear(dateIso: string) {
    try {
      const d = new Date(dateIso);
      return format(d, "yyyy");
    } catch {
      return dateIso;
    }
  }

  if (!isClient) {
    return (
      <div className="w-full">
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader className="border-b">
              <TableRow>
                {columns.map((_, idx) => (
                  <TableHead key={idx}></TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Loading transactions...
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Gym Transactions</h2>

        <div className="flex items-center gap-2">
          {/* Search (filters the gymName column) */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search gyms..."
              className="pl-10 w-[220px]"
              value={searchText}
              onChange={(e) => {
                const val = e.target.value;
                setSearchText(val);
                table.getColumn("gymName")?.setFilterValue(val);
              }}
            />
          </div>

          <FilterModal
            gymOptions={Array.from(new Set((data ?? []).map((d) => d.gymName).filter(Boolean)))}
            onApply={(f) => {
              setFilters({
                eventType: (f.eventTypes.session && !f.eventTypes.membership) ? "SESSION" : (f.eventTypes.membership && !f.eventTypes.session) ? "MEMBERSHIP" : undefined,
                channel: f.channel && f.channel !== "all" ? f.channel : undefined,
                gym: f.gym && f.gym !== "all" ? f.gym : undefined,
                amountFrom: f.amountFrom || undefined,
                amountTo: f.amountTo || undefined,
              });
              // Example: set column filter for channel
              table
                .getColumn("channel")
                ?.setFilterValue(
                  f.channel === "all" ? undefined : f.channel
                );

              // Example: filter gymName column
              table
                .getColumn("gymName")
                ?.setFilterValue(
                  f.gym === "all" ? undefined : f.gym
                );

              // You can also store amounts and eventTypes and apply custom filtering logic with table.setColumnFilters(...)
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader className="border-b">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b-0">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="whitespace-nowrap">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading || isFetching ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Loading transactions...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4 px-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination table={table} />
    </div>
  );
}

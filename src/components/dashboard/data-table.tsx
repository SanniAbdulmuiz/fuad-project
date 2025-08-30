"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Search, Filter, Calendar } from "lucide-react";

import SortIcon from "@/assets/sort.svg";
import { Button } from "@/components/ui/button";
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
import DateFilter from "./DateFilter";
import Pagination from "./pagination";
import { columns } from "./columns";

export type Transaction = {
  id: string;
  gymName: string;
  eventDate: string;
  eventType: string;
  trackingId: string;
  amount: string;
  paymentDate: string;
  channel: "Card" | "Transfer";
};

export function DataTable() {
  // Memoize to avoid re-renders/jank
  const data = React.useMemo<Transaction[]>(
    () => [
      {
        id: "1",
        gymName: "Rebirth Era Gym",
        eventDate: "12 Aug 2022 - 12:25 am",
        eventType: "Session",
        trackingId: "9348fjr73",
        amount: "25000",
        paymentDate: "12 Aug 2022 - 12:25 am",
        channel: "Card",
      },
      {
        id: "2",
        gymName: "Lo Fitness",
        eventDate: "12 Aug 2022 - 12:25 am",
        eventType: "Gym membership",
        trackingId: "9348fjr73",
        amount: "25000",
        paymentDate: "12 Aug 2022 - 12:25 am",
        channel: "Card",
      },
      {
        id: "3",
        gymName: "Rebirth Era Gym",
        eventDate: "12 Aug 2022 - 12:25 am",
        eventType: "Trainer",
        trackingId: "9348fjr73",
        amount: "25000",
        paymentDate: "12 Aug 2022 - 12:25 am",
        channel: "Transfer",
      },
      {
        id: "4",
        gymName: "I Am Fit",
        eventDate: "12 Aug 2022 - 12:25 am",
        eventType: "Gym membership",
        trackingId: "9348fjr73",
        amount: "25000",
        paymentDate: "12 Aug 2022 - 12:25 am",
        channel: "Card",
      },
      {
        id: "5",
        gymName: "I Am Fit",
        eventDate: "12 Aug 2022 - 12:25 am",
        eventType: "Session",
        trackingId: "9348fjr73",
        amount: "25000",
        paymentDate: "12 Aug 2022 - 12:25 am",
        channel: "Card",
      },
      {
        id: "6",
        gymName: "Lo Fitness",
        eventDate: "12 Aug 2022 - 12:25 am",
        eventType: "Session",
        trackingId: "9348fjr73",
        amount: "25000",
        paymentDate: "12 Aug 2022 - 12:25 am",
        channel: "Card",
      },
      {
        id: "7",
        gymName: "Lo Fitness",
        eventDate: "12 Aug 2022 - 12:25 am",
        eventType: "Gym membership",
        trackingId: "9348fjr73",
        amount: "25000",
        paymentDate: "12 Aug 2022 - 12:25 am",
        channel: "Card",
      },
    ],
    []
  );

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
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    enableRowSelection: true,
  });

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
              value={
                (table.getColumn("gymName")?.getFilterValue() as string) ?? ""
              }
              onChange={(e) =>
                table.getColumn("gymName")?.setFilterValue(e.target.value)
              }
            />
          </div>

          <FilterModal
            onApply={(filters) => {
              table
                .getColumn("channel")
                ?.setFilterValue(
                  filters.channel === "all" ? undefined : filters.channel
                );

              table
                .getColumn("gymName")
                ?.setFilterValue(
                  filters.gym === "all" ? undefined : filters.gym
                );
            }}
          />
          <DateFilter />
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
            {table.getRowModel().rows?.length ? (
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
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
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

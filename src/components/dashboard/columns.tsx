"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Transaction } from "@/types/transaction";
import SortIcon from "@/assets/sort.svg"; // SVG is now a React component ✅

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="pl-4">
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
        className="ml-4"
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
        <SortIcon className="ml-2 w-4 h-4" /> {/* ✅ SVG as component */}
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-[#6E7079]">{row.getValue("gymName")}</div>
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
        <SortIcon className="ml-2 w-4 h-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-[#6E7079]">{row.getValue("eventDate")}</div>
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
        <SortIcon className="ml-2 w-4 h-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-[#6E7079]">{row.getValue("eventType")}</div>
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
        <SortIcon className="ml-2 w-4 h-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-[#6E7079]">{row.getValue("trackingId")}</div>
    ),
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
        <SortIcon className="ml-2 w-4 h-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
      }).format(amount);
      return (
        <div className="text-right font-medium text-sm text-[#6E7079]">
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
        <SortIcon className="ml-2 w-4 h-4" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="text-sm text-[#6E7079]">
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
        <SortIcon className="ml-2 w-4 h-4" />
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

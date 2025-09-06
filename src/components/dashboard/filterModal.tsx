"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

type Filters = {
  eventTypes: { membership: boolean; session: boolean };
  channel: string; // "all" | "Card" | "Transfer"
  gym: string; // "all" or gym id/name
  amountFrom: string;
  amountTo: string;
};

export function FilterModal({ onApply, gymOptions = [] }: { onApply?: (f: Filters) => void; gymOptions?: string[] }) {
  const [open, setOpen] = React.useState(false);

  const [eventTypes, setEventTypes] = React.useState({
    membership: false,
    session: false,
  });
  const [channel, setChannel] = React.useState("all");
  const [gym, setGym] = React.useState("all");
  const [amountFrom, setAmountFrom] = React.useState("");
  const [amountTo, setAmountTo] = React.useState("");

  const uniqueGyms = React.useMemo(() => Array.from(new Set(gymOptions.filter(Boolean))), [gymOptions]);

  function handleApply() {
    const filters: Filters = {
      eventTypes,
      channel,
      gym,
      amountFrom,
      amountTo,
    };
    onApply?.(filters);
    setOpen(false);
  }

  function handleReset() {
    setEventTypes({ membership: false, session: false });
    setChannel("all");
    setGym("all");
    setAmountFrom("");
    setAmountTo("");
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[360px] rounded-[12px] px-[21px] py-6">
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {/* Event Type */}
          <div>
            <p className="text-[12px] leading-[100%] font-normal text-[#53545C]">Event Type</p>
            <div className="flex gap-8 mt-[15.5px]">
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={eventTypes.membership}
                  onCheckedChange={(v) =>
                    setEventTypes((s) => ({ ...s, membership: !!v }))
                  }
                  className="h-6 w-6 rounded-md border-[#CFD3D4]"
                />
                <span className="text-[14px] leading-[100%] font-normal text-[#83898C] tracking-[-0.01em]">
                  Membership
                </span>
              </label>

              <label className="flex items-center gap-4 cursor-pointer">
                <Checkbox
                  checked={eventTypes.session}
                  onCheckedChange={(v) =>
                    setEventTypes((s) => ({ ...s, session: !!v }))
                  }
                  className="h-6 w-6 rounded-md border-[#CFD3D4]"
                />
                <span className="text-[14px] leading-[100%] font-normal text-[#83898C] tracking-[-0.01em]">Session</span>
              </label>
            </div>
          </div>

          <hr className="my-5 border-t border-gray-200" />

          {/* Channel */}
          <div>
            <p className="text-[12px] leading-[100%] font-normal text-[#53545C] mb-2">Channel</p>
            <Select value={channel} onValueChange={setChannel}>
              <SelectTrigger className="w-full h-10 rounded-[12px] border-gray-200 px-4 text-sm">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Card">Card</SelectItem>
                <SelectItem value="Transfer">Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Gym */}
          <div>
            <p className="text-[12px] leading-[100%] font-normal text-[#53545C] mb-2">Gym</p>
            <Select value={gym} onValueChange={setGym}>
              <SelectTrigger className="w-full h-10 rounded-[12px] border-gray-200 px-4 text-sm">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {uniqueGyms.map((name) => (
                  <SelectItem key={name} value={name}>{name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div>
            <p className="text-[12px] leading-[100%] font-normal text-[#1C1D22] mb-2">Amount</p>
            <div className="h-2" />
            <div className="flex gap-3">
              <div className="flex flex-col flex-1">
                <label className="text-xs font-normal text-[#1C1D22] mb-1">From</label>
                <Input
                  type="number"
                  value={amountFrom}
                  onChange={(e) => setAmountFrom(e.target.value)}
                  className="flex-1 h-10 rounded-[12px] border border-gray-200 px-4"
                />
              </div>

              <div className="flex flex-col flex-1">
                <label className="text-xs font-normal text-[#1C1D22] mb-1">To</label>
                <Input
                  type="number"
                  value={amountTo}
                  onChange={(e) => setAmountTo(e.target.value)}
                  className="flex-1 h-10 rounded-[12px] border border-gray-200 px-4"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex">
            <button
              onClick={handleApply}
              className="w-full h-12 rounded-[12px] bg-primary text-primary-foreground text-[16px] leading-[150%] font-normal"
            >
              Filter
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default FilterModal;

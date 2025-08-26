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

type Filters = {
  eventTypes: { membership: boolean; session: boolean };
  channel: string; // "all" | "Card" | "Transfer"
  gym: string; // "all" or gym id/name
  amountFrom: string;
  amountTo: string;
};

export function FilterModal({ onApply }: { onApply?: (f: Filters) => void }) {
  const [open, setOpen] = React.useState(false);

  const [eventTypes, setEventTypes] = React.useState({
    membership: false,
    session: false,
  });
  const [channel, setChannel] = React.useState("all");
  const [gym, setGym] = React.useState("all");
  const [amountFrom, setAmountFrom] = React.useState("");
  const [amountTo, setAmountTo] = React.useState("");

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

      <DialogContent className="sm:max-w-[420px] rounded-lg">
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          {/* Event Type */}
          <div>
            <p className="text-sm font-medium mb-2">Event Type</p>
            <div className="flex gap-10">
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={eventTypes.membership}
                  onCheckedChange={(v) =>
                    setEventTypes((s) => ({ ...s, membership: !!v }))
                  }
                />
                <span className="text-sm text-muted-foreground">
                  Membership
                </span>
              </label>

              <label className="flex items-center gap-4 cursor-pointer">
                <Checkbox
                  checked={eventTypes.session}
                  onCheckedChange={(v) =>
                    setEventTypes((s) => ({ ...s, session: !!v }))
                  }
                />
                <span className="text-sm text-muted-foreground">Session</span>
              </label>
            </div>
          </div>

          <hr className="border-t border-gray-100" />

          {/* Channel */}
          <div>
            <p className="text-sm font-medium mb-2">Channel</p>
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm bg-white"
            >
              <option value="all">All</option>
              <option value="Card">Card</option>
              <option value="Transfer">Transfer</option>
            </select>
          </div>

          {/* Gym */}
          <div>
            <p className="text-sm font-medium mb-2">Gym</p>
            <select
              value={gym}
              onChange={(e) => setGym(e.target.value)}
              className="w-full rounded-md border px-3 py-2 text-sm bg-white"
            >
              <option value="all">All</option>
              <option value="Rebirth Era Gym">Rebirth Era Gym</option>
              <option value="Lo Fitness">Lo Fitness</option>
              <option value="I Am Fit">I Am Fit</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <p className="text-sm font-medium mb-2">Amount</p>
            <div className="flex gap-3">
              <div className="flex flex-col flex-1">
                <label className="text-sm font-medium mb-1">From</label>
                <Input
                  type="number"
                  value={amountFrom}
                  onChange={(e) => setAmountFrom(e.target.value)}
                  className="flex-1"
                />
              </div>

              <div className="flex flex-col flex-1">
                <label className="text-sm font-medium mb-1">To</label>
                <Input
                  type="number"
                  value={amountTo}
                  onChange={(e) => setAmountTo(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => {
                handleReset();
              }}
              className="flex-1 py-3 rounded-md border text-sm"
            >
              Reset
            </button>

            <button
              onClick={handleApply}
              className="flex-1 py-3 rounded-md bg-teal-600 text-white text-sm"
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

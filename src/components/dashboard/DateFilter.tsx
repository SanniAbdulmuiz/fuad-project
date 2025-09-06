import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";

export default function DateFilter() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="flex items-center gap-2"
        onClick={() => setOpen(!open)}
      >
        <CalendarIcon className="w-4 h-4" />
        {date ? date.toDateString() : "Filter"}
      </Button>

      {open && (
        <div className="absolute mt-2 bg-white border rounded-lg shadow p-2 z-50">
          <DayPicker
            mode="single"
            selected={date}
            onSelect={setDate}
            captionLayout="dropdown" // 👈 adds month/year dropdowns
            fromYear={2000} // 👈 earliest year
            toYear={2035} // 👈 latest year
          />
        </div>
      )}
    </div>
  );
}

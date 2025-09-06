import { User } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b bg-white">
      <div>
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 text-sm font-semibold rounded-md bg-primary text-primary-foreground">
          KER Active
        </button>
        <button className="p-2 rounded-full border">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}

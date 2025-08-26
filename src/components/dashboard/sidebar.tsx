"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Home, Settings, Wallet, LogOut } from "lucide-react";
import kerlogo from "@/assets/Kerlogo.png";
import { cn } from "@/lib/utils";
import { session } from "@/lib/session";
import { toast } from "sonner";

const navItems = [
  { href: "/dashboard", icon: Home },
  { href: "/dashboard/wallet", icon: Wallet },
  { href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleSignOut() {
    session.removeToken();
    toast.success("You have been signed out.");
    router.push("/signin");
  }

  return (
    <aside className="w-16 bg-white border-r flex flex-col items-center py-4">
      <div className="p-2 mb-8">
        <Image src={kerlogo} alt="Ker Active Logo" width={32} height={32} />
      </div>
      <nav className="flex flex-col items-center gap-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "p-3 rounded-lg text-gray-500 hover:bg-primary/10 hover:text-primary transition-colors",
                isActive && "bg-primary text-white hover:bg-primary hover:text-white"
              )}
            >
              <item.icon className="w-6 h-6" />
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto">
        <button
          onClick={handleSignOut}
          className="p-3 rounded-lg text-gray-500 hover:bg-red-500/10 hover:text-red-500 transition-colors"
        >
          <LogOut className="w-6 h-6" />
        </button>
      </div>
    </aside>
  );
}

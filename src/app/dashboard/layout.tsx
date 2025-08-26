import Sidebar from "@/components/dashboard/sidebar";
import Header from "@/components/dashboard/header";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`flex min-h-screen ${montserrat.className}`}>
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 bg-gray-50/50">
          {children}
        </main>
      </div>
    </div>
  );
}

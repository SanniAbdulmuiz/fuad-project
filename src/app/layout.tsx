import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import QueryProvider from "@/providers/query-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={bricolage.className}>
        <QueryProvider>
          {children}
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
              },
              classNames: {
                success: "!bg-primary !text-primary-foreground",
                error: "!bg-red-500 !text-white",
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}



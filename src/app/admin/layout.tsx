import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mosque Admin Dashboard",
  description:
    "Admin dashboard for managing prayer times and donation campaigns",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <h1 className="text-2xl font-bold">Mosque Admin Dashboard</h1>
      </header>
      <nav className="bg-secondary text-secondary-foreground px-6 py-2">
        <Button asChild variant="ghost" className="mr-4">
          <Link href="/admin">Dashboard</Link>
        </Button>
        <Button asChild variant="ghost" className="mr-4">
          <Link href="/admin/prayer-times">Prayer Times</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/admin/donation-campaigns">Donation Campaigns</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/">Back to Home Page</Link>
        </Button>
      </nav>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

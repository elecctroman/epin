"use client";

import Link from "next/link";
import { MainNav } from "@/components/layout/site-nav";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-lg font-semibold">
          EPINX
        </Link>
        <MainNav />
        <div className="flex items-center gap-2">
          <Link
            href="/giris"
            className="rounded-md border px-3 py-2 text-sm font-medium hover:bg-secondary"
          >
            Giriş Yap
          </Link>
          <Link
            href="/kayit"
            className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Kayıt Ol
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

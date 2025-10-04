import { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <footer className="border-t bg-muted/30">
        <div className="container py-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} EPINX Dijital Market. Tüm hakları saklıdır.
        </div>
      </footer>
    </div>
  );
}

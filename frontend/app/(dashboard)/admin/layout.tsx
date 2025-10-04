import Link from "next/link";
import { ReactNode } from "react";

const menu = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/urunler", label: "Ürünler" },
  { href: "/admin/keyler", label: "Key Stokları" },
  { href: "/admin/siparisler", label: "Siparişler" },
  { href: "/admin/kullanicilar", label: "Kullanıcılar" },
  { href: "/admin/ayarlar", label: "Ayarlar" }
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="hidden w-64 flex-col border-r bg-muted/30 p-6 md:flex">
        <div className="text-lg font-semibold">EPINX Admin</div>
        <nav className="mt-6 space-y-2">
          {menu.map((item) => (
            <Link key={item.href} href={item.href} className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-primary/10">
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}

import Link from "next/link";

const navItems = [
  { href: "/urunler", label: "Ürünler" },
  { href: "/destek", label: "Destek" },
  { href: "/blog", label: "Blog" },
  { href: "/admin", label: "Yönetim" }
];

export function MainNav() {
  return (
    <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
      {navItems.map((item) => (
        <Link key={item.href} href={item.href} className="transition hover:text-primary">
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

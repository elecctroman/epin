import { Metadata } from "next";
import { ProductFilters } from "@/components/store/product-filters";
import { ProductGrid } from "@/components/store/product-grid";

export const metadata: Metadata = {
  title: "Ürünler | EPINX",
  description: "Popüler oyun kodu ve hesap satışları."
};

export default function ProductsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="border-b bg-muted/40">
        <div className="container py-10">
          <h1 className="text-3xl font-bold">Tüm Ürünler</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            EPIN, key ve oyun hesaplarınızı kategorize edin, stok ve fiyat yönetimini tek panelden
            kontrol edin.
          </p>
        </div>
      </div>
      <main className="container flex flex-1 flex-col gap-8 py-10">
        <ProductFilters />
        <ProductGrid />
      </main>
    </div>
  );
}

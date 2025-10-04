import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { Product } from "@/types/product";
import { maskKey } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const mockProduct: Product = {
  id: "1",
  title: "Valorant VP 1250",
  category: "Valorant",
  price: 189.9,
  description: "Valorant hesabınıza yüklenebilir VP kodu",
  image: "/images/valorant.jpg",
  stock: 5
};

export const metadata: Metadata = {
  title: "Ürün Detayı | EPINX"
};

export default function ProductDetail({ params }: { params: { slug: string } }) {
  if (params.slug !== mockProduct.id) {
    notFound();
  }

  return (
    <div className="container grid gap-10 py-12 md:grid-cols-[2fr,1fr]">
      <div className="space-y-6">
        <Badge>{mockProduct.category}</Badge>
        <h1 className="text-4xl font-bold">{mockProduct.title}</h1>
        <p className="text-muted-foreground">{mockProduct.description}</p>
        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold">Özellikler</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm text-muted-foreground">
            <li>Otomatik teslimat ve e-posta bildirimi</li>
            <li>Key stokları maskelenmiş olarak saklanır: {maskKey("ABCD-EFGH-IJKL")}</li>
            <li>İade ve iptal süreçleri yönetim panelinden takip edilir</li>
          </ul>
        </div>
      </div>
      <Card className="space-y-6 p-6">
        <CardContent className="space-y-4 p-0">
          <div>
            <span className="text-sm text-muted-foreground">Fiyat</span>
            <p className="text-3xl font-bold">{mockProduct.price.toFixed(2)}₺</p>
          </div>
          <Link
            href="/odeme"
            className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
          >
            Hemen Satın Al
          </Link>
          <p className="text-xs text-muted-foreground">
            Ödeme sonrası stoktan rastgele key alınır ve size gösterilir. Ayrıca e-posta ile teslim
            edilir.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

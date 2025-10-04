import Image from "next/image";
import Link from "next/link";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

const demoProducts: Product[] = [
  {
    id: "1",
    title: "Valorant VP 1250",
    category: "Valorant",
    price: 189.9,
    description: "Anında teslim Valorant VP kodu",
    image: "/images/valorant.jpg",
    stock: 25
  },
  {
    id: "2",
    title: "Steam Cüzdan 100 TL",
    category: "Steam",
    price: 109.99,
    description: "Türkiye mağazası için aktivasyon kodu",
    image: "/images/steam.jpg",
    stock: 0
  },
  {
    id: "3",
    title: "Netflix Premium Hesap",
    category: "Diğer",
    price: 79.9,
    description: "30 günlük premium üyelik",
    image: "/images/netflix.jpg",
    stock: 12
  }
];

export function FeaturedProducts() {
  return (
    <section className="container py-16">
      <div className="flex flex-col gap-3 pb-8">
        <Badge>Kampanyalar</Badge>
        <h2 className="text-3xl font-bold">Popüler ürünler</h2>
        <p className="max-w-2xl text-muted-foreground">
          Otomatik stok takip sistemi ile satışa hazır bekleyen kodlar. Ürünleriniz anında müşteriye
          teslim edilir.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {demoProducts.map((product) => (
          <Card key={product.id} className="flex flex-col">
            <CardHeader className="space-y-3">
              <div className="relative h-40 w-full overflow-hidden rounded-xl border bg-muted">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex items-center justify-between text-xs uppercase tracking-wide text-muted-foreground">
                <span>{product.category}</span>
                <span>{product.stock > 0 ? `${product.stock} adet` : "Stokta Yok"}</span>
              </div>
              <h3 className="text-lg font-semibold">{product.title}</h3>
            </CardHeader>
            <CardContent className="flex-1 text-sm text-muted-foreground">
              {product.description}
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <span className="text-xl font-semibold">{product.price.toFixed(2)}₺</span>
              <Link
                href={`/urun/${product.id}`}
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
              >
                Satın Al
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

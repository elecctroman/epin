import { Product } from "@/types/product";
import { ProductCard } from "@/components/store/product-card";

const mockProducts: Product[] = Array.from({ length: 6 }).map((_, index) => ({
  id: `${index + 1}`,
  title: `Oyun Paketi ${index + 1}`,
  category: index % 2 === 0 ? "Steam" : "Valorant",
  price: 99.9 + index * 10,
  description: "Anında teslim dijital kod",
  image: "/images/placeholder.jpg",
  stock: index % 3 === 0 ? 0 : 12
}));

export function ProductGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {mockProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

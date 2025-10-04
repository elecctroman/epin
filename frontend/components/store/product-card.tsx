"use client";

import Link from "next/link";
import { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isOutOfStock = product.stock <= 0;

  return (
    <Card className="flex flex-col">
      <CardHeader className="space-y-2">
        <Badge className="w-max">{product.category}</Badge>
        <h3 className="text-lg font-semibold">{product.title}</h3>
        <p className="text-sm text-muted-foreground">{product.description}</p>
      </CardHeader>
      <CardContent className="flex-1 text-2xl font-bold">{product.price.toFixed(2)}₺</CardContent>
      <CardFooter className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Stok: {isOutOfStock ? "Yok" : product.stock}</span>
        <Link
          href={isOutOfStock ? "#" : `/urun/${product.id}`}
          onClick={(event) => {
            if (isOutOfStock) {
              event.preventDefault();
            }
          }}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          aria-disabled={isOutOfStock}
        >
          {isOutOfStock ? "Stokta Yok" : "Satın Al"}
        </Link>
      </CardFooter>
    </Card>
  );
}

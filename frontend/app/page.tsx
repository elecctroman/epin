import { SiteHeader } from "@/components/layout/site-header";
import { FeaturedProducts } from "@/components/store/featured-products";
import { Hero } from "@/components/store/hero";
import { Faq } from "@/components/store/faq";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <FeaturedProducts />
        <Faq />
      </main>
      <footer className="border-t bg-muted/30">
        <div className="container py-6 text-sm text-muted-foreground">
          © {new Date().getFullYear()} EPINX Dijital Market. Tüm hakları saklıdır.
        </div>
      </footer>
    </div>
  );
}

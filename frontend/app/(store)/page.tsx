import { Faq } from "@/components/store/faq";
import { FeaturedProducts } from "@/components/store/featured-products";
import { Hero } from "@/components/store/hero";

export default function StoreHome() {
  return (
    <div className="space-y-24 pb-24">
      <Hero />
      <FeaturedProducts />
      <Faq />
    </div>
  );
}

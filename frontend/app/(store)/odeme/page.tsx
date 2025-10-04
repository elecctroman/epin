import Link from "next/link";

export default function CheckoutPage() {
  return (
    <div className="container grid gap-10 py-12 md:grid-cols-[2fr,1fr]">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Ödeme</h1>
        <div className="rounded-xl border bg-card p-6">
          <h2 className="text-lg font-semibold">Stripe ödeme örneği</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Ödeme formu Stripe Elements veya Iyzico iframe bileşeni ile burada render edilir. Demo
            amaçlı bu bölüm statiktir.
          </p>
        </div>
      </div>
      <div className="space-y-4 rounded-xl border bg-muted/30 p-6">
        <div className="flex items-center justify-between text-sm">
          <span>Ara Toplam</span>
          <span>189.90₺</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>KDV</span>
          <span>34.18₺</span>
        </div>
        <div className="flex items-center justify-between text-lg font-semibold">
          <span>Toplam</span>
          <span>224.08₺</span>
        </div>
        <Link
          href="/hesabim"
          className="flex w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
        >
          Ödemeyi Tamamla
        </Link>
        <p className="text-xs text-muted-foreground">
          Ödeme başarıyla tamamlandığında stoktan key düşülür ve teslimat e-postası tetiklenir.
        </p>
      </div>
    </div>
  );
}

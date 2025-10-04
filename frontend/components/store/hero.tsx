"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="container grid gap-10 py-24 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <span className="rounded-full border bg-background px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            Dijital Ürün Mağazası
          </span>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            EPINX ile saniyeler içinde EPIN, oyun kodu ve hesap teslimatı
          </h1>
          <p className="text-lg text-muted-foreground">
            Güvenli ödeme, otomatik teslimat, 7/24 destek ve güçlü yönetim paneli ile
            büyüyen dijital mağazanızı şimdi oluşturun.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/urunler"
              className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Ürünleri Keşfet
            </Link>
            <Link
              href="/admin"
              className="inline-flex items-center rounded-md border px-6 py-3 text-sm font-semibold transition hover:bg-secondary"
            >
              Yönetim Paneli
            </Link>
          </div>
          <dl className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <dt className="font-semibold">120K+</dt>
              <dd className="text-muted-foreground">Teslim edilen EPIN ve oyun hesabı</dd>
            </div>
            <div>
              <dt className="font-semibold">%99.9</dt>
              <dd className="text-muted-foreground">Otomatik teslimat başarı oranı</dd>
            </div>
          </dl>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <div className="rounded-3xl border bg-card p-8 shadow-2xl">
            <h3 className="text-lg font-semibold">Canlı Sipariş Akışı</h3>
            <ul className="mt-6 space-y-4 text-sm">
              {["Valorant VP", "Steam Cüzdan Kodu", "Riot Points"].map((product) => (
                <li key={product} className="flex items-center justify-between">
                  <span>{product}</span>
                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                    3sn önce
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-xs text-muted-foreground">
              Stripe, Iyzico, PayTR gibi ödeme sağlayıcılarına entegre olarak güvenli ve hızlı teslimat
              yapın.
            </p>
          </div>
          <div className="absolute -left-20 top-10 hidden h-40 w-40 rounded-full bg-primary/20 blur-3xl lg:block" />
          <div className="absolute -right-16 bottom-10 hidden h-52 w-52 rounded-full bg-purple-500/20 blur-3xl lg:block" />
        </motion.div>
      </div>
    </section>
  );
}

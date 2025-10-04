"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const questions = [
  {
    q: "Ödemeden sonra key nasıl teslim edilir?",
    a: "Stripe veya Iyzico üzerinden başarılı ödeme alındığında stoktan rastgele bir key seçilir, kullanıcı panelinde görünür ve e-posta ile gönderilir."
  },
  {
    q: "Stokları nasıl yönetebilirim?",
    a: "Admin panelinde manuel ekleme yapabilir veya CSV yükleyerek toplu key aktarımı gerçekleştirebilirsiniz. Sistem stok bittiğinde sizi uyarır."
  },
  {
    q: "API entegrasyonu mümkün mü?",
    a: "Geliştirici anahtarları ile 3. parti platformlarınıza sipariş açtırabilir, stok sorgulama ve key teslimi yapabilirsiniz."
  }
];

export function Faq() {
  return (
    <section className="container grid gap-8 py-16 lg:grid-cols-2">
      <div>
        <h2 className="text-3xl font-bold">Sık sorulan sorular</h2>
        <p className="mt-2 text-muted-foreground">
          Platformun temel özellikleri ve entegrasyon seçenekleri hakkında merak ettikleriniz.
        </p>
      </div>
      <Accordion type="single" collapsible className="w-full">
        {questions.map((item, index) => (
          <AccordionItem key={item.q} value={`item-${index}`}>
            <AccordionTrigger>{item.q}</AccordionTrigger>
            <AccordionContent>{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

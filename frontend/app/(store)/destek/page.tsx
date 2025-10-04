export default function SupportPage() {
  return (
    <div className="container space-y-6 py-12">
      <h1 className="text-3xl font-bold">Destek Merkezi</h1>
      <p className="text-muted-foreground">
        Ticket sistemi ile destek taleplerinizi oluşturabilir, canlı sohbet entegrasyonları ile
        müşterilerinizle 7/24 iletişim kurabilirsiniz.
      </p>
      <div className="rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold">Ticket Oluştur</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Destek modülü backend API üzerinden çalışır. Kullanıcı talepleri Prisma veritabanında
          saklanır ve admin panelinden yanıtlanır.
        </p>
      </div>
    </div>
  );
}

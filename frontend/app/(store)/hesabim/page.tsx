import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { OrdersTable } from "@/components/store/orders-table";
import { Card } from "@/components/ui/card";

export default async function AccountPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/giris");
  }

  return (
    <div className="container space-y-8 py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Hesabım</h1>
        <p className="text-muted-foreground">Sipariş geçmişinizi, bakiyenizi ve API anahtarlarınızı yönetin.</p>
      </header>
      <section className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold">Bakiye</h2>
          <p className="mt-2 text-3xl font-bold">250₺</p>
          <p className="mt-2 text-sm text-muted-foreground">Bakiye eklemek için ödeme yöntemlerini kullanabilirsiniz.</p>
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold">API Anahtarları</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            3. parti entegrasyonlarınız için JWT tabanlı API anahtarlarını oluşturun, yönetin ve iptal edin.
          </p>
        </Card>
      </section>
      <OrdersTable />
    </div>
  );
}

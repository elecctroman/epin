import { OverviewCards } from "@/components/dashboard/overview-cards";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { RecentOrders } from "@/components/dashboard/recent-orders";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 p-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Yönetim Paneli</h1>
        <p className="text-muted-foreground">Satış performansınızı ve stok durumunu tek ekrandan takip edin.</p>
      </div>
      <OverviewCards />
      <div className="grid gap-6 lg:grid-cols-2">
        <SalesChart />
        <RecentOrders />
      </div>
    </div>
  );
}

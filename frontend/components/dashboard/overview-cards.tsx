import { Card, CardContent } from "@/components/ui/card";

const metrics = [
  { label: "Toplam Gelir", value: "₺42.560", trend: "+12%" },
  { label: "Aktif Sipariş", value: "128", trend: "+5%" },
  { label: "Teslim Edilen Key", value: "6.432", trend: "+32%" },
  { label: "Yeni Kullanıcı", value: "312", trend: "+18%" }
];

export function OverviewCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <Card key={metric.label} className="border-primary/10 bg-gradient-to-br from-primary/5 via-background to-background">
          <CardContent className="space-y-2 p-6">
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="text-2xl font-semibold">{metric.value}</p>
            <span className="text-xs font-semibold text-emerald-600">{metric.trend} bu hafta</span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

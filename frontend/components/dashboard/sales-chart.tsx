import { Card, CardContent, CardHeader } from "@/components/ui/card";

const data = [
  { label: "Pzt", value: 3200 },
  { label: "Sal", value: 4100 },
  { label: "Çar", value: 3800 },
  { label: "Per", value: 5200 },
  { label: "Cum", value: 6100 },
  { label: "Cmt", value: 7200 },
  { label: "Paz", value: 5400 }
];

export function SalesChart() {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Haftalık Gelir</h2>
        <p className="text-sm text-muted-foreground">Stripe ve Iyzico satışlarından gelen toplam tutar.</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-end gap-3">
          {data.map((day) => (
            <div key={day.label} className="flex w-full flex-col items-center gap-2">
              <div
                className="w-full rounded-t-lg bg-primary/70 transition hover:bg-primary"
                style={{ height: `${(day.value / max) * 180}px` }}
              />
              <span className="text-xs font-medium text-muted-foreground">{day.label}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          Stripe webhookları ve banka entegrasyonları sayesinde ödemeler otomatik olarak teyit edilip key teslimatı yapılır.
        </p>
      </CardContent>
    </Card>
  );
}

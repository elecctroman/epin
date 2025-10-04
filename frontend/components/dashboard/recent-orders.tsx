import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { maskKey } from "@/lib/utils";

const orders = [
  { id: "SIP-1032", product: "Riot Points 650", customer: "aylin.k", key: "RIOT-650-ABCD-1234" },
  { id: "SIP-1031", product: "Steam 250 TL", customer: "mert.s", key: "STEA-2500-WXYZ" },
  { id: "SIP-1030", product: "Netflix Premium", customer: "ceren.d", key: "NETF-2024-PLAT" }
];

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">Son Siparişler</h2>
        <p className="text-sm text-muted-foreground">Ödemesi alınan ve otomatik teslim edilen siparişler.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between rounded-lg border bg-background px-4 py-3">
            <div>
              <p className="font-semibold">{order.product}</p>
              <p className="text-xs text-muted-foreground">
                {order.customer} • {maskKey(order.key)}
              </p>
            </div>
            <span className="text-xs font-semibold text-emerald-600">Teslim edildi</span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

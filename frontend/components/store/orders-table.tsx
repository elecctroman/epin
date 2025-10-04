import { maskKey } from "@/lib/utils";

const orders = [
  {
    id: "SIP-1021",
    product: "Valorant VP 1250",
    key: "VALO-1250-ABCD-EFGH",
    status: "Teslim edildi",
    date: "12.02.2024"
  },
  {
    id: "SIP-1020",
    product: "Steam Cüzdan 100 TL",
    key: "STEA-1000-ZYXW",
    status: "Teslim edildi",
    date: "10.02.2024"
  }
];

export function OrdersTable() {
  return (
    <div className="overflow-hidden rounded-xl border">
      <table className="min-w-full divide-y divide-border text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="px-4 py-3 text-left font-semibold">Sipariş No</th>
            <th className="px-4 py-3 text-left font-semibold">Ürün</th>
            <th className="px-4 py-3 text-left font-semibold">Key</th>
            <th className="px-4 py-3 text-left font-semibold">Durum</th>
            <th className="px-4 py-3 text-left font-semibold">Tarih</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-4 py-3 font-medium">{order.id}</td>
              <td className="px-4 py-3">{order.product}</td>
              <td className="px-4 py-3 font-mono">{maskKey(order.key)}</td>
              <td className="px-4 py-3">
                <span className="inline-flex rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                  {order.status}
                </span>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{order.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

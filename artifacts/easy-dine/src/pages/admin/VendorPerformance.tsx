import { useState } from "react";
import { useAppState } from "@/hooks/use-app-state";
import { Search, Download, Filter, CheckCircle2, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminVendorPerformance() {
  const { orders } = useAppState();
  const [filter, setFilter] = useState("All");

  const filteredOrders = orders.filter(o => {
    if (filter === "All") return true;
    if (filter === "Delivered") return o.status === "delivered";
    if (filter === "Rejected") return o.status === "rejected";
    if (filter === "Meal Pass") return o.orderType === "mealPass";
    return true;
  });

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Vendor Performance</h1>
          <p className="text-muted-foreground text-sm">Track order fulfillment and rejections</p>
        </div>
        <div className="flex gap-2">
          <select className="h-10 rounded-xl border border-input bg-white px-3 py-1 text-sm shadow-sm">
            <option>Today</option>
            <option>Last 7 Days</option>
            <option>This Month</option>
          </select>
          <Button variant="outline" className="h-10 rounded-xl gap-2 border-primary text-primary hover:bg-primary/5">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search by order ID, user name, or cafeteria..." 
            className="pl-10 h-12 rounded-xl bg-white border-border w-full"
          />
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['All', 'Delivered', 'Rejected', 'Meal Pass'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap border ${
              filter === f
                ? 'bg-foreground text-background border-foreground shadow-sm'
                : 'bg-white text-muted-foreground border-border hover:border-muted-foreground/50 hover:text-foreground'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[24px] shadow-sm border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
              <tr>
                <th className="px-6 py-4 font-bold">Order ID</th>
                <th className="px-6 py-4 font-bold">Cafeteria</th>
                <th className="px-6 py-4 font-bold">User</th>
                <th className="px-6 py-4 font-bold">Type & Amount</th>
                <th className="px-6 py-4 font-bold">Status</th>
                <th className="px-6 py-4 font-bold">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredOrders.map(order => (
                <tr key={order.orderId} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-semibold">{order.orderId}</td>
                  <td className="px-6 py-4">{order.shopName}</td>
                  <td className="px-6 py-4">{order.userName}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-foreground">₹{order.amount}</span>
                      <span className="text-xs text-muted-foreground capitalize">{order.orderType}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {order.status === 'delivered' ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-semibold px-2.5 py-0.5 gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Delivered
                      </Badge>
                    ) : (
                      <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none font-semibold px-2.5 py-0.5 gap-1">
                        <XCircle className="w-3 h-3" /> Rejected
                      </Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
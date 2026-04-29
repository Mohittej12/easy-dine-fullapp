import { useState } from "react";
import { useAppState } from "@/hooks/use-app-state";
import { CheckCircle2, XCircle, Clock, CalendarDays } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function VendorOrders() {
  const { orders, updateOrderStatus } = useAppState();
  const [tab, setTab] = useState<"Active" | "Delivered">("Active");

  const myOrders = orders.filter(o => o.shopName === "Meal Counter");
  
  // Since we only have delivered/rejected, we'll treat all as active unless filtered.
  // The brief asks for tabs Active / Delivered. Let's filter by delivered.
  const filteredOrders = myOrders.filter(o => {
    if (tab === "Delivered") return o.status === "delivered";
    return true; // Active shows all for now since they only have 2 statuses
  });

  const handleStatusUpdate = (orderId: string, status: "delivered" | "rejected") => {
    updateOrderStatus(orderId, status);
    toast.success(`Order marked as ${status}`);
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Orders</h1>
          <p className="text-muted-foreground text-sm">Manage incoming and past orders</p>
        </div>
        <div className="flex bg-muted p-1 rounded-xl w-full sm:w-64">
          <button onClick={() => setTab("Active")} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === "Active" ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>Active</button>
          <button onClick={() => setTab("Delivered")} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === "Delivered" ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>Delivered</button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredOrders.map(order => (
          <div key={order.orderId} className="bg-white rounded-[24px] p-5 md:p-6 shadow-sm border border-border flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-lg text-foreground">{order.orderId}</h3>
                  {order.orderType === 'mealPass' && (
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 font-bold">Ticketing</Badge>
                  )}
                  {order.orderType === 'regular' && (
                    <Badge variant="outline" className="bg-muted text-muted-foreground border-border font-bold">Regular</Badge>
                  )}
                </div>
                {order.status === 'delivered' ? (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-semibold px-3 py-1 gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Delivered
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none font-semibold px-3 py-1 gap-1">
                    <XCircle className="w-3 h-3" /> Rejected
                  </Badge>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Customer</p>
                  <p className="font-semibold text-foreground">{order.userName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Time</p>
                  <p className="font-semibold text-foreground flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {order.date} • {order.time}
                  </p>
                </div>
              </div>

              <div className="bg-muted/30 rounded-xl p-4 text-sm">
                <p className="font-semibold mb-2">Items</p>
                <ul className="space-y-1">
                  {order.items.map((i, idx) => (
                    <li key={idx} className="flex justify-between text-muted-foreground">
                      <span>{i.quantity}x {i.name}</span>
                      <span>₹{i.price * i.quantity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="w-full md:w-48 flex flex-col justify-between shrink-0 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
              <div className="mb-4">
                <p className="text-muted-foreground text-sm mb-1">Total Amount</p>
                <p className="text-2xl font-bold text-primary">₹{order.amount}</p>
                {order.orderType === 'mealPass' && (
                  <p className="text-xs font-bold text-primary bg-primary/10 px-2 py-1 rounded mt-2 inline-block">Free Meal / Company Sponsored</p>
                )}
              </div>
              <div className="space-y-2">
                <Button className="w-full rounded-xl font-bold" onClick={() => handleStatusUpdate(order.orderId, 'delivered')}>
                  Mark Delivered
                </Button>
                <Button variant="outline" className="w-full rounded-xl font-bold border-border" onClick={() => handleStatusUpdate(order.orderId, 'rejected')}>
                  Reject Order
                </Button>
              </div>
            </div>
          </div>
        ))}
        
        {filteredOrders.length === 0 && (
          <div className="text-center py-16 bg-white rounded-[24px] border border-border">
            <CalendarDays className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-bold">No orders found</h3>
            <p className="text-muted-foreground">There are no orders matching this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
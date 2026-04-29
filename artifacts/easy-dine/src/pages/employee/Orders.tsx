import { useState } from "react";
import { useAppState } from "@/hooks/use-app-state";
import { Clock, CheckCircle2, XCircle, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function EmployeeOrders() {
  const { orders } = useAppState();
  const [tab, setTab] = useState<"All" | "Active" | "History">("All");

  const filteredOrders = orders.filter(o => {
    // Active doesn't really exist since we only have Delivered/Rejected, but let's say Active means today
    const isToday = new Date(o.date).toDateString() === new Date().toDateString();
    if (tab === "Active") return false; // Technically no active statuses in brief
    if (tab === "History") return true;
    return true; // All
  });

  return (
    <div className="space-y-6 pb-6">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-foreground">My Orders</h1>
        
        <div className="flex bg-muted p-1 rounded-2xl w-full">
          <button onClick={() => setTab("All")} className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${tab === "All" ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>All Orders</button>
          <button onClick={() => setTab("Active")} className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${tab === "Active" ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>Active</button>
          <button onClick={() => setTab("History")} className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${tab === "History" ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>History</button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white rounded-[24px] border border-border">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-muted-foreground" />
            </div>
            <h2 className="text-lg font-bold">No orders found</h2>
            <p className="text-muted-foreground text-sm mt-1">You haven't placed any orders yet.</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.orderId} className="bg-white rounded-[24px] p-5 shadow-sm border border-border space-y-4">
              <div className="flex justify-between items-start border-b border-border pb-4">
                <div>
                  <p className="text-sm font-bold text-foreground">{order.shopName}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {order.date} • {order.time}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">ID: {order.orderId}</p>
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

              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-muted shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-bold shrink-0">₹{item.price * item.quantity}</div>
                  </div>
                ))}
              </div>

              {order.orderType === 'mealPass' && (
                <div className="bg-primary/5 text-primary px-3 py-2 rounded-xl text-xs font-bold w-max">
                  Free Meal / Company Sponsored
                </div>
              )}

              <div className="pt-4 border-t border-border flex justify-between items-center">
                <span className="text-sm font-medium text-muted-foreground">Total Amount</span>
                <span className="text-lg font-bold text-primary">₹{order.amount}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
import { useAppState } from "@/hooks/use-app-state";
import { Link } from "wouter";
import { ClipboardList, TrendingUp, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function VendorDashboard() {
  const { orders, updateOrderStatus } = useAppState();

  const handleStatusUpdate = (orderId: string, status: "delivered" | "rejected") => {
    updateOrderStatus(orderId, status);
    toast.success(`Order marked as ${status}`);
  };

  const myOrders = orders.filter(o => o.shopName === "Meal Counter");
  
  // Actually, we need to show orders that are neither delivered nor rejected as "Active" 
  // but the brief says ONLY delivered/rejected exist.
  // So we will just show the latest few orders in the "Recent Orders" section.
  const recentOrders = myOrders.slice(0, 5);

  const todaysRevenue = myOrders
    .filter(o => o.status === 'delivered')
    .reduce((acc, o) => acc + o.amount, 0);

  const todaysOrders = myOrders.length;

  return (
    <div className="space-y-6 pb-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Meal Counter Overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-primary text-white rounded-[24px] p-6 shadow-md relative overflow-hidden">
          <div className="absolute -right-4 -top-4 opacity-20">
            <TrendingUp className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <p className="text-primary-foreground/80 font-medium mb-1">Today's Revenue</p>
            <h2 className="text-4xl font-bold">₹{todaysRevenue}</h2>
          </div>
        </div>
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground font-medium mb-1">Today's Orders</p>
              <h2 className="text-4xl font-bold text-foreground">{todaysOrders}</h2>
            </div>
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center">
              <ClipboardList className="w-7 h-7" />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Recent Orders</h2>
          <Link href="/vendor/orders" className="text-primary text-sm font-bold hover:underline">View All</Link>
        </div>

        <div className="grid gap-4">
          {recentOrders.map(order => (
            <div key={order.orderId} className="bg-white rounded-[24px] p-5 shadow-sm border border-border space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-foreground">{order.orderId}</p>
                    {order.orderType === 'mealPass' && (
                      <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 text-xs">Ticketing</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{order.userName}</p>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {order.time}
                  </p>
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
              
              <div className="text-sm text-muted-foreground">
                {order.items.map(i => `${i.quantity}x ${i.name}`).join(", ")}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="font-bold text-foreground">₹{order.amount}</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="rounded-xl border-border hover:bg-red-50 hover:text-red-600 hover:border-red-200" onClick={() => handleStatusUpdate(order.orderId, 'rejected')}>
                    Reject
                  </Button>
                  <Button size="sm" className="rounded-xl" onClick={() => handleStatusUpdate(order.orderId, 'delivered')}>
                    Mark Delivered
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
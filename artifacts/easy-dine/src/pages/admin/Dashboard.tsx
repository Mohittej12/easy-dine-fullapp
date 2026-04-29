import { useAppState } from "@/hooks/use-app-state";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { Store, ShoppingBag, CheckCircle2, XCircle, TrendingUp } from "lucide-react";

const chartData = [
  { name: 'Mon', orders: 450 },
  { name: 'Tue', orders: 380 },
  { name: 'Wed', orders: 520 },
  { name: 'Thu', orders: 490 },
  { name: 'Fri', orders: 610 },
  { name: 'Sat', orders: 150 },
  { name: 'Sun', orders: 120 },
];

export default function AdminDashboard() {
  const { shops, orders } = useAppState();

  const totalOrders = orders.length * 12; // multiplied for mock scale
  const delivered = Math.floor(totalOrders * 0.92);
  const rejected = totalOrders - delivered;
  const revenue = 48500; // Mock total

  return (
    <div className="space-y-6 pb-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Monitor cafeteria operations</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-2">
            <ShoppingBag className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
          </div>
          <h2 className="text-2xl font-bold text-foreground">{totalOrders}</h2>
        </div>
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            <p className="text-sm font-medium text-muted-foreground">Delivered</p>
          </div>
          <h2 className="text-2xl font-bold text-foreground">{delivered}</h2>
        </div>
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-border">
          <div className="flex items-center gap-3 mb-2">
            <XCircle className="w-4 h-4 text-red-500" />
            <p className="text-sm font-medium text-muted-foreground">Rejected</p>
          </div>
          <h2 className="text-2xl font-bold text-foreground">{rejected}</h2>
        </div>
        <div className="bg-primary text-white rounded-[24px] p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-4 h-4 text-white/80" />
            <p className="text-sm font-medium text-white/80">Revenue</p>
          </div>
          <h2 className="text-2xl font-bold">₹{revenue.toLocaleString()}</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-[24px] p-6 shadow-sm border border-border">
          <h3 className="font-bold text-lg mb-6">Weekly Orders</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dx={-10} />
                <RechartsTooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="orders" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold text-lg px-1">Cafeteria Snapshots</h3>
          {shops.map(shop => (
            <div key={shop.id} className="bg-white rounded-[24px] p-5 shadow-sm border border-border space-y-4">
              <div className="flex items-center gap-3 border-b border-border pb-3">
                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                  <Store className="w-5 h-5 text-foreground" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{shop.name}</h4>
                  <p className="text-xs text-muted-foreground">{shop.activeItems} items online</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Orders</p>
                  <p className="font-bold">{shop.orders}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Revenue</p>
                  <p className="font-bold text-primary">₹{shop.revenue}</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Delivered</p>
                  <p className="font-bold text-green-600">94%</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Rejected</p>
                  <p className="font-bold text-red-600">6%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
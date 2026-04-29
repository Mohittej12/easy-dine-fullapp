import { useState } from "react";
import { useAppState } from "@/hooks/use-app-state";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { IndianRupee, ShoppingBag, Receipt, Ticket } from "lucide-react";

const chartData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 5000 },
  { name: 'Thu', revenue: 4500 },
  { name: 'Fri', revenue: 6000 },
  { name: 'Sat', revenue: 2000 },
  { name: 'Sun', revenue: 1500 },
];

export default function VendorReports() {
  const [tab, setTab] = useState<"Today" | "This Week" | "This Month">("This Week");

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-muted-foreground text-sm">Analytics and insights</p>
        </div>
        <div className="flex bg-muted p-1 rounded-xl w-full sm:w-[400px]">
          <button onClick={() => setTab("Today")} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === "Today" ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>Today</button>
          <button onClick={() => setTab("This Week")} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === "This Week" ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>This Week</button>
          <button onClick={() => setTab("This Month")} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${tab === "This Month" ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>This Month</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-border">
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
            <IndianRupee className="w-5 h-5" />
          </div>
          <p className="text-muted-foreground font-medium mb-1">Total Revenue</p>
          <h2 className="text-3xl font-bold text-foreground">₹26,000</h2>
        </div>
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-border">
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <p className="text-muted-foreground font-medium mb-1">Total Orders</p>
          <h2 className="text-3xl font-bold text-foreground">342</h2>
        </div>
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-border">
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
            <Receipt className="w-5 h-5" />
          </div>
          <p className="text-muted-foreground font-medium mb-1">Average Order</p>
          <h2 className="text-3xl font-bold text-foreground">₹76</h2>
        </div>
      </div>

      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-border">
        <h3 className="font-bold text-lg mb-6">Weekly Revenue</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dx={-10} tickFormatter={(v) => `₹${v}`} />
              <RechartsTooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              <Bar dataKey="revenue" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-border space-y-4">
          <h3 className="font-bold text-lg border-b border-border pb-2">Order Breakdown</h3>
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-medium text-foreground">Regular Paid Orders</span>
              </div>
              <span className="font-bold">240</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                <span className="font-medium text-foreground">Meal Passes (Ticketing)</span>
              </div>
              <span className="font-bold">102</span>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 rounded-[24px] p-6 border border-primary/20 space-y-4">
          <div className="flex items-center gap-3 border-b border-primary/10 pb-2">
            <Ticket className="w-6 h-6 text-primary" />
            <h3 className="font-bold text-lg text-primary">Company Sponsored</h3>
          </div>
          <div className="pt-2">
            <p className="text-3xl font-bold text-primary mb-1">102 <span className="text-base font-medium opacity-80">meals</span></p>
            <p className="text-sm text-primary/80">Pending settlement from company</p>
          </div>
        </div>
      </div>
    </div>
  );
}
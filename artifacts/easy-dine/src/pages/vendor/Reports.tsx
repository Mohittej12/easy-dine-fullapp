import { useState, useMemo } from "react";
import { useLocation } from "wouter";
import { useAppState } from "@/hooks/use-app-state";
import { Download, ShoppingBag, UtensilsCrossed, Calendar, ChevronDown, ChevronUp, BarChart3, Ticket, FileDown } from "lucide-react";
import { VendorHamburgerMenu } from "@/components/VendorHamburgerMenu";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type TimeRange = "Today" | "This Week" | "This Month" | "Custom Range";

export default function VendorReports() {
  const { orders, employee } = useAppState();

  const [timeRange, setTimeRange] = useState<TimeRange>("Today");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [expandedShop, setExpandedShop] = useState<string | null>("Meal Counter");

  const filteredOrders = useMemo(() => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    
    // Calculate start of week (Sunday)
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - now.getDay());
    const weekStartStr = weekStart.toISOString().split('T')[0];

    // Calculate start of month
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthStartStr = monthStart.toISOString().split('T')[0];
    const vendorOrders = orders.filter(o => o.shopId === "shop_meal_counter");

    return vendorOrders.filter(order => {
      // Exclude rejected orders from revenue/stats
      if (order.status === 'rejected') return false;

      if (timeRange === "Today") {
        return order.date === todayStr;
      }
      if (timeRange === "This Week") {
        return order.date >= weekStartStr && order.date <= todayStr;
      }
      if (timeRange === "This Month") {
        return order.date >= monthStartStr && order.date <= todayStr;
      }
      if (timeRange === "Custom Range") {
        if (!startDate && !endDate) return true; // show all if no dates selected
        if (startDate && !endDate) return order.date >= startDate;
        if (!startDate && endDate) return order.date <= endDate;
        return order.date >= startDate && order.date <= endDate;
      }
      return true;
    });
  }, [orders, timeRange, startDate, endDate]);

  const totalOrders = filteredOrders.length;
  const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.amount, 0);

  const mealCounterOrders = filteredOrders; // Already filtered to Meal Counter above

  // Group revenue by date for the graph
  const revenueByDate = useMemo(() => {
    const map: Record<string, number> = {};
    filteredOrders.forEach(o => {
      map[o.date] = (map[o.date] || 0) + o.amount;
    });
    
    const arr = Object.entries(map)
      .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
      .map(([date, revenue]) => ({ date, revenue }));
    
    // Ensure we have something to render if empty
    if (arr.length === 0) {
      arr.push({ date: new Date().toISOString().split('T')[0], revenue: 0 });
    }
    return arr;
  }, [filteredOrders]);

  const maxRevenue = Math.max(...revenueByDate.map(r => r.revenue), 100);

  const handleDownload = () => {
    if (filteredOrders.length === 0) {
      alert("No orders found in this date range.");
      return;
    }

    const headers = [
      "Employee ID", 
      "Employee Name", 
      "Program", 
      "Cost Code", 
      "Item Ordered", 
      "Date Ordered", 
      "Ticketing or Pay and Use", 
      "Ticket ID", 
      "Order Status"
    ];
    
    const rows = filteredOrders.map(order => {
      const itemsStr = order.items.map(i => `${i.name} (x${i.quantity})`).join("; ");
      const isTicketing = order.orderType === "mealPass";
      
      // Fallback program and cost code if order doesn't map directly to the logged in user
      const program = order.employeeId === employee.employeeId ? employee.program : "Engineering Services";
      const costCode = order.employeeId === employee.employeeId ? employee.costCode : "CC-7421";

      return [
        order.employeeId,
        order.userName,
        program,
        costCode,
        `"${itemsStr}"`,
        order.date,
        isTicketing ? "Ticketing" : "Pay & Use",
        isTicketing ? order.orderId : "Off Ticket",
        order.status === "delivered" ? "Delivered" : "Rejected"
      ].join(",");
    });

    const csvContent = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", `Vendor_RevenueReport_${timeRange.replace(" ", "")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const toggleShop = (shopName: string) => {
    setExpandedShop(expandedShop === shopName ? null : shopName);
  };

  const RenderOrderList = ({ shopOrders }: { shopOrders: typeof orders }) => {
    if (shopOrders.length === 0) {
      return <div className="p-4 text-center text-gray-500 text-sm font-medium">No orders found.</div>;
    }
    return (
      <div className="p-4 space-y-3 bg-gray-50/50 rounded-b-2xl border-t border-gray-100 max-h-[300px] overflow-y-auto">
        {shopOrders.map(order => (
          <div key={order.orderId} className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm flex flex-col gap-2">
            <div className="flex justify-between items-start border-b border-gray-50 pb-2">
              <div className="flex flex-col">
                <span className="text-[13px] font-black text-slate-800">{order.orderId}</span>
                <span className="text-[12px] font-bold text-slate-700 mt-0.5">{order.userName}</span>
                <span className="text-[11px] font-bold text-gray-500">{order.date} • {order.time}</span>
              </div>
              <div className="mt-0.5">
                {order.amount === 0 ? (
                  <span className="text-[13px] font-extrabold text-green-600 flex items-center gap-1">
                    <Ticket className="w-3.5 h-3.5"/> 
                    {order.orderType === 'Ticketing' ? (order.ticketType === "ticketId" ? "Ticket ID (Free)" : "Off-ticket (Free)") : "Free"}
                  </span>
                ) : (
                  <span className="text-[14px] font-extrabold text-slate-800">₹{order.amount}</span>
                )}
              </div>
            </div>
            <div className="text-[13px] font-semibold text-slate-700">
              {order.items.map(i => `${i.quantity}x ${i.name}`).join(", ")}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-[100dvh] relative overflow-x-hidden bg-black pb-8">
      
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/background-cafeteria.png" 
          alt="Cafeteria Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px]" />
      </div>

      <div className="z-10 relative flex flex-col min-h-full px-4 pt-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <VendorHamburgerMenu />
          <h1 className="text-[20px] font-extrabold text-white drop-shadow-md">Reports</h1>
          <div className="w-10"></div>
        </div>

        {/* Time Range Tabs */}
        <div className="bg-white/10 backdrop-blur-md p-1.5 rounded-2xl w-full border border-white/10 flex overflow-x-auto scrollbar-hide mb-4">
          {(["Today", "This Week", "This Month", "Custom Range"] as TimeRange[]).map((t) => (
            <button
              key={t}
              onClick={() => setTimeRange(t)}
              className={`flex-1 min-w-[80px] px-3 py-2.5 text-[13px] whitespace-nowrap font-bold rounded-xl transition-all ${
                timeRange === t 
                  ? 'bg-white text-slate-800 shadow-sm' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Custom Range Inputs */}
        <AnimatePresence>
          {timeRange === "Custom Range" && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="flex gap-3 mb-4 overflow-hidden"
            >
              <div className="flex-1 bg-white/95 rounded-xl p-3 shadow-sm flex items-center gap-2 border border-white/20">
                <Calendar className="w-4 h-4 text-gray-500" />
                <input 
                  type="date" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-transparent text-[13px] font-bold text-slate-800 w-full outline-none"
                />
              </div>
              <div className="flex-1 bg-white/95 rounded-xl p-3 shadow-sm flex items-center gap-2 border border-white/20">
                <Calendar className="w-4 h-4 text-gray-500" />
                <input 
                  type="date" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-transparent text-[13px] font-bold text-slate-800 w-full outline-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Boxes */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white/95 backdrop-blur-xl rounded-[20px] p-5 shadow-sm border border-white/20">
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-3">
              <BarChart3 className="w-5 h-5" />
            </div>
            <p className="text-[13px] font-bold text-gray-500">Total Revenue</p>
            <p className="text-[24px] font-black text-slate-800 leading-tight mt-0.5">₹{totalRevenue}</p>
          </div>
          <div className="bg-white/95 backdrop-blur-xl rounded-[20px] p-5 shadow-sm border border-white/20">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-3">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <p className="text-[13px] font-bold text-gray-500">Total Orders</p>
            <p className="text-[24px] font-black text-slate-800 leading-tight mt-0.5">{totalOrders}</p>
          </div>
        </div>

        {/* Breakdown Section */}
        <h2 className="text-[16px] font-black text-white mb-3 px-1 drop-shadow-md">Cafeteria Breakdown</h2>
        <div className="space-y-3 mb-8">
          
          {/* Meal Counter Accordion */}
          <div className="bg-white/95 backdrop-blur-xl rounded-[20px] border border-white/20 shadow-sm overflow-hidden transition-all">
            <div 
              onClick={() => toggleShop("Meal Counter")}
              className="p-4 flex items-center justify-between cursor-pointer active:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[15px] text-slate-800">Meal Counter</h3>
                  <p className="text-[12px] font-bold text-gray-500 mt-0.5">{mealCounterOrders.length} orders fulfilled</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                {expandedShop === "Meal Counter" ? <ChevronUp className="w-4 h-4 text-gray-600" /> : <ChevronDown className="w-4 h-4 text-gray-600" />}
              </div>
            </div>
            <AnimatePresence>
              {expandedShop === "Meal Counter" && (
                <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                  <RenderOrderList shopOrders={mealCounterOrders} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
        </div>

        {/* Download Report Button */}
        <button 
          onClick={handleDownload}
          className="w-full bg-[#FF3B30] text-white py-4 rounded-2xl font-bold text-[15px] shadow-lg shadow-red-500/30 hover:bg-[#E31837] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-auto"
        >
          <Download className="w-5 h-5" /> Download Report
        </button>

      </div>
    </div>
  );
}
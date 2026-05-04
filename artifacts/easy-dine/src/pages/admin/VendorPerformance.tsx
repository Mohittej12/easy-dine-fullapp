import { useState, useMemo, useEffect } from "react";
import { useAppState } from "@/hooks/use-app-state";
import { 
  Search, 
  Download, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Calendar,
  Ticket,
  CreditCard,
  Filter,
  X,
  ChevronLeft,
  ChevronDown,
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { AdminHamburgerMenu } from "@/components/AdminHamburgerMenu";

type Category = "ALL" | "DELIVERED" | "REJECTED" | "TICKETING(TICKET ID)" | "TICKETING(OFF-TICKET)" | "PAY AND USE";

const GENERATED_ORDERS = [
  { orderId: "ORD-ED-84921", userName: "Sarah Mehta", employeeId: "PRD-10428", shopId: "shop_meal_counter", shopName: "Meal Counter", status: "delivered", amount: 260, orderType: "regular", date: "2024-05-14", time: "13:45" },
  { orderId: "ORD-ED-84922", userName: "Rahul Sharma", employeeId: "PRD-10211", shopId: "shop_meal_counter", shopName: "Meal Counter", status: "delivered", amount: 0, orderType: "mealPass", date: "2024-05-14", time: "13:30" },
  { orderId: "ORD-ED-84923", userName: "Priya Patel", employeeId: "PRD-10555", shopId: "shop_tuck_shop", shopName: "Tuck Shop", status: "rejected", amount: 170, orderType: "regular", date: "2024-05-14", time: "18:20" },
  { orderId: "ORD-ED-84924", userName: "Amit Kumar", employeeId: "PRD-10992", shopId: "shop_meal_counter", shopName: "Meal Counter", status: "delivered", amount: 0, orderType: "Ticketing", ticketType: "ticketId", date: "2024-05-14", time: "12:15" },
  { orderId: "ORD-ED-84925", userName: "Neha Singh", employeeId: "PRD-11223", shopId: "shop_tuck_shop", shopName: "Tuck Shop", status: "delivered", amount: 0, orderType: "Ticketing", ticketType: "offTicket", date: "2024-05-14", time: "14:40" },
  { orderId: "ORD-ED-84926", userName: "Vikram Raj", employeeId: "PRD-10884", shopId: "shop_meal_counter", shopName: "Meal Counter", status: "delivered", amount: 150, orderType: "PayAndUse", date: "2024-05-14", time: "09:20" },
  { orderId: "ORD-ED-84927", userName: "Sonal Gupta", employeeId: "PRD-11445", shopId: "shop_tuck_shop", shopName: "Tuck Shop", status: "delivered", amount: 45, orderType: "PayAndUse", date: "2024-05-14", time: "16:10" },
  { orderId: "ORD-ED-84928", userName: "Arjun Das", employeeId: "PRD-12345", shopId: "shop_meal_counter", shopName: "Meal Counter", status: "delivered", amount: 0, orderType: "Ticketing", ticketType: "offTicket", date: "2024-05-14", time: "11:55" },
  { orderId: "ORD-ED-84929", userName: "Kavita Rao", employeeId: "PRD-11111", shopId: "shop_tuck_shop", shopName: "Tuck Shop", status: "rejected", amount: 0, orderType: "Ticketing", ticketType: "ticketId", date: "2024-05-14", time: "13:05" },
  { orderId: "ORD-ED-84930", userName: "Deepak S", employeeId: "PRD-22222", shopId: "shop_meal_counter", shopName: "Meal Counter", status: "delivered", amount: 200, orderType: "PayAndUse", date: "2024-05-14", time: "15:30" },
];

export default function AdminVendorPerformance() {
  const { orders: appOrders } = useAppState();
  const [activeCategory, setActiveCategory] = useState<Category>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("Today");
  
  const [customRange, setCustomRange] = useState({ from: "", to: "" });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectingType, setSelectingType] = useState<"from" | "to">("from");
  
  const [visibleCount, setVisibleCount] = useState(5);

  const categories: Category[] = [
    "ALL", 
    "DELIVERED", 
    "REJECTED", 
    "TICKETING(TICKET ID)", 
    "TICKETING(OFF-TICKET)", 
    "PAY AND USE"
  ];

  const combinedOrders = useMemo(() => {
    const processedAppOrders = appOrders.map(o => ({
      ...o,
      orderType: o.orderType === 'regular' ? 'PayAndUse' : o.orderType
    }));
    return [...processedAppOrders, ...GENERATED_ORDERS.filter(go => !appOrders.find(ao => ao.orderId === go.orderId))];
  }, [appOrders]);

  const filteredOrders = useMemo(() => {
    return combinedOrders.filter(order => {
      const categoryMatch = (() => {
        if (activeCategory === "ALL") return true;
        if (activeCategory === "DELIVERED") return order.status === "delivered";
        if (activeCategory === "REJECTED") return order.status === "rejected";
        if (activeCategory === "TICKETING(TICKET ID)") return order.orderType === "Ticketing" && order.ticketType === "ticketId";
        if (activeCategory === "TICKETING(OFF-TICKET)") return order.orderType === "Ticketing" && order.ticketType === "offTicket";
        if (activeCategory === "PAY AND USE") return order.orderType === "PayAndUse" || order.orderType === "regular";
        return true;
      })();

      const searchMatch = 
        order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.shopName.toLowerCase().includes(searchQuery.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [combinedOrders, activeCategory, searchQuery]);

  const displayedOrders = filteredOrders.slice(0, visibleCount);

  const handleExport = () => {
    toast.promise(new Promise((resolve) => setTimeout(resolve, 1500)), {
      loading: 'Preparing Excel report...',
      success: "Excel report downloaded successfully!",
      error: 'Failed to generate report.',
    });
  };

  const getDisplayLabel = () => {
    if (dateFilter === "Custom Range" && customRange.from && customRange.to) {
      return `${customRange.from} - ${customRange.to}`;
    }
    return dateFilter;
  };

  const handleDateSelect = (day: number) => {
    const formatted = `May ${day}, 2024`;
    if (selectingType === "from") {
      setCustomRange({ ...customRange, from: formatted });
      setSelectingType("to");
    } else {
      setCustomRange({ ...customRange, to: formatted });
      setIsCalendarOpen(false);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] relative overflow-x-hidden bg-black pb-24">
      
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/background-cafeteria.png" 
          alt="Cafeteria Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75 backdrop-blur-[4px]" />
      </div>

      <div className="z-10 relative flex flex-col min-h-full px-4 pt-6 max-w-2xl mx-auto w-full">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <AdminHamburgerMenu />
          <div>
            <h1 className="text-[22px] font-black text-white drop-shadow-md">Vendor Performance</h1>
            <p className="text-gray-400 text-[13px] font-medium">Monitor all completed order activity</p>
          </div>
        </div>

        {/* Search & Action Bar */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by order ID, user name, or cafeteria..."
              className="w-full bg-white rounded-2xl pl-12 pr-4 py-4 text-[14px] font-bold text-slate-800 shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="flex gap-3 h-14">
            <button 
              onClick={() => setIsCalendarOpen(true)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 rounded-xl px-5 flex items-center justify-between text-slate-800 transition-all shadow-inner"
            >
              <div className="flex items-center gap-4">
                <Calendar className="w-5 h-5 text-slate-600 shrink-0" />
                <div className="text-left">
                  <p className="text-[14px] font-black">{getDisplayLabel()}</p>
                </div>
              </div>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
            
            <button 
              onClick={handleExport}
              className="bg-[#E31837] text-white px-8 h-full rounded-xl font-black text-[14px] shadow-lg shadow-red-600/20 active:scale-95 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide no-scrollbar -mx-4 px-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => { setActiveCategory(cat); setVisibleCount(5); }}
              className={`px-6 py-2.5 rounded-xl text-[12px] font-black whitespace-nowrap transition-all border ${
                activeCategory === cat 
                  ? 'bg-[#E31837] text-white border-transparent shadow-lg shadow-red-600/20 scale-105' 
                  : 'bg-white/90 text-gray-500 border-gray-100 hover:bg-white hover:text-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4 mb-8">
          <AnimatePresence mode="popLayout">
            {displayedOrders.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="bg-white/10 backdrop-blur-md rounded-[32px] p-12 text-center border border-white/10"
              >
                <Filter className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <p className="text-white/60 font-bold">No orders found matching your filters.</p>
              </motion.div>
            ) : (
              displayedOrders.map((order) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key={order.orderId}
                  className="bg-white rounded-[24px] p-5 shadow-xl border border-gray-100 relative group flex flex-col gap-4"
                >
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-[15px] font-black text-slate-900 uppercase tracking-tight">{order.orderId}</p>
                      <p className="text-[13px] font-extrabold text-gray-500">{order.userName}</p>
                      <p className="text-[13px] font-bold text-slate-600">{order.shopName}</p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <span className={`text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-widest ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {order.status}
                      </span>
                      <div className="flex items-center gap-1.5 text-gray-400 text-[11px] font-bold">
                        <Clock className="w-3.5 h-3.5" />
                        {order.time}
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {order.orderType === 'Ticketing' ? (
                        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                          <Ticket className="w-4 h-4" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-4 h-4" />
                        </div>
                      )}
                      <span className="text-[12px] font-bold text-gray-500">
                        {order.orderType === 'Ticketing' 
                          ? `Ticketing (${order.ticketType === 'ticketId' ? 'Ticket ID' : 'Off-ticket'})` 
                          : 'Pay and Use'}
                      </span>
                    </div>
                    <p className="text-[16px] font-black text-slate-900">
                      {order.amount > 0 ? `₹${order.amount}` : "Sponsored"}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
          
          {filteredOrders.length > visibleCount && (
            <div className="text-center py-4">
              <button 
                onClick={() => setVisibleCount(prev => prev + 5)}
                className="text-[14px] font-black text-white hover:text-white/80 transition-colors underline underline-offset-4"
              >
                View All Results
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Range Selection Modal */}
      <AnimatePresence>
        {isCalendarOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCalendarOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[32px] w-full max-w-sm p-8 shadow-2xl overflow-hidden"
            >
              <h2 className="text-[20px] font-black text-slate-800 mb-6">Select Range</h2>
              
              <div className="space-y-3 mb-6">
                {["Today", "This Week", "This Month", "Custom Range"].map((range) => (
                  <button
                    key={range}
                    onClick={() => {
                      setDateFilter(range);
                      if (range !== "Custom Range") {
                        setCustomRange({ from: "", to: "" });
                        setIsCalendarOpen(false);
                      } else {
                        setSelectingType("from");
                      }
                    }}
                    className={`w-full py-4 rounded-2xl font-bold text-left px-5 transition-all flex items-center justify-between ${
                      dateFilter === range 
                        ? 'bg-red-50 text-red-600 border border-red-100 shadow-sm' 
                        : 'bg-gray-50 text-slate-600 border border-transparent hover:bg-gray-100'
                    }`}
                  >
                    {range}
                    {dateFilter === range && <CheckCircle2 className="w-5 h-5" />}
                  </button>
                ))}
              </div>

              {dateFilter === "Custom Range" && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-200">
                    <div className={`flex-1 text-center py-2 rounded-xl border ${selectingType === 'from' ? 'bg-white border-red-200 shadow-sm' : 'border-transparent opacity-60'}`}>
                      <p className="text-[9px] font-black text-gray-500 uppercase">From</p>
                      <p className="text-[13px] font-black text-slate-800">{customRange.from || "Select"}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    <div className={`flex-1 text-center py-2 rounded-xl border ${selectingType === 'to' ? 'bg-white border-red-200 shadow-sm' : 'border-transparent opacity-60'}`}>
                      <p className="text-[9px] font-black text-gray-500 uppercase">To</p>
                      <p className="text-[13px] font-black text-slate-800">{customRange.to || "Select"}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                    <div className="flex items-center justify-between mb-4 px-2">
                      <ChevronLeft className="w-5 h-5 text-gray-400" />
                      <span className="font-bold text-slate-800">May 2024</span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="grid grid-cols-7 gap-1 text-center">
                      {[...Array(31)].map((_, i) => (
                        <button 
                          key={i}
                          onClick={() => handleDateSelect(i + 1)}
                          className={`w-8 h-8 rounded-lg text-[11px] font-bold transition-all ${
                            (customRange.from === `May ${i + 1}, 2024` || customRange.to === `May ${i + 1}, 2024`)
                              ? 'bg-red-500 text-white shadow-md' 
                              : 'text-slate-600 hover:bg-gray-200'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="mt-8">
                <button 
                  onClick={() => setIsCalendarOpen(false)}
                  className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-xl active:scale-95 transition-all"
                >
                  Apply Filter
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
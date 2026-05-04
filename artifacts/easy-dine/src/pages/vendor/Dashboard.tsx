import { useMemo } from "react";
import { Link } from "wouter";
import { useAppState } from "@/hooks/use-app-state";
import { VendorHamburgerMenu } from "@/components/VendorHamburgerMenu";
import { Clock, CheckCircle2, XCircle, ChevronRight, TrendingUp, ShoppingBag, IndianRupee } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export default function VendorDashboard() {
  const { orders, updateOrderStatus } = useAppState();

  // Mock Vendor Context
  const VENDOR_SHOP_NAME = "Meal Counter";

  // Calculate Stats
  const { todayRevenue, todayOrdersCount, pendingOrders } = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    
    // Filter to only this vendor's orders
    const vendorOrders = orders.filter(o => o.shopName === VENDOR_SHOP_NAME);
    
    // Revenue is only from delivered orders today
    const revenue = vendorOrders
      .filter(o => o.date === today && o.status === 'delivered')
      .reduce((sum, o) => sum + o.amount, 0);
      
    // Orders count is all non-rejected orders placed today
    const count = vendorOrders
      .filter(o => o.date === today && o.status !== 'rejected')
      .length;

    // Pending active queue
    const pending = vendorOrders.filter(o => o.status === 'pending');

    return {
      todayRevenue: revenue,
      todayOrdersCount: count,
      pendingOrders: pending
    };
  }, [orders]);

  const handleMarkDelivered = (orderId: string) => {
    updateOrderStatus(orderId, 'delivered');
    toast.success("Order marked as delivered!");
  };

  const handleReject = (orderId: string) => {
    updateOrderStatus(orderId, 'rejected');
    toast.error("Order has been rejected.");
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
          <h1 className="text-[20px] font-extrabold text-white drop-shadow-md">Dashboard</h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-white/95 backdrop-blur-xl rounded-[20px] p-5 shadow-sm border border-white/20 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-green-50 rounded-full blur-2xl opacity-50 pointer-events-none" />
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center mb-3">
              <IndianRupee className="w-5 h-5" />
            </div>
            <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1">Today's Revenue</p>
            <p className="text-[26px] font-black text-slate-800 leading-none">₹{todayRevenue}</p>
          </div>
          
          <div className="bg-white/95 backdrop-blur-xl rounded-[20px] p-5 shadow-sm border border-white/20 relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-50 rounded-full blur-2xl opacity-50 pointer-events-none" />
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mb-1">Today's Orders</p>
            <p className="text-[26px] font-black text-slate-800 leading-none">{todayOrdersCount}</p>
          </div>
        </div>

        {/* Recent Orders Header */}
        <div className="flex justify-between items-end mb-4 px-1">
          <div>
            <h2 className="text-[18px] font-black text-white drop-shadow-md">Recent Orders</h2>
            <p className="text-[13px] text-gray-300 font-medium">Active pending queue</p>
          </div>
          <Link href="/vendor/orders">
            <span className="text-[13px] font-bold text-[#FF3B30] bg-white/90 px-3 py-1.5 rounded-full cursor-pointer hover:bg-white transition-colors flex items-center gap-1 shadow-sm">
              View All <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>

        {/* Active Orders List */}
        <div className="space-y-4">
          <AnimatePresence>
            {pendingOrders.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="text-center py-16 px-4 bg-white/10 backdrop-blur-md rounded-[24px] border border-white/20"
              >
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <CheckCircle2 className="w-8 h-8 text-white/60" />
                </div>
                <h2 className="text-[16px] font-bold text-white mb-1">All caught up!</h2>
                <p className="text-white/60 text-[13px] font-medium">No pending orders in the queue.</p>
              </motion.div>
            ) : (
              pendingOrders.map(order => (
                <motion.div 
                  key={order.orderId} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white/95 backdrop-blur-xl rounded-[24px] p-5 shadow-xl border border-white/20 flex flex-col gap-4"
                >
                  <div className="flex justify-between items-start border-b border-gray-100 pb-3">
                    <div>
                      <p className="text-[14px] font-extrabold text-slate-800">{order.orderId}</p>
                      <p className="text-[12px] font-bold text-gray-500 mt-0.5 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {order.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[12px] font-bold text-gray-500 mb-0.5">{order.userName}</p>
                      {order.amount === 0 ? (
                        <span className="text-[14px] font-extrabold text-green-600">Company Sponsored</span>
                      ) : (
                        <span className="text-[16px] font-black text-[#E31837]">₹{order.amount}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-red-50 text-[#FF3B30] rounded-lg flex items-center justify-center font-black text-[12px]">
                            {item.quantity}x
                          </div>
                          <span className="font-bold text-[13px] text-slate-800">{item.name}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Vendor Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button 
                      onClick={() => handleReject(order.orderId)}
                      className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[14px] bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-100"
                    >
                      <XCircle className="w-4 h-4" /> Reject
                    </button>
                    <button 
                      onClick={() => handleMarkDelivered(order.orderId)}
                      className="flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-[14px] bg-green-500 text-white hover:bg-green-600 shadow-md shadow-green-500/20 transition-all active:scale-[0.98]"
                    >
                      <CheckCircle2 className="w-4 h-4" /> Delivered
                    </button>
                  </div>

                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
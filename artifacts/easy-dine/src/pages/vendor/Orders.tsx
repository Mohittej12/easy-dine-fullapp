import { useState } from "react";
import { useAppState } from "@/hooks/use-app-state";
import { Clock, CheckCircle2, XCircle, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { VendorHamburgerMenu } from "@/components/VendorHamburgerMenu";
import { toast } from "sonner";

export default function VendorOrders() {
  const { orders, updateOrderStatus } = useAppState();
  const [activeTab, setActiveTab] = useState<"Active" | "History">("Active");

  const VENDOR_SHOP_NAME = "Meal Counter";

  const vendorOrders = orders.filter(order => order.shopName === VENDOR_SHOP_NAME);

  const filteredOrders = vendorOrders.filter(order => {
    if (activeTab === "Active") return order.status === "pending";
    if (activeTab === "History") return order.status === "delivered" || order.status === "rejected";
    return true;
  });

  const handleMarkDelivered = (orderId: string) => {
    updateOrderStatus(orderId, 'delivered');
    toast.success("Order marked as delivered!");
  };

  const handleReject = (orderId: string) => {
    updateOrderStatus(orderId, 'rejected');
    toast.error("Order has been rejected.");
  };

  return (
    <div className="flex flex-col min-h-[100dvh] pb-20 relative overflow-x-hidden bg-black">
      
      {/* Full-screen Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/background-cafeteria.png" 
          alt="Modern Cafeteria Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[4px]" />
      </div>

      <div className="z-10 relative flex flex-col min-h-full px-4 pt-6 pb-8">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <VendorHamburgerMenu />
          <h1 className="text-[20px] font-extrabold text-white drop-shadow-md">All Orders</h1>
          <div className="w-10"></div>
        </div>
        
        {/* Tab Selector */}
        <div className="flex bg-black/40 backdrop-blur-md p-1.5 rounded-2xl w-full border border-white/10 mb-6">
          {(["Active", "History"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`flex-1 py-2.5 text-[15px] font-bold rounded-xl transition-all ${
                activeTab === t 
                  ? 'bg-white text-slate-800 shadow-sm' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredOrders.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="text-center py-16 px-4 bg-white/10 backdrop-blur-xl rounded-[24px] border border-white/20"
              >
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <ShoppingBag className="w-8 h-8 text-white/60" />
                </div>
                <h2 className="text-[18px] font-bold text-white mb-2">
                  {activeTab === "Active" ? "No active orders" : "No order history"}
                </h2>
                <p className="text-white/60 text-[13px] font-medium">
                  {activeTab === "Active" ? "When an employee places an order, it will appear here." : "Completed or rejected orders will appear here."}
                </p>
              </motion.div>
            ) : (
              filteredOrders.map(order => (
                <motion.div 
                  layout
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
                        <Clock className="w-3.5 h-3.5" /> {order.date} • {order.time}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[12px] font-bold text-gray-500 mb-0.5">{order.userName}</p>
                      {activeTab === "History" ? (
                        <>
                          {order.status === 'delivered' ? (
                            <Badge className="bg-green-100 text-green-700 border-none font-bold px-2 py-0.5 gap-1 shadow-sm mt-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
                            </Badge>
                          ) : (
                            <Badge className="bg-red-100 text-red-700 border-none font-bold px-2 py-0.5 gap-1 shadow-sm mt-1">
                              <XCircle className="w-3.5 h-3.5" /> Rejected
                            </Badge>
                          )}
                        </>
                      ) : (
                        <>
                          {order.amount === 0 ? (
                            <div className="flex flex-col items-end">
                              <span className="text-[14px] font-extrabold text-green-600">Sponsored</span>
                              {order.orderType === 'Ticketing' && (
                                <span className="text-[11px] font-bold text-gray-500 mt-0.5">{order.ticketType === "ticketId" ? "Ticket ID" : "Off-ticket"}</span>
                              )}
                            </div>
                          ) : (
                            <span className="text-[16px] font-black text-[#E31837]">₹{order.amount}</span>
                          )}
                        </>
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

                  {/* Vendor Action Buttons (Only in Active Tab) */}
                  {activeTab === "Active" && (
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
                  )}

                  {/* Total Amount in History Tab */}
                  {activeTab === "History" && (
                    <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
                      <span className="text-[13px] font-bold text-gray-500">Total Amount</span>
                      {order.amount === 0 ? (
                        <div className="flex flex-col items-end">
                          <span className="text-[14px] font-extrabold text-green-600">Company Sponsored</span>
                          {order.orderType === 'Ticketing' && (
                            <span className="text-[11px] font-bold text-gray-500 mt-0.5">{order.ticketType === "ticketId" ? "Ticket ID" : "Off-ticket"}</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-[16px] font-black text-[#E31837]">₹{order.amount}</span>
                      )}
                    </div>
                  )}

                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
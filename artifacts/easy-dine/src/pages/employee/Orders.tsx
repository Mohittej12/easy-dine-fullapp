import { useState } from "react";
import { useAppState } from "@/hooks/use-app-state";
import { Clock, CheckCircle2, XCircle, ShoppingBag, Ticket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { User } from "lucide-react";
import { HamburgerMenu } from "@/components/HamburgerMenu";

export default function EmployeeOrders() {
  const { orders } = useAppState();
  const [activeTab, setActiveTab] = useState<"All" | "Active" | "History">("All");

  const filteredOrders = orders.filter(order => {
    if (activeTab === "All") return true;
    if (activeTab === "Active") return order.status !== "delivered" && order.status !== "rejected";
    if (activeTab === "History") return order.status === "delivered" || order.status === "rejected";
    return true;
  });

  return (
    <div className="flex flex-col min-h-[100dvh] pb-20 relative overflow-x-hidden">
      
      {/* Full-screen Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/background-cafeteria.png" 
          alt="Modern Cafeteria Background" 
          className="w-full h-full object-cover"
        />
        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[4px]" />
      </div>

      <div className="z-10 relative flex flex-col min-h-full px-4 pt-10 pb-8">
        
        {/* Header */}
        <div className="space-y-6 mb-8 relative">
          <div className="absolute left-0 top-0">
            <HamburgerMenu />
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight text-center">My Orders</h1>
          
          <div className="flex bg-black/40 backdrop-blur-md p-1.5 rounded-2xl w-full border border-white/10">
            {["All", "Active", "History"].map((t) => (
              <button
                key={t}
                onClick={() => setActiveTab(t as any)}
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
        </div>

        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 px-4 bg-white/10 backdrop-blur-xl rounded-[24px] border border-white/20"
            >
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                <ShoppingBag className="w-8 h-8 text-white/60" />
              </div>
              <h2 className="text-xl font-bold text-white">No orders found</h2>
              <p className="text-white/60 text-sm mt-2 font-medium">You haven't placed any orders yet.</p>
            </motion.div>
          ) : (
            filteredOrders.map(order => (
              <motion.div 
                key={order.orderId} 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="bg-white/95 backdrop-blur-xl rounded-[24px] p-5 shadow-xl border border-white/20 space-y-4"
              >
                <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                  <div>
                    <p className="text-[16px] font-extrabold text-slate-800">{order.shopName}</p>
                    <p className="text-[13px] font-semibold text-gray-500 mt-1 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {order.date} • {order.time}
                    </p>
                    <p className="text-[13px] font-bold text-gray-500 mt-1">Order ID: <span className="text-slate-700">{order.orderId}</span></p>
                  </div>
                  
                  {order.status === 'pending' && (
                    <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-none font-bold px-3 py-1 gap-1">
                      <Clock className="w-3.5 h-3.5" /> Pending
                    </Badge>
                  )}
                  {order.status === 'delivered' && (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none font-bold px-3 py-1 gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Delivered
                    </Badge>
                  )}
                  {order.status === 'rejected' && (
                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none font-bold px-3 py-1 gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Rejected
                    </Badge>
                  )}
                </div>

                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#f8f9fa] flex items-center justify-center text-[#FF3B30] shadow-sm border border-red-50 flex-shrink-0">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 20-3-3m0 0-3-3m3 3V11m-7 8c0 1.1-.9 2-2 2H2v-2h2c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H2V5h2c1.1 0 2 .9 2 2v6c0 1.1.9 2 2 2h4v-4H8v-2h4v-2H8V5h8v4h-2v2h2v4h-2v2h2v4h-2Z"/><path d="m20 11 2 2-2 2"/></svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[14px] text-slate-800 truncate">{item.name}</p>
                        <p className="text-[12px] font-semibold text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      {item.price > 0 && (
                        <div className="text-[15px] font-bold text-slate-800 shrink-0">₹{item.price * item.quantity}</div>
                      )}
                    </div>
                  ))}
                </div>

                {order.orderType === 'Ticketing' && (
                  <div className="bg-[#FF3B30]/10 text-[#FF3B30] px-3 py-2.5 rounded-xl text-[12px] font-bold flex items-center gap-2 border border-[#FF3B30]/20">
                    <Ticket className="w-4 h-4" /> Ordered via Ticketing: {order.ticketType === "ticketId" ? "Ticket ID" : "Off-ticket"}
                  </div>
                )}

                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-[14px] font-bold text-gray-500">Total Amount</span>
                  {order.amount === 0 ? (
                    <span className="text-[16px] font-extrabold text-green-600">Company Sponsored</span>
                  ) : (
                    <span className="text-[18px] font-extrabold text-[#E31837]">₹{order.amount}</span>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Fixed Bottom Navigation (Orders & Profile Only) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200 px-6 py-3 pb-8 z-50 flex justify-around">
        <Link href="/employee/orders">
          <div className="flex flex-col items-center gap-1 text-[#FF3B30] cursor-pointer">
            <ShoppingBag className="w-6 h-6" />
            <span className="text-[10px] font-bold">Orders</span>
          </div>
        </Link>
        <Link href="/employee/profile">
          <div className="flex flex-col items-center gap-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
            <User className="w-6 h-6" />
            <span className="text-[10px] font-bold">Profile</span>
          </div>
        </Link>
      </div>

    </div>
  );
}
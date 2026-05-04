import { useState } from "react";
import { useLocation } from "wouter";
import { useAppState } from "@/hooks/use-app-state";
import { X, HelpCircle, FileText, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function MealAuthorization() {
  const [, setLocation] = useLocation();
  const { employee, cart, addOrder, clearCart } = useAppState();
  
  const [accessType, setAccessType] = useState<"ticket" | "off_ticket">("ticket");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = () => {
    if (cart.length === 0) return;

    const orderId = `ORD-ED-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    
    // Map actual cart items to order items
    const orderItems = cart.map((c, i) => ({
      id: `m_${i}`,
      foodItemId: c.foodItem.id,
      name: c.foodItem.name,
      price: c.foodItem.price,
      quantity: c.quantity,
      image: ""
    }));

    addOrder({
      orderId,
      userName: employee.name,
      employeeId: employee.employeeId,
      shopId: cart[0].foodItem.shopId,
      shopName: "Meal Counter", // Hardcoded for demo ticketing flow
      items: orderItems,
      amount: 0,
      orderType: "Ticketing",
      ticketType: accessType === "ticket" ? "ticketId" : "offTicket",
      paymentType: "free",
      status: "pending", 
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    });
    
    setShowSuccess(true);
    setTimeout(() => {
      clearCart();
      setLocation("/employee/orders");
    }, 3000);
  };

  return (
    <div className="flex flex-col min-h-[100dvh] relative overflow-hidden bg-black items-center justify-center p-4">
      
      {/* Full-screen Background Image with heavy dark gray overlay */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/background-cafeteria.png" 
          alt="Modern Cafeteria Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#35383C]/80 backdrop-blur-sm" />
      </div>

      {/* Modal Card Container */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="z-10 bg-[#F8F9FA] rounded-[32px] w-full max-w-md shadow-2xl overflow-hidden border border-white/20"
      >
        <div className="bg-white px-5 py-5 pb-6 border-b border-gray-100 rounded-b-[24px] shadow-[0_4px_20px_-15px_rgba(0,0,0,0.1)] relative z-10">
          
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#E31837] rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-sm border-2 border-red-200">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-[20px] font-extrabold text-slate-800 leading-tight">Meal Authorization</h1>
                <p className="text-[12px] text-gray-500 font-medium">Company-sponsored Meal request</p>
              </div>
            </div>
            <button 
              onClick={() => setLocation("/employee/meal-pass")}
              className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#4285F4] text-[#4285F4] bg-blue-50/50 hover:bg-blue-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Item Card Box */}
          <div className="border border-gray-200 rounded-2xl p-4 flex items-center justify-between bg-white shadow-sm relative mb-2">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center text-[#E31837] border border-gray-100 overflow-hidden shrink-0 shadow-sm">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m16 20-3-3m0 0-3-3m3 3V11m-7 8c0 1.1-.9 2-2 2H2v-2h2c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H2V5h2c1.1 0 2 .9 2 2v6c0 1.1.9 2 2 2h4v-4H8v-2h4v-2H8V5h8v4h-2v2h2v4h-2v2h2v4h-2Z"/><path d="m20 11 2 2-2 2"/></svg>
              </div>
              <div>
                <h3 className="font-extrabold text-[16px] text-[#4285F4]">
                  {cart.length > 0 ? cart[0].foodItem.name : "Meal Item"}
                </h3>
                <p className="text-[14px] font-bold text-slate-800 mt-0.5">Meal Counter</p>
              </div>
            </div>
            
            <div className="absolute top-3 right-3 bg-red-50 text-[#E31837] border border-red-100 px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wide">
              Company Sponsored
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="px-5 pt-6 pb-6">
          
          <div className="mb-2">
            <h4 className="text-[14px] font-extrabold text-slate-800 flex gap-1">
              Meal Access Type <span className="text-[#E31837]">*</span>
            </h4>
            <p className="text-[13px] text-gray-500 font-medium">Choose how the dinner meal will be served</p>
          </div>

          {/* Access Type Toggle */}
          <div className="bg-[#E9ECEF] rounded-xl p-1 mb-5 flex shadow-inner">
            <button
              onClick={() => setAccessType('ticket')}
              className={`flex-1 py-3 text-[14px] font-bold rounded-lg transition-all ${
                accessType === 'ticket' 
                  ? 'bg-white text-slate-800 shadow-sm' 
                  : 'text-gray-500 hover:text-slate-700'
              }`}
            >
              Ticket ID
            </button>
            <button
              onClick={() => setAccessType('off_ticket')}
              className={`flex-1 py-3 text-[14px] font-bold rounded-lg transition-all ${
                accessType === 'off_ticket' 
                  ? 'bg-white text-slate-800 shadow-sm' 
                  : 'text-gray-500 hover:text-slate-700'
              }`}
            >
              Off - Ticket
            </button>
          </div>

          {/* Dynamic Content: Warning Message or Form Fields */}
          <div className="mb-6">
            <AnimatePresence mode="wait">
              {accessType === 'ticket' ? (
                <motion.div
                  key="ticket"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="flex gap-2 px-2"
                >
                  <span className="text-slate-800 font-black text-lg leading-none mt-0.5">•</span>
                  <p className="text-[13px] font-bold text-slate-800 leading-tight">
                    Ticket Id raised before 5pm will be verified by the vendor and then the food will be delivered.
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="off_ticket"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-4"
                >
                  {/* Employee Details Group */}
                  <div className="space-y-2">
                    <h4 className="text-[14px] font-extrabold text-slate-800 flex gap-1">
                      Employee Details <span className="text-[#E31837]">*</span>
                    </h4>
                    <div className="space-y-2">
                      <input 
                        type="text" 
                        value={employee.name} 
                        readOnly 
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-bold text-gray-500 shadow-sm focus:outline-none" 
                      />
                      <input 
                        type="text" 
                        value={employee.employeeId} 
                        readOnly 
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-bold text-gray-500 shadow-sm focus:outline-none" 
                      />
                    </div>
                  </div>
                  
                  {/* Program Details Group */}
                  <div className="space-y-2">
                    <h4 className="text-[14px] font-extrabold text-slate-800 flex gap-1">
                      Program Details <span className="text-[#E31837]">*</span>
                    </h4>
                    <div className="space-y-2">
                      <input 
                        type="text" 
                        value={employee.program} 
                        readOnly 
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-bold text-gray-500 shadow-sm focus:outline-none" 
                      />
                      <input 
                        type="text" 
                        value={employee.costCode} 
                        readOnly 
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-bold text-gray-500 shadow-sm focus:outline-none" 
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Info Box */}
          <div className="border border-gray-200 bg-white rounded-2xl p-4 flex gap-3 mb-8 shadow-sm items-center">
            <div className="text-[#E31837] bg-red-50 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 border border-red-100">
              <HelpCircle className="w-4 h-4" />
            </div>
            <p className="text-[13px] font-medium text-slate-800 leading-tight">
              No payment required. This meal is sponsored by your organization.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <button 
              onClick={handleSubmit}
              className="w-full py-4 rounded-xl font-bold text-[16px] bg-[#FF4B4B] text-white hover:bg-[#E31837] transition-all shadow-[0_8px_16px_-4px_rgba(255,59,48,0.4)]"
            >
              Submit Request
            </button>
            <button 
              onClick={() => setLocation("/employee/meal-pass")}
              className="w-full py-4 rounded-xl font-bold text-[15px] text-slate-800 hover:bg-gray-100 transition-all border border-transparent hover:border-gray-200"
            >
              Cancel
            </button>
          </div>
          
        </div>
      </motion.div>

      {/* Success Popup */}
      <Dialog open={showSuccess}>
        <DialogContent className="sm:max-w-md rounded-3xl p-8 text-center flex flex-col items-center [&>button]:hidden border-0 shadow-2xl">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-5 animate-bounce shadow-inner">
            <CheckCircle2 className="w-10 h-10" strokeWidth={3} />
          </div>
          <DialogTitle className="text-xl font-black text-slate-800 mb-2">Order is placed</DialogTitle>
          <p className="text-[15px] font-medium text-gray-500">
            Please wait for 5 to 10mins.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
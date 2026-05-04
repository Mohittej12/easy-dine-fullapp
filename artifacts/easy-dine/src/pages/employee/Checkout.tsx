import { useState } from "react";
import { useLocation } from "wouter";
import { useAppState } from "@/hooks/use-app-state";
import { ArrowLeft, CheckCircle2, ShieldCheck, Smartphone } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { HamburgerMenu } from "@/components/HamburgerMenu";

export default function EmployeeCheckout() {
  const [, setLocation] = useLocation();
  const { cart, employee, addOrder, clearCart } = useAppState();
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("PhonePe");

  const paymentOptions = ["PhonePe", "GPay", "Paytm", "Supermoney"];

  // If cart is empty, redirect back
  if (cart.length === 0 && !showSuccess) {
    setLocation("/employee/home");
    return null;
  }

  const subtotal = cart.reduce((acc, item) => acc + (item.foodItem.price * item.quantity), 0);
  const total = subtotal;

  const handlePay = () => {
    // Derive shopName from the first item
    const shopId = cart[0].foodItem.shopId;
    const shopName = shopId === "shop_meal_counter" ? "Meal Counter" : "Tuck Shop";

    const orderId = `ORD-ED-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    
    addOrder({
      orderId,
      userName: employee.name,
      employeeId: employee.employeeId,
      shopId: shopId,
      shopName: shopName,
      items: cart.map(c => ({
        id: `item_${Math.random()}`,
        foodItemId: c.foodItem.id,
        name: c.foodItem.name,
        price: c.foodItem.price,
        quantity: c.quantity,
        image: c.foodItem.image
      })),
      amount: Math.round(total),
      orderType: "regular",
      paymentType: "paid",
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
    <div className="flex flex-col min-h-[100dvh] relative overflow-hidden bg-black pb-8">
      
      {/* Full-screen Background Image with dark overlay */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/background-cafeteria.png" 
          alt="Modern Cafeteria Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[4px]" />
      </div>

      <div className="z-10 relative flex flex-col h-full">
        
        {/* Header Section */}
        <div className="bg-white flex items-center justify-center py-4 px-4 shadow-sm relative">
          <button 
            onClick={() => setLocation("/employee/menu")}
            className="absolute left-4 p-1 text-slate-800 hover:bg-gray-100 rounded-md transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-[18px] font-black text-slate-800">Checkout</h1>
          <div className="absolute right-4">
            <HamburgerMenu />
          </div>
        </div>

        <div className="px-4 mt-6 space-y-4">
          
          {/* Order Summary Card */}
          <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100">
            <h2 className="text-[16px] font-bold text-slate-800 border-b border-gray-100 pb-3 mb-4">
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-4">
              {cart.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-[60px] h-[60px] bg-[#fcefee] rounded-xl flex items-center justify-center shrink-0 border border-red-50">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 20-3-3m0 0-3-3m3 3V11m-7 8c0 1.1-.9 2-2 2H2v-2h2c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H2V5h2c1.1 0 2 .9 2 2v6c0 1.1.9 2 2 2h4v-4H8v-2h4v-2H8V5h8v4h-2v2h2v4h-2v2h2v4h-2Z"/><path d="m20 11 2 2-2 2"/></svg>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-[14px] font-bold text-slate-800">{item.foodItem.name}</h3>
                    <p className="text-[12px] font-medium text-gray-500 mt-1">Qty: {item.quantity}</p>
                  </div>
                  <div className="flex items-end justify-center">
                    <span className="text-[15px] font-black text-slate-800">₹{item.foodItem.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 pt-3 space-y-3">
              <div className="flex justify-between items-center text-[14px]">
                <span className="font-medium text-gray-500">Subtotal</span>
                <span className="font-bold text-slate-800">₹{subtotal}</span>
              </div>
              
              <div className="flex justify-between items-center text-[16px] pt-1">
                <span className="font-bold text-slate-800">Total</span>
                <span className="font-black text-[#FF3B30]">₹{total}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Card */}
          <div className="bg-white rounded-[20px] p-4 shadow-sm border border-gray-100">
            <h2 className="text-[16px] font-bold text-slate-800 border-b border-gray-100 pb-3 mb-4">
              Payment Method
            </h2>

            <div className="space-y-3">
              {paymentOptions.map((option) => (
                <div 
                  key={option}
                  onClick={() => setSelectedPayment(option)}
                  className={`border-2 rounded-xl p-3 flex items-center cursor-pointer transition-all ${
                    selectedPayment === option 
                      ? "border-[#FF3B30] bg-red-50/30" 
                      : "border-gray-100 hover:border-red-200"
                  }`}
                >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shrink-0 border border-gray-100 mr-3 shadow-sm">
                    <Smartphone className={`w-5 h-5 ${selectedPayment === option ? "text-[#FF3B30]" : "text-gray-400"}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[14px] font-bold text-slate-800 leading-tight">{option}</h3>
                    <p className="text-[11px] font-medium text-gray-400">UPI Payment</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center ${selectedPayment === option ? "bg-[#FF3B30]" : "border-2 border-gray-200"}`}>
                    {selectedPayment === option && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 px-2">
            <button 
              onClick={handlePay}
              className="w-full h-[56px] bg-[#FF3B30] text-white rounded-xl font-bold text-[16px] shadow-lg shadow-red-500/30 hover:bg-red-600 transition-all flex items-center justify-center gap-2"
            >
              Pay Now <span className="text-red-200">|</span> ₹{total}
            </button>
            <p className="text-center text-[11px] font-medium text-white/70 mt-4 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-green-400" /> 100% Secure Payment
            </p>
          </div>

        </div>
      </div>

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
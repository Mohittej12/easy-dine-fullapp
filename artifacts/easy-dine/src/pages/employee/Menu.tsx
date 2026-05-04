import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAppState } from "@/hooks/use-app-state";
import { Heart, Plus, Minus, ShoppingCart, ChevronUp, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { HamburgerMenu } from "@/components/HamburgerMenu";

// Removed custom menu data, using global state instead

export default function EmployeeMenu() {
  const [, setLocation] = useLocation();
  const { foodItems, cart, addToCart, removeFromCart, updateQuantity, favorites, toggleFavorite } = useAppState();
  
  const [activeShop, setActiveShop] = useState<"Meal Counter" | "Tuck Shop">("Meal Counter");
  const [activeTab, setActiveTab] = useState<"Breakfast" | "Lunch" | "Dinner">("Breakfast");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showConflictDialog, setShowConflictDialog] = useState(false);

  // Derive current items to display based on global state selections
  const currentItems = foodItems.filter(item => {
    if (!item.available) return false;
    
    if (activeShop === "Meal Counter") {
      return item.shopId === "shop_meal_counter" && item.category === activeTab;
    } else {
      return item.shopId === "shop_tuck_shop";
    }
  });

  const handleAddToCart = (item: any) => {
    addToCart(item);
  };

  const getCartQuantity = (itemId: string) => {
    const item = cart.find(c => c.foodItem.id === itemId);
    return item ? item.quantity : 0;
  };

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = cart.reduce((acc, item) => acc + (item.foodItem.price * item.quantity), 0);

  const handleProceedToCheckout = () => {
    // Validate that items belong to a single shop
    const uniqueShopIds = new Set(cart.map(item => item.foodItem.shopId));
    if (uniqueShopIds.size > 1) {
      setShowConflictDialog(true);
      return;
    }

    setIsCartOpen(false);
    setLocation("/employee/checkout");
  };

  return (
    <div className="flex flex-col min-h-[100dvh] relative overflow-hidden bg-black">
      
      {/* Full-screen Background Image with dark overlay */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/background-cafeteria.png" 
          alt="Modern Cafeteria Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[4px]" />
      </div>

      <div className="z-10 relative flex flex-col h-full pt-6">
        
        {/* Header Section */}
        <div className="px-4 flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <HamburgerMenu />
            <div className="bg-white/95 px-3 py-1 rounded-sm shadow-sm border border-gray-200">
              <span className="text-[18px] font-extrabold text-black tracking-tight leading-none">Easy Dine</span>
            </div>
            <h1 className="text-[20px] font-bold text-white drop-shadow-md">Menu</h1>
          </div>
          
          <div className="relative cursor-pointer p-2 bg-white rounded-full shadow-sm border border-gray-100" onClick={() => { if(totalCartItems > 0) setIsCartOpen(true) }}>
            <ShoppingCart className="w-5 h-5 text-slate-800" />
            {totalCartItems > 0 && (
              <div className="absolute -top-1 -right-1 bg-[#FF3B30] text-white text-[10px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white">
                {totalCartItems}
              </div>
            )}
          </div>
        </div>

        {/* Primary Tab Selector (Meal Counter / Tuck Shop) */}
        <div className="px-4 mb-4">
          <div className="flex bg-white rounded-2xl p-1 shadow-sm border border-gray-200">
            <button
              onClick={() => setActiveShop("Meal Counter")}
              className={`flex-1 py-2.5 text-[15px] font-bold rounded-xl transition-all ${
                activeShop === "Meal Counter" 
                  ? 'bg-[#fcefee] text-[#FF3B30] shadow-sm' 
                  : 'text-gray-500 hover:text-slate-800'
              }`}
            >
              Meal Counter
            </button>
            <button
              onClick={() => setActiveShop("Tuck Shop")}
              className={`flex-1 py-2.5 text-[15px] font-bold rounded-xl transition-all ${
                activeShop === "Tuck Shop" 
                  ? 'bg-[#fcefee] text-[#FF3B30] shadow-sm' 
                  : 'text-gray-500 hover:text-slate-800'
              }`}
            >
              Tuck Shop
            </button>
          </div>
        </div>

        {/* Secondary Tab Selector (Only for Meal Counter) */}
        {activeShop === "Meal Counter" && (
          <div className="px-4 mb-4 flex gap-2 overflow-x-auto scrollbar-hide">
            {["Breakfast", "Lunch", "Dinner"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`px-5 py-2 rounded-full text-[14px] font-bold transition-all border shrink-0 ${
                  activeTab === tab
                    ? 'bg-[#FF3B30] text-white border-[#FF3B30] shadow-md'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#FF3B30]/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* Section Title & Count */}
        <div className="px-5 py-3 bg-black/40 backdrop-blur-md border-y border-white/10 flex justify-between items-center mb-4 sticky top-0 z-20">
          <h2 className="text-[18px] font-black text-white drop-shadow-md">
            {activeShop === "Meal Counter" ? activeTab : "Tuck Shop"}
          </h2>
          <span className="text-[13px] font-bold text-white/80">
            {currentItems.length} items
          </span>
        </div>

        {/* Food Grid (2 Columns) */}
        <div className="px-4 pb-32">
          <div className="grid grid-cols-2 gap-x-3 gap-y-4">
            {currentItems.map((item) => {
              const qty = getCartQuantity(item.id);
              return (
                <div key={item.id} className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                  {/* Image Container */}
                  <div className="h-[120px] w-full bg-[#fcefee] flex items-center justify-center relative border-b border-red-50 overflow-hidden">
                    <div className="w-16 h-16 bg-[#FF3B30] rounded-[14px] flex items-center justify-center flex-shrink-0 shadow-inner text-white font-black text-[24px] tracking-tighter">
                      ED
                    </div>
                    <button 
                      onClick={() => toggleFavorite(item.id)}
                      className="absolute top-2 right-2 w-7 h-7 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-[#FF3B30] transition-colors"
                    >
                      <Heart fill={favorites.includes(item.id) ? "currentColor" : "none"} className={`w-3.5 h-3.5 ${favorites.includes(item.id) ? "text-[#FF3B30]" : ""}`} />
                    </button>

                    {/* Add / Quantity Button Overlaid inside the Image */}
                    <div className="absolute bottom-2 right-2 z-10">
                      {qty === 0 ? (
                        <button 
                          onClick={() => handleAddToCart(item)}
                          className="w-8 h-8 bg-[#FF3B30] text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:bg-red-600 transition-colors"
                        >
                          <Plus className="w-4 h-4" strokeWidth={3} />
                        </button>
                      ) : (
                        <div className="flex items-center bg-[#FF3B30] text-white rounded-full shadow-lg border-2 border-white overflow-hidden h-8">
                          <button 
                            onClick={() => {
                              if (qty === 1) removeFromCart(item.id);
                              else updateQuantity(item.id, -1);
                            }} 
                            className="w-7 h-full flex items-center justify-center hover:bg-black/10 transition-colors"
                          >
                            <Minus className="w-3 h-3" strokeWidth={3} />
                          </button>
                          <span className="font-bold text-[12px] min-w-[14px] text-center">{qty}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)} 
                            className="w-7 h-full flex items-center justify-center hover:bg-black/10 transition-colors"
                          >
                            <Plus className="w-3 h-3" strokeWidth={3} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Details Container */}
                  <div className="p-3 pt-5 flex flex-col flex-1">
                    <h3 className="text-[14px] font-black text-slate-800 line-clamp-1 mb-1">{item.name}</h3>
                    <div className="mt-auto">
                      <span className="text-[15px] font-black text-slate-800">₹{item.price}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Floating Check Cart Popup (Banner) */}
      <AnimatePresence>
        {totalCartItems > 0 && !isCartOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-[85px] left-4 right-4 z-40"
          >
            <div 
              onClick={() => setIsCartOpen(true)}
              className="bg-[#FF3B30] text-white rounded-2xl p-4 flex justify-between items-center shadow-2xl shadow-red-500/30 cursor-pointer hover:bg-red-600 transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-[14px] font-medium text-red-100">
                  {totalCartItems} item{totalCartItems > 1 ? 's' : ''} • ₹{totalAmount}
                </span>
                <span className="text-[16px] font-bold">
                  Show Cart
                </span>
              </div>
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <ChevronUp className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Sheet Cart Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] z-50 flex flex-col max-h-[85vh] shadow-2xl"
            >
              {/* Drag Handle & Header */}
              <div className="p-5 pb-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white rounded-t-[32px] z-10">
                <div>
                  <h2 className="text-xl font-black text-slate-800">Your Cart</h2>
                  <p className="text-sm font-medium text-gray-500">{totalCartItems} items</p>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="overflow-y-auto px-5 py-4 flex-1 space-y-4">
                {cart.map((cartItem) => (
                  <div key={cartItem.foodItem.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-[#fcefee] rounded-xl flex items-center justify-center shrink-0 border border-red-50 overflow-hidden">
                      <div className="w-10 h-10 bg-[#FF3B30] rounded-lg flex items-center justify-center text-white font-black text-[14px] tracking-tighter">
                        ED
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-slate-800">{cartItem.foodItem.name}</h4>
                      <p className="font-bold text-[#FF3B30] text-[14px]">₹{cartItem.foodItem.price}</p>
                    </div>
                    <div className="flex items-center bg-gray-100 rounded-full h-9 px-1">
                      <button 
                        onClick={() => {
                          if (cartItem.quantity === 1) removeFromCart(cartItem.foodItem.id);
                          else updateQuantity(cartItem.foodItem.id, -1);
                          if (totalCartItems <= 1) setIsCartOpen(false);
                        }} 
                        className="w-8 h-full flex items-center justify-center text-gray-600 hover:text-black transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" strokeWidth={3} />
                      </button>
                      <span className="font-bold text-[13px] min-w-[20px] text-center text-black">{cartItem.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(cartItem.foodItem.id, 1)} 
                        className="w-8 h-full flex items-center justify-center text-gray-600 hover:text-black transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total & Checkout Button */}
              <div className="p-5 bg-white border-t border-gray-100 pb-8">
                <div className="flex items-center justify-between mb-4 px-1">
                  <span className="text-[16px] font-bold text-gray-500">Total Amount</span>
                  <span className="text-[24px] font-black text-slate-800">₹{totalAmount}</span>
                </div>
                <button 
                  onClick={handleProceedToCheckout}
                  className="w-full bg-[#FF3B30] text-white h-14 rounded-2xl font-bold text-[16px] shadow-lg shadow-red-500/30 hover:bg-red-600 transition-colors active:scale-[0.98]"
                >
                  Proceed to next step
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Conflict Dialog Popup */}
      <AnimatePresence>
        {showConflictDialog && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowConflictDialog(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[24px] p-6 max-w-sm w-full relative z-10 shadow-2xl text-center"
            >
              <div className="w-16 h-16 bg-red-100 text-[#FF3B30] rounded-full flex items-center justify-center mx-auto mb-4">
                <X className="w-8 h-8" strokeWidth={3} />
              </div>
              <h2 className="text-lg font-black text-slate-800 mb-2">Multiple Cafeterias</h2>
              <p className="text-gray-500 font-medium text-[15px] mb-6 leading-tight">
                Order should be raised for each cafeteria separately. Please remove items from one cafeteria to proceed.
              </p>
              <button
                onClick={() => setShowConflictDialog(false)}
                className="w-full bg-gray-100 text-slate-800 hover:bg-gray-200 transition-colors py-3 rounded-xl font-bold"
              >
                Got it
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
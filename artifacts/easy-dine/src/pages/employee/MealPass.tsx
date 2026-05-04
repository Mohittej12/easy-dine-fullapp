import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Heart, Search, ArrowRight, X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppState } from "@/hooks/use-app-state";
import { HamburgerMenu } from "@/components/HamburgerMenu";

export default function MealPass() {
  const [, setLocation] = useLocation();
  const { cart, addToCart, removeFromCart } = useAppState();
  const [activeTab, setActiveTab] = useState("Breakfast");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Categories based on user request
  const categories = ["Breakfast", "Lunch", "Dinner"];

  const handleAddToCart = (category: string) => {
    // Generate a mock FoodItem based on the category
    const mockFoodItem = {
      id: `f_${category.toLowerCase()}`,
      shopId: "shop_meal_counter",
      name: `${category} Meal`,
      description: "Company sponsored meal",
      price: 0,
      image: "",
      category: category,
      isAvailable: true,
      dietary: ["veg"],
      calories: 450
    };
    
    // Only add if it doesn't already exist to keep it simple for ticketing
    if (!cart.find(c => c.foodItem.id === mockFoodItem.id)) {
      addToCart(mockFoodItem);
    }
  };

  const handleRemoveFromCart = (itemId: string) => {
    removeFromCart(itemId);
    if (cart.length <= 1) {
      setIsCartOpen(false);
    }
  };

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
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[4px]" />
      </div>

      <div className="z-10 relative flex flex-col min-h-full">
        {/* Top Header */}
        <div className="flex justify-between items-center py-2 px-1 mb-4 mt-8">
          <div className="flex items-center gap-3">
            <HamburgerMenu />
            <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-sm shadow-sm">
              <span className="text-xl font-extrabold text-black tracking-tight leading-none">Easy Dine</span>
            </div>
          </div>
          
          <div className="relative cursor-pointer bg-white/95 p-2 rounded-full shadow-sm" onClick={() => { if(cart.length > 0) setIsCartOpen(true) }}>
            <ShoppingCart className="w-6 h-6 text-slate-800" />
            {cart.length > 0 && (
              <div className="absolute -top-1.5 -right-1.5 bg-[#E31837] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cart.length}
              </div>
            )}
          </div>
        </div>

        {/* Menu Title */}
        <h1 className="text-[22px] font-bold text-center text-white mb-4 border-b border-white/20 pb-3 drop-shadow-md">
          Menu
        </h1>

        {/* Segmented Control for Cafeteria Selection */}
        <div className="bg-white/90 backdrop-blur-md rounded-xl p-3 mb-5 border border-white/50 mx-4 shadow-sm">
          <div className="text-center font-bold text-[14px] text-slate-800">
            Meal Counter
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide border-b border-white/20 px-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2.5 rounded-full text-[14px] font-bold transition-all border whitespace-nowrap backdrop-blur-md ${
                activeTab === cat 
                  ? "bg-[#FF3B30] text-white border-[#FF3B30] shadow-md" 
                  : "bg-white/80 text-slate-800 border-white/50 hover:bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Box with White Glass Background */}
        <div className="flex-1 bg-white/95 backdrop-blur-xl rounded-t-[32px] mt-2 pb-32 shadow-2xl overflow-hidden">
          {/* Category Header */}
          <div className="flex justify-between items-center py-5 bg-gray-50/50 px-5 border-b border-gray-100">
            <h2 className="text-[20px] font-bold text-slate-800">{activeTab}</h2>
            <span className="text-[13px] text-gray-500 font-medium">1 item</span>
          </div>

          {/* Item Card */}
          <div className="px-5 pt-5 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden w-[160px] relative"
          >
            {/* Image Container */}
            <div className="relative h-[140px] w-full bg-[#f8f9fa] flex flex-col items-center justify-center p-2 border-b border-gray-100">
              <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-[#FF3B30] mb-2 border border-red-100">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 20-3-3m0 0-3-3m3 3V11m-7 8c0 1.1-.9 2-2 2H2v-2h2c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H2V5h2c1.1 0 2 .9 2 2v6c0 1.1.9 2 2 2h4v-4H8v-2h4v-2H8V5h8v4h-2v2h2v4h-2v2h2v4h-2Z"/><path d="m20 11 2 2-2 2"/></svg>
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Easy Dine</span>

              {/* Add Button */}
              <button 
                onClick={() => handleAddToCart(activeTab)}
                className="absolute bottom-2 right-2 w-8 h-8 bg-[#FF3B30] rounded-full flex items-center justify-center text-white shadow-md border-2 border-white hover:bg-[#E31837] transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m16 20-3-3m0 0-3-3m3 3V11m-7 8c0 1.1-.9 2-2 2H2v-2h2c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H2V5h2c1.1 0 2 .9 2 2v6c0 1.1.9 2 2 2h4v-4H8v-2h4v-2H8V5h8v4h-2v2h2v4h-2v2h2v4h-2Z"/></svg>
              </button>
            </div>

            {/* Title Area */}
            <div className="p-3 border-t border-gray-50">
              <h3 className="font-bold text-[14px] text-slate-800">{activeTab}</h3>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Check Cart Popup (when item added but cart not open) */}
      <AnimatePresence>
        {cart.length > 0 && !isCartOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-[65px] left-4 right-4 z-40 md:absolute"
          >
            <div 
              onClick={() => setIsCartOpen(true)}
              className="bg-[#2D2D2D] text-white rounded-xl p-4 flex justify-between items-center shadow-2xl cursor-pointer hover:bg-black transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-[14px] font-medium text-gray-300">
                  {cart.reduce((acc, c) => acc + c.quantity, 0)} item{cart.length > 1 ? 's' : ''} added
                </span>
                <span className="text-[16px] font-bold text-white">
                  Check your cart
                </span>
              </div>
              <ArrowRight className="w-5 h-5 text-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Bottom Sheet Modal */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm md:absolute"
            />
            
            {/* Modal Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed bottom-0 left-0 right-0 z-[110] bg-white/95 backdrop-blur-xl rounded-t-3xl shadow-2xl md:absolute md:max-w-md md:mx-auto border-t border-white/20"
            >
              <div className="p-5 pb-12">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-slate-800">Your Cart</h2>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-black hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2">
                  {cart.map((item, index) => (
                    <div key={`${item.foodItem.id}-${index}`} className="flex items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <div className="w-16 h-16 bg-white rounded-lg flex-shrink-0 shadow-sm border border-gray-100 flex items-center justify-center text-[#FF3B30]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 20-3-3m0 0-3-3m3 3V11m-7 8c0 1.1-.9 2-2 2H2v-2h2c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H2V5h2c1.1 0 2 .9 2 2v6c0 1.1.9 2 2 2h4v-4H8v-2h4v-2H8V5h8v4h-2v2h2v4h-2v2h2v4h-2Z"/><path d="m20 11 2 2-2 2"/></svg>
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="font-bold text-slate-800">{item.foodItem.name}</h3>
                        <p className="text-[12px] text-gray-500 font-medium">Meal Counter</p>
                      </div>
                      <button 
                        onClick={() => handleRemoveFromCart(item.foodItem.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => setLocation("/employee/meal-authorization")}
                  className="w-full bg-[#E31837] text-white rounded-xl py-4 font-bold text-[16px] shadow-lg shadow-red-500/30 hover:bg-[#C1122A] transition-all flex justify-center items-center gap-2"
                >
                  Proceed to next step <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      </div>
      </div>
    </div>
  );
}
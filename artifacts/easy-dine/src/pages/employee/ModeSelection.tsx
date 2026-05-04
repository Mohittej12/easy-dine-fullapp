import { Link } from "wouter";
import { motion } from "framer-motion";
import { Ticket, ShoppingBag, ChevronRight, ArrowLeft } from "lucide-react";

export default function ModeSelection() {
  return (
    <>
      <div className="min-h-[100dvh] bg-black relative flex flex-col items-center overflow-x-hidden">
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

        {/* Top Navbar Area */}
        <div className="w-full max-w-[400px] z-10 px-6 pt-12 pb-4 flex items-center relative">
          <Link href="/login">
            <button className="text-white hover:text-gray-200 transition-colors p-2 -ml-2">
              <ArrowLeft className="w-6 h-6" strokeWidth={2.5} />
            </button>
          </Link>
        </div>

        {/* Content Container */}
        <div className="w-full max-w-[400px] z-10 px-4 flex-1 flex flex-col">
          
          {/* Header Text Area */}
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center mt-2 mb-10"
          >
            <div className="bg-white px-4 py-1.5 rounded-sm mb-4 inline-block shadow-sm">
              <span className="text-2xl font-bold text-black tracking-tight leading-none">Easy Dine</span>
            </div>
            
            <p className="text-[15px] font-medium text-white/90 mb-6">Welcome Back</p>
            
            <h1 className="text-3xl font-bold text-white tracking-tight mb-2 shadow-black/50 drop-shadow-md">
              Choose Ordering Mode
            </h1>
            <p className="text-[15px] text-white/80 font-medium">
              Select how you'd like to continue
            </p>
          </motion.div>

          {/* Selection Cards */}
          <div className="space-y-4">
            
            {/* Ticketing Card */}
            <Link href="/employee/meal-pass">
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1, type: "spring", bounce: 0.4 }}
                className="w-full bg-white/95 backdrop-blur-xl rounded-[28px] p-5 flex items-center shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer group border border-white/20"
              >
                <div className="w-16 h-16 bg-[#E31837] rounded-2xl flex items-center justify-center shadow-md group-hover:bg-[#FF3B30] transition-colors flex-shrink-0">
                  <Ticket className="w-8 h-8 text-white" />
                </div>
                
                <div className="ml-5 flex-1">
                  <h2 className="text-[20px] font-extrabold text-black mb-1">Ticketing</h2>
                  <p className="text-[12px] leading-tight mt-1 font-semibold text-[#E31837]">
                    Company sponsored meals at the Meal Counter.
                  </p>
                </div>
                
                <div className="w-8 h-8 bg-[#E31837] rounded-full flex items-center justify-center shadow-sm group-hover:bg-[#FF3B30] transition-colors">
                  <ChevronRight className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
              </motion.div>
            </Link>

            {/* Pay and Use Card */}
            <Link href="/employee/home">
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring", bounce: 0.4 }}
                className="w-full bg-white/95 backdrop-blur-xl rounded-[28px] p-5 flex items-center shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer group border border-white/20"
              >
                <div className="w-16 h-16 bg-[#E31837] rounded-2xl flex items-center justify-center shadow-md group-hover:bg-[#FF3B30] transition-colors flex-shrink-0">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
                
                <div className="ml-5 flex-1">
                  <h2 className="text-[20px] font-extrabold text-black mb-1">Pay and Use</h2>
                  <p className="text-[12px] leading-tight mt-1 font-semibold text-[#E31837]">
                    Order from any Cafeteria and pay online via UPI . Available for all employees.
                  </p>
                </div>
                
                <div className="w-8 h-8 bg-[#E31837] rounded-full flex items-center justify-center shadow-sm group-hover:bg-[#FF3B30] transition-colors">
                  <ChevronRight className="w-5 h-5 text-white" strokeWidth={3} />
                </div>
              </motion.div>
            </Link>

          </div>

          {/* Bottom Text */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-auto pb-10 text-center"
          >
            <p className="text-[14px] font-semibold text-white/80">
              You can switch later anytime
            </p>
          </motion.div>

        </div>
      </div>
    </>
  );
}
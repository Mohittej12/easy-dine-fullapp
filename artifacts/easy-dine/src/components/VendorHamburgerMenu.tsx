import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, LayoutDashboard, ShoppingBag, UtensilsCrossed, BarChart3, Ticket, ShieldCheck, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppState } from "@/hooks/use-app-state";

export function VendorHamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { setRole } = useAppState();

  const links = [
    { name: "Dashboard", href: "/vendor/dashboard", icon: LayoutDashboard },
    { name: "Orders", href: "/vendor/orders", icon: ShoppingBag },
    { name: "Food Items", href: "/vendor/food-items", icon: UtensilsCrossed },
    { name: "Reports", href: "/vendor/reports", icon: BarChart3 },
    { name: "Ticket Data View", href: "/vendor/ticket-data", icon: Ticket },
    { name: "Terms and Disclaimer", href: "/vendor/terms", icon: ShieldCheck },
  ];

  const handleLogout = () => {
    setRole(null);
    setIsOpen(false);
    setLocation("/login");
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 bg-white/95 backdrop-blur-md rounded-full shadow-sm text-slate-800 hover:bg-white transition-colors border border-gray-200"
      >
        <Menu className="w-6 h-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[210] shadow-2xl flex flex-col"
            >
              {/* Header Profile Section */}
              <Link href="/vendor/profile">
                <div 
                  onClick={() => setIsOpen(false)}
                  className="p-6 bg-slate-50 border-b border-gray-100 relative cursor-pointer hover:bg-slate-100 transition-colors"
                >
                  <button 
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(false); }}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full text-gray-500 hover:text-black shadow-sm transition-colors"
                  >
                    <X className="w-4 h-4" strokeWidth={3} />
                  </button>
                  <div className="w-14 h-14 bg-[#FF3B30] text-white rounded-2xl flex items-center justify-center font-black text-xl mb-3 shadow-md">
                    M
                  </div>
                  <h2 className="font-black text-[18px] text-slate-800 tracking-tight leading-none mb-1">+91 98765 43210</h2>
                  <p className="text-[13px] font-bold text-gray-500">Meal Counter</p>
                </div>
              </Link>

              {/* Navigation Links */}
              <div className="flex-1 py-4 flex flex-col gap-1 px-3 overflow-y-auto">
                {links.map((link) => {
                  const Icon = link.icon;
                  const isActive = location === link.href;
                  return (
                    <Link key={link.name} href={link.href}>
                      <span 
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all cursor-pointer ${
                          isActive ? "bg-[#FF3B30] text-white shadow-md" : "text-slate-600 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-[14px]">{link.name}</span>
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Footer Sign Out */}
              <div className="p-5 border-t border-gray-100">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 bg-red-50 text-[#FF3B30] py-3.5 rounded-xl font-bold text-[14px] hover:bg-red-100 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

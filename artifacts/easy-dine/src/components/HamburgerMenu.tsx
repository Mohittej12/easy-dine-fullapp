import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Home, ShoppingBag, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const links = [
    { name: "Home", href: "/employee/mode-selection", icon: Home },
    { name: "Orders", href: "/employee/orders", icon: ShoppingBag },
    { name: "My Profile", href: "/employee/profile", icon: User },
  ];

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
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] bg-white z-[210] shadow-2xl flex flex-col"
            >
              <div className="p-5 flex justify-between items-center border-b border-gray-100">
                <span className="font-black text-[20px] text-slate-800 tracking-tight">Easy Dine</span>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-black hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 py-4 flex flex-col gap-2 px-3">
                {links.map((link) => {
                  const Icon = link.icon;
                  // Handle exact match or prefix for "Home"
                  const isActive = location === link.href || (link.name === "Home" && location.includes("/mode-selection"));
                  return (
                    <Link key={link.name} href={link.href}>
                      <span 
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all cursor-pointer ${
                          isActive ? "bg-[#FF3B30] text-white shadow-md" : "text-slate-600 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {link.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

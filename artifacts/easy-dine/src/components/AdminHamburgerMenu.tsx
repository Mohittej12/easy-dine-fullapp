import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, LayoutDashboard, UtensilsCrossed, Users, TrendingUp, Upload, FileText, ShieldCheck, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppState } from "@/hooks/use-app-state";

export function AdminHamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { setRole, employee } = useAppState();

  const links = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Menu Management", href: "/admin/menu-management", icon: FileText },
    { name: "Vendors", href: "/admin/vendors", icon: Users },
    { name: "Vendor Performance", href: "/admin/vendor-performance", icon: TrendingUp },
    { name: "Food Items", href: "/admin/food-items", icon: UtensilsCrossed },
    { name: "Upload Ticket ID Data", href: "/admin/upload-ticket-data", icon: Upload },
    { name: "Terms and Disclaimer", href: "/admin/terms", icon: ShieldCheck },
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
        className="p-2 bg-white/10 backdrop-blur-md rounded-full shadow-sm text-white hover:bg-white/20 transition-colors border border-white/20"
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
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-white z-[210] shadow-2xl flex flex-col border-r border-gray-100"
            >
              {/* Header Profile Section */}
              <div 
                className="p-6 bg-gray-50 border-b border-gray-100 relative cursor-default"
              >
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsOpen(false); }}
                  className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-400 hover:text-slate-800 shadow-sm transition-colors"
                >
                  <X className="w-4 h-4" strokeWidth={3} />
                </button>
                <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-black text-xl mb-3 shadow-lg">
                  {employee?.name?.charAt(0) || "A"}
                </div>
                <h2 className="font-black text-[18px] text-slate-800 tracking-tight leading-none mb-1">{employee?.name || "Admin"}</h2>
                <p className="text-[13px] font-bold text-blue-600">Admin Team</p>
              </div>

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
                          isActive ? "bg-blue-600 text-white shadow-md" : "text-slate-600 hover:bg-gray-50 hover:text-slate-900"
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
                  className="w-full flex items-center justify-center gap-3 bg-red-50 text-red-600 py-3.5 rounded-xl font-bold text-[14px] hover:bg-red-100 transition-colors border border-red-100"
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

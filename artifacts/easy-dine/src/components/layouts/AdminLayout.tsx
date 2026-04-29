import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { useAppState } from "@/hooks/use-app-state";
import { LayoutDashboard, Users, Store, UtensilsCrossed, UploadCloud, FileText, LogOut, Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/menu-management", label: "Menu Management", icon: UtensilsCrossed },
  { href: "/admin/vendors", label: "Vendors", icon: Store },
  { href: "/admin/vendor-performance", label: "Vendor Performance", icon: Users },
  { href: "/admin/upload-ticket-data", label: "Upload Ticket Data", icon: UploadCloud },
  { href: "/admin/terms", label: "Terms & Disclaimer", icon: FileText },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const { setRole } = useAppState();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSignOut = () => {
    setRole(null);
    setLocation("/login");
  };

  return (
    <div className="min-h-[100dvh] bg-background flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-border shrink-0">
        <div className="p-6 flex items-center gap-3 border-b border-border">
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm">
            A
          </div>
          <div>
            <h1 className="font-bold text-foreground">Easy Dine</h1>
            <p className="text-xs text-muted-foreground">Admin Panel</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-border">
          <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl transition-colors font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Header & Drawer */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-border sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="-ml-2" onClick={() => setIsDrawerOpen(true)}>
              <Menu className="w-6 h-6" />
            </Button>
            <h1 className="font-bold">Admin Panel</h1>
          </div>
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-black text-white">A</AvatarFallback>
          </Avatar>
        </header>

        {isDrawerOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsDrawerOpen(false)} />
            <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-left">
              <div className="p-4 flex items-center justify-between border-b border-border bg-black/5">
                <div className="flex items-center gap-3">
                  <Avatar className="w-10 h-10 border border-border">
                    <AvatarFallback className="bg-black text-white">A</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-bold text-sm">Admin Panel</h2>
                    <p className="text-xs text-muted-foreground">Administrator</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="-mr-2 text-muted-foreground" onClick={() => setIsDrawerOpen(false)}>
                  <X className="w-5 h-5" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
                {navItems.map((item) => {
                  const isActive = location === item.href;
                  const Icon = item.icon;
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setIsDrawerOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                      <Icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <div className="p-4 border-t border-border">
                <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl transition-colors font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
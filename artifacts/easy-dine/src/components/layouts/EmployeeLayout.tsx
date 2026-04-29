import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Home, Search, ClipboardList, User, ShoppingCart, ChevronLeft } from "lucide-react";
import { useAppState } from "@/hooks/use-app-state";

export default function EmployeeLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { cart } = useAppState();

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isHome = location === "/employee/home";
  const isMenu = location === "/employee/menu";
  const isOrders = location === "/employee/orders";
  const isProfile = location === "/employee/profile";
  
  const showBottomNav = isHome || isMenu || isOrders || isProfile;

  return (
    <div className="min-h-[100dvh] bg-background w-full relative pb-24 md:pb-0">
      {/* Desktop sidebar could go here if we wanted, but mobile first. Let's just center it for desktop. */}
      <div className="max-w-md mx-auto min-h-[100dvh] bg-background md:shadow-xl relative flex flex-col">
        
        {/* Header - Simple back button for sub-pages if not main tabs */}
        {!showBottomNav && (
          <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b px-4 py-3 flex items-center justify-between">
            <Link href="/employee/home" className="p-2 -ml-2 rounded-full hover:bg-muted text-foreground">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            {/* Header Content can be passed via children or contextual */}
          </header>
        )}

        <main className="flex-1 flex flex-col w-full h-full relative p-4">
          {children}
        </main>

        {/* Bottom Nav */}
        {showBottomNav && (
          <div className="fixed bottom-0 left-0 right-0 z-50 md:sticky md:bottom-auto">
            <div className="max-w-md mx-auto">
              <div className="m-4 bg-white rounded-2xl shadow-lg border border-border p-2 flex items-center justify-around relative">
                <Link href="/employee/home" className={`flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-colors ${isHome ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                  <Home className="w-6 h-6 mb-1" />
                </Link>
                <Link href="/employee/menu" className={`flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-colors ${isMenu ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                  <Search className="w-6 h-6 mb-1" />
                </Link>
                <Link href="/employee/orders" className={`flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-colors ${isOrders ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                  <ClipboardList className="w-6 h-6 mb-1" />
                </Link>
                <Link href="/employee/profile" className={`flex flex-col items-center justify-center w-16 h-12 rounded-xl transition-colors ${isProfile ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                  <User className="w-6 h-6 mb-1" />
                </Link>

                {totalCartItems > 0 && (
                  <Link href="/employee/cart" className="absolute -top-4 right-4 bg-primary text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-primary/90 transition-transform active:scale-95">
                    <div className="relative">
                      <ShoppingCart className="w-6 h-6" />
                      <span className="absolute -top-2 -right-2 bg-white text-primary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-sm">
                        {totalCartItems}
                      </span>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
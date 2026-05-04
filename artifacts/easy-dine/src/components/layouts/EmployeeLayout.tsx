import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Home, Search, ClipboardList, User, ShoppingCart, ChevronLeft } from "lucide-react";
import { useAppState } from "@/hooks/use-app-state";

export default function EmployeeLayout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const { cart } = useAppState();

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const isMenu = location === "/employee/meal-pass"; // Ticketing menu is now the main menu
  const isOrders = location === "/employee/orders";
  const isProfile = location === "/employee/profile";
  
  const showBottomNav = isMenu || isOrders || isProfile;

  return (
    <div className="min-h-[100dvh] bg-background w-full relative pb-24 md:pb-0">
      {/* Desktop sidebar could go here if we wanted, but mobile first. Let's just center it for desktop. */}
      <div className="max-w-md mx-auto min-h-[100dvh] bg-background md:shadow-xl relative flex flex-col">
        
        <main className="flex-1 flex flex-col w-full h-full relative">
          {children}
        </main>

      </div>
    </div>
  );
}
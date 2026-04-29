import { Link, useLocation } from "wouter";
import { useAppState } from "@/hooks/use-app-state";
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmployeeCart() {
  const [, setLocation] = useLocation();
  const { cart, updateQuantity, removeFromCart, shops } = useAppState();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-6">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center">
          <ShoppingCart className="w-10 h-10 text-muted-foreground" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <p className="text-muted-foreground">Looks like you haven't added anything yet.</p>
        </div>
        <Link href="/employee/menu">
          <Button className="h-14 rounded-xl px-8 font-bold text-lg">Browse Menu</Button>
        </Link>
      </div>
    );
  }

  const shopName = shops.find(s => s.id === cart[0].foodItem.shopId)?.name;
  const subtotal = cart.reduce((acc, item) => acc + (item.foodItem.price * item.quantity), 0);
  const taxes = subtotal * 0.05; // 5% mock tax
  const total = subtotal + taxes;

  return (
    <div className="flex flex-col h-full space-y-6 pb-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">My Cart</h1>
        <p className="text-muted-foreground font-medium text-sm">Ordering from <span className="text-primary">{shopName}</span></p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {cart.map(item => (
          <div key={item.foodItem.id} className="bg-white rounded-[24px] p-3 flex gap-4 shadow-sm border border-border">
            <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
              <img src={item.foodItem.image} alt={item.foodItem.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 py-1 flex flex-col">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-foreground leading-tight line-clamp-2 pr-2">{item.foodItem.name}</h3>
                <button onClick={() => removeFromCart(item.foodItem.id)} className="text-muted-foreground hover:text-destructive transition-colors shrink-0">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <div className="mt-auto flex items-center justify-between">
                <span className="font-bold text-primary text-lg">₹{item.foodItem.price * item.quantity}</span>
                <div className="flex items-center gap-3 bg-muted px-2 py-1.5 rounded-xl border border-border">
                  <button onClick={() => updateQuantity(item.foodItem.id, -1)} className="p-1 hover:bg-white rounded-md transition-colors text-foreground">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-bold min-w-[2ch] text-center text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.foodItem.id, 1)} className="p-1 hover:bg-white rounded-md transition-colors text-foreground">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-border space-y-4 shrink-0">
        <h3 className="font-bold text-lg border-b border-border pb-3">Bill Summary</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground font-medium">Item Total</span>
            <span className="font-semibold text-foreground">₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground font-medium">Taxes & Fees</span>
            <span className="font-semibold text-foreground">₹{taxes.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-border">
          <span className="font-bold text-base">To Pay</span>
          <span className="font-bold text-2xl text-primary">₹{total.toFixed(2)}</span>
        </div>
        <Button 
          className="w-full h-14 rounded-xl font-bold text-lg mt-4 shadow-md"
          onClick={() => setLocation("/employee/checkout")}
        >
          Proceed to Pay <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
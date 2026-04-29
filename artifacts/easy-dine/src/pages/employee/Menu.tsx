import { useState } from "react";
import { useAppState } from "@/hooks/use-app-state";
import { Heart, Plus, Minus, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "sonner";

const CATEGORIES = ["All", "Breakfast", "Lunch", "Dinner", "Snacks", "Juice/Beverages"];

export default function EmployeeMenu() {
  const { shops, foodItems, cart, addToCart, cartShopId, clearCart, updateQuantity } = useAppState();
  
  const [selectedShopId, setSelectedShopId] = useState<string>(shops[0]?.id);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
  const [conflictModalOpen, setConflictModalOpen] = useState(false);
  const [pendingItem, setPendingItem] = useState<any>(null);

  const filteredItems = foodItems.filter(item => 
    item.shopId === selectedShopId && 
    (selectedCategory === "All" || item.category === selectedCategory) &&
    item.available
  );

  const handleAddToCart = (item: any) => {
    if (cartShopId && cartShopId !== item.shopId) {
      setPendingItem(item);
      setConflictModalOpen(true);
    } else {
      addToCart(item);
      toast.success(`Added ${item.name} to cart`);
    }
  };

  const confirmClearCart = () => {
    clearCart();
    if (pendingItem) {
      addToCart(pendingItem);
      toast.success(`Cart cleared. Added ${pendingItem.name} to cart.`);
    }
    setConflictModalOpen(false);
    setPendingItem(null);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] md:h-full -mx-4 px-4 pb-6 pt-2">
      {/* Header & Shop Selector */}
      <div className="space-y-4 shrink-0 bg-background z-10 pb-2">
        <h1 className="text-2xl font-bold text-foreground">Menu</h1>
        
        {/* Shop Segmented Control */}
        <div className="flex bg-muted p-1 rounded-2xl">
          {shops.map(shop => (
            <button
              key={shop.id}
              onClick={() => setSelectedShopId(shop.id)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                selectedShopId === shop.id 
                  ? 'bg-white text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {shop.name}
            </button>
          ))}
        </div>

        {/* Categories */}
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-2 pb-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                  selectedCategory === cat
                    ? 'bg-primary text-white border-primary shadow-sm'
                    : 'bg-white text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
      </div>

      {/* Food Grid */}
      <div className="flex-1 overflow-y-auto pt-2 pb-8">
        <div className="grid grid-cols-1 gap-4">
          {filteredItems.map(item => {
            const cartItem = cart.find(c => c.foodItem.id === item.id);
            return (
              <div key={item.id} className="bg-white rounded-[24px] p-3 flex gap-4 shadow-sm border border-border">
                <div className="w-28 h-28 rounded-2xl overflow-hidden shrink-0 relative">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  <button className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-muted-foreground hover:text-primary transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="flex-1 py-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-foreground leading-tight">{item.name}</h3>
                    <div className={`w-3 h-3 rounded-full border-2 ${item.diet === 'veg' ? 'border-green-500 bg-green-500/20' : 'border-red-500 bg-red-500/20'} shrink-0 mt-1`} />
                  </div>
                  
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                  
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <span className="font-bold text-lg text-foreground">₹{item.price}</span>
                    
                    {cartItem ? (
                      <div className="flex items-center gap-3 bg-primary text-white px-2 py-1 rounded-xl shadow-sm">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-white/20 rounded-md">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-bold min-w-[1ch] text-center">{cartItem.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-white/20 rounded-md">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleAddToCart(item)}
                        className="bg-primary/10 text-primary hover:bg-primary hover:text-white px-4 py-2 rounded-xl font-bold text-sm transition-colors flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" /> Add
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          {filteredItems.length === 0 && (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Info className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-bold text-lg">No items found</h3>
              <p className="text-muted-foreground text-sm">Try selecting a different category.</p>
            </div>
          )}
        </div>
      </div>

      {/* Conflict Modal */}
      <Dialog open={conflictModalOpen} onOpenChange={setConflictModalOpen}>
        <DialogContent className="rounded-3xl max-w-sm w-[90%] p-6">
          <DialogHeader>
            <DialogTitle className="text-xl">Clear cart?</DialogTitle>
            <DialogDescription className="text-base mt-2">
              Your cart has items from another cafeteria. Clear cart to add this item?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-6">
            <Button variant="outline" className="h-12 rounded-xl font-semibold w-full" onClick={() => setConflictModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="default" className="h-12 rounded-xl font-semibold w-full" onClick={confirmClearCart}>
              Clear & Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
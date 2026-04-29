import { useState } from "react";
import { Link, useSearch } from "wouter";
import { useAppState } from "@/hooks/use-app-state";
import { Search, Plus, Edit2, Trash2, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function AdminFoodItems() {
  const searchString = useSearch();
  const shopIdFromUrl = new URLSearchParams(searchString).get("shop");
  
  const { shops, foodItems, updateFoodItem, deleteFoodItem } = useAppState();
  
  // Default to first shop if none selected
  const [selectedShopId, setSelectedShopId] = useState(shopIdFromUrl || shops[0]?.id);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const filteredItems = foodItems.filter(i => 
    i.shopId === selectedShopId && 
    i.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAvailability = (item: any) => {
    updateFoodItem({ ...item, available: !item.available });
    toast.success(`${item.name} is now ${!item.available ? 'Available' : 'Hidden'}`);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      deleteFoodItem(itemToDelete);
      toast.success("Food item deleted");
    }
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/admin/menu-management">
            <Button variant="ghost" size="icon" className="rounded-xl border border-border bg-white h-10 w-10">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div className="space-y-0.5">
            <h1 className="text-2xl font-bold text-foreground">Food Items</h1>
            <p className="text-muted-foreground text-sm">Manage global menu inventory</p>
          </div>
        </div>
        <Link href="/admin/add-food">
          <Button className="h-12 rounded-xl font-bold gap-2">
            <Plus className="w-5 h-5" /> Add Food Item
          </Button>
        </Link>
      </div>

      <div className="flex bg-muted p-1 rounded-2xl w-full sm:w-max">
        {shops.map(shop => (
          <button 
            key={shop.id}
            onClick={() => setSelectedShopId(shop.id)} 
            className={`px-8 py-2.5 text-sm font-semibold rounded-xl transition-all ${selectedShopId === shop.id ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
          >
            {shop.name}
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input 
          placeholder="Search items in this cafeteria..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-12 rounded-xl bg-white border-border"
        />
      </div>

      <div className="grid gap-4">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-[24px] p-4 flex flex-col sm:flex-row gap-4 shadow-sm border border-border items-center">
            <div className="w-full sm:w-20 h-32 sm:h-20 rounded-xl overflow-hidden shrink-0 relative">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 min-w-0 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-base text-foreground truncate">{item.name}</h3>
                  <div className={`w-2 h-2 rounded-full ${item.diet === 'veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                </div>
                <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{item.description}</p>
                <div className="font-bold text-primary mt-1">₹{item.price}</div>
              </div>
              
              <div className="flex items-center gap-6 pt-2 border-t border-border sm:pt-0 sm:border-0">
                <div className="flex flex-col items-center gap-1">
                  <Switch checked={item.available} onCheckedChange={() => toggleAvailability(item)} />
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${item.available ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {item.available ? 'ON' : 'OFF'}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 bg-muted rounded-xl p-1">
                  <Link href={`/admin/edit-food/${item.id}`}>
                    <Button variant="ghost" size="icon" className="h-9 w-9 rounded-lg hover:bg-white">
                      <Edit2 className="w-4 h-4 text-foreground" />
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 rounded-lg hover:bg-red-50 hover:text-red-600"
                    onClick={() => { setItemToDelete(item.id); setDeleteModalOpen(true); }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">No items found</div>
        )}
      </div>

      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="rounded-3xl max-w-sm w-[90%] p-6">
          <DialogHeader>
            <DialogTitle className="text-xl">Delete item?</DialogTitle>
            <p className="text-muted-foreground text-sm mt-2">
              This food item will be removed from the menu. This action affects live users immediately.
            </p>
          </DialogHeader>
          <DialogFooter className="flex gap-3 mt-6">
            <Button variant="outline" className="flex-1 h-12 rounded-xl font-bold" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" className="flex-1 h-12 rounded-xl font-bold bg-destructive text-white" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
import { useState } from "react";
import { Link } from "wouter";
import { useAppState } from "@/hooks/use-app-state";
import { Search, Filter, Plus, Edit2, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function VendorFoodItems() {
  const { foodItems, updateFoodItem, deleteFoodItem } = useAppState();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const myItems = foodItems.filter(i => i.shopId === "shop_meal_counter");
  const filteredItems = myItems.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const toggleAvailability = (item: any) => {
    updateFoodItem({ ...item, available: !item.available });
    toast.success(`${item.name} is now ${!item.available ? 'Available' : 'Unavailable'}`);
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
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Food Items</h1>
          <p className="text-muted-foreground text-sm">Manage your menu and availability</p>
        </div>
        <Link href="/vendor/add-food">
          <Button className="h-12 rounded-xl font-bold gap-2">
            <Plus className="w-5 h-5" /> Add Food Item
          </Button>
        </Link>
      </div>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search items..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 rounded-xl bg-white border-border"
          />
        </div>
        <Button variant="outline" className="w-12 h-12 rounded-xl p-0 border-border bg-white shrink-0">
          <Filter className="w-5 h-5 text-foreground" />
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-[24px] p-4 flex flex-col sm:flex-row gap-4 shadow-sm border border-border items-center">
            <div className="w-full sm:w-24 h-40 sm:h-24 rounded-xl overflow-hidden shrink-0 relative">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              <div className={`absolute top-2 left-2 w-3 h-3 rounded-full border-2 ${item.diet === 'veg' ? 'border-green-500 bg-green-500/20' : 'border-red-500 bg-red-500/20'}`} />
            </div>
            
            <div className="flex-1 min-w-0 w-full">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg text-foreground truncate">{item.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                </div>
                <div className="font-bold text-lg text-primary ml-4">₹{item.price}</div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Switch checked={item.available} onCheckedChange={() => toggleAvailability(item)} />
                  <span className={`text-sm font-semibold ${item.available ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {item.available ? 'Available' : 'Hidden'}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 ml-auto">
                  <Link href={`/vendor/edit-food/${item.id}`}>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl hover:bg-muted">
                      <Edit2 className="w-4 h-4 text-foreground" />
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-10 w-10 rounded-xl hover:bg-red-50 hover:text-red-600"
                    onClick={() => { setItemToDelete(item.id); setDeleteModalOpen(true); }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="rounded-3xl max-w-sm w-[90%] p-6">
          <DialogHeader>
            <DialogTitle className="text-xl">Delete item?</DialogTitle>
            <p className="text-muted-foreground text-sm mt-2">
              This food item will be removed from the menu permanently. This action cannot be undone.
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
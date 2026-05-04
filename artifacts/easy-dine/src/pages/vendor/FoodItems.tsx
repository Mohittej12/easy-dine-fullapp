import { useState } from "react";
import { useAppState } from "@/hooks/use-app-state";
import { Search, Plus, Edit2, Trash2, Power } from "lucide-react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { VendorHamburgerMenu } from "@/components/VendorHamburgerMenu";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";

export default function VendorFoodItems() {
  const { foodItems, deleteFoodItem, updateFoodItem } = useAppState();
  const [searchQuery, setSearchQuery] = useState("");

  const VENDOR_SHOP_ID = "shop_meal_counter";

  const vendorItems = foodItems.filter(item => item.shopId === VENDOR_SHOP_ID);

  const filteredItems = vendorItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (itemId: string, itemName: string) => {
    if (confirm(`Are you sure you want to delete ${itemName}?`)) {
      deleteFoodItem(itemId);
      toast.success(`${itemName} deleted successfully.`);
    }
  };

  const handleToggleAvailability = (item: typeof foodItems[0]) => {
    updateFoodItem({ ...item, available: !item.available });
    toast.success(`${item.name} is now ${!item.available ? 'Available' : 'Hidden'}`);
  };

  return (
    <div className="flex flex-col min-h-[100dvh] pb-24 relative overflow-x-hidden bg-black">
      
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/background-cafeteria.png" 
          alt="Cafeteria Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px]" />
      </div>

      <div className="z-10 relative flex flex-col min-h-full px-4 pt-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <VendorHamburgerMenu />
          <h1 className="text-[20px] font-extrabold text-white drop-shadow-md">Food Items</h1>
          <div className="w-10"></div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col gap-4 mb-6">
          <Link href="/vendor/add-food">
            <button className="w-full bg-[#FF3B30] text-white py-3.5 rounded-xl font-bold text-[15px] shadow-lg shadow-red-500/30 hover:bg-[#E31837] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" /> Add Food Item
            </button>
          </Link>
          
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search food items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/95 backdrop-blur-md border border-white/20 rounded-xl py-3.5 pl-12 pr-4 text-[14px] font-bold text-slate-800 placeholder:text-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF3B30]/50 transition-all"
            />
          </div>
        </div>

        {/* Food Items List */}
        <div className="space-y-3">
          <AnimatePresence>
            {filteredItems.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-10 px-4 bg-white/10 backdrop-blur-md rounded-[24px] border border-white/20"
              >
                <p className="text-white/60 text-[14px] font-medium">No food items found.</p>
              </motion.div>
            ) : (
              filteredItems.map(item => (
                <motion.div 
                  layout
                  key={item.id} 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`bg-white/95 backdrop-blur-xl rounded-[20px] p-4 shadow-sm border border-white/20 flex flex-col gap-4 transition-all ${!item.available ? 'opacity-60 grayscale-[0.5]' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    {/* EasyDine Logo Placeholder */}
                    <div className="w-16 h-16 bg-[#FF3B30] rounded-[14px] flex items-center justify-center flex-shrink-0 shadow-inner text-white font-black text-[24px] tracking-tighter">
                      ED
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-extrabold text-[16px] text-slate-800 truncate pr-2">
                          {item.name}
                        </h3>
                        <span className="font-black text-[16px] text-[#E31837]">
                          ₹{item.price}
                        </span>
                      </div>
                      <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wider mt-1 flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-gray-400'}`} />
                        {item.available ? 'Available' : 'Hidden'}
                      </p>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                      <Switch 
                        checked={item.available}
                        onCheckedChange={() => handleToggleAvailability(item)}
                        className="data-[state=checked]:bg-green-500"
                      />
                      <span className="text-[12px] font-bold text-slate-600">
                        {item.available ? "Turn Off" : "Turn On"}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Link href={`/vendor/edit-food/${item.id}`}>
                        <button className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center hover:bg-blue-100 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </Link>
                      <button 
                        onClick={() => handleDelete(item.id, item.name)}
                        className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
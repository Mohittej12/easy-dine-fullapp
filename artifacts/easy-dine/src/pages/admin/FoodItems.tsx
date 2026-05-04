import { useState } from "react";
import { Link, useSearch } from "wouter";
import { useAppState } from "@/hooks/use-app-state";
import { Search, Plus, Edit2, Trash2, ArrowLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminFoodItems() {
  const searchString = useSearch();
  const shopIdFromUrl = new URLSearchParams(searchString).get("shop");
  
  const { shops, foodItems, updateFoodItem, deleteFoodItem } = useAppState();
  
  const [selectedShopId, setSelectedShopId] = useState(shopIdFromUrl || shops[0]?.id);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = foodItems.filter(i => 
    i.shopId === selectedShopId && 
    i.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleAvailability = (item: any) => {
    updateFoodItem({ ...item, available: !item.available });
    toast.success(`${item.name} is now ${!item.available ? 'Available' : 'Hidden'}`);
  };

  const handleDelete = (itemId: string, itemName: string) => {
    if (confirm(`Are you sure you want to delete ${itemName}?`)) {
      deleteFoodItem(itemId);
      toast.success(`${itemName} deleted successfully.`);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] pb-24 relative overflow-x-hidden bg-[#1E1E1E]">
      
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/background-cafeteria.png" 
          alt="Cafeteria Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 backdrop-blur-[4px]" />
      </div>

      <div className="z-10 relative flex flex-col min-h-full px-4 pt-6 max-w-2xl mx-auto w-full">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/admin/menu-management">
            <button className="p-2 bg-white/10 rounded-full text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
          </Link>
          <h1 className="text-[20px] font-extrabold text-white drop-shadow-md">Food Items</h1>
          <div className="w-10"></div>
        </div>

        {/* Shop Selector Tabs */}
        <div className="flex bg-white/10 backdrop-blur-md p-1.5 rounded-2xl w-full mb-6 border border-white/20">
          {shops.map(shop => (
            <button 
              key={shop.id}
              onClick={() => setSelectedShopId(shop.id)} 
              className={`flex-1 py-2.5 text-[14px] font-bold rounded-xl transition-all ${
                selectedShopId === shop.id 
                  ? 'bg-white text-slate-900 shadow-md scale-[1.02]' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {shop.name}
            </button>
          ))}
        </div>

        {/* Action Bar */}
        <div className="flex flex-col gap-4 mb-6">
          <Link href={`/admin/add-food?shop=${selectedShopId}`}>
            <button className="w-full bg-[#FF3B30] text-white py-3.5 rounded-xl font-bold text-[15px] shadow-lg shadow-red-500/30 hover:bg-[#E31837] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
              <Plus className="w-5 h-5" /> Add Food Item
            </button>
          </Link>
          
          <div className="relative">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search food items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-xl py-3.5 pl-12 pr-4 text-[14px] font-bold text-white placeholder:text-gray-400 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#FF3B30]/50 transition-all"
            />
          </div>
        </div>

        {/* Food Items List */}
        <div className="space-y-3">
          <AnimatePresence>
            {filteredItems.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-center py-10 px-4 bg-white/5 backdrop-blur-md rounded-[24px] border border-white/10"
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
                  className={`bg-white/10 backdrop-blur-xl rounded-[20px] p-4 shadow-lg border border-white/20 flex flex-col gap-4 transition-all ${!item.available ? 'opacity-60 grayscale-[0.5]' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    {/* EasyDine Logo Placeholder */}
                    <div className="w-16 h-16 bg-[#FF3B30] rounded-[14px] flex items-center justify-center flex-shrink-0 shadow-inner text-white font-black text-[24px] tracking-tighter">
                      ED
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-extrabold text-[16px] text-white truncate pr-2">
                          {item.name}
                        </h3>
                        <span className="font-black text-[16px] text-blue-400">
                          ₹{item.price}
                        </span>
                      </div>
                      <p className="text-[12px] font-bold text-gray-400 uppercase tracking-wider mt-1 flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-gray-500'}`} />
                        {item.available ? 'Available' : 'Hidden'}
                      </p>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <Switch 
                        checked={item.available}
                        onCheckedChange={() => toggleAvailability(item)}
                        className="data-[state=checked]:bg-green-500"
                      />
                      <span className="text-[12px] font-bold text-gray-300">
                        {item.available ? "Turn Off" : "Turn On"}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Link href={`/admin/edit-food/${item.id}`}>
                        <button className="w-10 h-10 bg-white/10 text-white rounded-xl flex items-center justify-center hover:bg-white/20 transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </Link>
                      <button 
                        onClick={() => handleDelete(item.id, item.name)}
                        className="w-10 h-10 bg-red-500/20 text-red-400 rounded-xl flex items-center justify-center hover:bg-red-500/30 transition-colors border border-red-500/20"
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
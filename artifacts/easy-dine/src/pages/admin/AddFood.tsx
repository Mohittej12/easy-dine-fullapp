import { useState, useRef } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { useAppState } from "@/hooks/use-app-state";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

export default function AdminAddFood() {
  const [, setLocation] = useLocation();
  const searchString = useSearch();
  const shopIdFromUrl = new URLSearchParams(searchString).get("shop");
  const { addFoodItem, shops } = useAppState();
  
  const [shopId, setShopId] = useState(shopIdFromUrl || shops[0]?.id || "");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<"Breakfast" | "Lunch" | "Dinner" | "Tuck Shop">("Breakfast");
  const [diet, setDiet] = useState<"veg" | "nonVeg">("veg");
  const [description, setDescription] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !shopId) {
      toast.error("Name, price, and cafeteria are required");
      return;
    }

    addFoodItem({
      id: `food_${Math.random().toString(36).substr(2, 9)}`,
      shopId,
      name,
      price: Number(price),
      category,
      diet,
      description,
      image,
      available: true,
      popular: false
    });

    toast.success("Food item successfully added!");
    setLocation(`/admin/food-items?shop=${shopId}`);
  };

  return (
    <div className="flex flex-col min-h-[100dvh] relative overflow-x-hidden bg-[#1E1E1E] pb-8">
      
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
          <button onClick={() => setLocation(`/admin/food-items?shop=${shopId}`)} className="p-2 bg-white/10 rounded-full text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[20px] font-extrabold text-white drop-shadow-md">Add Food Item</h1>
          <div className="w-10"></div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl rounded-[32px] p-6 shadow-xl border border-white/20 flex flex-col gap-5">
          
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-gray-300 mb-1.5 block">Assign to Cafeteria <span className="text-[#FF3B30]">*</span></label>
            <select 
              value={shopId}
              onChange={(e) => setShopId(e.target.value)}
              className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-[14px] font-bold text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-[#FF3B30]/50 appearance-none"
            >
              <option value="" disabled>Select Cafeteria</option>
              {shops.map(s => <option key={s.id} value={s.id} className="text-black">{s.name}</option>)}
            </select>
          </div>

          {/* Image Upload Area */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-gray-300">Food Image (Optional)</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="h-40 bg-white/5 border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-colors overflow-hidden relative shadow-inner"
            >
              {image ? (
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shadow-sm mb-2 text-gray-400">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <p className="text-[13px] font-bold text-gray-400">Tap to upload image</p>
                </>
              )}
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload}
              accept="image/*" 
              className="hidden" 
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[13px] font-bold text-gray-300 mb-1.5 block">Food Name <span className="text-[#FF3B30]">*</span></label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Veg Thali"
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-[14px] font-bold text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-[#FF3B30]/50 placeholder:text-gray-500" 
              />
            </div>
            
            <div>
              <label className="text-[13px] font-bold text-gray-300 mb-1.5 block">Price (INR) <span className="text-[#FF3B30]">*</span></label>
              <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-[14px] font-bold text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-[#FF3B30]/50 placeholder:text-gray-500" 
              />
            </div>

            <div>
              <label className="text-[13px] font-bold text-gray-300 mb-1.5 block">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-[14px] font-bold text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-[#FF3B30]/50 appearance-none"
              >
                <option value="Breakfast" className="text-black">Breakfast</option>
                <option value="Lunch" className="text-black">Lunch</option>
                <option value="Dinner" className="text-black">Dinner</option>
                <option value="Tuck Shop" className="text-black">Tuck Shop</option>
              </select>
            </div>

            <div>
              <label className="text-[13px] font-bold text-gray-300 mb-1.5 block">Diet Type</label>
              <div className="flex bg-black/40 rounded-xl p-1 shadow-inner border border-white/10">
                <button
                  type="button"
                  onClick={() => setDiet("veg")}
                  className={`flex-1 py-2.5 text-[14px] font-bold rounded-lg transition-all ${
                    diet === "veg" ? 'bg-white text-green-600 shadow-sm' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Vegetarian
                </button>
                <button
                  type="button"
                  onClick={() => setDiet("nonVeg")}
                  className={`flex-1 py-2.5 text-[14px] font-bold rounded-lg transition-all ${
                    diet === "nonVeg" ? 'bg-white text-[#FF3B30] shadow-sm' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Non-Vegetarian
                </button>
              </div>
            </div>

            <div>
              <label className="text-[13px] font-bold text-gray-300 mb-1.5 block">Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the item..."
                rows={3}
                className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-[14px] font-medium text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-[#FF3B30]/50 resize-none placeholder:text-gray-500" 
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full mt-4 bg-[#FF3B30] text-white py-4 rounded-xl font-bold text-[16px] shadow-[0_4px_14px_rgba(255,59,48,0.4)] hover:bg-[#E31837] active:scale-[0.98] transition-all"
          >
            Save Food Item
          </button>
        </form>

      </div>
    </div>
  );
}
import { useState, useRef, useEffect } from "react";
import { useLocation, useParams } from "wouter";
import { useAppState } from "@/hooks/use-app-state";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

export default function VendorEditFood() {
  const [, setLocation] = useLocation();
  const { id } = useParams<{ id: string }>();
  const { foodItems, updateFoodItem } = useAppState();
  
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<"Breakfast" | "Lunch" | "Dinner" | "Tuck Shop">("Breakfast");
  const [diet, setDiet] = useState<"veg" | "nonVeg">("veg");
  const [description, setDescription] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (id) {
      const item = foodItems.find(f => f.id === id);
      if (item) {
        setImage(item.image || "");
        setName(item.name);
        setPrice(item.price.toString());
        setCategory(item.category);
        setDiet(item.diet);
        setDescription(item.description);
      } else {
        toast.error("Food item not found");
        setLocation("/vendor/food-items");
      }
    }
  }, [id, foodItems, setLocation]);

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
    if (!name || !price) {
      toast.error("Name and price are required");
      return;
    }

    const itemToUpdate = foodItems.find(f => f.id === id);
    if (!itemToUpdate) return;

    updateFoodItem({
      ...itemToUpdate,
      name,
      price: Number(price),
      category,
      diet,
      description,
      image,
    });

    toast.success("Changes saved successfully!");
    setLocation("/vendor/food-items");
  };

  return (
    <div className="flex flex-col min-h-[100dvh] relative overflow-x-hidden bg-black pb-8">
      
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
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setLocation("/vendor/food-items")} className="p-2 bg-white/10 rounded-full text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[20px] font-extrabold text-white drop-shadow-md">Edit Food Item</h1>
          <div className="w-10"></div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/95 backdrop-blur-xl rounded-[32px] p-6 shadow-xl border border-white/20 flex flex-col gap-5">
          
          {/* Image Upload Area */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] font-bold text-slate-800">Food Image</label>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="h-40 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden relative"
            >
              {image ? (
                <img src={image} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 text-gray-400">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <p className="text-[13px] font-bold text-gray-500">Tap to upload image</p>
                  <p className="text-[11px] font-medium text-gray-400 mt-1">Default: EasyDine Logo</p>
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
              <label className="text-[13px] font-bold text-slate-800 mb-1.5 block">Food Name <span className="text-[#FF3B30]">*</span></label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Veg Thali"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-bold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF3B30]/50" 
              />
            </div>
            
            <div>
              <label className="text-[13px] font-bold text-slate-800 mb-1.5 block">Price (INR) <span className="text-[#FF3B30]">*</span></label>
              <input 
                type="number" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0"
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-bold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF3B30]/50" 
              />
            </div>

            <div>
              <label className="text-[13px] font-bold text-slate-800 mb-1.5 block">Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-bold text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF3B30]/50 appearance-none"
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Tuck Shop">Tuck Shop</option>
              </select>
            </div>

            <div>
              <label className="text-[13px] font-bold text-slate-800 mb-1.5 block">Diet Type</label>
              <div className="flex bg-gray-100 rounded-xl p-1 shadow-inner">
                <button
                  type="button"
                  onClick={() => setDiet("veg")}
                  className={`flex-1 py-2.5 text-[14px] font-bold rounded-lg transition-all ${
                    diet === "veg" ? 'bg-white text-green-600 shadow-sm' : 'text-gray-500 hover:text-slate-700'
                  }`}
                >
                  Vegetarian
                </button>
                <button
                  type="button"
                  onClick={() => setDiet("nonVeg")}
                  className={`flex-1 py-2.5 text-[14px] font-bold rounded-lg transition-all ${
                    diet === "nonVeg" ? 'bg-white text-[#FF3B30] shadow-sm' : 'text-gray-500 hover:text-slate-700'
                  }`}
                >
                  Non-Vegetarian
                </button>
              </div>
            </div>

            <div>
              <label className="text-[13px] font-bold text-slate-800 mb-1.5 block">Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the item..."
                rows={3}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-[14px] font-medium text-slate-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF3B30]/50 resize-none" 
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full mt-4 bg-[#FF3B30] text-white py-4 rounded-xl font-bold text-[16px] shadow-lg shadow-red-500/30 hover:bg-[#E31837] active:scale-[0.98] transition-all"
          >
            Save Changes
          </button>
        </form>

      </div>
    </div>
  );
}
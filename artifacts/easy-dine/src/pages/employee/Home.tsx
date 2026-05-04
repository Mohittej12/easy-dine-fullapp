import { Link } from "wouter";
import { useAppState } from "@/hooks/use-app-state";
import { Search, SlidersHorizontal, Star } from "lucide-react";
import { useState } from "react";
import { HamburgerMenu } from "@/components/HamburgerMenu";

export default function EmployeeHome() {
  const { employee, shops, foodItems } = useAppState();
  const [searchQuery, setSearchQuery] = useState("");

  // Specifically filter for Meal Counter and Tuck Shop, then by search query
  const featuredShops = shops.filter(s => 
    (s.id === "shop_meal_counter" || s.id === "shop_tuck_shop") &&
    (searchQuery === "" || s.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getShopName = (id: string) => shops.find(s => s.id === id)?.name || "";

  // Get popular items and filter by search query
  const popularItems = foodItems.filter(item => {
    if (!item.popular) return false;
    // Only include items from Meal Counter or Tuck Shop
    if (item.shopId !== "shop_meal_counter" && item.shopId !== "shop_tuck_shop") return false;
    
    if (searchQuery === "") return true;
    
    const shopName = getShopName(item.shopId);
    return item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           shopName.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  const heroItem = popularItems[0];
  const gridItems = popularItems.slice(1, 5);

  return (
    <div className="flex flex-col min-h-[100dvh] pb-24 relative overflow-x-hidden">
      
      {/* Full-screen Background Image with dark overlay */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/background-cafeteria.png" 
          alt="Modern Cafeteria Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[4px]" />
      </div>

      <div className="z-10 relative flex flex-col min-h-full px-5 pt-8">
        
        {/* Header Section */}
        <div className="mb-6 flex justify-between items-start">
          <div>
            <div className="bg-white/95 px-3 py-1 rounded-sm inline-block mb-4 shadow-sm border border-gray-200">
              <span className="text-[18px] font-extrabold text-black tracking-tight leading-none">Easy Dine</span>
            </div>
            
            <h1 className="text-[32px] font-black text-white leading-tight tracking-tight drop-shadow-md">
              Hi,
            </h1>
            <h2 className="text-[20px] font-bold text-white/90 mt-1 drop-shadow-md">
              What are you <span className="text-[#FF3B30]">craving today?</span>
            </h2>
          </div>
          <HamburgerMenu />
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 p-1">
          <div className="pl-4 pr-2">
            <Search className="w-6 h-6 text-[#FF3B30]" strokeWidth={2.5} />
          </div>
          <input 
            type="text"
            placeholder="Search cafeterias, dishes..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 h-14 bg-transparent outline-none text-[15px] font-medium text-slate-800 placeholder:text-gray-400"
          />
          <button className="h-14 w-14 flex items-center justify-center text-gray-400 hover:text-slate-800 transition-colors shrink-0">
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {/* Featured Cafeteria's */}
        <div className="mb-10">
          <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-sm inline-block mb-4 shadow-sm">
            <h3 className="text-[16px] font-extrabold text-slate-800">Featured Cafeteria's</h3>
          </div>
          
          {/* Horizontal Scroll Area */}
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-5 px-5">
            {featuredShops.map((shop, index) => (
              <Link key={shop.id} href="/employee/menu">
                <div className={`relative rounded-3xl overflow-hidden shadow-md flex-shrink-0 cursor-pointer ${index === 0 ? 'w-[280px]' : 'w-[200px]'} h-[160px] group border border-gray-200`}>
                  <img 
                    src={shop.id === "shop_meal_counter" 
                      ? "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600" 
                      : "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400"} 
                    alt={shop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Dark gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Pills */}
                  {index === 0 && (
                    <div className="absolute top-3 left-0 right-0 flex justify-center gap-2">
                      <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold text-slate-800">Breakfast</span>
                      <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold text-slate-800">Lunch</span>
                      <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-extrabold text-slate-800">Dinner</span>
                    </div>
                  )}
                  
                  {/* Title */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h4 className="text-[20px] font-black text-white leading-tight">{shop.name}</h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Dishes */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="bg-white/95 backdrop-blur-md px-3 py-1 rounded-sm shadow-sm">
              <h3 className="text-[16px] font-extrabold text-slate-800">Popular Dishes</h3>
            </div>
            <Link href="/employee/menu">
              <span className="text-[13px] font-bold text-[#FF3B30] cursor-pointer hover:underline drop-shadow-md">View more</span>
            </Link>
          </div>

          {heroItem && (
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 mb-4 group cursor-pointer hover:shadow-md transition-all">
              <div className="h-[180px] w-full bg-[#fcefee] flex items-center justify-center border-b border-red-50 relative overflow-hidden">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-500"><path d="m16 20-3-3m0 0-3-3m3 3V11m-7 8c0 1.1-.9 2-2 2H2v-2h2c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H2V5h2c1.1 0 2 .9 2 2v6c0 1.1.9 2 2 2h4v-4H8v-2h4v-2H8V5h8v4h-2v2h2v4h-2v2h2v4h-2Z"/><path d="m20 11 2 2-2 2"/></svg>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex-1 pr-2">
                    <h4 className="text-[18px] font-black text-slate-800 line-clamp-1">{heroItem.name}</h4>
                    <p className="text-[13px] font-medium text-gray-500 mt-0.5">{getShopName(heroItem.shopId)}</p>
                  </div>
                  <div className="bg-[#FFF0ED] text-[#FF3B30] px-3 py-1.5 rounded-xl font-black text-[15px] border border-[#FF3B30]/10 shrink-0">
                    ₹{heroItem.price}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-2 bg-gray-50 w-max px-2 py-1 rounded-md border border-gray-100">
                  <Star className="w-3.5 h-3.5 fill-[#FFB800] text-[#FFB800]" />
                  <span className="text-[12px] font-bold text-slate-700">4.9</span>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            {gridItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group cursor-pointer hover:shadow-md transition-all flex flex-col">
                <div className="h-[120px] w-full bg-[#fcefee] flex items-center justify-center border-b border-red-50 relative overflow-hidden">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform duration-500"><path d="m16 20-3-3m0 0-3-3m3 3V11m-7 8c0 1.1-.9 2-2 2H2v-2h2c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2H2V5h2c1.1 0 2 .9 2 2v6c0 1.1.9 2 2 2h4v-4H8v-2h4v-2H8V5h8v4h-2v2h2v4h-2v2h2v4h-2Z"/><path d="m20 11 2 2-2 2"/></svg>
                </div>
                <div className="p-3 flex flex-col flex-1">
                  <h4 className="text-[14px] font-extrabold text-slate-800 line-clamp-1 mb-0.5">{item.name}</h4>
                  <p className="text-[11px] font-medium text-gray-500 mb-3">{getShopName(item.shopId)}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-[15px] font-black text-[#FF3B30]">₹{item.price}</span>
                    <div className="flex items-center gap-1 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                      <Star className="w-3 h-3 fill-[#FFB800] text-[#FFB800]" />
                      <span className="text-[11px] font-bold text-slate-700">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}
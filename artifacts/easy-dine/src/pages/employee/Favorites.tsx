import { useLocation } from "wouter";
import { useAppState } from "@/hooks/use-app-state";
import { Heart, ArrowLeft } from "lucide-react";
import { HamburgerMenu } from "@/components/HamburgerMenu";

const CUSTOM_MENU_DATA = {
  meal_counter: {
    Breakfast: [
      { id: "m_b_1", name: "Idly", price: 60, shopId: "shop_meal_counter" },
      { id: "m_b_2", name: "Vada", price: 50, shopId: "shop_meal_counter" },
      { id: "m_b_3", name: "Dosa", price: 80, shopId: "shop_meal_counter" },
      { id: "m_b_4", name: "Upma", price: 55, shopId: "shop_meal_counter" },
      { id: "m_b_5", name: "Poori", price: 70, shopId: "shop_meal_counter" },
      { id: "m_b_6", name: "Omelette", price: 75, shopId: "shop_meal_counter" },
    ],
    Lunch: [
      { id: "m_l_1", name: "Aloo Parotta", price: 90, shopId: "shop_meal_counter" },
      { id: "m_l_2", name: "Sambar Rice", price: 80, shopId: "shop_meal_counter" },
      { id: "m_l_3", name: "Chapathi", price: 60, shopId: "shop_meal_counter" },
      { id: "m_l_4", name: "South Indian Thali", price: 150, shopId: "shop_meal_counter" },
      { id: "m_l_5", name: "Veg Thali", price: 120, shopId: "shop_meal_counter" },
    ],
    Dinner: [
      { id: "m_d_1", name: "Aloo Parotta", price: 90, shopId: "shop_meal_counter" },
      { id: "m_d_2", name: "Sambar Rice", price: 80, shopId: "shop_meal_counter" },
      { id: "m_d_3", name: "Chapathi", price: 60, shopId: "shop_meal_counter" },
      { id: "m_d_4", name: "South Indian Thali", price: 150, shopId: "shop_meal_counter" },
      { id: "m_d_5", name: "Veg Thali", price: 120, shopId: "shop_meal_counter" },
    ]
  },
  tuck_shop: [
    { id: "t_1", name: "Watermelon Juice", price: 60, shopId: "shop_tuck_shop" },
    { id: "t_2", name: "Papaya Juice", price: 60, shopId: "shop_tuck_shop" },
    { id: "t_3", name: "Mixed Fruits", price: 80, shopId: "shop_tuck_shop" },
    { id: "t_4", name: "Badam Milk", price: 50, shopId: "shop_tuck_shop" },
    { id: "t_5", name: "Bread with Jam", price: 40, shopId: "shop_tuck_shop" },
    { id: "t_6", name: "Coffee", price: 30, shopId: "shop_tuck_shop" },
  ]
};

export default function EmployeeFavorites() {
  const [, setLocation] = useLocation();
  const { favorites } = useAppState();

  const allItems = [
    ...CUSTOM_MENU_DATA.meal_counter.Breakfast,
    ...CUSTOM_MENU_DATA.meal_counter.Lunch,
    ...CUSTOM_MENU_DATA.meal_counter.Dinner,
    ...CUSTOM_MENU_DATA.tuck_shop
  ];

  // deduplicate items
  const uniqueItems = Array.from(new Map(allItems.map(item => [item.id, item])).values());
  const favoriteItems = uniqueItems.filter(item => favorites.includes(item.id));

  return (
    <div className="flex flex-col min-h-[100dvh] relative overflow-hidden bg-black pb-12">
      <div className="fixed inset-0 z-0">
        <img src="/background-cafeteria.png" alt="Cafeteria" className="w-full h-full object-cover"/>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[4px]" />
      </div>

      <div className="z-10 relative flex flex-col h-full pt-6 px-4">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setLocation("/employee/profile")} className="p-2 bg-white/10 rounded-full text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[20px] font-extrabold text-white drop-shadow-md">Favorites</h1>
          <HamburgerMenu />
        </div>

        <div className="space-y-3">
          {favoriteItems.length === 0 ? (
            <div className="text-center bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/10 mt-10">
              <Heart className="w-16 h-16 text-white/50 mx-auto mb-4" strokeWidth={1.5} />
              <h2 className="text-lg font-black text-white mb-2 drop-shadow-md">No favorites yet</h2>
              <p className="text-[13px] text-gray-200 font-medium">Items you favorite on the menu will appear here.</p>
            </div>
          ) : (
            favoriteItems.map(item => (
              <div key={item.id} className="bg-white/95 backdrop-blur-xl rounded-[20px] p-4 flex items-center justify-between shadow-sm border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-50 text-[#FF3B30] rounded-xl flex items-center justify-center border border-red-100 shrink-0">
                    <Heart className="w-5 h-5" fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[15px] text-slate-800 leading-tight mb-0.5">{item.name}</h3>
                    <p className="text-[12px] font-bold text-gray-500">{item.shopId === "shop_meal_counter" ? "Meal Counter" : "Tuck Shop"}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-black text-[16px] text-slate-800">₹{item.price}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

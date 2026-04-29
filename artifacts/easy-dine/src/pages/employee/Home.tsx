import { Link } from "wouter";
import { useAppState } from "@/hooks/use-app-state";
import { Search, Filter, Star, Clock, Flame } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function EmployeeHome() {
  const { employee, shops, foodItems } = useAppState();

  const popularItems = foodItems.filter(item => item.popular).slice(0, 4);

  return (
    <div className="space-y-6 pb-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Hi, {employee.name.split(' ')[0]}</h1>
        <p className="text-muted-foreground font-medium">What are you craving today?</p>
      </div>

      {/* Search */}
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search for food..." 
            className="w-full pl-10 h-14 rounded-2xl bg-white border-none shadow-sm text-base"
          />
        </div>
        <button className="h-14 w-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-foreground hover:bg-muted transition-colors shrink-0">
          <Filter className="w-5 h-5" />
        </button>
      </div>

      {/* Featured Cafeterias */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-foreground">Featured Cafeterias</h2>
        <div className="grid grid-cols-2 gap-4">
          {shops.map((shop) => (
            <Link key={shop.id} href="/employee/menu">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-border hover:shadow-md transition-all group">
                <div className="h-24 bg-muted relative overflow-hidden">
                  <img 
                    src={shop.name === "Meal Counter" 
                      ? "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400" 
                      : "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=400"} 
                    alt={shop.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-sm text-foreground">{shop.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-primary text-primary" />
                    4.8 • {shop.activeItems} items
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Dishes */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            Popular Dishes <Flame className="w-5 h-5 text-primary fill-primary" />
          </h2>
          <Link href="/employee/menu" className="text-primary text-sm font-semibold hover:underline">
            View More
          </Link>
        </div>
        
        <div className="space-y-4">
          {popularItems.map((item) => {
            const shopName = shops.find(s => s.id === item.shopId)?.name;
            return (
              <div key={item.id} className="bg-white rounded-[24px] p-3 flex gap-4 shadow-sm border border-border">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 py-1 flex flex-col">
                  <div className="flex items-start justify-between">
                    <h3 className="font-bold text-foreground line-clamp-1">{item.name}</h3>
                    <div className={`w-3 h-3 rounded-full border-2 ${item.diet === 'veg' ? 'border-green-500 bg-green-500/20' : 'border-red-500 bg-red-500/20'} shrink-0 mt-1`} />
                  </div>
                  <p className="text-xs text-muted-foreground">{shopName}</p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="font-bold text-primary">₹{item.price}</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      <Clock className="w-3 h-3" />
                      {item.prepTime || '15 mins'}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
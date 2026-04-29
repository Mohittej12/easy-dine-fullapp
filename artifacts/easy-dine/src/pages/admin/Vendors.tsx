import { useAppState } from "@/hooks/use-app-state";
import { Search, Plus, Store, MoreVertical, KeyRound } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminVendors() {
  const { shops } = useAppState();

  return (
    <div className="space-y-6 pb-8 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-foreground">Vendors</h1>
          <p className="text-muted-foreground text-sm">Manage vendor accounts and performance</p>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search vendors..." 
            className="pl-10 h-12 rounded-xl bg-white border-border"
          />
        </div>
        <select className="h-12 rounded-xl border border-input bg-white px-4 py-1 text-sm shadow-sm hidden sm:block">
          <option>Sort by Orders (High-Low)</option>
          <option>Sort by Revenue</option>
          <option>Alphabetical</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {shops.map(shop => (
          <div key={shop.id} className="bg-white rounded-[24px] p-6 shadow-sm border border-border">
            <div className="flex items-start justify-between border-b border-border pb-4 mb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center shrink-0">
                  <Store className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                    {shop.name}
                    <Badge variant="default" className="bg-green-100 text-green-700 hover:bg-green-100 border-none px-2 py-0">Active</Badge>
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{shop.activeItems} active menu items</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="rounded-xl -mr-2">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm mb-6">
              <div>
                <p className="text-muted-foreground mb-1">Total Orders</p>
                <p className="font-bold text-lg">{shop.orders}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Total Sales</p>
                <p className="font-bold text-lg text-primary">₹{shop.revenue}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Meal Pass Count</p>
                <p className="font-semibold text-foreground">124</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">Rejected Count</p>
                <p className="font-semibold text-red-600">8 (2.4%)</p>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex justify-end">
              <Button variant="outline" className="h-10 rounded-xl text-sm font-semibold border-border gap-2">
                <KeyRound className="w-4 h-4" /> Reset Credentials
              </Button>
            </div>
          </div>
        ))}
      </div>

      <button className="fixed bottom-8 right-8 w-14 h-14 bg-primary text-white rounded-2xl shadow-xl flex items-center justify-center hover:bg-primary/90 transition-transform hover:scale-105 active:scale-95 z-10">
        <Plus className="w-7 h-7" />
      </button>
    </div>
  );
}
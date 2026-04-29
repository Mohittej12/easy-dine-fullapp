import { useAppState } from "@/hooks/use-app-state";
import { Link } from "wouter";
import { UtensilsCrossed, ChevronRight } from "lucide-react";

export default function AdminMenuManagement() {
  const { shops } = useAppState();

  return (
    <div className="space-y-6 pb-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">Menu Management</h1>
        <p className="text-muted-foreground text-sm">Select Cafeteria</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        {shops.map(shop => (
          <Link key={shop.id} href={`/admin/food-items?shop=${shop.id}`}>
            <div className="bg-white rounded-[24px] p-6 shadow-sm border border-border hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-muted group-hover:bg-primary/10 transition-colors text-foreground group-hover:text-primary rounded-2xl flex items-center justify-center shrink-0 font-bold text-xl">
                    {shop.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                      {shop.name}
                      <span className="bg-green-100 text-green-700 text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded">Active</span>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{shop.totalItems} Total • {shop.activeItems} Active</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
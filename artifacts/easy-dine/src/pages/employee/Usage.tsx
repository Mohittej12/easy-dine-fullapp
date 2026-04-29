import { useState } from "react";
import { PieChart, Download, UtensilsCrossed, Gift, CreditCard } from "lucide-react";
import { useAppState } from "@/hooks/use-app-state";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Usage() {
  const { orders } = useAppState();
  const [tab, setTab] = useState<"Today" | "This Week" | "This Month">("This Month");

  const handleDownload = () => {
    toast.success("Usage report downloaded successfully");
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-foreground">My Usage</h1>
        <div className="flex bg-muted p-1 rounded-2xl w-full">
          <button onClick={() => setTab("Today")} className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${tab === "Today" ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>Today</button>
          <button onClick={() => setTab("This Week")} className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${tab === "This Week" ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>This Week</button>
          <button onClick={() => setTab("This Month")} className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${tab === "This Month" ? 'bg-white text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>This Month</button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-border">
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-3">
            <UtensilsCrossed className="w-5 h-5" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
          <p className="text-2xl font-bold text-foreground mt-1">12</p>
        </div>
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-border">
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-3">
            <CreditCard className="w-5 h-5" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
          <p className="text-2xl font-bold text-foreground mt-1">₹850</p>
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <h2 className="text-lg font-bold text-foreground">Breakdown</h2>
        
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-border flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-foreground">Company Sponsored</p>
              <p className="text-sm text-muted-foreground">Free Meals Claimed</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg text-foreground">8</p>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-border flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-foreground">Pay & Use</p>
              <p className="text-sm text-muted-foreground">Paid Online</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg text-foreground">4</p>
          </div>
        </div>
      </div>

      <div className="pt-4">
        <Button onClick={handleDownload} className="w-full h-14 rounded-xl font-bold text-lg flex items-center gap-2">
          <Download className="w-5 h-5" /> Download Report
        </Button>
      </div>
    </div>
  );
}
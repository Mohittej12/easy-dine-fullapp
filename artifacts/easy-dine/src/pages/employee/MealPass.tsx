import { Link } from "wouter";
import { Ticket, ArrowRight, Clock, Coffee, Sunset } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function MealPass() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Today's Available Meals</h1>
        <p className="text-muted-foreground font-medium">Select your company-sponsored meal</p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <Badge variant="default" className="bg-primary hover:bg-primary text-white rounded-full px-4 py-1.5 text-sm whitespace-nowrap">
          Meal Pass
        </Badge>
        <Badge variant="outline" className="bg-white hover:bg-muted border-border text-foreground rounded-full px-4 py-1.5 text-sm whitespace-nowrap">
          Breakfast
        </Badge>
        <Badge variant="outline" className="bg-white hover:bg-muted border-border text-foreground rounded-full px-4 py-1.5 text-sm whitespace-nowrap">
          Dinner
        </Badge>
      </div>

      <div className="space-y-4 mt-2">
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Coffee className="w-24 h-24 text-primary" />
          </div>
          
          <div className="relative z-10 space-y-4">
            <div className="flex justify-between items-start">
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold inline-block mb-2">
                Free Meal / Company Sponsored
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-foreground">Breakfast Meal</h2>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2 font-medium">
                <Clock className="w-4 h-4" />
                8:00 AM – 10:30 AM
              </div>
            </div>

            <div className="pt-4 border-t border-border flex justify-between items-center">
              <span className="text-sm font-semibold text-muted-foreground">Meal Counter</span>
              <Link href="/employee/meal-authorization" className="bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center gap-2">
                Select <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Sunset className="w-24 h-24 text-primary" />
          </div>
          
          <div className="relative z-10 space-y-4">
            <div className="flex justify-between items-start">
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold inline-block mb-2">
                Free Meal / Company Sponsored
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-foreground">Dinner Meal</h2>
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2 font-medium">
                <Clock className="w-4 h-4" />
                7:00 PM – 9:30 PM
              </div>
            </div>

            <div className="pt-4 border-t border-border flex justify-between items-center">
              <span className="text-sm font-semibold text-muted-foreground">Meal Counter</span>
              <Link href="/employee/meal-authorization" className="bg-primary text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center gap-2">
                Select <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
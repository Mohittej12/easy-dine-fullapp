import { Link } from "wouter";
import { Ticket, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ModeSelection() {
  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">How would you like to order?</h1>
          <p className="text-muted-foreground">Select your preferred payment mode</p>
        </div>

        <div className="space-y-4">
          <Link href="/employee/meal-pass">
            <div className="group relative bg-white p-6 rounded-[24px] shadow-sm hover:shadow-md transition-all border border-border cursor-pointer overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <Ticket className="w-24 h-24 text-primary" />
              </div>
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
                  <Ticket className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Ticketing</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Company-sponsored free meals at the Meal Counter. Available for approved shifts.
                  </p>
                </div>
                <div className="pt-2">
                  <span className="text-primary font-semibold text-sm group-hover:underline">Proceed with Ticketing →</span>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/employee/home">
            <div className="group relative bg-white p-6 rounded-[24px] shadow-sm hover:shadow-md transition-all border border-border cursor-pointer overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                <CreditCard className="w-24 h-24 text-primary" />
              </div>
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Pay & Use</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Order from any cafeteria and pay online via UPI. Available for all employees.
                  </p>
                </div>
                <div className="pt-2">
                  <span className="text-primary font-semibold text-sm group-hover:underline">Proceed with Pay & Use →</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
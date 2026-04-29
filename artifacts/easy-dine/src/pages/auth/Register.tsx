import { Link } from "wouter";
import { UtensilsCrossed, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Register() {
  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[24px] shadow-xl overflow-hidden flex flex-col">
        {/* Hero Section */}
        <div className="relative h-32 bg-primary">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
            <div className="bg-white/20 p-2 rounded-2xl backdrop-blur-md mb-2 mt-4">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Create Account</h1>
          </div>
        </div>

        <div className="p-6 md:p-8 flex-1 flex flex-col">
          <form className="space-y-4 flex-1">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="Sarah Mehta" required className="h-12 rounded-xl" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="employeeId">Employee ID</Label>
              <Input id="employeeId" type="text" placeholder="PRD-10428" required className="h-12 rounded-xl" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Prodapt Email</Label>
              <Input id="email" type="email" placeholder="name@prodapt.com" required className="h-12 rounded-xl" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required className="h-12 rounded-xl" />
            </div>

            <Link href="/employee/verify-email">
              <Button type="button" className="w-full h-12 rounded-xl text-base font-semibold mt-6">
                Create Account <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </form>

          <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Already have an account? <Link href="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
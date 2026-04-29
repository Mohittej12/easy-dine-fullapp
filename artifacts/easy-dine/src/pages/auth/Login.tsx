import { useState } from "react";
import { useLocation, Link } from "wouter";
import { UtensilsCrossed, ChevronRight } from "lucide-react";
import { useAppState } from "@/hooks/use-app-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [, setLocation] = useLocation();
  const { setRole } = useAppState();
  const [activeTab, setActiveTab] = useState<"employee" | "vendor" | "admin">("employee");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setRole(activeTab);
    if (activeTab === "employee") setLocation("/employee/mode-selection");
    if (activeTab === "vendor") setLocation("/vendor/dashboard");
    if (activeTab === "admin") setLocation("/admin/dashboard");
  };

  const getSubtitle = () => {
    if (activeTab === "employee") return "Order meals inside Prodapt campus.";
    if (activeTab === "vendor") return "Manage cafeteria orders and menu.";
    return "Monitor Easy Dine operations.";
  };

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[24px] shadow-xl overflow-hidden flex flex-col">
        {/* Hero Section */}
        <div className="relative h-48 bg-primary">
          <div className="absolute inset-0 opacity-20">
            <img 
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800" 
              alt="Food background" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md mb-2">
              <UtensilsCrossed className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight">Prodapt Easy Dine</h1>
            <p className="text-white/80 text-sm mt-1">{getSubtitle()}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button 
            className={`flex-1 py-4 text-sm font-semibold transition-colors ${activeTab === 'employee' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:bg-muted'}`}
            onClick={() => setActiveTab('employee')}
          >
            Employee
          </button>
          <button 
            className={`flex-1 py-4 text-sm font-semibold transition-colors ${activeTab === 'vendor' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:bg-muted'}`}
            onClick={() => setActiveTab('vendor')}
          >
            Vendor
          </button>
          <button 
            className={`flex-1 py-4 text-sm font-semibold transition-colors ${activeTab === 'admin' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:bg-muted'}`}
            onClick={() => setActiveTab('admin')}
          >
            Admin
          </button>
        </div>

        {/* Form */}
        <div className="p-6 md:p-8 flex-1 flex flex-col">
          <form onSubmit={handleLogin} className="space-y-4 flex-1">
            <div className="space-y-2">
              <Label htmlFor="email">{activeTab === 'vendor' ? 'Phone or Email' : 'Email Address'}</Label>
              <Input 
                id="email" 
                type="text" 
                placeholder={activeTab === 'vendor' ? 'vendor@example.com' : 'name@prodapt.com'}
                required 
                className="h-12 rounded-xl"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/employee/forgot-password" className="text-xs text-primary hover:underline font-medium">
                  Forgot Password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                required 
                className="h-12 rounded-xl"
              />
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox id="remember" className="rounded-md" />
              <label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-muted-foreground">
                Remember me
              </label>
            </div>

            <Button type="submit" className="w-full h-12 rounded-xl text-base font-semibold mt-4">
              Sign In <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          {activeTab === 'employee' && (
            <div className="mt-8 text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                New here? <Link href="/employee/register" className="text-primary font-semibold hover:underline">Create account</Link>
              </p>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              By signing in, you agree to our <br/>
              <Link href="/employee/terms" className="text-foreground underline">Terms & Disclaimer</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
import { useState } from "react";
import { useLocation } from "wouter";
import { useAppState } from "@/hooks/use-app-state";
import { Coffee, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function MealAuthorization() {
  const [, setLocation] = useLocation();
  const { employee, addOrder } = useAppState();
  
  const [confirmed, setConfirmed] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [accessType, setAccessType] = useState<"internal" | "employee">("employee");

  const handleSubmit = () => {
    if (!confirmed) return;
    
    // Create mock free meal order
    const orderId = `ORD-ED-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    
    addOrder({
      orderId,
      userName: employee.name,
      employeeId: employee.employeeId,
      shopId: "shop_meal_counter",
      shopName: "Meal Counter",
      items: [{
        id: "m_1",
        foodItemId: "f_m",
        name: "Standard Breakfast Meal",
        price: 0,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=400"
      }],
      amount: 0,
      orderType: "mealPass",
      paymentType: "free",
      status: "delivered", // Per brief: only delivered or rejected
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    });
    
    setShowSuccessModal(true);
  };

  const handleDone = () => {
    setShowSuccessModal(false);
    setLocation("/employee/orders");
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Meal Authorization</h1>
        <p className="text-muted-foreground font-medium">Confirm your details to claim your meal</p>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-[24px] p-5 flex items-center gap-4">
        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
          <Coffee className="w-7 h-7" />
        </div>
        <div>
          <h3 className="font-bold text-lg">Breakfast Meal</h3>
          <p className="text-sm text-muted-foreground">Meal Counter • Free</p>
        </div>
      </div>

      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-border space-y-6">
        <div className="space-y-3">
          <Label className="text-base">Meal Access Type</Label>
          <div className="flex bg-muted p-1 rounded-xl">
            <button
              onClick={() => setAccessType('internal')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                accessType === 'internal' 
                  ? 'bg-white text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Internal ID
            </button>
            <button
              onClick={() => setAccessType('employee')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                accessType === 'employee' 
                  ? 'bg-white text-foreground shadow-sm' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Employee ID
            </button>
          </div>
        </div>

        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label>Full Name</Label>
            <Input value={employee.name} readOnly className="bg-muted/50 h-12 rounded-xl text-muted-foreground" />
          </div>
          
          <div className="space-y-2">
            <Label>Employee ID</Label>
            <Input value={employee.employeeId} readOnly className="bg-muted/50 h-12 rounded-xl text-muted-foreground" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Program</Label>
              <Input value={employee.program} readOnly className="bg-muted/50 h-12 rounded-xl text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <Label>Cost Code</Label>
              <Input value={employee.costCode} readOnly className="bg-muted/50 h-12 rounded-xl text-muted-foreground" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Department</Label>
            <Input value={employee.department} readOnly className="bg-muted/50 h-12 rounded-xl text-muted-foreground" />
          </div>
        </div>

        <div className="pt-4 flex items-start space-x-3">
          <Checkbox 
            id="terms" 
            checked={confirmed} 
            onCheckedChange={(c) => setConfirmed(c as boolean)}
            className="mt-1"
          />
          <label htmlFor="terms" className="text-sm text-muted-foreground leading-relaxed">
            I confirm that this meal request follows company policy and I am authorized for this shift meal.
          </label>
        </div>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" className="flex-1 h-14 rounded-xl font-bold bg-white" onClick={() => setLocation("/employee/meal-pass")}>
          Cancel
        </Button>
        <Button 
          className="flex-1 h-14 rounded-xl font-bold" 
          disabled={!confirmed}
          onClick={handleSubmit}
        >
          Submit Request
        </Button>
      </div>

      <Dialog open={showSuccessModal} onOpenChange={(open) => !open && handleDone()}>
        <DialogContent className="rounded-3xl max-w-sm w-[90%] p-8 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <DialogTitle className="text-2xl font-bold">Meal Confirmed</DialogTitle>
          <div className="text-muted-foreground mt-2 text-base">
            Your request has been approved. Collect directly from the restaurant.
          </div>
          <DialogFooter className="w-full mt-8 sm:justify-center">
            <Button className="w-full h-14 rounded-xl font-bold text-lg" onClick={handleDone}>
              View Orders
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
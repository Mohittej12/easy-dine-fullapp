import { useState } from "react";
import { useLocation } from "wouter";
import { useAppState } from "@/hooks/use-app-state";
import { CheckCircle2, ShieldCheck, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function EmployeeCheckout() {
  const [, setLocation] = useLocation();
  const { cart, employee, addOrder, clearCart, shops } = useAppState();
  const [selectedUpi, setSelectedUpi] = useState<string>("gpay");
  const [showSuccess, setShowSuccess] = useState(false);

  if (cart.length === 0 && !showSuccess) {
    setLocation("/employee/home");
    return null;
  }

  const shopName = shops.find(s => s.id === cart[0]?.foodItem.shopId)?.name || "Cafeteria";
  const subtotal = cart.reduce((acc, item) => acc + (item.foodItem.price * item.quantity), 0);
  const total = subtotal + (subtotal * 0.05);

  const handlePay = () => {
    // Create mock paid order
    const orderId = `ORD-ED-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    
    addOrder({
      orderId,
      userName: employee.name,
      employeeId: employee.employeeId,
      shopId: cart[0].foodItem.shopId,
      shopName: shopName,
      items: cart.map(c => ({
        id: `item_${Math.random()}`,
        foodItemId: c.foodItem.id,
        name: c.foodItem.name,
        price: c.foodItem.price,
        quantity: c.quantity,
        image: c.foodItem.image
      })),
      amount: Math.round(total),
      orderType: "regular",
      paymentType: "paid",
      status: "delivered", // per brief
      date: now.toISOString().split('T')[0],
      time: now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    });
    
    setShowSuccess(true);
    setTimeout(() => {
      clearCart();
      setLocation("/employee/orders");
    }, 2000);
  };

  return (
    <div className="space-y-6 pb-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">Checkout</h1>
        <p className="text-muted-foreground font-medium text-sm">Select payment method to complete order</p>
      </div>

      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-border space-y-4">
        <h3 className="font-bold text-lg border-b border-border pb-3 flex justify-between">
          Order Summary <span className="text-primary">₹{Math.round(total)}</span>
        </h3>
        <div className="space-y-3">
          {cart.map(item => (
            <div key={item.foodItem.id} className="flex justify-between text-sm">
              <span className="text-muted-foreground">{item.quantity} × {item.foodItem.name}</span>
              <span className="font-semibold">₹{item.foodItem.price * item.quantity}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-border space-y-4">
        <h3 className="font-bold text-lg">Payment Method</h3>
        <p className="text-xs text-muted-foreground mb-4">Pay securely using any UPI app</p>
        
        <div className="space-y-3">
          {['gpay', 'phonepe', 'paytm'].map(method => (
            <div 
              key={method}
              onClick={() => setSelectedUpi(method)}
              className={`flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedUpi === method ? 'border-primary bg-primary/5' : 'border-border bg-white hover:border-primary/30'}`}
            >
              <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center mr-4">
                <CreditCard className="w-5 h-5 text-muted-foreground" />
              </div>
              <span className="font-semibold flex-1 capitalize">
                {method === 'gpay' ? 'Google Pay' : method === 'phonepe' ? 'PhonePe' : 'Paytm'}
              </span>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedUpi === method ? 'border-primary' : 'border-muted-foreground'}`}>
                {selectedUpi === method && <div className="w-2.5 h-2.5 bg-primary rounded-full" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <Button 
          className="w-full h-14 rounded-xl font-bold text-lg shadow-md"
          onClick={handlePay}
        >
          Pay Now • ₹{Math.round(total)}
        </Button>
        <p className="text-center text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
          <ShieldCheck className="w-4 h-4" /> 100% Secure Payment
        </p>
      </div>

      <Dialog open={showSuccess}>
        <DialogContent className="sm:max-w-md rounded-3xl p-8 text-center flex flex-col items-center [&>button]:hidden">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <DialogTitle className="text-2xl font-bold">Payment Successful!</DialogTitle>
          <p className="text-muted-foreground mt-2">Order placed successfully. Redirecting to your orders...</p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
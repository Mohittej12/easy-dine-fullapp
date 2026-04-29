import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAppState } from "@/hooks/use-app-state";
import { ChevronLeft, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function AdminAddFood() {
  const [, setLocation] = useLocation();
  const { addFoodItem, shops } = useAppState();
  
  const [formData, setFormData] = useState({
    shopId: shops[0]?.id || "",
    name: "",
    price: "",
    category: "Breakfast",
    diet: "veg" as "veg" | "nonVeg",
    description: "",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      id: `food_${Math.random()}`,
      shopId: formData.shopId,
      name: formData.name,
      price: Number(formData.price),
      category: formData.category as any,
      diet: formData.diet,
      description: formData.description,
      image: formData.image,
      available: true,
      popular: false
    };
    addFoodItem(newItem);
    toast.success("Food item added successfully");
    setLocation(`/admin/food-items?shop=${formData.shopId}`);
  };

  return (
    <div className="space-y-6 pb-8 max-w-2xl mx-auto">
      <div className="flex items-center gap-4">
        <Link href="/admin/food-items">
          <Button variant="ghost" size="icon" className="rounded-xl bg-white border border-border">
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Add Food Item</h1>
          <p className="text-muted-foreground text-sm">Add item to global inventory</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-[24px] shadow-sm border border-border p-6 md:p-8 space-y-8">
        
        <div className="space-y-2">
          <Label htmlFor="shop">Assign to Cafeteria</Label>
          <select 
            id="shop"
            required
            className="flex h-14 w-full rounded-xl border border-primary/50 bg-primary/5 px-3 py-1 font-bold text-primary shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            value={formData.shopId}
            onChange={e => setFormData({...formData, shopId: e.target.value})}
          >
            {shops.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>

        <div className="space-y-3">
          <Label className="text-base">Food Image</Label>
          <div className="border-2 border-dashed border-border rounded-[24px] p-8 text-center bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[200px]">
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center text-primary mb-4">
              <UploadCloud className="w-8 h-8" />
            </div>
            <p className="font-bold text-foreground">Upload Food Image</p>
            <p className="text-sm text-muted-foreground mt-1">Drag & drop or click to browse</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Food Name</Label>
            <Input id="name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="h-12 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Price (₹)</Label>
            <Input id="price" type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="h-12 rounded-xl" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Primary Category</Label>
            <select 
              id="category"
              className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none"
              value={formData.category}
              onChange={e => setFormData({...formData, category: e.target.value})}
            >
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Snacks">Snacks</option>
              <option value="Juice/Beverages">Juice/Beverages</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="diet">Diet Type</Label>
            <select 
              id="diet"
              className="flex h-12 w-full rounded-xl border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none"
              value={formData.diet}
              onChange={e => setFormData({...formData, diet: e.target.value as any})}
            >
              <option value="veg">Vegetarian</option>
              <option value="nonVeg">Non-Vegetarian</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="desc">Description</Label>
          <Textarea id="desc" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="min-h-[100px] rounded-xl resize-none" />
        </div>

        <div className="pt-4 border-t border-border">
          <Button type="submit" className="w-full md:w-auto px-8 h-12 rounded-xl font-bold text-base">
            Save Food
          </Button>
        </div>
      </form>
    </div>
  );
}
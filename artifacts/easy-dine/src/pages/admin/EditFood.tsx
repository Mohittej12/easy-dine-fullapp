import { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "wouter";
import { useAppState } from "@/hooks/use-app-state";
import { ChevronLeft, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function AdminEditFood() {
  const [, setLocation] = useLocation();
  const { id } = useParams<{ id: string }>();
  const { foodItems, updateFoodItem, deleteFoodItem, shops } = useAppState();
  
  const item = foodItems.find(i => i.id === id);
  
  const [formData, setFormData] = useState({
    shopId: "",
    name: "",
    price: "",
    category: "Breakfast",
    diet: "veg" as "veg" | "nonVeg",
    description: "",
    image: ""
  });

  useEffect(() => {
    if (item) {
      setFormData({
        shopId: item.shopId,
        name: item.name,
        price: item.price.toString(),
        category: item.category,
        diet: item.diet,
        description: item.description,
        image: item.image
      });
    }
  }, [item]);

  if (!item) return <div className="p-8 text-center">Item not found</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFoodItem({
      ...item,
      shopId: formData.shopId,
      name: formData.name,
      price: Number(formData.price),
      category: formData.category as any,
      diet: formData.diet,
      description: formData.description,
      image: formData.image,
    });
    toast.success("Changes saved successfully");
    setLocation(`/admin/food-items?shop=${formData.shopId}`);
  };

  const handleDelete = () => {
    deleteFoodItem(item.id);
    toast.success("Food item deleted");
    setLocation(`/admin/food-items?shop=${formData.shopId}`);
  };

  return (
    <div className="space-y-6 pb-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/food-items">
            <Button variant="ghost" size="icon" className="rounded-xl bg-white border border-border">
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Edit Food Item</h1>
          </div>
        </div>
        <button type="button" onClick={handleDelete} className="text-red-600 font-semibold hover:underline text-sm">
          Delete Food
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-[24px] shadow-sm border border-border p-6 md:p-8 space-y-8">
        
        <div className="space-y-2">
          <Label htmlFor="shop">Assign to Cafeteria</Label>
          <select 
            id="shop"
            required
            className="flex h-14 w-full rounded-xl border border-primary/50 bg-primary/5 px-3 py-1 font-bold text-primary shadow-sm transition-colors focus-visible:outline-none"
            value={formData.shopId}
            onChange={e => setFormData({...formData, shopId: e.target.value})}
          >
            {shops.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>

        <div className="space-y-3">
          <Label className="text-base">Food Image</Label>
          <div className="relative rounded-[24px] overflow-hidden h-48 border border-border group">
            <img src={formData.image} alt={formData.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Button type="button" variant="secondary" className="rounded-xl font-bold">
                <ImageIcon className="w-4 h-4 mr-2" /> Change Image
              </Button>
            </div>
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
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
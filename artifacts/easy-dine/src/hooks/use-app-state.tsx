import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Role, Employee, Shop, FoodItem, Order, MOCK_EMPLOYEE, MOCK_SHOPS, MOCK_FOOD_ITEMS, MOCK_ORDERS } from "@/lib/mock-data";

type CartItem = {
  foodItem: FoodItem;
  quantity: number;
};

type AppState = {
  role: Role | null;
  setRole: (role: Role | null) => void;
  employee: Employee;
  shops: Shop[];
  foodItems: FoodItem[];
  orders: Order[];
  cart: CartItem[];
  addToCart: (item: FoodItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartShopId: string | null;
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: "delivered" | "rejected") => void;
  updateFoodItem: (item: FoodItem) => void;
  deleteFoodItem: (itemId: string) => void;
  addFoodItem: (item: FoodItem) => void;
  favorites: string[]; // Array of food item IDs
  toggleFavorite: (itemId: string) => void;
};

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<Role | null>(() => {
    const saved = localStorage.getItem("easy-dine-role");
    return saved ? (saved as Role) : null;
  });

  const [shops] = useState<Shop[]>(MOCK_SHOPS);
  const [foodItems, setFoodItems] = useState<FoodItem[]>(() => {
    const saved = localStorage.getItem("easy-dine-foods");
    return saved ? JSON.parse(saved) : MOCK_FOOD_ITEMS;
  });
  
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("easy-dine-orders");
    return saved ? JSON.parse(saved) : MOCK_ORDERS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("easy-dine-cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("easy-dine-favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const setRole = (r: Role | null) => {
    setRoleState(r);
    if (r) {
      localStorage.setItem("easy-dine-role", r);
    } else {
      localStorage.removeItem("easy-dine-role");
    }
  };

  useEffect(() => {
    localStorage.setItem("easy-dine-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("easy-dine-orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("easy-dine-favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("easy-dine-foods", JSON.stringify(foodItems));
  }, [foodItems]);

  const cartShopId = cart.length > 0 ? cart[0].foodItem.shopId : null;

  const addToCart = (foodItem: FoodItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.foodItem.id === foodItem.id);
      if (existing) {
        return prev.map((item) =>
          item.foodItem.id === foodItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { foodItem, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.foodItem.id !== itemId));
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.foodItem.id === itemId) {
          const newQ = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQ };
        }
        return item;
      })
    );
  };

  const clearCart = () => setCart([]);

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const updateOrderStatus = (orderId: string, status: "delivered" | "rejected") => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, status } : o))
    );
  };

  const updateFoodItem = (updatedItem: FoodItem) => {
    setFoodItems((prev) =>
      prev.map((i) => (i.id === updatedItem.id ? updatedItem : i))
    );
  };

  const deleteFoodItem = (itemId: string) => {
    setFoodItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const addFoodItem = (item: FoodItem) => {
    setFoodItems((prev) => [item, ...prev]);
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId);
      }
      return [...prev, itemId];
    });
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        employee: MOCK_EMPLOYEE,
        shops,
        foodItems,
        orders,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartShopId,
        addOrder,
        updateOrderStatus,
        updateFoodItem,
        deleteFoodItem,
        addFoodItem,
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppProvider");
  }
  return context;
}
export type Role = "employee" | "vendor" | "admin";

export type Shop = {
  id: string;
  name: string;
  status: "active" | "inactive";
  totalItems: number;
  activeItems: number;
  revenue: number;
  orders: number;
};

export type FoodItem = {
  id: string;
  shopId: string;
  name: string;
  description: string;
  price: number;
  category: "Breakfast" | "Lunch" | "Dinner" | "Snacks" | "Juice/Beverages";
  secondaryCategory?: string;
  diet: "veg" | "nonVeg";
  image: string;
  available: boolean;
  popular: boolean;
  calories?: number;
  prepTime?: string;
};

export type OrderItem = {
  id: string;
  foodItemId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export type Order = {
  orderId: string;
  userName: string;
  employeeId: string;
  shopId: string;
  shopName: string;
  items: OrderItem[];
  amount: number;
  orderType: "regular" | "mealPass";
  paymentType: "paid" | "free";
  status: "delivered" | "rejected";
  date: string;
  time: string;
};

export type Employee = {
  employeeId: string;
  name: string;
  email: string;
  program: string;
  costCode: string;
  department: string;
};

export type TicketData = {
  id: string;
  employeeId: string;
  employeeName: string;
  program: string;
  costCode: string;
  mealType: string;
  date: string;
  validationStatus: "valid" | "invalid";
};

export const MOCK_SHOPS: Shop[] = [
  {
    id: "shop_meal_counter",
    name: "Meal Counter",
    status: "active",
    totalItems: 12,
    activeItems: 10,
    revenue: 45000,
    orders: 320,
  },
  {
    id: "shop_tuck_shop",
    name: "Tuck Shop",
    status: "active",
    totalItems: 8,
    activeItems: 7,
    revenue: 12500,
    orders: 145,
  },
];

export const MOCK_FOOD_ITEMS: FoodItem[] = [
  {
    id: "food_1",
    shopId: "shop_meal_counter",
    name: "Idli Sambar",
    description: "Soft steamed rice cakes served with lentil soup and chutney",
    price: 40,
    category: "Breakfast",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?auto=format&fit=crop&q=80&w=800",
    available: true,
    popular: true,
    calories: 250,
    prepTime: "10 mins"
  },
  {
    id: "food_2",
    shopId: "shop_meal_counter",
    name: "Masala Dosa",
    description: "Crispy crepe made from rice and lentils, filled with potato curry",
    price: 60,
    category: "Breakfast",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=800",
    available: true,
    popular: true,
    calories: 320,
    prepTime: "15 mins"
  },
  {
    id: "food_3",
    shopId: "shop_meal_counter",
    name: "Chicken Biryani",
    description: "Aromatic basmati rice cooked with tender chicken and spices",
    price: 180,
    category: "Lunch",
    diet: "nonVeg",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800",
    available: true,
    popular: true,
    calories: 650,
    prepTime: "20 mins"
  },
  {
    id: "food_4",
    shopId: "shop_meal_counter",
    name: "Veg Thali",
    description: "Complete meal with roti, rice, dal, two curries, and sweet",
    price: 120,
    category: "Lunch",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800",
    available: true,
    popular: false,
    calories: 550,
    prepTime: "15 mins"
  },
  {
    id: "food_5",
    shopId: "shop_meal_counter",
    name: "Paneer Butter Masala + Roti",
    description: "Cottage cheese in rich tomato gravy, served with 3 rotis",
    price: 150,
    category: "Lunch",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc0?auto=format&fit=crop&q=80&w=800",
    available: true,
    popular: true,
    calories: 580,
    prepTime: "15 mins"
  },
  {
    id: "food_6",
    shopId: "shop_meal_counter",
    name: "Veg Fried Rice",
    description: "Wok tossed rice with mixed vegetables and soy sauce",
    price: 100,
    category: "Dinner",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&q=80&w=800",
    available: true,
    popular: false,
    calories: 400,
    prepTime: "15 mins"
  },
  
  {
    id: "food_7",
    shopId: "shop_tuck_shop",
    name: "Veg Sandwich",
    description: "Grilled sandwich loaded with fresh vegetables and cheese",
    price: 50,
    category: "Breakfast",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800",
    available: true,
    popular: true,
    calories: 280,
    prepTime: "10 mins"
  },
  {
    id: "food_8",
    shopId: "shop_tuck_shop",
    name: "Margherita Pizza",
    description: "Classic 8-inch pizza with fresh tomato sauce and mozzarella",
    price: 140,
    category: "Dinner",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800",
    available: true,
    popular: true,
    calories: 800,
    prepTime: "20 mins"
  },
  {
    id: "food_9",
    shopId: "shop_tuck_shop",
    name: "Samosa",
    description: "Crispy pastry filled with spiced potatoes and peas",
    price: 20,
    category: "Snacks",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800",
    available: true,
    popular: true,
    calories: 260,
    prepTime: "5 mins"
  },
  {
    id: "food_10",
    shopId: "shop_tuck_shop",
    name: "Cold Coffee",
    description: "Creamy iced coffee blended with vanilla ice cream",
    price: 80,
    category: "Juice/Beverages",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=800",
    available: true,
    popular: true,
    calories: 300,
    prepTime: "5 mins"
  },
  {
    id: "food_11",
    shopId: "shop_tuck_shop",
    name: "Masala Chai",
    description: "Traditional Indian spiced milk tea",
    price: 15,
    category: "Juice/Beverages",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1571115177098-24de84b05537?auto=format&fit=crop&q=80&w=800",
    available: true,
    popular: false,
    calories: 120,
    prepTime: "5 mins"
  },
  {
    id: "food_12",
    shopId: "shop_tuck_shop",
    name: "Veg Puff",
    description: "Flaky puff pastry stuffed with mixed vegetable curry",
    price: 25,
    category: "Snacks",
    diet: "veg",
    image: "https://images.unsplash.com/photo-1628198751509-322197652749?auto=format&fit=crop&q=80&w=800",
    available: true,
    popular: false,
    calories: 220,
    prepTime: "5 mins"
  }
];

export const MOCK_ORDERS: Order[] = [
  {
    orderId: "ORD-ED-84921",
    userName: "Sarah Mehta",
    employeeId: "PRD-10428",
    shopId: "shop_meal_counter",
    shopName: "Meal Counter",
    items: [
      { id: "item_1", foodItemId: "food_3", name: "Chicken Biryani", price: 180, quantity: 1, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800" },
      { id: "item_2", foodItemId: "food_10", name: "Cold Coffee", price: 80, quantity: 1, image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=800" }
    ],
    amount: 260,
    orderType: "regular",
    paymentType: "paid",
    status: "delivered",
    date: "2024-05-14",
    time: "13:45"
  },
  {
    orderId: "ORD-ED-84922",
    userName: "Rahul Sharma",
    employeeId: "PRD-10211",
    shopId: "shop_meal_counter",
    shopName: "Meal Counter",
    items: [
      { id: "item_3", foodItemId: "food_4", name: "Veg Thali", price: 120, quantity: 1, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&q=80&w=800" }
    ],
    amount: 0,
    orderType: "mealPass",
    paymentType: "free",
    status: "delivered",
    date: "2024-05-14",
    time: "13:30"
  },
  {
    orderId: "ORD-ED-84923",
    userName: "Priya Patel",
    employeeId: "PRD-10555",
    shopId: "shop_tuck_shop",
    shopName: "Tuck Shop",
    items: [
      { id: "item_4", foodItemId: "food_8", name: "Margherita Pizza", price: 140, quantity: 1, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=800" },
      { id: "item_5", foodItemId: "food_11", name: "Masala Chai", price: 15, quantity: 2, image: "https://images.unsplash.com/photo-1571115177098-24de84b05537?auto=format&fit=crop&q=80&w=800" }
    ],
    amount: 170,
    orderType: "regular",
    paymentType: "paid",
    status: "rejected",
    date: "2024-05-14",
    time: "18:20"
  }
];

export const MOCK_EMPLOYEE: Employee = {
  employeeId: "PRD-10428",
  name: "Sarah Mehta",
  email: "sarah.m@prodapt.com",
  program: "Engineering Services",
  costCode: "CC-7421",
  department: "Platform Engineering"
};

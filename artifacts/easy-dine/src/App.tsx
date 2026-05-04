import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { AppProvider, useAppState } from "@/hooks/use-app-state";

// Auth
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import VerifyEmail from "@/pages/auth/VerifyEmail";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import VendorForgotPassword from "@/pages/auth/VendorForgotPassword";
import AuthTerms from "@/pages/auth/Terms";

// Layouts
import EmployeeLayout from "@/components/layouts/EmployeeLayout";
import VendorLayout from "@/components/layouts/VendorLayout";
import AdminLayout from "@/components/layouts/AdminLayout";

// Employee Pages
import ModeSelection from "@/pages/employee/ModeSelection";
import EmployeeHome from "@/pages/employee/Home";
import EmployeeMenu from "@/pages/employee/Menu";
import EmployeeOrders from "@/pages/employee/Orders";
import EmployeeProfile from "@/pages/employee/Profile";
import EmployeeFavorites from "@/pages/employee/Favorites";
import EmployeeCart from "@/pages/employee/Cart";
import EmployeeCheckout from "@/pages/employee/Checkout";
import MealPass from "@/pages/employee/MealPass";
import MealAuthorization from "@/pages/employee/MealAuthorization";
import EmployeeUsage from "@/pages/employee/Usage";
import EmployeeTerms from "@/pages/employee/Terms";

// Vendor Pages
import VendorDashboard from "@/pages/vendor/Dashboard";
import VendorOrders from "@/pages/vendor/Orders";
import VendorFoodItems from "@/pages/vendor/FoodItems";
import VendorAddFood from "@/pages/vendor/AddFood";
import VendorEditFood from "@/pages/vendor/EditFood";
import VendorReports from "@/pages/vendor/Reports";
import VendorTicketData from "@/pages/vendor/TicketData";
import VendorTerms from "@/pages/vendor/Terms";
import VendorProfile from "@/pages/vendor/Profile";

// Admin Pages
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminVendorPerformance from "@/pages/admin/VendorPerformance";
import AdminVendors from "@/pages/admin/Vendors";
import AdminMenuManagement from "@/pages/admin/MenuManagement";
import AdminFoodItems from "@/pages/admin/FoodItems";
import AdminUploadTicketData from "@/pages/admin/UploadTicketData";
import AdminAddFood from "@/pages/admin/AddFood";
import AdminEditFood from "@/pages/admin/EditFood";
import AdminTerms from "@/pages/admin/Terms";

const queryClient = new QueryClient();

function RedirectToLogin() {
  const [, setLocation] = useLocation();
  setLocation("/login");
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={RedirectToLogin} />
      <Route path="/login" component={Login} />
      <Route path="/employee/register" component={Register} />
      <Route path="/employee/verify-email" component={VerifyEmail} />
      <Route path="/employee/forgot-password" component={ForgotPassword} />
      <Route path="/vendor/forgot-password" component={VendorForgotPassword} />
      <Route path="/admin/forgot-password" component={ForgotPassword} />
      <Route path="/terms" component={AuthTerms} />
      
      {/* Employee Routes */}
      <Route path="/employee/mode-selection" component={ModeSelection} />
      <Route path="/employee/home">
        <EmployeeLayout><EmployeeHome /></EmployeeLayout>
      </Route>
      <Route path="/employee/menu">
        <EmployeeLayout><EmployeeMenu /></EmployeeLayout>
      </Route>
      <Route path="/employee/orders">
        <EmployeeLayout><EmployeeOrders /></EmployeeLayout>
      </Route>
      <Route path="/employee/profile">
        <EmployeeLayout><EmployeeProfile /></EmployeeLayout>
      </Route>
      <Route path="/employee/favorites">
        <EmployeeLayout><EmployeeFavorites /></EmployeeLayout>
      </Route>
      <Route path="/employee/cart">
        <EmployeeLayout><EmployeeCart /></EmployeeLayout>
      </Route>
      <Route path="/employee/checkout">
        <EmployeeLayout><EmployeeCheckout /></EmployeeLayout>
      </Route>
      <Route path="/employee/meal-pass">
        <EmployeeLayout><MealPass /></EmployeeLayout>
      </Route>
      <Route path="/employee/meal-authorization">
        <EmployeeLayout><MealAuthorization /></EmployeeLayout>
      </Route>
      <Route path="/employee/usage">
        <EmployeeLayout><EmployeeUsage /></EmployeeLayout>
      </Route>
      <Route path="/employee/terms">
        <EmployeeLayout><EmployeeTerms /></EmployeeLayout>
      </Route>

      {/* Vendor Routes */}
      <Route path="/vendor/dashboard">
        <VendorLayout><VendorDashboard /></VendorLayout>
      </Route>
      <Route path="/vendor/orders">
        <VendorLayout><VendorOrders /></VendorLayout>
      </Route>
      <Route path="/vendor/food-items">
        <VendorLayout><VendorFoodItems /></VendorLayout>
      </Route>
      <Route path="/vendor/add-food">
        <VendorLayout><VendorAddFood /></VendorLayout>
      </Route>
      <Route path="/vendor/edit-food/:id">
        <VendorLayout><VendorEditFood /></VendorLayout>
      </Route>
      <Route path="/vendor/reports">
        <VendorLayout><VendorReports /></VendorLayout>
      </Route>
      <Route path="/vendor/ticket-data">
        <VendorLayout><VendorTicketData /></VendorLayout>
      </Route>
      <Route path="/vendor/terms">
        <VendorLayout><VendorTerms /></VendorLayout>
      </Route>
      <Route path="/vendor/profile">
        <VendorLayout><VendorProfile /></VendorLayout>
      </Route>

      {/* Admin Routes */}
      <Route path="/admin/dashboard">
        <AdminLayout><AdminDashboard /></AdminLayout>
      </Route>
      <Route path="/admin/vendor-performance">
        <AdminLayout><AdminVendorPerformance /></AdminLayout>
      </Route>
      <Route path="/admin/vendors">
        <AdminLayout><AdminVendors /></AdminLayout>
      </Route>
      <Route path="/admin/menu-management">
        <AdminLayout><AdminMenuManagement /></AdminLayout>
      </Route>
      <Route path="/admin/food-items">
        <AdminLayout><AdminFoodItems /></AdminLayout>
      </Route>
      <Route path="/admin/upload-ticket-data">
        <AdminLayout><AdminUploadTicketData /></AdminLayout>
      </Route>
      <Route path="/admin/add-food">
        <AdminLayout><AdminAddFood /></AdminLayout>
      </Route>
      <Route path="/admin/edit-food/:id">
        <AdminLayout><AdminEditFood /></AdminLayout>
      </Route>
      <Route path="/admin/terms">
        <AdminLayout><AdminTerms /></AdminLayout>
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </AppProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

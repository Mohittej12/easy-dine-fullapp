import { Link, useLocation } from "wouter";
import { useAppState } from "@/hooks/use-app-state";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PieChart, Heart, Lock, FileText, HelpCircle, LogOut, ChevronRight } from "lucide-react";

export default function EmployeeProfile() {
  const [, setLocation] = useLocation();
  const { employee, setRole } = useAppState();

  const handleLogout = () => {
    setRole(null);
    setLocation("/login");
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="text-center pt-4 pb-2">
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-border flex items-center gap-4">
        <Avatar className="w-20 h-20 border-2 border-primary/20">
          <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
            {employee.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-foreground truncate">{employee.name}</h2>
          <p className="text-sm text-muted-foreground truncate">{employee.email}</p>
          <div className="inline-block bg-muted px-2.5 py-1 rounded-full text-xs font-semibold text-muted-foreground mt-2">
            ID: {employee.employeeId}
          </div>
        </div>
      </div>

      {/* Account Items */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-muted-foreground px-2 uppercase tracking-wider">Account</h3>
        <div className="bg-white rounded-[24px] overflow-hidden border border-border shadow-sm">
          <Link href="/employee/usage">
            <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                  <PieChart className="w-5 h-5" />
                </div>
                <span className="font-semibold text-foreground">My Usage</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Link>
          <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <span className="font-semibold text-foreground">Favorites</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <Lock className="w-5 h-5" />
              </div>
              <span className="font-semibold text-foreground">Change Password</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-muted-foreground px-2 uppercase tracking-wider">Settings</h3>
        <div className="bg-white rounded-[24px] overflow-hidden border border-border shadow-sm">
          <Link href="/employee/terms">
            <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted text-muted-foreground rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="font-semibold text-foreground">Terms & Disclaimer</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </Link>
          <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-muted text-muted-foreground rounded-xl flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <span className="font-semibold text-foreground">Help & Support</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>

      <button 
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-[24px] font-bold hover:bg-red-100 transition-colors"
      >
        <LogOut className="w-5 h-5" />
        Log Out
      </button>
    </div>
  );
}
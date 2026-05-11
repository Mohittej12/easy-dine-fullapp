import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useAppState } from "@/hooks/use-app-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const { setRole } = useAppState();
  const [activeRole, setActiveRole] = useState<"employee" | "vendor" | "admin">("employee");
  const [isLoading, setIsLoading] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Splash screen effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if ((activeRole === "employee" || activeRole === "admin") && !email.endsWith("@prodapt.com")) {
      setError("Email address must be a @prodapt.com format.");
      return;
    }
    if (password.length < 8 || !/[A-Z]/.test(password)) {
      setError("Password must be at least 8 characters and contain a capital letter.");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call for login
    setTimeout(() => {
      setRole(activeRole);
      if (activeRole === "employee") setLocation("/employee/mode-selection");
      if (activeRole === "vendor") setLocation("/vendor/dashboard");
      if (activeRole === "admin") setLocation("/admin/dashboard");
    }, 800);
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-white"
            exit={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="flex flex-col items-center">
               <motion.div 
                 initial={{ scale: 0.5, opacity: 0, y: 20 }}
                 animate={{ scale: 1, opacity: 1, y: 0 }}
                 transition={{ type: "spring", stiffness: 200, damping: 20, duration: 0.8 }}
                 className="flex flex-col items-center"
               >
                 <div className="flex items-end mb-1">
                    <span className="text-5xl font-bold text-[#E31837] tracking-tighter leading-none">Prodapt</span>
                    <div className="w-0 h-0 border-l-[12px] border-l-transparent border-t-[16px] border-t-[#E31837] ml-1 mb-[2px]"></div>
                 </div>
                 <motion.span 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.5, duration: 0.8 }}
                   className="text-3xl font-bold text-black tracking-tight leading-none mt-1"
                 >
                   Easy Dine
                 </motion.span>
               </motion.div>
                <motion.div 
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.8, ease: "anticipate" }}
                  className="h-1 w-16 bg-[#E31837] mt-6 rounded-full"
                />
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="mt-8 text-center"
                >
                  <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-1">Developed by</p>
                  <p className="text-[12px] font-black text-black tracking-tight">
                    Gowrabathuni Mohit Tej • Varshini P R • Devika J
                  </p>
                </motion.div>
             </div>
           </motion.div>
        )}
      </AnimatePresence>

      <div className="min-h-[100dvh] bg-black relative flex flex-col items-center justify-end md:justify-center overflow-hidden">
        {/* Full-screen Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/background-cafeteria.png" 
            alt="Modern Cafeteria Background" 
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Login Card */}
        <div className="relative z-10 w-full md:w-auto px-0 md:px-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
            className="bg-white/90 backdrop-blur-2xl border-t border-white/60 md:border md:rounded-[32px] w-full rounded-t-[32px] md:max-w-[420px] shadow-2xl overflow-hidden px-6 pt-10 pb-8 flex flex-col min-h-[65vh] md:min-h-0"
          >
            {/* Logo area */}
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-end mb-0.5">
                <span className="text-4xl font-bold text-[#E31837] tracking-tighter leading-none">Prodapt</span>
                <div className="w-0 h-0 border-l-[10px] border-l-transparent border-t-[14px] border-t-[#E31837] ml-1 mb-[2px]"></div>
              </div>
              <span className="text-2xl font-bold text-black tracking-tight leading-none mt-1">Easy Dine</span>
              
              <div className="mt-4 mb-2 w-full max-w-[320px] bg-gray-100/80 p-1 rounded-lg flex relative">
                <motion.div 
                  className="absolute top-1 bottom-1 w-[33.33%] bg-white rounded-md shadow-sm border border-gray-200"
                  animate={{ 
                    x: activeRole === 'employee' ? '0%' : activeRole === 'admin' ? '100%' : '200%' 
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <button 
                  type="button"
                  onClick={() => setActiveRole('employee')}
                  className={`flex-1 py-1.5 text-[13px] font-semibold z-10 transition-colors ${activeRole === 'employee' ? 'text-black' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Employee
                </button>
                <button 
                  type="button"
                  onClick={() => setActiveRole('admin')}
                  className={`flex-1 py-1.5 text-[13px] font-semibold z-10 transition-colors ${activeRole === 'admin' ? 'text-black' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Admin
                </button>
                <button 
                  type="button"
                  onClick={() => setActiveRole('vendor')}
                  className={`flex-1 py-1.5 text-[13px] font-semibold z-10 transition-colors ${activeRole === 'vendor' ? 'text-black' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Vendor
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4 flex-1 w-full max-w-[320px] mx-auto">
              {error && (
                <div className="bg-red-50 text-[#FF3B30] text-xs font-medium p-3 rounded-md border border-red-100">
                  {error}
                </div>
              )}
              <div className="space-y-3">
                {activeRole === 'vendor' ? (
                  <Input 
                    id="phone" 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    required 
                    className="h-12 rounded-sm bg-white/70 border-gray-200 text-sm focus-visible:ring-[#FF3B30] focus-visible:border-[#FF3B30] placeholder:text-gray-400"
                  />
                ) : (
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@prodapt.com"
                    required 
                    className="h-12 rounded-sm bg-white/70 border-gray-200 text-sm focus-visible:ring-[#FF3B30] focus-visible:border-[#FF3B30] placeholder:text-gray-400"
                  />
                )}
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" 
                    required 
                    className="h-12 rounded-sm bg-white/70 border-gray-200 text-sm focus-visible:ring-[#FF3B30] focus-visible:border-[#FF3B30] placeholder:text-gray-400 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-[#FF3B30] hover:bg-[#E31837] text-white text-base font-bold mt-6 shadow-[0_4px_14px_0_rgba(255,59,48,0.39)] transition-all disabled:opacity-70"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>

              <div className="flex items-start space-x-2 mt-4 px-1">
                <Checkbox 
                  id="terms" 
                  required 
                  className="mt-0.5 border-gray-400 rounded-sm data-[state=checked]:bg-[#FF3B30] data-[state=checked]:border-[#FF3B30]" 
                />
                <label htmlFor="terms" className="text-[13px] font-medium leading-tight text-black">
                  I agree to the <Link href="/terms"><span className="text-[#FF7A00] hover:underline cursor-pointer">Terms of Service</span></Link> and <Link href="/terms"><span className="text-[#FF7A00] hover:underline cursor-pointer">Disclaimer</span></Link>
                </label>
              </div>

              {/* Links */}
              <div className="mt-4 space-y-4 w-full flex flex-col items-center pb-2">
                {activeRole === 'employee' && (
                  <p className="text-[14px] text-gray-600 text-center">
                    New here? <Link href="/employee/register"><span className="text-[#FF3B30] font-bold hover:underline cursor-pointer">Create account</span></Link>
                  </p>
                )}

                <div className="pt-2">
                  <Link href={activeRole === 'vendor' ? "/vendor/forgot-password" : activeRole === 'admin' ? "/admin/forgot-password" : "/employee/forgot-password"}>
                    <span className="text-[13px] font-bold text-[#FF7A00] hover:underline cursor-pointer">
                      Forgot Password?
                    </span>
                  </Link>
                </div>
              </div>

              {/* Credits Section */}
              <div className="mt-8 pb-2 text-center border-t border-gray-100 pt-6">
                <p className="text-[9px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-1.5">Developed by</p>
                <p className="text-[11px] font-black text-slate-800 tracking-tight">
                  Gowrabathuni Mohit Tej • Varshini P R • Devika J
                </p>
              </div>
            </form>
          </motion.div>
      </div>
    </>
  );
}
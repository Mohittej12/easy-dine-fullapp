import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, User, Hash, Tag, Lock } from "lucide-react";

export default function Register() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  // Form State
  const [employeeId, setEmployeeId] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState("");
  const [costCode, setCostCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validations
    if (!employeeId || !employeeName || !email || !program || !costCode || !password || !confirmPassword) {
      setError("All fields are mandatory.");
      return;
    }
    if (!email.endsWith("@prodapt.com")) {
      setError("Email address must be a @prodapt.com format.");
      return;
    }
    if (password.length < 8 || !/[A-Z]/.test(password)) {
      setError("Password must be at least 8 characters and contain a capital letter.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreed) {
      setError("You must agree to the Terms of Service and Disclaimer.");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call for registration
    setTimeout(() => {
      setIsLoading(false);
      setLocation("/employee/verify-email");
    }, 1000);
  };

  return (
    <>
      <div className="min-h-[100dvh] bg-black relative flex flex-col items-center justify-center py-6 md:py-12 overflow-x-hidden">
        {/* Full-screen Background Image */}
        <div className="fixed inset-0 z-0">
          <img 
            src="/background-cafeteria.png" 
            alt="Modern Cafeteria Background" 
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>

        {/* Form Container */}
        <div className="w-full max-w-[400px] z-10 px-4">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="w-full bg-white/95 backdrop-blur-2xl rounded-3xl p-6 md:p-8 shadow-2xl relative"
          >
            {/* Logo area */}
            <div className="flex flex-col items-center mb-6">
              <div className="flex items-end mb-1">
                <span className="text-4xl font-bold text-[#E31837] tracking-tighter leading-none">Prodapt</span>
                <div className="w-0 h-0 border-l-[10px] border-l-transparent border-t-[14px] border-t-[#E31837] ml-1 mb-[2px]"></div>
              </div>
              <span className="text-2xl font-bold text-black tracking-tight leading-none mt-1">Easy Dine</span>
              
              <div className="mt-4 flex items-center w-full max-w-[320px]">
                <div className="h-[1px] flex-1 bg-gray-200"></div>
                <span className="px-3 text-[13px] font-semibold text-black tracking-wide">
                  Create your account to get started
                </span>
                <div className="h-[1px] flex-1 bg-gray-200"></div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleRegister} className="space-y-4 w-full max-w-[320px] mx-auto">
              {error && (
                <div className="bg-red-50 text-[#FF3B30] text-xs font-medium p-3 rounded-md border border-red-100">
                  {error}
                </div>
              )}
              <div className="space-y-3">
                
                <div className="relative">
                  <Input 
                    id="employeeId" 
                    type="text" 
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    placeholder="Employee id"
                    required 
                    className="h-[46px] rounded-sm bg-white/80 border-gray-200 text-sm focus-visible:ring-[#FF3B30] focus-visible:border-[#FF3B30] placeholder:text-gray-400 pl-10"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>

                <div className="relative">
                  <Input 
                    id="employeeName" 
                    type="text" 
                    value={employeeName}
                    onChange={(e) => setEmployeeName(e.target.value)}
                    placeholder="Employee Name"
                    required 
                    className="h-[46px] rounded-sm bg-white/80 border-gray-200 text-sm focus-visible:ring-[#FF3B30] focus-visible:border-[#FF3B30] placeholder:text-gray-400 pl-10"
                  />
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>

                <div className="relative">
                  <Input 
                    id="email" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required 
                    className="h-[46px] rounded-sm bg-white/80 border-gray-200 text-sm focus-visible:ring-[#FF3B30] focus-visible:border-[#FF3B30] placeholder:text-gray-400 pl-10"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>

                <div className="relative">
                  <Input 
                    id="program" 
                    type="text" 
                    value={program}
                    onChange={(e) => setProgram(e.target.value)}
                    placeholder="Program"
                    required 
                    className="h-[46px] rounded-sm bg-white/80 border-gray-200 text-sm focus-visible:ring-[#FF3B30] focus-visible:border-[#FF3B30] placeholder:text-gray-400 pl-10"
                  />
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>

                <div className="relative">
                  <Input 
                    id="costCode" 
                    type="text" 
                    value={costCode}
                    onChange={(e) => setCostCode(e.target.value)}
                    placeholder="Cost Code"
                    required 
                    className="h-[46px] rounded-sm bg-white/80 border-gray-200 text-sm focus-visible:ring-[#FF3B30] focus-visible:border-[#FF3B30] placeholder:text-gray-400 pl-10"
                  />
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>

                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password" 
                    required 
                    className="h-[46px] rounded-sm bg-white/80 border-gray-200 text-sm focus-visible:ring-[#FF3B30] focus-visible:border-[#FF3B30] placeholder:text-gray-400 pl-10 pr-10"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                <div className="relative">
                  <Input 
                    id="confirmPassword" 
                    type={showConfirmPassword ? "text" : "password"} 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password" 
                    required 
                    className="h-[46px] rounded-sm bg-white/80 border-gray-200 text-sm focus-visible:ring-[#FF3B30] focus-visible:border-[#FF3B30] placeholder:text-gray-400 pl-10 pr-10"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start space-x-2 mt-4 px-1 pt-2">
                <Checkbox 
                  id="terms" 
                  required
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked as boolean)}
                  className="mt-0.5 border-gray-400 rounded-sm data-[state=checked]:bg-[#FF3B30] data-[state=checked]:border-[#FF3B30]" 
                />
                <label htmlFor="terms" className="text-[13px] font-medium leading-tight text-black">
                  I agree to the <Link href="/employee/terms"><span className="text-[#FF7A00] hover:underline cursor-pointer">Terms of Service</span></Link> and <Link href="/employee/terms"><span className="text-[#FF7A00] hover:underline cursor-pointer">Disclaimer</span></Link>
                </label>
              </div>

              {/* Links */}
              <div className="mt-4 pt-2 w-full flex flex-col items-center">
                <p className="text-[13px] text-gray-600 text-center mb-1">
                  Already have an account? <Link href="/login"><span className="text-[#FF7A00] font-bold hover:underline cursor-pointer">Sign In</span></Link>
                </p>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 rounded-xl bg-[#FF3B30] hover:bg-[#E31837] text-white text-base font-bold mt-4 shadow-[0_4px_14px_0_rgba(255,59,48,0.39)] transition-all disabled:opacity-70"
              >
                {isLoading ? "Creating..." : "Create Account"}
              </Button>
            </form>

          </motion.div>
        </div>
      </div>
    </>
  );
}
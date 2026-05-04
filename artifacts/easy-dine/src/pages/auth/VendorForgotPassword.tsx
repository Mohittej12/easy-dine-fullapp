import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Phone } from "lucide-react";

export default function VendorForgotPassword() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 800);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 800);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // After reset, navigate back to login
      setLocation("/login");
    }, 800);
  };

  return (
    <>
      <div className="min-h-[100dvh] bg-black relative flex flex-col items-center justify-end md:justify-center overflow-hidden">
        {/* Full-screen Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/background-cafeteria.png" 
            alt="Modern Cafeteria Background" 
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay for readability */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>

        {/* Form Container */}
        <div className="w-full max-w-[400px] z-10 px-4 pb-8 md:pb-0">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="w-full bg-white/95 backdrop-blur-2xl rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
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
                <span className="px-3 text-[15px] font-extrabold text-[#1a202c] tracking-tight">
                  Forgot Password?
                </span>
                <div className="h-[1px] flex-1 bg-gray-200"></div>
              </div>
            </div>

            <div className="text-center mb-6 px-2">
              <p className="text-[13px] text-gray-600 leading-snug">
                {step === 1 && "Enter your phone number to reset your password"}
                {step === 2 && "Enter the 6-digit OTP sent to your phone"}
                {step === 3 && "Create a new password for your account"}
              </p>
            </div>

            <div className="relative min-h-[220px]">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.form 
                    key="step1"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleSendOtp} 
                    className="space-y-4 w-full max-w-[320px] mx-auto absolute inset-0"
                  >
                    <div className="space-y-1">
                      <div className="relative">
                        <Input 
                          id="phone" 
                          type="tel" 
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 8888888888"
                          required 
                          className="h-12 rounded-sm bg-white/80 border-gray-200 text-sm focus-visible:ring-[#FF3B30] focus-visible:border-[#FF3B30] placeholder:text-gray-400 pl-10"
                        />
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full h-12 rounded-xl bg-[#FF3B30] hover:bg-[#E31837] text-white text-base font-bold mt-6 shadow-[0_4px_14px_0_rgba(255,59,48,0.39)] transition-all disabled:opacity-70"
                    >
                      {isLoading ? "Sending..." : "Send Reset OTP"}
                    </Button>
                  </motion.form>
                )}

                {step === 2 && (
                  <motion.form 
                    key="step2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleVerifyOtp} 
                    className="space-y-4 w-full max-w-[320px] mx-auto absolute inset-0"
                  >
                    <div className="space-y-1">
                      <label className="text-[12px] font-semibold text-gray-700 ml-1">Enter OTP</label>
                      <Input 
                        id="otp" 
                        type="text" 
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="6-digit code"
                        required 
                        className="h-12 rounded-sm bg-white/80 border-gray-200 text-sm focus-visible:ring-[#FF3B30] focus-visible:border-[#FF3B30] placeholder:text-gray-300 text-center tracking-[0.5em] font-mono text-lg"
                        maxLength={6}
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full h-12 rounded-xl bg-[#FF3B30] hover:bg-[#E31837] text-white text-base font-bold mt-6 shadow-[0_4px_14px_0_rgba(255,59,48,0.39)] transition-all disabled:opacity-70"
                    >
                      {isLoading ? "Verifying..." : "Verify OTP"}
                    </Button>
                  </motion.form>
                )}

                {step === 3 && (
                  <motion.form 
                    key="step3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    onSubmit={handleResetPassword} 
                    className="space-y-4 w-full max-w-[320px] mx-auto absolute inset-0"
                  >
                    <div className="space-y-3">
                      <div className="relative">
                        <Input 
                          id="newPassword" 
                          type={showPassword1 ? "text" : "password"} 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="New Password" 
                          required 
                          className="h-12 rounded-sm bg-white/80 border-gray-200 text-sm focus-visible:ring-[#FF3B30] focus-visible:border-[#FF3B30] placeholder:text-gray-400 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword1(!showPassword1)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                          {showPassword1 ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      <div className="relative">
                        <Input 
                          id="confirmPassword" 
                          type={showPassword2 ? "text" : "password"} 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Confirm New Password" 
                          required 
                          className="h-12 rounded-sm bg-white/80 border-gray-200 text-sm focus-visible:ring-[#FF3B30] focus-visible:border-[#FF3B30] placeholder:text-gray-400 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword2(!showPassword2)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                          {showPassword2 ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full h-12 rounded-xl bg-[#FF3B30] hover:bg-[#E31837] text-white text-base font-bold mt-6 shadow-[0_4px_14px_0_rgba(255,59,48,0.39)] transition-all disabled:opacity-70"
                    >
                      {isLoading ? "Saving..." : "Sign In"}
                    </Button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            {/* Links */}
            <div className="mt-8 pt-4 border-t border-gray-200 w-full flex flex-col items-center">
              <p className="text-[13px] text-gray-600 text-center mb-1">
                Remember your password?
              </p>
              <Link href="/login">
                <span className="text-[15px] font-bold text-[#E31837] hover:underline cursor-pointer">
                  Sign In
                </span>
              </Link>
            </div>

          </motion.div>
        </div>
      </div>
    </>
  );
}

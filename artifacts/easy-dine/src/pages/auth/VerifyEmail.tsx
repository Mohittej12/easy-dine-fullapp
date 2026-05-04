import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, AlertCircle, Mail } from "lucide-react";

export default function VerifyEmail() {
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Auto focus previous input on backspace
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API verification
    setTimeout(() => {
      setIsLoading(false);
      setLocation("/login");
    }, 1000);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
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
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        </div>

        {/* Card Container */}
        <div className="w-full max-w-[400px] z-10 px-4">
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
            className="w-full bg-white/95 backdrop-blur-2xl rounded-3xl p-6 md:p-8 shadow-2xl relative"
          >
            {/* Back button & Logo */}
            <div className="relative mb-8 mt-2 flex items-center justify-center">
              <button 
                onClick={() => window.history.back()}
                className="absolute left-0 top-1/2 -translate-y-1/2 text-[#1a202c] hover:text-black transition-colors"
              >
                <ArrowLeft className="w-6 h-6" strokeWidth={2.5} />
              </button>
              
              <div className="flex items-end">
                <span className="text-3xl font-bold text-[#1a202c] tracking-tighter leading-none">Easy Dine</span>
              </div>
            </div>

            {/* Header Content */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-[#1a202c] tracking-tight mb-2">
                Verify Your Email
              </h1>
              <p className="text-[14px] text-gray-700 leading-relaxed">
                We've sent a 6-digit code to<br />
                <span className="text-[#FF7A00] font-medium">user@prodapt.com</span>
              </p>
            </div>

            {/* OTP Form */}
            <form onSubmit={handleVerify} className="w-full max-w-[320px] mx-auto flex flex-col items-center">
              
              {/* OTP Inputs */}
              <div className="flex justify-between w-full mb-6">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-[45px] h-[55px] text-center text-xl font-bold rounded-xl border border-gray-200 bg-white shadow-sm focus-visible:ring-2 focus-visible:ring-[#FF3B30] focus-visible:border-[#FF3B30] p-0"
                    maxLength={1}
                  />
                ))}
              </div>

              {/* Timer & Resend */}
              <div className="text-center mb-8">
                <p className="text-[13px] text-gray-800 font-medium mb-2">
                  Code expires in <span className="text-[#FF7A00] font-bold">{formatTime(timeLeft)}</span>
                </p>
                <button 
                  type="button" 
                  onClick={() => setTimeLeft(30)}
                  className="text-[14px] text-[#FF7A00] font-medium hover:underline"
                >
                  Resend Code
                </button>
              </div>

              {/* Verify Button */}
              <Button 
                type="submit" 
                disabled={isLoading || otp.some(d => d === "")}
                className="w-full h-14 rounded-xl bg-[#FF3B30] hover:bg-[#E31837] text-white text-[16px] font-bold shadow-[0_4px_14px_0_rgba(255,59,48,0.39)] transition-all disabled:opacity-70 disabled:shadow-none"
              >
                {isLoading ? "Verifying..." : "Verify Email"}
              </Button>
            </form>

            {/* Wrong Email */}
            <div className="mt-6 text-center">
              <p className="text-[14px] text-gray-800 font-medium">
                Wrong email? <button onClick={() => window.history.back()} className="text-[#FF7A00] hover:underline">Change Email</button>
              </p>
            </div>

            {/* Footer Info */}
            <div className="mt-10 space-y-3 px-2">
              <div className="flex items-start space-x-3 text-gray-500">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-[12px] leading-tight font-medium">
                  Check your spam folder if you don't see the email
                </p>
              </div>
              <div className="flex items-center space-x-3 text-gray-500">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <p className="text-[12px] leading-tight font-medium">
                  The code is valid for 10 minutes
                </p>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </>
  );
}
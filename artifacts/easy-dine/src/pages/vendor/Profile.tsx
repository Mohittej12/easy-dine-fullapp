import { useState } from "react";
import { ArrowLeft, Edit2, ShieldCheck, HelpCircle, Headphones } from "lucide-react";
import { Link, useLocation } from "wouter";
import { VendorHamburgerMenu } from "@/components/VendorHamburgerMenu";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function VendorProfile() {
  const [, setLocation] = useLocation();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  
  return (
    <div className="flex flex-col min-h-[100dvh] relative overflow-x-hidden bg-black pb-8">
      
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/background-cafeteria.png" 
          alt="Cafeteria Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px]" />
      </div>

      <div className="z-10 relative flex flex-col min-h-full px-4 pt-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => setLocation("/vendor/dashboard")} className="p-2 bg-white/10 rounded-full text-white backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[20px] font-extrabold text-white drop-shadow-md">Vendor Panel</h1>
          <VendorHamburgerMenu />
        </div>

        {/* Profile Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-[32px] p-8 shadow-xl border border-white/20 mb-6 relative overflow-hidden flex flex-col items-center">
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#FF3B30]/10 to-transparent pointer-events-none" />
          
          <div className="w-24 h-24 bg-[#FF3B30] text-white rounded-[28px] flex items-center justify-center font-black text-4xl mb-4 shadow-lg shadow-red-500/30 rotate-3 transition-transform hover:rotate-6 cursor-pointer">
            M
          </div>
          
          <h2 className="text-[26px] font-black text-slate-800 tracking-tight leading-none mb-1 text-center">
            Meal Counter
          </h2>
          <p className="text-[16px] font-bold text-gray-500 mb-6 text-center">
            +91 98765 43210
          </p>
          
          <div className="w-full h-px bg-gray-100 my-2" />
          
          <div className="w-full grid grid-cols-2 gap-4 mt-4">
            <div className="text-center">
              <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wide">Status</p>
              <p className="text-[15px] font-extrabold text-green-600">Active</p>
            </div>
            <div className="text-center border-l border-gray-100">
              <p className="text-[12px] font-bold text-gray-500 uppercase tracking-wide">Role</p>
              <p className="text-[15px] font-extrabold text-slate-800">Vendor</p>
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="bg-white/95 backdrop-blur-xl rounded-[24px] shadow-sm border border-white/20 overflow-hidden">
          <div 
            onClick={() => setIsHelpOpen(true)}
            className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-slate-100 text-slate-700 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-[15px] text-slate-800">Help & Support</span>
            </div>
          </div>
        </div>
        
      </div>

      {/* Help & Support Dialog Modal */}
      <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
        <DialogContent className="sm:max-w-sm rounded-3xl p-8 text-center flex flex-col items-center border-0 shadow-2xl">
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4 border border-blue-100">
            <Headphones className="w-8 h-8" strokeWidth={2} />
          </div>
          <DialogTitle className="text-lg font-black text-slate-800 mb-2">Help & Support</DialogTitle>
          <p className="text-[14px] font-medium text-gray-500 leading-snug mb-6">
            Vendor portal will be handled by the admin only. Any issues facing kindly contact the admin.
          </p>
          <button 
            onClick={() => setIsHelpOpen(false)}
            className="w-full bg-slate-800 text-white py-3.5 rounded-xl font-bold text-[14px] hover:bg-black transition-colors"
          >
            Understood
          </button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

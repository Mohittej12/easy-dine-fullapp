import { ArrowLeft, FileText, User, UserCog, Store, AlertTriangle, HeadphonesIcon, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";

interface TermsAndDisclaimerProps {
  backHref: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

interface TermsAndDisclaimerProps {
  backHref: string;
}

export function TermsAndDisclaimer({ backHref }: TermsAndDisclaimerProps) {
  return (
    <div className="flex flex-col min-h-[100dvh] relative overflow-x-hidden">
      
      {/* Full-screen Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/background-cafeteria.png" 
          alt="Cafeteria Background" 
          className="w-full h-full object-cover"
        />
        {/* Rich dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90 backdrop-blur-[8px]" />
      </div>

      <div className="z-10 relative flex flex-col min-h-full max-w-md w-full mx-auto px-4 py-6 md:py-10 justify-center">
        
        <div className="bg-white/95 backdrop-blur-2xl rounded-[32px] shadow-2xl flex flex-col flex-1 md:flex-none border border-white/20 overflow-hidden relative">
          
          {/* Header Section */}
          <div className="px-5 pt-6 pb-4 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between sticky top-0 z-30">
            <Link href={backHref}>
              <button className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-center hover:bg-gray-100 hover:scale-105 transition-all active:scale-95 shadow-sm">
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
            </Link>
            <h1 className="text-[18px] font-black bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              Terms & Disclaimer
            </h1>
            <div className="w-10"></div> {/* Spacer */}
          </div>

          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="flex-1 px-5 pt-8 pb-12 overflow-y-auto"
          >
            
            {/* Main Title Card */}
            <motion.div variants={item} className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 rounded-[24px] border border-blue-100 p-6 text-center mb-8 shadow-sm overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl -mr-10 -mt-10" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-200/20 rounded-full blur-xl -ml-10 -mb-10" />
              
              <div className="relative w-14 h-14 bg-gradient-to-tr from-blue-600 to-purple-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/30 transform rotate-3">
                <FileText className="w-7 h-7" />
              </div>
              <h2 className="relative text-[20px] font-black text-slate-800 mb-2 tracking-tight">Terms of Service / Disclaimer</h2>
              <p className="relative text-[13px] font-medium text-slate-500 leading-relaxed max-w-[280px] mx-auto">
                Please read these terms carefully. They outline the responsibilities and guidelines for all platform users.
              </p>
            </motion.div>

            {/* For Users */}
            <motion.div variants={item} className="mb-6 bg-white rounded-[20px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-400 px-5 py-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 text-white shadow-inner">
                  <User className="w-5 h-5" />
                </div>
                <h3 className="text-[17px] font-extrabold text-white tracking-wide border-l border-white/20 pl-3">For Users</h3>
              </div>
              <div className="p-5 space-y-4">
                {[
                  "Orders are subject to item availability as provided by the vendor.",
                  "Food quality, taste, and preparation are the responsibility of the respective vendor.",
                  "Payments are processed securely through a payment gateway.",
                  "Users must collect their orders within the specified time. Unclaimed orders may not be served.",
                  "For any issues related to food or orders, users may contact the vendor or support team."
                ].map((text, i) => (
                  <div key={i} className={`flex gap-3.5 ${i !== 0 ? 'pt-4 border-t border-gray-50' : ''}`}>
                    <div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <p className="text-[14px] font-medium text-slate-600 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* For Admin */}
            <motion.div variants={item} className="mb-6 bg-white rounded-[20px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 px-5 py-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 text-white shadow-inner">
                  <UserCog className="w-5 h-5" />
                </div>
                <h3 className="text-[17px] font-extrabold text-white tracking-wide border-l border-white/20 pl-3">For Admin</h3>
              </div>
              <div className="p-5 space-y-4">
                {[
                  "This platform is intended for internal monitoring and management purposes.",
                  "Admins oversee system operations but are not responsible for vendor-specific issues such as food quality or order fulfillment."
                ].map((text, i) => (
                  <div key={i} className={`flex gap-3.5 ${i !== 0 ? 'pt-4 border-t border-gray-50' : ''}`}>
                    <div className="w-6 h-6 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <p className="text-[14px] font-medium text-slate-600 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* For Vendors */}
            <motion.div variants={item} className="mb-6 bg-white rounded-[20px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 px-5 py-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 text-white shadow-inner">
                  <Store className="w-5 h-5" />
                </div>
                <h3 className="text-[17px] font-extrabold text-white tracking-wide border-l border-white/20 pl-3">For Vendors</h3>
              </div>
              <div className="p-5 space-y-4">
                {[
                  "Vendors are responsible for maintaining accurate menu items, pricing, and available quantities.",
                  "Vendors must ensure timely preparation and fulfillment of all confirmed orders.",
                  "Food quality, hygiene, and service are the sole responsibility of the vendor.",
                  "Any issues related to order fulfillment, delays, or refunds must be handled by the vendor as per guidelines."
                ].map((text, i) => (
                  <div key={i} className={`flex gap-3.5 ${i !== 0 ? 'pt-4 border-t border-gray-50' : ''}`}>
                    <div className="w-6 h-6 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <p className="text-[14px] font-medium text-slate-600 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Disclaimer */}
            <motion.div variants={item} className="mb-10 bg-[#1e293b] rounded-[20px] border border-slate-700 shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-600/20 rounded-full blur-2xl -mr-10 -mt-10" />
              <div className="px-5 py-4 flex items-center gap-3 border-b border-slate-700/50 relative">
                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-600 text-slate-300 shadow-inner">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <h3 className="text-[17px] font-extrabold text-white tracking-wide border-l border-slate-600 pl-3">Disclaimer</h3>
              </div>
              <div className="p-5 relative">
                <p className="text-[14px] font-medium text-slate-300 leading-relaxed">
                  By using this platform, you acknowledge and agree to these terms. The platform acts as an intermediary and is not responsible for direct vendor-customer interactions.
                </p>
              </div>
            </motion.div>

            {/* Need Help Footer Box */}
            <motion.div variants={item} className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[24px] p-8 text-center text-white shadow-[0_8px_30px_rgba(59,130,246,0.3)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full blur-xl -ml-10 -mb-10 pointer-events-none" />
              
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 relative z-10 shadow-lg">
                <HeadphonesIcon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-[18px] font-black mb-2 relative z-10 tracking-tight">Need Help?</h3>
              <p className="text-[14px] font-medium text-blue-100 mb-6 max-w-[240px] mx-auto relative z-10 leading-relaxed">
                If you have any questions about these terms, please contact our support team.
              </p>
              <button className="w-full bg-white text-blue-600 font-extrabold py-3.5 rounded-xl shadow-lg hover:bg-gray-50 active:scale-[0.98] transition-all relative z-10 text-[15px]">
                Contact Support
              </button>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}

import { useAppState } from "@/hooks/use-app-state";
import { Link } from "wouter";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function AdminMenuManagement() {
  const { shops } = useAppState();

  return (
    <div className="flex flex-col min-h-[100dvh] relative overflow-x-hidden bg-[#1E1E1E]">
      
      {/* Full-screen Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/background-cafeteria.png" 
          alt="Cafeteria Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 backdrop-blur-[6px]" />
      </div>

      <div className="z-10 relative flex flex-col min-h-full px-4 pt-8 pb-20 max-w-lg w-full mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center justify-center mb-10 mt-4">
          <h1 className="text-[22px] font-extrabold text-white tracking-tight drop-shadow-md mb-2">Menu Management</h1>
          <p className="text-[14px] font-bold text-gray-400">Select Cafeteria</p>
        </div>

        {/* Cafeteria Cards List */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6"
        >
          {shops.map((shop) => (
            <Link key={shop.id} href={`/admin/food-items?shop=${shop.id}`}>
              <motion.div 
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-xl rounded-[28px] p-6 shadow-xl border border-white/20 hover:bg-white/15 transition-all cursor-pointer group hover:scale-[1.02] active:scale-[0.98]"
              >
                {/* Card Header */}
                <div className="flex items-center gap-4 mb-6">
                  {/* Pinkish Icon Bubble */}
                  <div className="w-12 h-12 rounded-[14px] bg-rose-500/20 text-rose-400 flex items-center justify-center font-black text-xl shrink-0 border border-rose-500/30 shadow-inner">
                    R
                  </div>
                  <div className="flex flex-col">
                    <h2 className="font-extrabold text-[18px] text-white tracking-tight">{shop.name}</h2>
                    <div className="flex items-center gap-1.5 mt-1">
                      <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                      <span className="text-[12px] font-bold text-green-400">Active</span>
                    </div>
                  </div>
                </div>

                {/* Nested Metrics Boxes */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-black/20 rounded-[16px] p-4 border border-white/5 flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Total Items</p>
                    <p className="font-black text-[24px] text-white leading-none">{shop.totalItems}</p>
                  </div>
                  <div className="bg-black/20 rounded-[16px] p-4 border border-white/5 flex flex-col justify-center">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Active Items</p>
                    <p className="font-black text-[24px] text-green-400 leading-none">{shop.activeItems}</p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
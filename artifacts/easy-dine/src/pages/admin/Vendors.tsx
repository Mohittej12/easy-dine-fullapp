import { useState } from "react";
import { useAppState } from "@/hooks/use-app-state";
import { 
  Store, 
  Plus, 
  Minus, 
  KeyRound, 
  Phone, 
  TrendingUp, 
  CreditCard, 
  Ticket, 
  X,
  AlertTriangle,
  RotateCcw,
  RefreshCw
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { AdminHamburgerMenu } from "@/components/AdminHamburgerMenu";

interface VendorStats {
  id: string;
  name: string;
  phone: string;
  totalOrders: number;
  revenue: number;
  payAndUse: number;
  ticketing: number;
}

export default function AdminVendors() {
  const { shops } = useAppState();
  
  const [vendors, setVendors] = useState<VendorStats[]>(
    shops.map(s => ({
      id: s.id,
      name: s.name,
      phone: "+91 98765 43210",
      totalOrders: s.orders,
      revenue: s.revenue,
      payAndUse: Math.floor(s.orders * 0.6),
      ticketing: Math.floor(s.orders * 0.4)
    }))
  );

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  
  const [vendorToRemove, setVendorToRemove] = useState<VendorStats | null>(null);
  const [vendorToReset, setVendorToReset] = useState<VendorStats | null>(null);
  
  const [newVendor, setNewVendor] = useState({ name: "", phone: "" });

  const handleAddVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVendor.name || !newVendor.phone) return;

    const added: VendorStats = {
      id: `shop_${Date.now()}`,
      name: newVendor.name,
      phone: newVendor.phone,
      totalOrders: 0,
      revenue: 0,
      payAndUse: 0,
      ticketing: 0
    };

    setVendors([...vendors, added]);
    setIsAddModalOpen(false);
    setNewVendor({ name: "", phone: "" });
    toast.success(`${added.name} added successfully!`);
  };

  const confirmRemove = () => {
    if (vendorToRemove) {
      setVendors(vendors.filter(v => v.id !== vendorToRemove.id));
      setIsRemoveModalOpen(false);
      setVendorToRemove(null);
      toast.success("Vendor removed successfully.");
    }
  };

  const confirmReset = () => {
    if (vendorToReset) {
      toast.success(`Account for ${vendorToReset.name} has been reset!`, {
        description: "Menu, history, and reports have been refreshed."
      });
      setIsResetModalOpen(false);
      setVendorToReset(null);
    }
  };

  return (
    <div className="flex flex-col min-h-[100dvh] relative overflow-x-hidden bg-black pb-24">
      
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/background-cafeteria.png" 
          alt="Cafeteria Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75 backdrop-blur-[4px]" />
      </div>

      <div className="z-10 relative flex flex-col min-h-full px-4 pt-6 max-w-5xl mx-auto w-full">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <AdminHamburgerMenu />
            <h1 className="text-[24px] font-black text-white drop-shadow-md">Vendors</h1>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="w-10 h-10 bg-white/10 text-white rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 hover:bg-white/20 active:scale-95 transition-all shadow-lg"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {vendors.map((vendor) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={vendor.id}
                className="bg-white/10 backdrop-blur-xl rounded-[32px] p-6 border border-white/20 shadow-2xl relative group overflow-hidden"
              >
                {/* Remove Button */}
                <button 
                  onClick={() => { setVendorToRemove(vendor); setIsRemoveModalOpen(true); }}
                  className="absolute top-4 right-4 w-8 h-8 bg-red-500/10 text-red-400 rounded-full flex items-center justify-center border border-red-500/20 hover:bg-red-500/20 transition-all opacity-0 group-hover:opacity-100"
                >
                  <Minus className="w-5 h-5" />
                </button>

                {/* Vendor Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-blue-600 rounded-[20px] flex items-center justify-center text-white shadow-lg">
                    <Store className="w-7 h-7" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[18px] font-black text-white truncate">{vendor.name}</h3>
                    <div className="flex items-center gap-1.5 text-gray-400 text-[13px] font-bold mt-0.5">
                      <Phone className="w-3.5 h-3.5" />
                      {vendor.phone}
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Total Orders</span>
                    </div>
                    <p className="text-[20px] font-black text-white">{vendor.totalOrders.toLocaleString()}</p>
                  </div>
                  
                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 text-blue-400 mb-1">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Revenue</span>
                    </div>
                    <p className="text-[20px] font-black text-blue-400">₹{vendor.revenue.toLocaleString()}</p>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <CreditCard className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Pay & Use</span>
                    </div>
                    <p className="text-[16px] font-black text-white">{vendor.payAndUse.toLocaleString()}</p>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <Ticket className="w-3.5 h-3.5" />
                      <span className="text-[10px] font-bold uppercase tracking-wider">Ticketing</span>
                    </div>
                    <p className="text-[16px] font-black text-white">{vendor.ticketing.toLocaleString()}</p>
                  </div>
                </div>

                {/* Reset Credentials Action */}
                <button 
                  onClick={() => { setVendorToReset(vendor); setIsResetModalOpen(true); }}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-4 rounded-2xl font-bold text-[14px] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <KeyRound className="w-4 h-4 text-amber-400" />
                  Reset Credentials
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>

      {/* Add Vendor Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.form 
              onSubmit={handleAddVendor}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[32px] w-full max-w-sm p-8 shadow-2xl overflow-hidden"
            >
              <div className="mb-6">
                <h2 className="text-[22px] font-black text-slate-800">Add Vendor</h2>
                <p className="text-gray-500 text-sm font-medium mt-1">Register a new cafeteria vendor account</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[12px] font-bold text-slate-600 mb-1.5 block ml-1 uppercase tracking-wider">Cafeteria Name</label>
                  <input 
                    autoFocus
                    required
                    type="text" 
                    value={newVendor.name}
                    onChange={(e) => setNewVendor({...newVendor, name: e.target.value})}
                    placeholder="e.g. South Indian Counter"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-[14px] font-bold text-slate-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all"
                  />
                </div>
                <div>
                  <label className="text-[12px] font-bold text-slate-600 mb-1.5 block ml-1 uppercase tracking-wider">Phone Number</label>
                  <input 
                    required
                    type="tel" 
                    value={newVendor.phone}
                    onChange={(e) => setNewVendor({...newVendor, phone: e.target.value})}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-[14px] font-bold text-slate-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-600/50 transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-8">
                <button 
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 bg-gray-100 text-slate-600 py-4 rounded-2xl font-bold text-[14px] active:scale-95 transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold text-[14px] shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
                >
                  Add Vendor
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>

      {/* Remove Vendor Modal */}
      <AnimatePresence>
        {isRemoveModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsRemoveModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[32px] w-full max-w-sm p-8 shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <AlertTriangle className="w-8 h-8" />
                </div>
                <h2 className="text-[20px] font-black text-slate-800">Remove Vendor?</h2>
                <p className="text-gray-500 text-[14px] font-medium mt-3 px-2">
                  Warning: if you click this the vendor <span className="font-bold text-slate-800">"{vendorToRemove?.name}"</span> will be removed from the system.
                </p>
              </div>

              <div className="flex gap-3 mt-8">
                <button 
                  onClick={() => setIsRemoveModalOpen(false)}
                  className="flex-1 bg-gray-100 text-slate-600 py-4 rounded-2xl font-bold text-[14px] active:scale-95 transition-all"
                >
                  Go Back
                </button>
                <button 
                  onClick={confirmRemove}
                  className="flex-1 bg-red-600 text-white py-4 rounded-2xl font-bold text-[14px] shadow-lg shadow-red-600/20 active:scale-95 transition-all"
                >
                  Confirm to Remove
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reset Credentials Modal */}
      <AnimatePresence>
        {isResetModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsResetModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[32px] w-full max-w-sm p-8 shadow-2xl overflow-hidden"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-6 shadow-inner">
                  <RefreshCw className="w-8 h-8" />
                </div>
                <h2 className="text-[20px] font-black text-slate-800">Reset Account?</h2>
                <p className="text-gray-500 text-[14px] font-bold mt-4 px-4 leading-relaxed">
                  "Your menu and order history and reports will be refreshed and newly opened."
                </p>
                <p className="text-gray-400 text-[12px] font-medium mt-2">
                  This action for <span className="text-slate-700 font-bold">{vendorToReset?.name}</span> cannot be undone.
                </p>
              </div>

              <div className="flex flex-col gap-3 mt-8">
                <button 
                  onClick={confirmReset}
                  className="w-full bg-amber-500 text-white py-4 rounded-2xl font-black text-[15px] shadow-lg shadow-amber-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Click to Reset
                </button>
                <button 
                  onClick={() => setIsResetModalOpen(false)}
                  className="w-full bg-gray-100 text-slate-600 py-4 rounded-2xl font-bold text-[14px] active:scale-95 transition-all"
                >
                  Keep as it is
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
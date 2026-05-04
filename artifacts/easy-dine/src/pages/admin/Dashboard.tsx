import { useAppState } from "@/hooks/use-app-state";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";
import { Store, ShoppingBag, CheckCircle2, XCircle, TrendingUp, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const chartData = [
  { name: 'Mon', orders: 450 },
  { name: 'Tue', orders: 380 },
  { name: 'Wed', orders: 520 },
  { name: 'Thu', orders: 490 },
  { name: 'Fri', orders: 610 },
  { name: 'Sat', orders: 150 },
  { name: 'Sun', orders: 120 },
];

export default function AdminDashboard() {
  const { shops, orders } = useAppState();

  const totalOrders = orders.length * 12; // multiplied for mock scale
  const delivered = Math.floor(totalOrders * 0.92);
  const rejected = totalOrders - delivered;
  const revenue = 48500; // Mock total

  return (
    <div className="flex flex-col min-h-[100dvh] relative overflow-x-hidden bg-[#1E1E1E]">
      
      {/* Full-screen Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/background-cafeteria.png" 
          alt="Cafeteria Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[4px]" />
      </div>

      <div className="z-10 relative flex flex-col min-h-full px-4 pt-6 pb-20">
        
        {/* Header */}
        <div className="flex items-center justify-center mb-8 pl-12 pr-4">
          <h1 className="text-[20px] font-extrabold text-white tracking-tight drop-shadow-md">Dashboard</h1>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/10 backdrop-blur-xl rounded-[24px] p-5 border border-white/20 shadow-lg">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-3">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-white">{totalOrders}</h2>
              <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">Total Orders</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/10 backdrop-blur-xl rounded-[24px] p-5 border border-white/20 shadow-lg">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-3">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-white">{delivered}</h2>
              <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">Delivered</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/10 backdrop-blur-xl rounded-[24px] p-5 border border-white/20 shadow-lg">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mb-3">
                <XCircle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-white">{rejected}</h2>
              <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">Rejected</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[24px] p-5 border border-blue-500/30 shadow-xl shadow-blue-900/50">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-white/20 text-white rounded-full flex items-center justify-center mb-3 shadow-inner">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-black text-white">₹{revenue.toLocaleString()}</h2>
              <p className="text-xs font-bold text-blue-200 mt-1 uppercase tracking-wider">Total Revenue</p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Orders Chart */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="lg:col-span-2 bg-white/95 backdrop-blur-2xl rounded-[32px] p-6 shadow-xl border border-white/20">
            <h3 className="font-extrabold text-[18px] text-slate-800 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Weekly Orders Trend
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 600 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 13, fontWeight: 600 }} dx={-10} />
                  <RechartsTooltip 
                    cursor={{ fill: '#f1f5f9' }} 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', padding: '12px' }} 
                  />
                  <Bar dataKey="orders" fill="#3b82f6" radius={[6, 6, 0, 0]} maxBarSize={48} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Cafeteria Snapshots */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-[18px] text-white px-2 drop-shadow-md">Cafeteria Snapshots</h3>
            {shops.map((shop, idx) => (
              <motion.div 
                key={shop.id} 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 0.6 + (idx * 0.1) }}
                className="bg-white/95 backdrop-blur-xl rounded-[24px] p-5 shadow-lg border border-white/20 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -mr-16 -mt-16 transition-transform group-hover:scale-150" />
                
                <div className="flex items-center gap-4 border-b border-gray-100 pb-4 mb-4 relative z-10">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shadow-inner">
                    <Store className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[16px] text-slate-800">{shop.name}</h4>
                    <p className="text-[12px] font-bold text-gray-500 mt-0.5">{shop.activeItems} items online</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Orders</p>
                    <p className="font-black text-[18px] text-slate-800">{shop.orders}</p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
                    <p className="text-[11px] font-bold text-blue-500 uppercase tracking-wider mb-1">Revenue</p>
                    <p className="font-black text-[18px] text-blue-700">₹{shop.revenue}</p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-xl border border-green-100">
                    <p className="text-[11px] font-bold text-green-600 uppercase tracking-wider mb-1">Delivered</p>
                    <p className="font-black text-[18px] text-green-700">94%</p>
                  </div>
                  <div className="bg-red-50 p-3 rounded-xl border border-red-100">
                    <p className="text-[11px] font-bold text-red-500 uppercase tracking-wider mb-1">Rejected</p>
                    <p className="font-black text-[18px] text-red-600">6%</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
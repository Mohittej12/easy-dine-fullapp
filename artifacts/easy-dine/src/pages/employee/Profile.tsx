import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAppState } from "@/hooks/use-app-state";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LineChart, Heart, Key, ShieldCheck, Headphones, ChevronRight, Pencil, X } from "lucide-react";
import { HamburgerMenu } from "@/components/HamburgerMenu";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function EmployeeProfile() {
  const [, setLocation] = useLocation();
  const { employee, setRole } = useAppState();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Editable Form State
  const [formData, setFormData] = useState({
    name: employee.name,
    email: employee.email,
    employeeId: employee.employeeId,
    program: employee.program || "Engineering",
    costCode: employee.costCode || "ENG-001"
  });

  const handleLogout = () => {
    setRole(null);
    setLocation("/login");
  };

  const handleSave = () => {
    // In a real app, you would dispatch a save to global state or API here
    setIsEditing(false);
    setIsEditModalOpen(false);
  };

  const openModal = () => {
    setIsEditing(false); // Reset to view mode initially
    setIsEditModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-[100dvh] relative overflow-hidden bg-black pb-12">

      {/* Full-screen Background Image with dark overlay */}
      <div className="fixed inset-0 z-0">
        <img
          src="/background-cafeteria.png"
          alt="Modern Cafeteria Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[4px]" />
      </div>

      <div className="z-10 relative flex flex-col h-full pt-6">

        {/* Header Section */}
        <div className="px-4 flex items-center justify-between mb-6">
          <div className="bg-white/95 px-3 py-1 rounded-sm shadow-sm border border-gray-200">
            <span className="text-[18px] font-extrabold text-black tracking-tight leading-none">Easy Dine</span>
          </div>
          <HamburgerMenu />
        </div>

        <div className="px-4 space-y-5">

          {/* Profile User Card */}
          <div className="bg-white/95 backdrop-blur-xl rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col items-center relative">

            {/* Pencil Edit Button */}
            <button
              onClick={openModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200 text-gray-500 hover:text-slate-800 transition-colors"
            >
              <Pencil className="w-4 h-4" />
            </button>

            <Avatar className="w-20 h-20 border-2 border-white shadow-md mb-4">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.name}`} />
              <AvatarFallback className="bg-red-50 text-red-600 text-2xl font-bold">
                {employee.name.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <h2 className="text-[20px] font-extrabold text-slate-800 leading-tight">User</h2>
            <div className="bg-gray-50 px-3 py-1 rounded-sm border border-gray-100 mt-2">
              <p className="text-[14px] font-medium text-gray-600">{formData.email}</p>
            </div>
          </div>

          {/* Account Section */}
          <div className="bg-white/95 backdrop-blur-xl rounded-[24px] overflow-hidden shadow-sm border border-gray-100">
            <div className="px-4 pt-5 pb-3">
              <h3 className="text-[16px] font-extrabold text-slate-800">Account</h3>
            </div>

            <div className="px-4 pb-4">
              <Link href="/employee/usage">
                <div className="flex items-center justify-between py-3 cursor-pointer group border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-50 text-[#FF3B30] rounded-xl flex items-center justify-center border border-red-100 group-hover:bg-[#FF3B30] group-hover:text-white transition-colors">
                      <LineChart className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-[15px] text-slate-800 block">My Usage</span>
                      <span className="text-[12px] text-gray-500 font-medium">View order history & analytics</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#FF3B30] transition-colors" />
                </div>
              </Link>

              <Link href="/employee/favorites">
                <div className="flex items-center justify-between py-3 cursor-pointer group border-b border-gray-100 mt-1">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-red-50 text-[#FF3B30] rounded-xl flex items-center justify-center border border-red-100 group-hover:bg-[#FF3B30] group-hover:text-white transition-colors">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-[15px] text-slate-800 block">Favorites</span>
                      <span className="text-[12px] text-gray-500 font-medium">Your saved meals & restaurants</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#FF3B30] transition-colors" />
                </div>
              </Link>

              <Link href="/employee/forgot-password">
                <div className="flex items-center justify-between py-3 cursor-pointer group mt-1">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 text-slate-600 rounded-xl flex items-center justify-center border border-gray-200 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                      <Key className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-[15px] text-slate-800 block">Forgot Password</span>
                      <span className="text-[12px] text-gray-500 font-medium">Update your credentials</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-slate-800 transition-colors" />
                </div>
              </Link>
            </div>
          </div>

          {/* Settings Section */}
          <div className="bg-white/95 backdrop-blur-xl rounded-[24px] overflow-hidden shadow-sm border border-gray-100">
            <div className="px-4 pt-5 pb-3">
              <h3 className="text-[16px] font-extrabold text-slate-800">Settings</h3>
            </div>

            <div className="px-4 pb-4">
              <Link href="/employee/terms">
                <div className="flex items-center justify-between py-3 cursor-pointer group border-b border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gray-100 text-slate-600 rounded-xl flex items-center justify-center border border-gray-200 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-bold text-[15px] text-slate-800 block">Terms and Disclaimer</span>
                      <span className="text-[12px] text-gray-500 font-medium">Manage your data & permissions</span>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-slate-800 transition-colors" />
                </div>
              </Link>

              <div
                onClick={() => setIsHelpOpen(true)}
                className="flex items-center justify-between py-3 cursor-pointer group mt-1"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 text-slate-600 rounded-xl flex items-center justify-center border border-gray-200 group-hover:bg-slate-800 group-hover:text-white transition-colors">
                    <Headphones className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-[15px] text-slate-800 block">Help & Support</span>
                    <span className="text-[12px] text-gray-500 font-medium">FAQs, contact us & feedback</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-slate-800 transition-colors" />
              </div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full mt-4 py-4 rounded-[20px] font-bold text-[15px] text-[#FF3B30] border-2 border-red-100 bg-red-50/50 hover:bg-red-50 hover:border-red-200 transition-all flex items-center justify-center"
          >
            Logout
          </button>

        </div>
      </div>

      {/* Edit Profile Dialog Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[400px] bg-white rounded-t-3xl sm:rounded-3xl p-0 overflow-hidden shadow-2xl border-0 h-[85vh] sm:h-auto flex flex-col fixed bottom-0 top-auto sm:top-1/2 sm:bottom-auto translate-y-0 translate-x-[-50%]">

          <div className="p-5 flex justify-between items-center border-b border-gray-100 bg-white sticky top-0 z-10">
            <h2 className="text-[18px] font-extrabold text-slate-800">My Profile Details</h2>
            <button
              onClick={() => setIsEditModalOpen(false)}
              className="p-2 bg-gray-100 rounded-full text-gray-500 hover:text-black hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-5 overflow-y-auto flex-1 space-y-4">

            <div className="space-y-1">
              <label className="text-[13px] font-bold text-slate-800">Employee Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                readOnly={!isEditing}
                className={`w-full border rounded-xl px-4 py-3 text-[14px] font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-red-100 ${isEditing ? 'border-gray-300 bg-white text-slate-800' : 'border-gray-100 bg-gray-50 text-gray-500'}`}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[13px] font-bold text-slate-800">Employee ID</label>
              <input
                type="text"
                value={formData.employeeId}
                onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                readOnly={!isEditing}
                className={`w-full border rounded-xl px-4 py-3 text-[14px] font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-red-100 ${isEditing ? 'border-gray-300 bg-white text-slate-800' : 'border-gray-100 bg-gray-50 text-gray-500'}`}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[13px] font-bold text-slate-800">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                readOnly={!isEditing}
                className={`w-full border rounded-xl px-4 py-3 text-[14px] font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-red-100 ${isEditing ? 'border-gray-300 bg-white text-slate-800' : 'border-gray-100 bg-gray-50 text-gray-500'}`}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[13px] font-bold text-slate-800">Program</label>
              <input
                type="text"
                value={formData.program}
                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                readOnly={!isEditing}
                className={`w-full border rounded-xl px-4 py-3 text-[14px] font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-red-100 ${isEditing ? 'border-gray-300 bg-white text-slate-800' : 'border-gray-100 bg-gray-50 text-gray-500'}`}
              />
            </div>

            <div className="space-y-1">
              <label className="text-[13px] font-bold text-slate-800">Cost Code</label>
              <input
                type="text"
                value={formData.costCode}
                onChange={(e) => setFormData({ ...formData, costCode: e.target.value })}
                readOnly={!isEditing}
                className={`w-full border rounded-xl px-4 py-3 text-[14px] font-bold shadow-sm focus:outline-none focus:ring-2 focus:ring-red-100 ${isEditing ? 'border-gray-300 bg-white text-slate-800' : 'border-gray-100 bg-gray-50 text-gray-500'}`}
              />
            </div>

          </div>

          <div className="p-5 border-t border-gray-100 bg-white sticky bottom-0 z-10 pb-10 sm:pb-5">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-[15px] shadow-lg hover:bg-black transition-colors"
              >
                Edit details
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="w-full bg-[#FF3B30] text-white py-4 rounded-xl font-bold text-[15px] shadow-lg shadow-red-500/30 hover:bg-[#E31837] transition-colors"
              >
                Save Changes
              </button>
            )}
          </div>

        </DialogContent>
      </Dialog>

      {/* Help & Support Dialog Modal */}
      <Dialog open={isHelpOpen} onOpenChange={setIsHelpOpen}>
        <DialogContent className="sm:max-w-sm rounded-3xl p-8 text-center flex flex-col items-center border-0 shadow-2xl">
          <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mb-4 border border-blue-100">
            <Headphones className="w-8 h-8" strokeWidth={2} />
          </div>
          <DialogTitle className="text-lg font-black text-slate-800 mb-2">Help & Support</DialogTitle>
          <p className="text-[14px] font-medium text-gray-500 leading-snug mb-6">
            Contact your support admin team and the developer for any improvements or complaints or any feedback. Thank you!
          </p>
          
          <div className="w-full pt-4 border-t border-gray-100 mb-6">
            <p className="text-[9px] font-bold text-gray-400 tracking-[0.2em] uppercase mb-1.5">Developed by</p>
            <p className="text-[11px] font-black text-slate-800 tracking-tight">
              Gowrabathuni Mohit Tej • Varshini P R • Devika J
            </p>
          </div>
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
import { useState, useEffect } from "react";
import { FileSpreadsheet, Download, Calendar } from "lucide-react";
import { VendorHamburgerMenu } from "@/components/VendorHamburgerMenu";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const MOCK_REPORTS = [
  { id: 1, date: "2024-01-15", displayDate: "January 15, 2024", time: "09:23 AM", colorClass: "bg-green-50 text-green-500" },
  { id: 2, date: "2024-01-14", displayDate: "January 14, 2024", time: "10:15 AM", colorClass: "bg-blue-50 text-blue-500" },
  { id: 3, date: "2024-01-13", displayDate: "January 13, 2024", time: "08:47 AM", colorClass: "bg-purple-50 text-purple-500" },
  { id: 4, date: "2024-01-12", displayDate: "January 12, 2024", time: "11:32 AM", colorClass: "bg-orange-50 text-orange-500" },
  { id: 5, date: "2024-01-11", displayDate: "January 11, 2024", time: "09:58 AM", colorClass: "bg-pink-50 text-pink-500" },
  { id: 6, date: "2024-01-10", displayDate: "January 10, 2024", time: "10:41 AM", colorClass: "bg-teal-50 text-teal-500" },
  { id: 7, date: "2024-01-09", displayDate: "January 09, 2024", time: "08:22 AM", colorClass: "bg-indigo-50 text-indigo-500" },
];

export default function VendorTicketData() {
  const [uploads, setUploads] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem('admin_ticket_uploads');
    if (stored) {
      setUploads(JSON.parse(stored));
    }
  }, []);

  const handleExport = (report: any) => {
    // Generate dummy CSV
    const csvContent = "data:text/csv;charset=utf-8,Ticket ID,Employee Name,Status\nTKT-001,John Doe,Valid\nTKT-002,Jane Smith,Valid";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${report.name.replace('.xlsx', '.csv')}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("File exported successfully!");
  };

  return (
    <div className="flex flex-col min-h-[100dvh] relative overflow-x-hidden">
      
      {/* Full-screen Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/background-cafeteria.png" 
          alt="Modern Cafeteria Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[4px]" />
      </div>

      <div className="z-10 relative flex flex-col min-h-full px-4 pt-10 pb-8">
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <VendorHamburgerMenu />
          <h1 className="text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="w-6 h-6" />
            Ticket Data
          </h1>
          <div className="w-10"></div> {/* Spacer for centering */}
        </div>

        <div className="bg-white/95 backdrop-blur-xl rounded-[24px] shadow-xl border border-white/20 overflow-hidden flex flex-col h-full flex-1">
          <div className="px-5 pt-6 pb-8 flex-1">
            {/* Titles */}
            <div className="text-center mb-8">
              <h2 className="text-[20px] font-black text-slate-800 tracking-tight">Daily Uploaded Ticket Data</h2>
              <p className="text-[13px] font-medium text-gray-500 mt-2">View and export ticket data uploaded each day</p>
            </div>

            {/* Date Selector */}
            <div className="mb-8">
              <label className="text-[13px] font-bold text-slate-700 mb-2 block">Select Date</label>
              <div className="relative">
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-[15px] font-bold text-slate-800 shadow-sm outline-none appearance-none cursor-pointer focus:border-[#8b5cf6]"
                />
                <Calendar className="w-5 h-5 text-gray-400 absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Reports List */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[16px] font-black text-slate-800">Uploaded Reports</h3>
                {selectedDate && (
                  <button 
                    onClick={() => setSelectedDate("")}
                    className="text-[12px] font-bold text-[#8b5cf6] hover:text-[#7c3aed]"
                  >
                    View All
                  </button>
                )}
              </div>

              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {uploads.map((report) => (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      key={report.id} 
                      className="bg-white border border-gray-100 rounded-[20px] p-4 shadow-sm"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                          report.status === 'Failed' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-500'
                        }`}>
                          <FileSpreadsheet className="w-6 h-6" strokeWidth={2.5} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-extrabold text-[15px] text-slate-800 truncate">{report.name}</h4>
                          <p className="text-[12px] font-medium text-gray-500 mt-0.5">Uploaded {report.time}</p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleExport(report)}
                        disabled={report.status === 'Failed'}
                        className={`w-full py-3.5 rounded-xl font-bold text-[14px] transition-colors flex items-center justify-center gap-2 shadow-md active:scale-[0.99] ${
                          report.status === 'Failed' 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed shadow-none' 
                            : 'bg-[#8b5cf6] hover:bg-[#7c3aed] text-white shadow-purple-500/20'
                        }`}
                      >
                        <Download className="w-4 h-4" /> Export File
                      </button>
                    </motion.div>
                  ))}
                  
                  {uploads.length === 0 && (
                    <motion.div 
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      className="text-center py-10 bg-gray-50 rounded-[20px] border border-dashed border-gray-200"
                    >
                      <p className="text-gray-500 font-bold">No ticket reports available yet.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
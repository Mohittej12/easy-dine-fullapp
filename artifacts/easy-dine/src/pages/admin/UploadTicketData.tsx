import { useState, useEffect } from "react";
import { 
  UploadCloud, 
  FileSpreadsheet, 
  CheckCircle2, 
  Info, 
  Eye, 
  ArrowUp, 
  Database,
  Download
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { AdminHamburgerMenu } from "@/components/AdminHamburgerMenu";

interface UploadedFile {
  id: string;
  name: string;
  records: number;
  time: string;
  status: 'Success' | 'Failed';
  type: 'xlsx' | 'csv';
}

const INITIAL_UPLOADS: UploadedFile[] = [
  { id: '1', name: "tickets_january_2024.xlsx", records: 1245, time: "2 hours ago", status: 'Success', type: 'xlsx' },
  { id: '2', name: "support_tickets_dec.csv", records: 892, time: "1 day ago", status: 'Success', type: 'csv' },
  { id: '3', name: "ticket_data_invalid.xlsx", records: 0, time: "3 days ago", status: 'Failed', type: 'xlsx' },
];

export default function AdminUploadTicketData() {
  const [uploads, setUploads] = useState<UploadedFile[]>([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('admin_ticket_uploads');
    if (stored) {
      setUploads(JSON.parse(stored));
    } else {
      setUploads(INITIAL_UPLOADS);
      localStorage.setItem('admin_ticket_uploads', JSON.stringify(INITIAL_UPLOADS));
    }
  }, []);

  const handleUpload = () => {
    const newUpload: UploadedFile = {
      id: Math.random().toString(36).substr(2, 9),
      name: `tickets_data_${new Date().toLocaleDateString().replace(/\//g, '_')}.xlsx`,
      records: Math.floor(Math.random() * 500) + 100,
      time: "Just now",
      status: 'Success',
      type: 'xlsx'
    };
    
    const updated = [newUpload, ...uploads];
    setUploads(updated);
    localStorage.setItem('admin_ticket_uploads', JSON.stringify(updated));
    toast.success("File uploaded and processed successfully!");
  };

  const handleDownloadPreview = (file: UploadedFile) => {
    if (file.status === 'Failed') {
      toast.error("Cannot download invalid file.");
      return;
    }
    
    // Simulate file download
    const csvContent = "data:text/csv;charset=utf-8,Ticket ID,Employee Name,Status\nTKT-001,John Doe,Valid\nTKT-002,Jane Smith,Valid";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", file.name.replace('.xlsx', '.csv'));
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Downloading file for preview...");
  };

  const displayUploads = showAll ? uploads : uploads.slice(0, 3);

  return (
    <div className="flex flex-col min-h-[100dvh] relative overflow-x-hidden bg-black pb-24">
      
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/background-cafeteria.png" 
          alt="Cafeteria Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-[4px]" />
      </div>

      <div className="z-10 relative flex flex-col min-h-full px-4 pt-6">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <AdminHamburgerMenu />
          <h1 className="text-[20px] font-extrabold text-white drop-shadow-md">Upload Ticket Data</h1>
          <div className="w-10"></div>
        </div>
        <p className="text-gray-400 text-sm mb-8 text-center">Import your raised ticket IDs from Excel files</p>

        {/* Upload Zone */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/95 backdrop-blur-xl rounded-[32px] p-8 border border-white/20 shadow-xl mb-6"
        >
          <div className="border-2 border-dashed border-blue-500/30 rounded-[24px] p-8 flex flex-col items-center justify-center text-center bg-blue-50/30">
            <div className="w-16 h-16 bg-blue-600 rounded-[20px] flex items-center justify-center shadow-lg mb-4 text-white">
              <UploadCloud className="w-8 h-8" />
            </div>
            <h2 className="text-[18px] font-black text-slate-800 mb-1">Upload Excel File</h2>
            <p className="text-sm font-bold text-gray-500 mb-6">Drag & drop or tap to browse</p>
            
            <button 
              onClick={handleUpload}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3.5 rounded-xl font-bold text-[14px] shadow-lg shadow-blue-500/30 active:scale-[0.98] transition-all"
            >
              Browse Files
            </button>
            
            <p className="text-[11px] font-bold text-gray-400 mt-6 uppercase tracking-wider">
              Supported: .xlsx, .xls, .csv (Max 10MB)
            </p>
          </div>
        </motion.div>

        {/* File Requirements */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/95 backdrop-blur-xl rounded-[28px] p-6 border border-white/20 shadow-xl mb-8 space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600 shadow-inner">
              <Info className="w-5 h-5" />
            </div>
            <h3 className="font-extrabold text-slate-800 text-[16px]">File Requirements</h3>
          </div>
          
          <div className="space-y-3 pl-1">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-slate-700">Required Columns</p>
                <p className="text-[12px] font-medium text-gray-500">Employee ID, Employee Name, Ticket ID</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600 shrink-0 mt-0.5">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[14px] font-bold text-slate-700">Data Validation</p>
                <p className="text-[12px] font-medium text-gray-500">No duplicate ticket IDs allowed</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Recent Uploads List */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between px-2">
            <h3 className="font-black text-white text-[18px]">Recent Uploads</h3>
            <button 
              onClick={() => setShowAll(!showAll)}
              className="text-[13px] font-bold text-blue-400"
            >
              {showAll ? 'View Less' : 'View All'}
            </button>
          </div>

          <AnimatePresence mode="popLayout">
            {displayUploads.map((file) => (
              <motion.div 
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                key={file.id}
                className="bg-white/95 backdrop-blur-xl rounded-[24px] p-4 border border-white/20 shadow-lg flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-[16px] flex items-center justify-center shadow-inner ${
                    file.status === 'Failed' ? 'bg-red-100 text-red-500' : 'bg-green-100 text-green-600'
                  }`}>
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-extrabold text-[14px] text-slate-800 line-clamp-1">{file.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        file.status === 'Failed' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                      }`}>
                        {file.status}
                      </span>
                      <span className="text-[11px] font-bold text-gray-400">
                        {file.records > 0 ? `${file.records.toLocaleString()} records` : 'Invalid format'}
                      </span>
                    </div>
                    <p className="text-[10px] font-medium text-gray-400 mt-1">{file.time}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => handleDownloadPreview(file)}
                  className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-800 hover:bg-gray-100 transition-all"
                  title="Download Preview"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="bg-white/95 backdrop-blur-xl rounded-[24px] p-5 shadow-lg border border-white/20">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shadow-inner mb-3">
                <ArrowUp className="w-5 h-5" />
              </div>
              <p className="font-black text-[28px] text-slate-800 leading-none">{uploads.length}</p>
              <p className="text-[11px] font-bold text-gray-500 mt-2 uppercase tracking-wider">Total Uploads</p>
            </div>
            
            <div className="bg-white/95 backdrop-blur-xl rounded-[24px] p-5 shadow-lg border border-white/20">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-green-600 shadow-inner mb-3">
                <Database className="w-5 h-5" />
              </div>
              <p className="font-black text-[28px] text-slate-800 leading-none">
                {(uploads.reduce((acc, curr) => acc + curr.records, 0) / 1000).toFixed(1)}K
              </p>
              <p className="text-[11px] font-bold text-gray-500 mt-2 uppercase tracking-wider">Total Records</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
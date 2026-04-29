import { useState } from "react";
import { UploadCloud, FileSpreadsheet, CheckCircle2, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AdminUploadTicketData() {
  const [uploads, setUploads] = useState([
    { id: 1, name: "May_13_MealPasses.xlsx", count: 142, time: "Yesterday, 06:45 PM" }
  ]);

  const handleUpload = () => {
    toast.success("File uploaded successfully. Processing records...");
    setUploads([
      { id: Date.now(), name: "May_14_MealPasses.xlsx", count: 156, time: "Just now" },
      ...uploads
    ]);
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">Upload Ticket Data</h1>
        <p className="text-muted-foreground text-sm">Import your ticket data from Excel files</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div 
            onClick={handleUpload}
            className="border-2 border-dashed border-primary/30 rounded-[24px] p-12 text-center bg-primary/5 hover:bg-primary/10 transition-colors cursor-pointer flex flex-col items-center justify-center min-h-[300px]"
          >
            <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center text-[#8b5cf6] mb-6">
              <UploadCloud className="w-10 h-10" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Upload Excel File</h2>
            <p className="text-muted-foreground">Drag & drop or browse</p>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-4">Accepted: .xlsx, .csv</p>
          </div>

          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-border">
            <h3 className="font-bold text-lg mb-4">Recent Uploads</h3>
            <div className="space-y-3">
              {uploads.map((u) => (
                <div key={u.id} className="flex items-center justify-between p-4 border border-border rounded-[20px]">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center text-foreground">
                      <FileSpreadsheet className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground">{u.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{u.time}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-foreground">{u.count} records</span>
                    <span className="flex items-center gap-1 text-xs text-green-600 font-semibold mt-1">
                      <CheckCircle2 className="w-3 h-3" /> Processed
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Button className="w-full bg-[#8b5cf6] hover:bg-[#7c3aed] text-white h-14 rounded-xl font-bold text-lg shadow-md" onClick={handleUpload}>
            Start Upload Process
          </Button>

          <div className="bg-white rounded-[24px] p-6 shadow-sm border border-border space-y-4">
            <h3 className="font-bold text-base border-b border-border pb-2">Requirement Guidelines</h3>
            
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold">Required Columns</p>
                <p className="text-xs text-muted-foreground mt-1">Employee ID, Name, Program, Cost Code, Date</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold">Date Validation</p>
                <p className="text-xs text-muted-foreground mt-1">Dates must be within the current billing cycle.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold">Employee Mapping</p>
                <p className="text-xs text-muted-foreground mt-1">IDs must match existing employee database records.</p>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-2 border-border font-semibold">
              <Download className="w-4 h-4 mr-2" /> Download Template
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-[24px] p-5 shadow-sm border border-border text-center">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Total Uploads</p>
              <p className="text-3xl font-bold">{uploads.length}</p>
            </div>
            <div className="bg-white rounded-[24px] p-5 shadow-sm border border-border text-center">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Total Records</p>
              <p className="text-3xl font-bold text-primary">{uploads.reduce((acc, u) => acc + u.count, 0)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
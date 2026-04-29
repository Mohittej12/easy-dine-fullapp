import { FileSpreadsheet, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VendorTicketData() {
  return (
    <div className="space-y-6 pb-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-foreground">Daily Uploaded Ticket Data</h1>
        <p className="text-muted-foreground text-sm">View and export ticket data uploaded each day</p>
      </div>

      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-border">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-border pb-6 mb-6">
          <div className="flex items-center gap-3 bg-muted p-2 rounded-xl">
            <Calendar className="w-5 h-5 text-muted-foreground ml-2" />
            <select className="bg-transparent border-none font-medium focus:ring-0 text-sm py-1 pr-4">
              <option>Today (May 14, 2024)</option>
              <option>Yesterday</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          
          <Button className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white rounded-xl font-bold gap-2">
            <Download className="w-4 h-4" /> Export File
          </Button>
        </div>

        <div className="space-y-6">
          <h3 className="font-bold text-lg">Uploaded Reports</h3>
          
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 border border-border rounded-[20px] hover:border-primary/30 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-foreground">ticket_data_may{14-i}.xlsx</p>
                    <p className="text-xs text-muted-foreground mt-1">Uploaded May {14-i}, 2024 at 08:30 AM</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-bold text-foreground">450 Records</span>
                  <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded mt-1">Validated</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
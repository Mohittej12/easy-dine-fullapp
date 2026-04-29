import { Shield, BookOpen, AlertCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Terms() {
  return (
    <div className="space-y-6 pb-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Terms & Disclaimer</h1>
        <p className="text-muted-foreground font-medium">Please read the rules and policies</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-border flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-1">For Users</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Users must present their employee ID or internal ID for verification when collecting company-sponsored meals. Orders cannot be canceled once marked as preparing by the vendor.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-border flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-1">For Vendors</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Vendors are responsible for maintaining food quality and fulfilling orders within the specified time. All payments for Pay & Use orders will be settled weekly.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-5 shadow-sm border border-border flex items-start gap-4">
          <div className="w-10 h-10 bg-muted text-muted-foreground rounded-xl flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-foreground mb-1">Disclaimer</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Prodapt provides this platform as a convenience and is not liable for food quality issues. Any disputes regarding paid orders should be resolved directly with the respective cafeteria vendor.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-primary/5 rounded-[24px] p-6 border border-primary/20 text-center space-y-4 mt-8">
        <h3 className="font-bold text-foreground">Need Help?</h3>
        <p className="text-sm text-muted-foreground">If you face any issues with your orders or the app, please contact facility management.</p>
        <Button className="h-12 rounded-xl font-bold px-8 w-full sm:w-auto">
          <Phone className="w-4 h-4 mr-2" /> Contact Support
        </Button>
      </div>
    </div>
  );
}
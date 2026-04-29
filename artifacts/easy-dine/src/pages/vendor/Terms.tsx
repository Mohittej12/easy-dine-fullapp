import { Shield, BookOpen, AlertCircle } from "lucide-react";

export default function VendorTerms() {
  return (
    <div className="space-y-6 pb-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Terms & Disclaimer</h1>
        <p className="text-muted-foreground font-medium">Platform rules and operational guidelines</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-border flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground mb-2">For Vendors</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Vendors are responsible for maintaining food quality, accurate pricing, and fulfilling orders within the specified time. All payments for Pay & Use orders will be settled weekly. Vendors must keep their menu availability up to date to prevent rejected orders.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-border flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground mb-2">Ticketing & Company Sponsored Meals</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              For Meal Pass orders, vendors must verify the employee ID upon collection if required by policy. Settlement for all delivered meal pass orders will be processed by the Prodapt finance team at the end of each billing cycle based on the daily reports.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-border flex items-start gap-4">
          <div className="w-12 h-12 bg-muted text-muted-foreground rounded-xl flex items-center justify-center shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground mb-2">Disclaimer</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The Easy Dine platform serves as an intermediary. Vendors hold full responsibility for food safety standards, hygiene, and compliance with local regulations. Prodapt reserves the right to suspend vendor access in case of repeated policy violations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
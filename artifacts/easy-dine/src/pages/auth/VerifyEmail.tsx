import { Link } from "wouter";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function VerifyEmail() {
  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[24px] shadow-xl p-8 text-center space-y-6">
        <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
          <MailCheck className="w-10 h-10" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Verify your email</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We've sent a verification link to your Prodapt email address. Please check your inbox and click the link to continue.
          </p>
        </div>

        <div className="pt-4 space-y-3">
          <Link href="/login">
            <Button className="w-full h-12 rounded-xl text-base font-semibold">
              Return to Login
            </Button>
          </Link>
          <Button variant="outline" className="w-full h-12 rounded-xl text-base font-semibold border-border">
            Resend Email
          </Button>
        </div>
      </div>
    </div>
  );
}
import { Link } from "wouter";
import { KeyRound, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPassword() {
  return (
    <div className="min-h-[100dvh] bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-[24px] shadow-xl p-8 space-y-6 relative overflow-hidden">
        <Link href="/login" className="absolute top-6 left-6 text-muted-foreground hover:text-foreground transition-colors">
          <ChevronLeft className="w-6 h-6" />
        </Link>

        <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mt-4">
          <KeyRound className="w-8 h-8" />
        </div>
        
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Reset Password</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        </div>

        <form className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" type="email" placeholder="name@prodapt.com" required className="h-12 rounded-xl" />
          </div>

          <Button type="button" className="w-full h-12 rounded-xl text-base font-semibold" onClick={() => window.history.back()}>
            Send Reset Link
          </Button>
        </form>
      </div>
    </div>
  );
}
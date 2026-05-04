import { ReactNode } from "react";
import { AdminHamburgerMenu } from "@/components/AdminHamburgerMenu";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-[#1E1E1E] w-full relative">
      {/* Global Hamburger Menu for Admin */}
      <div className="fixed top-6 left-4 z-50">
        <AdminHamburgerMenu />
      </div>
      
      <main className="min-h-[100dvh] w-full flex flex-col relative">
        {children}
      </main>
    </div>
  );
}
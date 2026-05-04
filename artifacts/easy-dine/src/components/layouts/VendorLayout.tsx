import { ReactNode } from "react";

export default function VendorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] bg-background w-full relative">
      {/* Mobile first container, centered on desktop */}
      <div className="max-w-md mx-auto min-h-[100dvh] bg-background md:shadow-xl relative flex flex-col">
        <main className="flex-1 flex flex-col w-full h-full relative">
          {children}
        </main>
      </div>
    </div>
  );
}
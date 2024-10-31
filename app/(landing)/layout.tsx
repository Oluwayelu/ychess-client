import { Navbar } from "@/components/navbar";
import { Boxes } from "@/components/ui/background-bokes";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YChess",
  description: "YChess is an online multiplayer game",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <Navbar />
      <div className="min-h-[90vh] relative w-full overflow-hidden bg-transparent flex flex-col items-center justify-center">
        <div className="absolute inset-0 w-full h-full bg-transparent z-20  pointer-events-none" />
        <Boxes />

        {children}
      </div>
    </div>
  );
}


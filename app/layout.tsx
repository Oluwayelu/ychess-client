import { GameProvider } from "@/context";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "@/context/session";
import { Boxes } from "@/components/ui/background-bokes";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";

import type { Metadata } from "next";

import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <QueryProvider>
        <body className="w-full">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <GameProvider>
              <SessionProvider>{children}</SessionProvider>
            </GameProvider>
          </ThemeProvider>
          <Toaster />
        </body>
      </QueryProvider>
    </html>
  );
}

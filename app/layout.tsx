import { Navbar } from "@/components/navbar";

import { GameProvider } from "@/context";

import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

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
      <body className="w-full bg-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <GameProvider>
            <Navbar />
            <div className="w-full min-h-[90vh] p-5 lg:pt-10">{children}</div>
          </GameProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}


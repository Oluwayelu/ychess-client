"use client";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui";
import { Chessboard } from "@/components/chessboard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { computer } from "@/lib/CONSTANTS";
import {
  ComputerDialog,
  OnlineDialog,
  OverBoardDialog,
} from "@/components/sections/landing";

export default function Home() {
  return (
    <main className="max-w-6xl m-auto w-full h-full flex flex-col-reverse lg:flex-row items-center lg:items-start gap-5">
      <div className="w-3/4 lg:w-1/2 h-[80vh] inline-flex justify-center items-center">
        <Chessboard
          disabled
          size="lg"
          position="4k3/3p4/8/4P3/8/8/8/4K3 b - - 0 1"
        />
      </div>

      <div className="w-full lg:w-1/2 h-[80vh] inline-flex flex-col justify-center items-center space-y-5">
        <h1 className="text-4xl text-center font-bold">Play Chess Online</h1>

        {/* body */}
        <div className="w-full flex flex-col gap-3">
          <OnlineDialog />
          <div className="w-full inline-flex items-center gap-3">
            <OverBoardDialog />
            <ComputerDialog />
          </div>
        </div>
      </div>
    </main>
  );
}


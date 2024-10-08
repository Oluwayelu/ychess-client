"use client";
import {
  ComputerDialog,
  OnlineDialog,
  OverBoardDialog,
} from "@/components/sections/landing";
import { Boxes } from "@/components/ui/background-bokes";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SparklesText from "@/components/ui/sparkles-text";
import BoxReveal from "@/components/ui/box-reveal";
import WordRotate from "@/components/ui/word-rotate";
import ShimmerButton from "@/components/ui/shimmer-button";
import AutoPlayChessboard from "@/components/sections/landing/AutoPlayChessboard";

export default function Home() {
  return (
    <MaxWidthWrapper className="w-full h-full flex flex-col-reverse md:flex-row justify-center items-center">
      <div className="w-full lg:w-1/2 h-full inline-flex justify-center items-center">
        <AutoPlayChessboard />
      </div>

      <div className="w-full lg:w-1/2 h-[80vh] inline-flex flex-col justify-center items-center space-y-5">
        {/* <h1 className="relative text-white text-4xl font-bold">Play Chess Online</h1> */}
        <BoxReveal boxColor="#39FF14" duration={0.7}>
          <SparklesText
            colors={{ first: "#00BFFF", second: "#39FF14" }}
            text="Challenge your mind"
          />
        </BoxReveal>

        <WordRotate
          className="text-2xl font-medium text-secondary"
          words={[
            "Play against opponents from around the world",
            "Analyze your games with AI-powered insights",
            "Battle against advanced AI with customizable difficulty",
          ]}
        />

        {/* body */}
        <div className="relative w-full flex flex-col gap-3">
          <OnlineDialog />
          <ComputerDialog />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}



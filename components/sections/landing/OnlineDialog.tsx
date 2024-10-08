"use client";
import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { computer, timeControl } from "@/lib/CONSTANTS";
import { useState } from "react";
import { TimeControl } from "@/lib/types";
import ShimmerButton from "@/components/ui/shimmer-button";

export const OnlineDialog = () => {
  const [type, setType] = useState<"create" | "join" | null>(null);
  const [selectedTime, setTime] = useState<TimeControl>(timeControl[3]);
  const [selectedColor, setColor] = useState("random");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ShimmerButton
          background="#00BFFF"
          shimmerSize="0.2em"
          shimmerDuration="5s"
          borderRadius="10px"
          className="h-16 shadow shadow-secondary"
        >
          Play online
        </ShimmerButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">Play Online</DialogTitle>
        </DialogHeader>
        {type === null && (
          <div className="grid grid-cols-2 gap-2 md:gap-4 py-4">
            <div
              onClick={() => setType("create")}
              className="p-3 border rounded-lg flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="w-14 h-14">Icon</div>

              <p className="text-xl font-medium">Create game</p>
            </div>

            <div
              onClick={() => setType("join")}
              className="p-3 border rounded-lg flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="w-14 h-14">Icon</div>

              <p className="text-xl font-medium">Join game</p>
            </div>
          </div>
        )}

        {type === "create" && (
          <div className="w-full grid gap-2 md:gap-4">
            <h2 className="text-2xl font-bold">Select time control</h2>
            <div className="w-full grid grid-cols-3 gap-1 md:gap-3">
              {timeControl.map((tControl, key) => (
                <div
                  key={key}
                  onClick={() => setTime(tControl)}
                  className={`${
                    selectedTime.name === tControl.name
                      ? "border-primary"
                      : "border-primary/30"
                  } w-full p-2 flex flex-col items-center rounded-lg border cursor-pointer`}
                >
                  <h4 className="md:text-lg">{tControl.name}</h4>
                  <p className="text-sm md:text-base font-medium">
                    {tControl.type}
                  </p>
                </div>
              ))}
            </div>
            <div className="w-full flex justify-center gap-1">
              <div
                onClick={() => setColor("w")}
                className={`${
                  selectedColor === "w" ? "border-primary" : "border-primary/30"
                } w-16 h-16 flex items-center justify-center rounded-lg border`}
              >
                <div className="relative w-3/4 h-3/4 ">
                  <Image src="/images/king_w.png" alt="white" layout="fill" />
                </div>
              </div>
              <div
                onClick={() => setColor("random")}
                className={`${
                  selectedColor === "random"
                    ? "border-primary"
                    : "border-primary/30"
                } w-16 h-16 flex items-center justify-center rounded-lg border`}
              >
                <p className="text-2xl font-bold">?</p>
              </div>
              <div
                onClick={() => setColor("b")}
                className={`${
                  selectedColor === "b" ? "border-primary" : "border-primary/30"
                } w-16 h-16 flex items-center justify-center rounded-lg border`}
              >
                <div className="relative w-3/4 h-3/4 ">
                  <Image src="/images/king_b.png" alt="white" layout="fill" />
                </div>
              </div>
            </div>
            <div className="w-full flex justify-between items-center">
              <Button
                onClick={() => setType(null)}
                size="lg"
                variant="destructive"
              >
                Go back
              </Button>
              <Button size="lg">Create game</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGame } from "@/lib/hooks";
import { computer, timeControl } from "@/lib/CONSTANTS";
import { TimeControl } from "@/lib/types";
import { CHOOSE_COLOR, PLAY_COMPUTER } from "@/reducers/types";

export const OverBoardDialog = () => {
  const router = useRouter();
  const { value, dispatch } = useGame();
  const [selectedTime, setTime] = useState<TimeControl>(timeControl[3]);
  const [selectedColor, setColor] = useState("random");

  const handlePlay = () => {
    dispatch({
      type: CHOOSE_COLOR,
      payload: selectedColor,
    });

    router.push("/play/over-board");
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="xl" variant="outline" className="w-full">
          Play over the board
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">
            Play over the board
          </DialogTitle>
        </DialogHeader>
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

          <Button onClick={handlePlay} size="lg" className="w-full">
            Play
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

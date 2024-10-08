"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useGame } from "@/lib/hooks";
import { Computer, TimeControl } from "@/lib/types";
import { computer, timeControl } from "@/lib/CONSTANTS";
import { CHOOSE_COLOR, PLAY_COMPUTER } from "@/reducers/types";
import ShimmerButton from "@/components/ui/shimmer-button";

export const ComputerDialog = () => {
  const router = useRouter();
  const { value, dispatch } = useGame();
  const [selectedComputer, setComputer] = useState<Computer>(computer[0]);
  const [selectedTime, setTime] = useState<TimeControl>(timeControl[3]);
  const [selectedColor, setColor] = useState("random");
  const [next, setNext] = useState(false);

  const handlePlay = () => {
    dispatch({
      type: CHOOSE_COLOR,
      payload: selectedColor,
    });

    dispatch({
      type: PLAY_COMPUTER,
      payload: {
        computer: selectedComputer,
        time: selectedTime,
      },
    });
    router.push("/play/computer");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <ShimmerButton
          background="#39FF14"
          shimmerSize="0.2em"
          shimmerDuration="4s"
          borderRadius="10px"
          className="h-16 shadow shadow-secondary"
        >
          Play computer
        </ShimmerButton>
      </DialogTrigger>
      <DialogContent className="text-white">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold">Play vs...</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2 md:gap-4 py-4">
          <div className="w-full flex flex-col items-center">
            <Image
              src={selectedComputer.avatar}
              alt={`${selectedComputer.name}_avatar`}
              width={80}
              height={80}
            />
            <p className="text-lg font-bold">
              {selectedComputer.name} ({selectedComputer.level})
            </p>
            <p className="text-sm text-center">
              {selectedComputer.description}
            </p>
          </div>

          {!next ? (
            <div className="w-full grid gap-2 md:gap-4">
              <div className="w-full grid grid-cols-3">
                {computer.map((player, key) => (
                  <div
                    key={key}
                    onClick={() => setComputer(player)}
                    className={`${
                      player.name === selectedComputer.name &&
                      "shadow shadow-secondary rounded-lg"
                    } w-full p-2 flex flex-col items-center cursor-pointer`}
                  >
                    <Image
                      src={player.avatar}
                      alt={`${player.name}_avatar`}
                      width={50}
                      height={50}
                    />
                    <p className="text-sm text-center">
                      {player.name}
                      <br />({player.level})
                    </p>
                  </div>
                ))}
              </div>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => setNext(!next)}
              >
                Choose player
              </Button>
            </div>
          ) : (
            <div className="w-full grid gap-2 md:gap-4">
              <h2 className="text-2xl font-bold">Select time control</h2>
              <div className="w-full grid grid-cols-3 gap-1 md:gap-3">
                {timeControl.map((tControl, key) => (
                  <div
                    key={key}
                    onClick={() => setTime(tControl)}
                    className={`${
                      selectedTime.name === tControl.name
                        ? "border-secondary"
                        : "border-secondary/30"
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
                    selectedColor === "w"
                      ? "border-secondary"
                      : "border-secondary/30"
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
                      ? "border-secondary"
                      : "border-secondary/30"
                  } w-16 h-16 flex items-center justify-center rounded-lg border`}
                >
                  <p className="text-2xl font-bold">?</p>
                </div>
                <div
                  onClick={() => setColor("b")}
                  className={`${
                    selectedColor === "b"
                      ? "border-secondary"
                      : "border-secondary/30"
                  } w-16 h-16 flex items-center justify-center rounded-lg border`}
                >
                  <div className="relative w-3/4 h-3/4 ">
                    <Image src="/images/king_b.png" alt="white" layout="fill" />
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-between items-center">
                <Button
                  size="lg"
                  variant="destructive"
                  onClick={() => {
                    setNext(!next);
                  }}
                >
                  Go back
                </Button>
                <Button variant="secondary" onClick={handlePlay} size="lg">
                  Play computer
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

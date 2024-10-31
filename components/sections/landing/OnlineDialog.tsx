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
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import ShimmerButton from "@/components/ui/shimmer-button";
import { useReactMutation } from "@/lib/hooks/useReactQueryFn";

import { TimeControl } from "@/lib/types";
import { timeControl } from "@/lib/CONSTANTS";
import Spinner from "@/components/ui/spinner";

export const OnlineDialog = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [type, setType] = useState<"create" | "join" | null>(null);
  const [selectedTime, setTime] = useState<TimeControl>(timeControl[3]);
  const [selectedColor, setColor] = useState("random");
  const [isRedirecting, setRedirecting] = useState(false);
  const [code, setCode] = useState<string | null>(null);

  const { mutate, isPending } = useReactMutation("/game/create", "post");
  const { mutate: getActiveGame, isPending: getActiveIsPending } =
    useReactMutation(`/game/${code}`, "get");

  const onCreatGame = () => {
    try {
      const details = {
        timeControl: selectedTime,
        side: selectedColor,
      };

      mutate(details, {
        onSuccess: ({ data }) => {
          console.log("Creat: ", data);
          toast({
            title: "Success",
            variant: "success",
            description: data.message,
          });
          setRedirecting(true);
          router.push(`/play/${data.data.code}`);
        },
        onError: (error) => {
          console.error(error);
          toast({
            title: "Error",
            variant: "destructive",
            description: error.message,
          });
        },
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        variant: "destructive",
        description: "An error occured creating game",
      });
    } finally {
      setRedirecting(false);
    }
  };

  const onJoinGame = () => {
    try {
      if (code === null) {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Code field cannot be empty",
        });
        return;
      }

      if (code.length !== 6) {
        toast({
          title: "Error",
          variant: "destructive",
          description: "Code is not a valid",
        });
        return;
      }
      getActiveGame(
        {},
        {
          onSuccess: ({ data }) => {
            console.log("Join: ", data);
            toast({
              title: "Success",
              variant: "success",
              description: data.message,
            });
            //  router.push(`/play/${data.data.code}`);
          },
          onError: (error) => {
            console.error(error);
            toast({
              title: "Error",
              variant: "destructive",
              description: error.response?.data.message || error.message,
            });
          },
        }
      );
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        variant: "destructive",
        description: "An error occured creating game",
      });
    }
  };

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
      <DialogContent className="sm:max-w-[425px] text-white">
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
            <h2 className="text-xl font-medium">Select time control</h2>
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

              <Button loading={isPending} onClick={onCreatGame} size="lg">
                Create game
              </Button>
            </div>
          </div>
        )}

        {type === "join" && (
          <div className="w-full grid gap-2 md:gap-4">
            <h2 className="text-xl font-medium">Enter game code</h2>

            <Input
              className="w-full"
              onChange={(e) => setCode(e.target.value)}
            />
            <div className="w-full flex justify-between items-center">
              <Button
                onClick={() => setType(null)}
                size="lg"
                variant="destructive"
              >
                Go back
              </Button>

              <Button
                loading={getActiveIsPending}
                onClick={onJoinGame}
                size="lg"
              >
                Join game
              </Button>
            </div>
          </div>
        )}

        {isRedirecting && (
          <div className="absolute inset-0 bg-background flex flex-col items-center justify-center">
            <Spinner />
            <h3>Redirecting to game...</h3>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

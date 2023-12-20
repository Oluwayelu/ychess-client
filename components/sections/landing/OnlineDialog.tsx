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
import { computer } from "@/lib/CONSTANTS";

export const OnlineDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="xl">Play online</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Play Over the board</DialogTitle>
        </DialogHeader>
        <div></div>
      </DialogContent>
    </Dialog>
  );
};

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: ReactNode;
};

export default function MaxWidthWrapper({ className, children }: Props) {
  return (
    <div className={cn("w-full max-w-screen-xl m-auto px-5", className)}>
      {children}
    </div>
  );
}

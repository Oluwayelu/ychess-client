import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (secs: number) => {
  const h = Math.floor(secs / 36000);
  const m = Math.floor(secs / 60) - h * 60;
  const s = Math.floor(secs - h * 3600 - m * 60);

  return { h, m, s };
};

export const pad = (n: number) => (n < 10 ? `0${n}` : n);

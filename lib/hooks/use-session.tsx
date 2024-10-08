"use client";
import { useContext } from "react";

import { SessionContext } from "@/context/session";

export const useSession = () => {
  return useContext(SessionContext);
};

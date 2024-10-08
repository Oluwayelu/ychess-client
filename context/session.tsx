"use client";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { User } from "@/lib/types";
import { createContext, useEffect, useState } from "react";

import type { Dispatch, ReactNode, SetStateAction } from "react";

export interface ISessionContext {
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const SessionContext = createContext<ISessionContext>({
  user: null,
  setUser: () => {},
});

type Props = {
  children: ReactNode;
};

export const SessionProvider = ({ children }: Props) => {
  const [value, setValue] = useLocalStorage<User | null>("user", null);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (value) {
      setUser(value);
    }
  }, [value]);

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
};

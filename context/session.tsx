"use client";
import { useGame } from "@/lib/hooks";
import { useLocalStorage } from "@/lib/hooks/use-local-storage";
import { useReactQuery } from "@/lib/hooks/useReactQueryFn";
import { User } from "@/lib/types";
import { UPDATE_PLAYER } from "@/reducers/types";
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
  const {
    dispatch,
    value: { player },
  } = useGame();
  const [user, setUser] = useState<User | null>(null);
  const { data } = useReactQuery("user-session", "/auth");

  useEffect(() => {
    setUser(data?.data.data || null);
    dispatch({
      type: UPDATE_PLAYER,
      payload: data?.data.data || { username: "Player 1" },
    });
  }, [data?.data, dispatch]);

  return (
    <SessionContext.Provider value={{ user, setUser }}>
      {children}
    </SessionContext.Provider>
  );
};

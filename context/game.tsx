"use client";

import { Chess } from "chess.js";
import { createContext, useMemo, useReducer, useState } from "react";

import type { Actions, GameType } from "@/lib/types";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import Engine from "@/lib/engine";
import { gameReducer, initialState } from "@/reducers/game";

export interface IGameContext {
  value: GameType;
  dispatch: Dispatch<Actions>;
}

export const GameContext = createContext<IGameContext>({
  value: initialState,
  dispatch: () => {},
});

type Props = {
  children: ReactNode;
};

export const GameProvider = ({ children }: Props) => {
  const [value, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ value, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};

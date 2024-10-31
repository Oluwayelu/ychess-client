"use client";
import Link from "next/link";
import { useRef, useState, useEffect, useCallback } from "react";

import { useGame } from "@/lib/hooks";

import { Button } from "@/components/ui";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import {
  CHOOSE_COLOR,
  RESTART,
  UNDO,
  UPDATE_OTHER_PLAYER_TIME,
  UPDATE_PLAYER_TIME,
  UPDATE_POSITION,
  UPDATE_RESULT,
} from "@/reducers/types";
import {
  Hand,
  Flag,
  CornerUpLeft,
  ChevronLeft,
  ChevronsLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

import type { Piece, Square } from "react-chessboard/dist/chessboard/types";

export const GameDetails = () => {
  const {
    value: {
      game,
      moves,
      engine,
      engineLevel,
      position,
      result,
      player,
      opponent,
    },
    dispatch,
  } = useGame();
  const moveListRef = useRef<HTMLDivElement>(null);
  const [navIndex, setNavIndex] = useState<number | null>(null);

  const navigateMove = (index: number | null | "prev") => {
    const history = game.history({ verbose: true });
    if (
      index === null ||
      (index !== "prev" &&
        index >= game.history({ verbose: true }).length - 1) ||
      !game.history({ verbose: true }).length
    ) {
      dispatch({
        type: UPDATE_POSITION,
      });
      setNavIndex(null);
      return;
    }

    if (index === "prev") {
      index = game.history({ verbose: true }).length - 2;
    } else if (index < 0) {
      index = 0;
    }

    dispatch({
      type: UPDATE_POSITION,
      payload: history[index].after,
    });
    setNavIndex(index);
  };

  const undo = () => {
    dispatch({
      type: UNDO,
    });
  };

  const restart = () => {
    dispatch({
      type: RESTART,
    });
  };

  // auto scroll for moves
  useEffect(() => {
    // const activeMoveEl = document.getElementById("activeNavMove");
    // const moveList = moveListRef.current;
    // if (!activeMoveEl || !moveList) return;
    // moveList.scrollTop = activeMoveEl.offsetTop;
    if (moves.length) {
      moveListRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [moves.length]);

  return (
    <div className="w-full h-full p-1 bg-background text-white space-y-3">
      {/* header */}
      <div className="p-5 flex items-center font-mono gap-2">
        <h2 className="text-2xl font-medium">{player.timeControl.name}</h2>
        <div className="w-2 h-2 bg-primary rounded-full" />
        <span className="text-xl">{player.timeControl.type}</span>
      </div>

      <div className="w-full grid grid-cols-3 gap-1">
        <div
          onClick={undo}
          className="w-full inline-flex justify-center items-center gap-1 py-3 hover:bg-secondary bg-[#2d2d2d] cursor-pointer"
        >
          <CornerUpLeft size={16} />
          <span>Undo</span>
        </div>
        <div className="w-full inline-flex justify-center items-center gap-1 py-3 hover:bg-primary bg-[#2d2d2d] cursor-pointer">
          {/* TODO: change to handshake */}
          <Hand size={16} />
          <span>Draw</span>
        </div>
        <div className="w-full inline-flex justify-center items-center gap-1 py-3 hover:bg-red-500 bg-[#2d2d2d] cursor-pointer">
          <Flag size={16} />
          <span>Resign</span>
        </div>
      </div>

      <div className="w-full h-[164px] bg-[#2d2d2d] overflow-y-auto">
        {moves && moves.length !== 0 ? (
          moves.map((move, i) => {
            return (
              <div
                key={i}
                className="relative w-full h-10 grid grid-cols-6 gap-px"
              >
                {/* number */}
                <div className="w-full h-full text-center p-2">{i + 1}</div>
                {/* white move */}
                <div
                  onClick={() =>
                    navigateMove(
                      game.history({ verbose: true }).indexOf(move[0])
                    )
                  }
                  className={`${
                    (game.history({ verbose: true }).indexOf(move[0]) ===
                      game.history({ verbose: true }).length - 1 &&
                      navIndex === null) ||
                    navIndex ===
                      game.history({ verbose: true }).indexOf(move[0])
                      ? "bg-primary text-white"
                      : "bg-white text-background"
                  } w-full h-full p-2 col-span-2 border-y border-y-[#2d2d2d]`}
                >
                  {move[0].san}
                </div>

                {/* black move */}
                {move[1] && (
                  <div
                    id={moves.length - 1 === i ? "activeNavMove" : ""}
                    onClick={() =>
                      navigateMove(
                        game.history({ verbose: true }).indexOf(move[1])
                      )
                    }
                    className={`${
                      (game.history({ verbose: true }).indexOf(move[1]) ===
                        game.history({ verbose: true }).length - 1 &&
                        navIndex === null) ||
                      navIndex ===
                        game.history({ verbose: true }).indexOf(move[1])
                        ? "bg-primary text-white"
                        : "bg-white text-background"
                    } w-full h-full p-2 col-span-2 border-y border-y-[#2d2d2d]`}
                  >
                    {move[1].san}
                  </div>
                )}
                <div ref={moveListRef} />
              </div>
            );
          })
        ) : (
          <div className="w-full h-full flex justify-center items-center row-span-5">
            No moves found
          </div>
        )}
      </div>
      <div className="w-full flex items-center justify-end gap-1">
        <div
          onClick={() => navigateMove(0)}
          className="w-10 h-10 flex justify-center items-center rounded bg-[#2d2d2d] cursor-pointer"
        >
          <ChevronsLeft />
        </div>
        <div
          onClick={() =>
            navigateMove(navIndex === null ? "prev" : navIndex - 1)
          }
          className="w-10 h-10 flex justify-center items-center rounded bg-[#2d2d2d] cursor-pointer"
        >
          <ChevronLeft />
        </div>
        <div
          onClick={() => navigateMove(navIndex === null ? null : navIndex + 1)}
          className="w-10 h-10 flex justify-center items-center rounded bg-[#2d2d2d] cursor-pointer"
        >
          <ChevronRight />
        </div>
        <div
          onClick={() => navigateMove(null)}
          className="w-10 h-10 flex justify-center items-center rounded bg-[#2d2d2d] cursor-pointer"
        >
          <ChevronsRight />
        </div>
      </div>

      <div className="w-full h-[40dvh] p-2 bg-[#2d2d2d] overflow-y-auto">
        <h2 className="text-lg font-semibold">Chats</h2>
        <div className="text-sm py-3">
          <div className="w-full flex justify-end">
            <div className="w-fit px-2 py-1 bg-secondary text-background font-medium rounded-lg">
              Hello
            </div>
          </div>

          <div className="w-full flex justify-start">
            <div className="w-fit px-2 py-1 bg-white text-background font-medium rounded-lg">
              Hello there
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

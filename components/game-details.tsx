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
    const activeMoveEl = document.getElementById("activeNavMove");
    const moveList = moveListRef.current;
    if (!activeMoveEl || !moveList) return;
    moveList.scrollTop = activeMoveEl.offsetTop;
    // console.log("2nd: ", moveList);
  });

  // const sample = () => {
  //   moves.map((move, i) => {
  //     console.log(game.history({ verbose: true }));
  //     console.log(moves, i);
  //   });
  // };

  // sample()

  return (
    <Card className="w-full lg:w-4/5 bg-secondary">
      <CardHeader>
        <CardTitle className="w-full inline-flex items-center gap-2">
          <span>{player.timeControl.name}</span>
          <div className="w-2 h-2 bg-primary rounded-full" />
          <span>{player.timeControl.type}</span>
        </CardTitle>

        <CardDescription className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2">
            <div
              className={`${
                opponent.color === "w" ? "bg-white" : "bg-black"
              } w-4 h-4 border rounded-full`}
            />
            <p className="font-medium">{opponent.name}</p>
          </div>
          <div className="inline-flex items-center gap-2">
            <div
              className={`${
                player.color === "w" ? "bg-white" : "bg-black"
              } w-4 h-4 border rounded-full`}
            />
            <p className="font-medium">{player.name}</p>
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0">
        <div className="w-full p-3 bg-primary space-x-3">
          <Button size="sm" onClick={undo}>
            Undo
          </Button>
          <Button size="sm" onClick={restart}>
            Restart
          </Button>
          <Button>1/2 Draw</Button>
          <Button>Resign</Button>
        </div>
        <div className="w-full h-40 flex">
          <ScrollArea ref={moveListRef} className="w-full h-full">
            {moves &&
              moves.map((move, i) => (
                <div className="w-full lg:w-4/5 grid grid-cols-5" key={i}>
                  <div className="w-full text-center font-bold p-2">
                    {i + 1}.
                  </div>
                  <div
                    id={
                      (game.history({ verbose: true }).indexOf(move[0]) ===
                        game.history({ verbose: true }).length - 1 &&
                        navIndex === null) ||
                      navIndex ===
                        game.history({ verbose: true }).indexOf(move[0])
                        ? "activeNavMove"
                        : ""
                    }
                    onClick={() =>
                      navigateMove(
                        game.history({ verbose: true }).indexOf(move[0])
                      )
                    }
                    // className="w-full bg-white p-2 col-span-2"
                    className={`${
                      (game.history({ verbose: true }).indexOf(move[0]) ===
                        game.history({ verbose: true }).length - 1 &&
                        navIndex === null) ||
                      navIndex ===
                        game.history({ verbose: true }).indexOf(move[0])
                        ? "bg-primary text-white"
                        : "bg-white text-primary"
                    } w-full p-2 col-span-2`}
                  >
                    {move[0].san}
                  </div>
                  {move[1] && (
                    <div
                      id={moves.length - 1 === i ? "activeNavMove" : ""}
                      onClick={() =>
                        navigateMove(
                          game.history({ verbose: true }).indexOf(move[1])
                        )
                      }
                      // className="w-full bg-white p-2 col-span-2"
                      className={`${
                        (game.history({ verbose: true }).indexOf(move[1]) ===
                          game.history({ verbose: true }).length - 1 &&
                          navIndex === null) ||
                        navIndex ===
                          game.history({ verbose: true }).indexOf(move[1])
                          ? "bg-primary text-white"
                          : "bg-white text-primary"
                      } w-full  p-2 col-span-2`}
                    >
                      {move[1].san}
                    </div>
                  )}
                </div>
              ))}
          </ScrollArea>
        </div>
        <div className="w-full flex items-center p-3 bg-primary">
          <div className="w-2/3 flex items-center gap-2"></div>
          <div className="w-1/3 grid grid-cols-4 ">
            <div
              onClick={() => navigateMove(0)}
              className="w-full inline-flex justify-center text-white bg-primary hover:bg-primary/60 cursor-pointer"
            >
              {`<<`}
            </div>
            <div
              onClick={() =>
                navigateMove(navIndex === null ? "prev" : navIndex - 1)
              }
              className="w-full inline-flex justify-center text-white bg-primary hover:bg-primary/60 cursor-pointer"
            >
              {`<`}
            </div>
            <div
              onClick={() =>
                navigateMove(navIndex === null ? null : navIndex + 1)
              }
              className="w-full inline-flex justify-center text-white bg-primary hover:bg-primary/60 cursor-pointer"
            >
              {`>`}
            </div>
            <div
              onClick={() => navigateMove(null)}
              className="w-full inline-flex justify-center text-white bg-primary hover:bg-primary/60 cursor-pointer"
            >
              {`>>`}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

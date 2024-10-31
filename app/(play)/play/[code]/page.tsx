"use client";

import { useState, useEffect, useCallback } from "react";
import { io } from "socket.io-client";

import { useGame } from "@/lib/hooks";
import { CustomSquares, PlayerMove } from "@/lib/types";
import { Chessboard } from "@/components/chessboard";
import { GameDetails } from "@/components/game-details";

import { CLEAR_GAME, UPDATE_RESULT } from "@/reducers/types";

import type { Piece, Square } from "react-chessboard/dist/chessboard/types";
import { getMoveOptions, playerMove } from "@/helpers";
import { useComputer } from "@/lib/hooks/use-computer";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useReactQuery } from "@/lib/hooks/useReactQueryFn";
import { initSocket } from "@/lib/events/socket";
import { useSession } from "@/lib/hooks/use-session";
import { notFound } from "next/navigation";

// export async function generateMetadata({
//   params,
// }: {
//   params: { code: string };
// }) {
//   const game
// }

const API_URL = process.env.API_URL || "http://localhost:8000";

const socket = io(API_URL, { withCredentials: true, autoConnect: false });

const PlayOnline = ({ params }: { params: { code: string } }) => {
  const { user } = useSession();
  const { data, isPending } = useReactQuery(
    "active-game",
    `/game/${params.code}`
  );

  if (!isPending && !data) {
    notFound();
  }

  const {
    value: { game, position, result, player, opponent },
    dispatch,
  } = useGame();

  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [customSquare, setCustomSquare] = useState<Partial<CustomSquares>>({});

  useEffect(() => {
    if (!user) return;

    socket.connect();
    initSocket(user, socket);

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
    };
  }, [user]);

  return (
    <div className="w-full h-full flex flex-col lg:flex-row items-center gap-5">
      <div className="w-full lg:w-3/4 h-full p-5 inline-flex justify-between gap-5">
        <div className="w-[60%] h-full flex items-center">
          <Chessboard
            size="lg"
            info={result}
            player={player}
            opponent={opponent}
            position={position}
            // onPieceDrop={onDrop}
            // onSquareClick={onSquareClick}
            // onPieceDragEnd={onPieceDragEnd}
            arePremovesAllowed={true}
            // onPieceDragBegin={onPieceDragBegin}
            customSquareStyles={{
              ...customSquare.check,
              ...customSquare.options,
              ...customSquare.lastMove,
            }}
            className="text-white"
            boardOrientation={player.color === "w" ? "white" : "black"}
          />
        </div>

        <div className="w-[40%] h-full flex flex-col justify-between text-white">
          <div className="bg-white w-full h-[40dvh] rounded-md" />
          <div className="bg-white w-full h-[40dvh] rounded-md" />
        </div>
      </div>

      <div className="w-full lg:w-1/4 h-full inline-flex justify-end">
        <GameDetails />
      </div>
    </div>
  );
};

export default PlayOnline;

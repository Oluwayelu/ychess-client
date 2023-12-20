"use client";
import React, { useState, useMemo, useCallback } from "react";
import { Chess, Square } from "chess.js";

import { Chessboard } from "@/components/chessboard";

type Move = {
  from: string;
  to: string;
  promotion?: string;
};

const PlayOnline = () => {
  const chess = useMemo(() => new Chess(), []);
  const [fen, setFen] = useState(chess.fen());
  const [info, setInfo] = useState("");

  const makeAMove = useCallback(
    (move: Move) => {
      try {
        const result = chess.move(move);
        setFen(chess.fen());

        if (chess.isGameOver()) {
          if (chess.isCheckmate()) {
            setInfo("Game over, Checkmate");
          } else if (chess.isDraw()) {
            setInfo("Draw");
          } else {
            setInfo("Game over");
          }
        }

        return result;
      } catch (e) {
        return null;
      }
    },
    [chess]
  );

  const onDrop = (sourceSquare: Square, targetSquare: Square) => {
    const moveData = {
      from: sourceSquare,
      to: targetSquare,
      color: chess.turn(),
      promotion: "q",
    };

    const move = makeAMove(moveData);

    if (move === null) return false;
    return true;
  };

  return (
    <div className="max-w-6xl m-auto w-full mx-auto flex justify-around gap-5">
      <Chessboard size="lg" info={info} position={fen} onPieceDrop={onDrop} />
      <div className="w-full lg:w-1/2 inline-flex justify-center items-stretch">
        <div className="w-4/5 h-full border-2 border-black rounded-lg"></div>
      </div>
    </div>
  );
};

export default PlayOnline;

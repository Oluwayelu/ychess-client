"use client";

import { useState, useEffect, useCallback } from "react";

import { useGame } from "@/lib/hooks";
import { CustomSquares, PlayerMove, Side } from "@/lib/types";
import { Chessboard } from "@/components/chessboard";
import { GameDetails } from "@/components/game-details";

import {
  ADD_INCREMENT_TO_OPPONENT_TIME,
  ADD_INCREMENT_TO_PLAYER_TIME,
  UPDATE_POSITION,
  UPDATE_RESULT,
} from "@/reducers/types";

import type { Piece, Square } from "react-chessboard/dist/chessboard/types";
import { bestMove, getMoveOptions, playerMove } from "@/helpers";
import { useComputer } from "@/lib/hooks/use-computer";

const PlayOverBoard = () => {
  const {
    value: { game, engine, engineLevel, position, result, player, opponent },
    dispatch,
  } = useGame();

  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [customSquare, setCustomSquare] = useState<Partial<CustomSquares>>({});

  const makeAMove = useCallback(
    (move: PlayerMove) => {
      let side: Side;

      if (player.color === game.turn()) {
        side = "player";
      } else {
        side = "opponent";
      }

      return playerMove({ game, move, side, dispatch, setCustomSquare });
    },
    [player.color, game, dispatch]
  );

  const onDrop = (sourceSquare: Square, targetSquare: Square, piece: Piece) => {
    const moveData = {
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase() ?? "q",
    };

    if (game.turn() === player.color) {
      const move = makeAMove(moveData);
      if (move === null) return false;
    }

    if (game.isGameOver() || game.isDraw()) return false;

    return true;
  };

  const onPieceDragBegin = (piece: string, sourceSquare: Square) => {
    // if (player.color !== game.turn()) return;

    getMoveOptions({ game, square: sourceSquare, setCustomSquare });
  };

  const onPieceDragEnd = () => {
    setCustomSquare({ options: {} });
  };

  const onSquareClick = (square: Square) => {
    // if (player.color !== game.turn()) return;

    const resetMove = (square: Square) => {
      setMoveFrom(square);
      getMoveOptions({ game, square, setCustomSquare });
    };

    if (moveFrom === null) {
      resetMove(square);
      return;
    }

    const moveData: PlayerMove = {
      from: moveFrom,
      to: square,
      promotion: "q",
    };

    const move = makeAMove(moveData);
    if (!move) {
      resetMove(square);
    } else {
      setMoveFrom(null);
    }
  };

  useEffect(() => {
    if (game.isGameOver()) {
      if (game.isCheckmate()) {
        dispatch({
          type: UPDATE_RESULT,
          payload: "Game over, Checkmate",
        });
      } else if (game.isDraw()) {
        dispatch({
          type: UPDATE_RESULT,
          payload: "Draw by Stalemate",
        });
      } else {
        dispatch({
          type: UPDATE_RESULT,
          payload: "Game over",
        });
      }
    }
    if (player.timeControl.time.secs === 0) {
      dispatch({
        type: UPDATE_RESULT,
        payload: "You lost on time",
      });
    } else if (opponent.timeControl.time.secs === 0) {
      dispatch({
        type: UPDATE_RESULT,
        payload: "You won on time",
      });
    }
  }, [
    dispatch,
    game,
    opponent.timeControl.time.secs,
    player.timeControl.time.secs,
  ]);

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
            onPieceDrop={onDrop}
            onSquareClick={onSquareClick}
            onPieceDragEnd={onPieceDragEnd}
            arePremovesAllowed={true}
            onPieceDragBegin={onPieceDragBegin}
            customSquareStyles={{
              ...customSquare.check,
              ...customSquare.options,
              ...customSquare.lastMove,
            }}
            boardOrientation={player.color === "w" ? "white" : "black"}
          />
        </div>
      </div>

      {/* <div className="w-full lg:w-1/4 h-full inline-flex justify-end">
        <GameDetails />
      </div> */}
    </div>
  );
};

export default PlayOverBoard;

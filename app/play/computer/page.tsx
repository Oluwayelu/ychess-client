"use client";

import { useState, useEffect, useCallback } from "react";

import { useGame } from "@/lib/hooks";
import { CustomSquares, PlayerMove } from "@/lib/types";
import { Chessboard } from "@/components/chessboard";
import { GameDetails } from "@/components/game-details";

import { UPDATE_RESULT } from "@/reducers/types";

import type { Piece, Square } from "react-chessboard/dist/chessboard/types";
import { getMoveOptions, playerMove } from "@/helpers";
import { useComputer } from "@/lib/hooks/use-computer";

const PlayStockfish = () => {
  const {
    value: { game, engine, engineLevel, position, result, player, opponent },
    dispatch,
  } = useGame();

  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [customSquare, setCustomSquare] = useState<Partial<CustomSquares>>({});

  useComputer(setCustomSquare);
  const makeAMove = useCallback(
    (move: PlayerMove) => {
      return playerMove({ game, move, dispatch, setCustomSquare });
    },
    [game, dispatch]
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
    if (player.color !== game.turn()) return;

    getMoveOptions({ game, square: sourceSquare, setCustomSquare });
  };

  const onPieceDragEnd = () => {
    setCustomSquare({ options: {} });
  };

  const onSquareClick = (square: Square) => {
    if (player.color !== game.turn()) return;

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

  // useEffect(() => {
  //   dispatch({
  //     type: CHOOSE_COLOR,
  //     payload: player.color,
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   if (game.turn() !== player.color && result === "") {
  //     setTimeout(() => {
  //       findBestMove();

  //       dispatch({
  //         type: ADD_INCREMENT_TO_OPPONENT_TIME,
  //       });
  //     }, 3000);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [findBestMove, game.turn(), player.color]);

  return (
    <div className="max-w-6xl mx-auto w-full h-full flex flex-col lg:flex-row items-center gap-5">
      <div className="w-full lg:w-1/2 inline-flex justify-center">
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

      <div className="w-full lg:w-1/2 h-full inline-flex justify-center items-center">
        <GameDetails />
      </div>
    </div>
  );
};

export default PlayStockfish;

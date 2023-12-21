"use client";

import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useContext,
  useReducer,
} from "react";
import { Piece, Square } from "react-chessboard/dist/chessboard/types";

import { CustomSquares, PlayerMove } from "@/lib/types";
import { Chessboard } from "@/components/chessboard";

import { Button } from "@/components/ui";
import { gameReducer, initialState } from "@/reducers/game";
import { CHOOSE_COLOR, RESTART, UNDO, UPDATE_POSITION } from "@/reducers/types";
import { GameDetails } from "@/components/game-details";
import { useGame } from "@/lib/hooks";
import { getMoveOptions, playerMove } from "@/helpers";

type Move = {
  from: string;
  to: string;
  promotion?: string;
};

const AnalysisBoard = () => {
  const {
    value: { game, engine, engineLevel, position, result, player, opponent },
    dispatch,
  } = useGame();

  const [moveFrom, setMoveFrom] = useState<Square | null>(null);
  const [customSquare, setCustomSquare] = useState<Partial<CustomSquares>>({});

  const [positionEvaluation, setPositionEvaluation] = useState(0);
  const [depth, setDepth] = useState(10);
  const [bestLine, setBestline] = useState("");
  const [possibleMate, setPossibleMate] = useState("");

  const findBestMove = useCallback(() => {
    engine.evaluatePosition(position, engineLevel);
    engine.onMessage(({ positionEvaluation, possibleMate, pv, depth }) => {
      if (Number(depth) < 10) return;

      positionEvaluation &&
        setPositionEvaluation(
          (game.turn() === "w" ? 1 : -1) * Number(positionEvaluation)
        );

      possibleMate && setPossibleMate(possibleMate);
      depth && setDepth(depth);
      pv && setBestline(pv);
    });
  }, [engine, engineLevel, game, position]);

  const makeAMove = useCallback(
    (move: PlayerMove) => {
      return playerMove({ game, move, dispatch, setCustomSquare });
    },

    [game, dispatch]
  );

  const onDrop = (sourceSquare: Square, targetSquare: Square, piece: Piece) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: piece[1].toLowerCase() ?? "q",
    });
    setPossibleMate("");
    dispatch({
      type: UPDATE_POSITION,
    });

    if (move === null) return false;
    engine.stop();
    setBestline("");

    if (game.isGameOver() || game.isDraw()) return false;

    return true;
  };

  const onPieceDragBegin = (piece: string, sourceSquare: Square) => {
    getMoveOptions({ game, square: sourceSquare, setCustomSquare });
  };

  const onPieceDragEnd = () => {
    setCustomSquare({ options: {} });
  };

  const onSquareClick = (square: Square) => {
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
    if (!game.isGameOver() || game.isDraw()) {
      setTimeout(findBestMove, 300);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [position]);

  const bestMove = bestLine?.split(" ")?.[0];

  return (
    <div className="max-w-6xl m-auto w-full mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-around gap-5">
      <div className="w-full lg:w-1/2 inline-flex flex-col justify-center items-center gap-3">
        <h4>
          Position Evaluation:{" "}
          {possibleMate ? `#${possibleMate}` : positionEvaluation}
          {"; "}
          Depth: {depth}
        </h4>
        <h5>
          Best line: <i>{bestLine.slice(0, 40)}</i> ...
        </h5>
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
          customArrows={
            bestMove && [
              [
                bestMove.substring(0, 2) as Square,
                bestMove.substring(2, 4) as Square,
                "rgb(0, 128, 0)",
              ],
            ]
          }
          boardOrientation={player.color === "w" ? "white" : "black"}
        />
      </div>

      <div className="w-full lg:w-1/2 h-full inline-flex justify-center items-center">
        <GameDetails />
      </div>
    </div>
  );
};

export default AnalysisBoard;

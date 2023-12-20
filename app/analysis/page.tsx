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

import { CustomSquares } from "@/lib/types";
import { Chessboard } from "@/components/chessboard";

import { Button } from "@/components/ui";
import { GameContext } from "@/context";
import { gameReducer, initialState } from "@/reducers/game";
import { CHOOSE_COLOR, RESTART, UNDO, UPDATE_POSITION } from "@/reducers/types";

type Move = {
  from: string;
  to: string;
  promotion?: string;
};

const AnalysisBoard = () => {
  const { setValue } = useContext(GameContext);
  const [value, dispatch] = useReducer(gameReducer, initialState);
  const { game, engine, engineLevel, position, result, playerColor } = value;

  const [info, setInfo] = useState("");
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

  const getMoveList = () => {
    const history = game.history({ verbose: true });
    const movePairs = history
      .slice(history.length / 2)
      .map((_, i) => history.slice((i *= 2), i + 2));

    return movePairs.map((moves, i) => {
      return (
        <div className="flex items-center gap-1" key={i}>
          <div className="">{i + 1}.</div>
          <div className="">{moves[0].san}</div>
          {moves[1] && <div className="">{moves[1].san}</div>}
        </div>
      );
    });
  };

  const undo = () => {
    dispatch({
      type: UNDO,
    });
  };

  const restart = () => {
    setInfo("");
    dispatch({
      type: RESTART,
    });
  };

  useEffect(() => {
    dispatch({
      type: CHOOSE_COLOR,
      payload: "b",
    });
  }, []);

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
          info={info}
          position={position}
          onPieceDrop={onDrop}
          customArrows={
            bestMove && [
              [
                bestMove.substring(0, 2) as Square,
                bestMove.substring(2, 4) as Square,
                "rgb(0, 128, 0)",
              ],
            ]
          }
          customSquareStyles={{ ...customSquare.check }}
          boardOrientation={playerColor === "w" ? "white" : "black"}
        />
      </div>
      <div className="w-full lg:w-1/2 inline-flex flex-col justify-center items-center gap-3">
        <div className="w-full space-x-3">
          <Button onClick={undo}>Undo</Button>
          <Button onClick={restart}>Restart</Button>
        </div>
        <div className="w-full lg:w-4/5 h-80 border-2 border-black rounded-lg overflow-y-auto">
          <div className="w-full flex flex-wrap">{getMoveList()}</div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisBoard;

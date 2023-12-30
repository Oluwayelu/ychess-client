import Engine from "@/lib/engine";
import { Chess, Move, Square } from "chess.js";
import {
  ADD_INCREMENT_TO_OPPONENT_TIME,
  ADD_INCREMENT_TO_PLAYER_TIME,
  UPDATE_POSITION,
  UPDATE_RESULT,
} from "@/reducers/types";

import { Actions, CustomSquares, Player, PlayerMove, Side } from "@/lib/types";
import { Dispatch, SetStateAction } from "react";

export const bestMove = ({
  game,
  engine,
  position,
  engineLevel,
  dispatch,
  setCustomSquare,
}: {
  game: Chess;
  engine: Engine;
  position: string;
  engineLevel: number;
  dispatch: Dispatch<Actions>;
  setCustomSquare: Dispatch<SetStateAction<Partial<CustomSquares>>>;
}) => {
  engine.evaluatePosition(position, engineLevel);
  engine.onMessage(({ bestMove }) => {
    if (bestMove) {
      const result = game.move(bestMove);

      dispatch({
        type: UPDATE_POSITION,
      });

      let kingSquare = undefined;
      if (game.inCheck()) {
        const kingPos = game.board().reduce((acc, row, index) => {
          const squareIndex = row.findIndex(
            (square) =>
              square && square.type === "k" && square.color === game.turn()
          );
          return squareIndex >= 0
            ? `${String.fromCharCode(squareIndex + 97)}${8 - index}`
            : acc;
        }, "");

        kingSquare = {
          [kingPos]: {
            background:
              "radial-gradient(red, rgba(255,0,0,.4), transparent 70%)",
            borderRadius: "50%",
          },
        };
      }

      setCustomSquare({
        lastMove: {
          [result.from]: { background: "rgba(255, 255, 0, 0.4)" },
          [result.to]: { background: "rgba(255, 255, 0, 0.4)" },
        },
        check: kingSquare,
        options: {},
      });
    }
  });
};

export const playerMove = ({
  game,
  move,
  dispatch,
  setCustomSquare,
  side = "player",
}: {
  game: Chess;
  side?: Side;
  move: PlayerMove;
  dispatch: Dispatch<Actions>;
  setCustomSquare: Dispatch<SetStateAction<Partial<CustomSquares>>>;
}) => {
  try {
    const result = game.move(move);
    dispatch({
      type: UPDATE_POSITION,
    });

    if (side === "player") {
      dispatch({
        type: ADD_INCREMENT_TO_PLAYER_TIME,
      });
    } else {
      dispatch({
        type: ADD_INCREMENT_TO_OPPONENT_TIME,
      });
    }

    let kingSquare = undefined;
    if (game.inCheck()) {
      const kingPos = game.board().reduce((acc, row, index) => {
        const squareIndex = row.findIndex(
          (square) =>
            square && square.type === "k" && square.color === game.turn()
        );
        return squareIndex >= 0
          ? `${String.fromCharCode(squareIndex + 97)}${8 - index}`
          : acc;
      }, "");

      kingSquare = {
        [kingPos]: {
          background: "radial-gradient(red, rgba(255,0,0,.4), transparent 70%)",
          borderRadius: "50%",
        },
      };
    }

    setCustomSquare({
      lastMove: {
        [result.from]: { background: "rgba(255, 255, 0, 0.4)" },
        [result.to]: { background: "rgba(255, 255, 0, 0.4)" },
      },
      check: kingSquare,
      options: {},
    });

    return result;
  } catch (e) {
    setCustomSquare({ options: {} });
    return null;
  }
};

export const getMoveOptions = ({
  game,
  square,
  setCustomSquare,
}: {
  game: Chess;
  square: Square;
  setCustomSquare: Dispatch<SetStateAction<Partial<CustomSquares>>>;
}) => {
  const moves = game.moves({ square, verbose: true }) as Move[];

  if (moves.length === 0) {
    return;
  }

  const newSquares: {
    [square: string]: { background: string; borderRadius?: string };
  } = {};

  moves.map((move) => {
    newSquares[move.to] = {
      background:
        game.get(move.to as Square) &&
        game.get(move.to as Square)?.color !== game.get(square)?.color
          ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
          : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
      borderRadius: "50%",
    };
    return move;
  });

  newSquares[square] = {
    background: "rgba(255, 255, 0, 0.4)",
  };

  setCustomSquare({ options: newSquares });
};

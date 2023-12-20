import { useEffect, useCallback, Dispatch, SetStateAction } from "react";
import { useGame } from ".";
import { bestMove } from "@/helpers";
import { ADD_INCREMENT_TO_OPPONENT_TIME } from "@/reducers/types";
import { CustomSquares } from "../types";

export function useComputer(
  setCustomSquare: Dispatch<SetStateAction<Partial<CustomSquares>>>
) {
  const {
    value: { game, engine, engineLevel, position, result, player, opponent },
    dispatch,
  } = useGame();

  const findBestMove = useCallback(() => {
    bestMove({
      game,
      engine,
      position,
      engineLevel,
      dispatch,
      setCustomSquare,
    });
  }, [dispatch, engine, engineLevel, game, position, setCustomSquare]);

  useEffect(() => {
    if (game.turn() !== player.color && result === "") {
      setTimeout(() => {
        findBestMove();

        dispatch({
          type: ADD_INCREMENT_TO_OPPONENT_TIME,
        });
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [findBestMove, game.turn(), player.color]);
}

import { useEffect } from "react";

import { useGame } from "@/lib/hooks";
import { pad, formatTime } from "@/lib/utils";
import {
  UPDATE_OTHER_PLAYER_TIME,
  UPDATE_PLAYER_TIME,
  UPDATE_TIMER,
} from "@/reducers/types";

import { Player } from "@/lib/types";

interface Props {
  side: "player" | "opponent";
  player: Player;
}

export const Timer = ({ side, player }: Props) => {
  const {
    value: { game, moves },
    dispatch,
  } = useGame();

  useEffect(() => {
    if (moves.length !== 0) {
      if (game.turn() === player.color && player.timeControl.time.secs !== 0) {
        const interval = setInterval(() => {
          dispatch({
            type:
              side === "player" ? UPDATE_PLAYER_TIME : UPDATE_OTHER_PLAYER_TIME,
            payload: player.timeControl.time.secs - 1,
          });
        }, 1000);

        return () => clearInterval(interval);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, game.turn(), player.color, player.timeControl.time.secs, side]);

  // useEffect(() => {
  //   console.log("Next turn: ", player.timeControl);
  //   dispatch({
  //     type: side === "player" ? UPDATE_PLAYER_TIME : UPDATE_OTHER_PLAYER_TIME,
  //     payload: player.timeControl.time.secs + 60,
  //   });
  // }, []);

  const time = formatTime(player.timeControl.time.secs);

  return (
    <div className="bg-primary text-white p-3 md:p-5">
      <p className="lg:text-lg md:text-xl font-bold">
        {time.h !== 0 && <span>{pad(time.h)}:</span>}
        {pad(time.m)}:{pad(time.s)}
      </p>
    </div>
  );
};

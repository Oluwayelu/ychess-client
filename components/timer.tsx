import { useEffect } from "react";

import { useGame } from "@/lib/hooks";
import { pad, formatTime, cn } from "@/lib/utils";
import { UPDATE_OTHER_PLAYER_TIME, UPDATE_PLAYER_TIME } from "@/reducers/types";

import { Player, Side } from "@/lib/types";

interface Props {
  side: Side;
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

  const time = formatTime(player.timeControl.time.secs);

  return (
    <div
      className={cn(
        "h-fit px-4 py-2 rounded-lg",
        game.turn() === player.color
          ? "bg-secondary text-white"
          : "bg-white text-background"
      )}
    >
      <p className="lg:text-lg md:text-xl font-bold">
        {time.h !== 0 && <span>{pad(time.h)}:</span>}
        {pad(time.m)}:{pad(time.s)}
      </p>
    </div>
  );
};

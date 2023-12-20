import { useEffect } from "react";

import { useGame } from "@/lib/hooks";
import {
  UPDATE_OTHER_PLAYER_TIME,
  UPDATE_PLAYER_TIME,
  UPDATE_TIMER,
} from "@/reducers/types";

import type { Color } from "chess.js";
import { Player } from "@/lib/types";

interface Props {
  side: "player" | "other";
  player: Player;
}

const formatTime = (secs: number) => {
  const h = Math.floor(secs / 36000);
  const m = Math.floor(secs / 60) - h * 60;
  const s = Math.floor(secs - h * 3600 - m * 60);

  return { h, m, s };
};

export const Countdown = ({ side, player }: Props) => {
  const {
    value: { game },
    dispatch,
  } = useGame();

  useEffect(() => {
    if (game.turn() === player.color && player.timeControl.time.secs !== 0) {
      const interval = setInterval(() => {
        side === "player"
          ? dispatch({
              type: UPDATE_PLAYER_TIME,
              payload: player.timeControl.time.secs - 1,
            })
          : dispatch({
              type: UPDATE_OTHER_PLAYER_TIME,
              payload: player.timeControl.time.secs - 1,
            });
      }, 1000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, game.turn(), player.color, player.timeControl.time.secs, side]);

  const time = formatTime(player.timeControl.time.secs);

  const pad = (n: number) => (n < 10 ? `0${n}` : n);
  return (
    <div className="bg-white p-3 md:p-5">
      <p className="text-lg md:text-xl font-bold">
        {time.h !== 0 && <span>{pad(time.h)}:</span>}
        {pad(time.m)}:{pad(time.s)}
      </p>
    </div>
  );
};

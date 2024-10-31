import { Chess } from "chess.js";

import Engine from "@/lib/engine";
import type { Actions, GameType, PlayersColor } from "@/lib/types";
import {
  ADD_INCREMENT_TO_OPPONENT_TIME,
  ADD_INCREMENT_TO_PLAYER_TIME,
  CHOOSE_COLOR,
  CHOOSE_TIME,
  ENGING_LEVEL,
  PLAY_COMPUTER,
  RESTART,
  START_GAME,
  UNDO,
  UPDATE_OTHER_PLAYER_TIME,
  UPDATE_PLAYER_TIME,
  UPDATE_POSITION,
  UPDATE_RESULT,
  UPDATE_TIMER,
  UPDATE_PLAYER,
  CLEAR_GAME,
} from "./types";

export const initialState: GameType = {
  game: new Chess(),
  engine: new Engine(),
  moves: [],
  engineLevel: 10,
  result: "",
  isFlipped: false,
  isFrozen: false,
  autoQueen: false,
  showLegal: true,
  showRecent: true,
  position: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
  timeControl: {
    type: "Blitz",
    name: "3+2",
    time: { secs: 3 * 60, increment: 2 },
  },
  player: {
    name: "Player 1",
    color: "w",
    timeControl: {
      type: "Blitz",
      name: "3+2",
      time: { secs: 3 * 60, increment: 2 },
    },
  },
  opponent: {
    name: "Player 2",
    color: "b",
    timeControl: {
      type: "Blitz",
      name: "3+2",
      time: { secs: 3 * 60, increment: 2 },
    },
  },
};

export const gameReducer = (
  state: GameType,
  { type, payload }: Actions
): GameType => {
  switch (type) {
    case START_GAME:
      return { ...state };

    case CLEAR_GAME:
      return { ...initialState };

    case RESTART:
      state.game.reset();
      return {
        ...initialState,
        player: { ...state.player, timeControl: state.timeControl },
        opponent: { ...state.opponent, timeControl: state.timeControl },
      };

    case UNDO:
      state.game.undo();
      return { ...state, position: state.game.fen() };

    case UPDATE_POSITION:
      const history = state.game.history({ verbose: true });
      const moves = history
        .slice(history.length / 2)
        .map((_, i) => history.slice((i *= 2), i + 2));
      return {
        ...state,
        position: payload ? payload : state.game.fen(),
        moves: payload ? state.moves : moves,
      };

    case UPDATE_TIMER:
      const timer =
        payload.color === "w"
          ? {
              whiteTimer: payload.time,
              result: payload.time === 0 ? "White has Flaged, Black wins" : "",
            }
          : {
              blackTimer: payload.time,
              result: payload.time === 0 ? "Black has Flaged, white wins" : "",
            };

      return { ...state, ...timer };

    case UPDATE_PLAYER_TIME:
      return {
        ...state,
        player: {
          ...state.player,
          timeControl: {
            ...state.player.timeControl,
            time: { ...state.player.timeControl.time, secs: payload },
          },
        },
      };

    case UPDATE_OTHER_PLAYER_TIME:
      return {
        ...state,
        opponent: {
          ...state.opponent,
          timeControl: {
            ...state.opponent.timeControl,
            time: { ...state.opponent.timeControl.time, secs: payload },
          },
        },
      };

    case UPDATE_PLAYER:
      return { ...state, player: { ...state.player, name: payload.username } };

    case ADD_INCREMENT_TO_PLAYER_TIME:
      return {
        ...state,
        player: {
          ...state.player,
          timeControl: {
            ...state.player.timeControl,
            time: {
              ...state.player.timeControl.time,
              secs:
                state.player.timeControl.time.secs +
                state.player.timeControl.time.increment,
            },
          },
        },
      };
    case ADD_INCREMENT_TO_OPPONENT_TIME:
      return {
        ...state,
        opponent: {
          ...state.opponent,
          timeControl: {
            ...state.opponent.timeControl,
            time: {
              ...state.opponent.timeControl.time,
              secs:
                state.opponent.timeControl.time.secs +
                state.opponent.timeControl.time.increment,
            },
          },
        },
      };

    case UPDATE_RESULT:
      return { ...state, result: payload };

    case CHOOSE_TIME:
      return {
        ...state,
        timeControl: payload,
        opponent: {
          ...state.opponent,
          timeControl: payload,
        },
        player: {
          ...state.player,
          timeControl: payload,
        },
      };

    case CHOOSE_COLOR:
      const color: PlayersColor =
        payload === "random"
          ? Math.floor(Math.random() * 2) === 0
            ? {
                player: { ...state.player, color: "w" },
                opponent: { ...state.opponent, color: "b" },
              }
            : {
                player: { ...state.player, color: "b" },
                opponent: { ...state.opponent, color: "w" },
              }
          : payload === "w"
          ? {
              player: { ...state.player, color: "w" },
              opponent: { ...state.opponent, color: "b" },
            }
          : {
              player: { ...state.player, color: "b" },
              opponent: { ...state.opponent, color: "w" },
            };

      return { ...state, ...color };

    case PLAY_COMPUTER:
      return {
        ...state,
        position: state.game.fen(),
        timeControl: payload.time,
        engineLevel: payload.computer.engineLevel,
        opponent: {
          ...state.opponent,
          name: payload.computer.name,
          avatar: payload.computer.avatar,
          timeControl: payload.time,
        },
        player: {
          ...state.player,
          timeControl: payload.time,
        },
      };

    case ENGING_LEVEL:
      return { ...state, engineLevel: payload };

    default:
      return state;
  }
};

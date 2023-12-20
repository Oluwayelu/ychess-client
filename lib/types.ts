import Engine from "./engine";
import { Chess, Color, Move } from "chess.js";

export type Actions = {
  type: string;
  payload?: any;
};

export type PlayerMove = {
  from: string;
  to: string;
  promotion?: string;
};

export interface CustomSquares {
  options: { [square: string]: { background: string; borderRadius?: string } };
  lastMove: { [square: string]: { background: string } };
  rightClicked: { [square: string]: { backgroundColor: string } | undefined };
  check: { [square: string]: { background: string; borderRadius?: string } };
}

// export enum Status {
//   PLAYING = "PLAYING",
//   RESIGN = "RESIGN",
// }

export type GameType = {
  game: Chess;
  engine: Engine;
  // status: Status;
  engineLevel: number;
  position: string;
  moves: Move[][];
  result: string;
  isFlipped: boolean;
  isFrozen: boolean;
  autoQueen: boolean;
  showLegal: boolean;
  showRecent: boolean;
  player: Player;
  opponent: Player;
};

export type Status = "PLAYING" | "GAMEOVER" | "RESIGN" | "DRAW";

export interface Player {
  name: string;
  color: Color;
  avatar?: string;
  timeControl: TimeControl;
}

export type PlayersColor = {
  player: Player;
  opponent: Player;
};

export interface Computer {
  name: string;
  level: string;
  avatar: string;
  engineLevel: number;
  description: string;
}

export interface TimeControl {
  name: string;
  type: string;
  time: Time;
}

export interface Time {
  secs: number;
  increment: number;
}

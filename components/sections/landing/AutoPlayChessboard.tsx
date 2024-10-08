import { useState, useEffect, useRef } from "react";
// import Chessboard from "react-chessboard";
import { Chess } from "chess.js";
import { Chessboard } from "@/components/chessboard";
import { games } from "@/lib/CONSTANTS";

const AutoPlayChessboard = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [gameIndex, setGameIndex] = useState(0); // Track current game
  const [moveIndex, setMoveIndex] = useState(0); // Track current move in the game

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (moveIndex < games[gameIndex].length) {
        // Continue making moves for the current game
        const newGame = new Chess(game.fen());
        newGame.move(games[gameIndex][moveIndex]);
        setGame(newGame);
        setFen(newGame.fen());
        setMoveIndex((prev) => prev + 1);
      } else {
        // If the current game ends
        if (gameIndex < games.length - 1) {
          // Move to the next game
          setGameIndex((prev) => prev + 1);
        } else {
          setGameIndex(0); // Cycle back to the first game when the last game ends
        }

        setMoveIndex(0); // Reset move index for the next game
        setGame(new Chess()); // Reset game to a new instance
        setFen(new Chess().fen());
      }
    }, 3000); // 3 second interval between moves

    return () => clearInterval(intervalId); // Clean up on component unmount
  }, [gameIndex, moveIndex, game]);

  return <Chessboard disabled size="lg" position={fen} className="relative" />;
};

export default AutoPlayChessboard;

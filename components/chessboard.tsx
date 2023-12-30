import { cva, type VariantProps } from "class-variance-authority";
import { Chessboard as RChessboard } from "react-chessboard";

import { Timer } from "./timer";
import { cn } from "@/lib/utils";
import { Player } from "@/lib/types";

import type { ChessboardProps as RChessboardProps } from "react-chessboard/dist/chessboard/types";

const chessboardVariants = cva(
  "relative inline-flex flex-col items-center justify-center",
  {
    variants: {
      size: {
        md: "w-80 h-80",
        sm: "w-60 h-60",
        lg: "w-full md:w-3/4 h-fit ",
      },
      defaultVariants: {
        size: "md",
      },
    },
  }
);

export interface ChessboardProps
  extends Pick<
      RChessboardProps,
      | "position"
      | "onPieceDrop"
      | "customSquareStyles"
      | "boardOrientation"
      | "onSquareClick"
      | "customArrows"
      | "onPieceDragEnd"
      | "onPieceDragBegin"
      | "arePremovesAllowed"
    >,
    VariantProps<typeof chessboardVariants> {
  info?: string;
  disabled?: boolean;
  className?: string;
  player?: Player;
  opponent?: Player;
  customArrows?: any;
}

const Chessboard = ({
  info,
  disabled,
  className,
  player,
  opponent,
  size = "md",
  ...props
}: ChessboardProps) => {
  return (
    <div className={cn(chessboardVariants({ size, className }))}>
      {opponent && (
        <div className="w-full flex items-center justify-between">
          <div>
            <p className="lg:text-lg font-bold">{opponent.name}</p>
          </div>
          <Timer player={opponent} side="opponent" />
        </div>
      )}
      <div className="w-full h-full relative">
        {(info || disabled) && (
          <div className="w-full h-full bg-foreground/30 absolute inset-0 flex items-center justify-center z-30">
            {info && (
              <div className="w-full py-5 text-center bg-background">
                <p className="text-lg lg:text-xl font-medium">{info}</p>
              </div>
            )}
          </div>
        )}
        <RChessboard
          {...props}
          customDarkSquareStyle={{ backgroundColor: "#4b7399" }}
          customLightSquareStyle={{ backgroundColor: "hsl(var(--secondary))" }}
        />
      </div>
      {player && (
        <div className="w-full flex items-center justify-between">
          <div>
            <p className="lg:text-lg font-bold">{player.name}</p>
          </div>
          <Timer player={player} side="player" />
        </div>
      )}
    </div>
  );
};

Chessboard.displayName = "Chessboard";

export { Chessboard };

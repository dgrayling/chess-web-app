import React from "react";
import type { ChessSquareStatus } from "../types/chess";

export type ChessBoardContextType = {
  board: ChessSquareStatus[][];
  movePiece: (
    from: { row: number; column: number },
    to: { row: number; column: number }
  ) => void;
  trackClick: (row: number, column: number) => void;
};

export const ChessBoardContext = React.createContext<ChessBoardContextType>({
  board: [],
  movePiece: () => {},
  trackClick: () => {},
});

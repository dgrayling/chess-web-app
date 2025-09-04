import React from "react";
import type { ChessSquareState } from "../types/chess";

export type ChessBoardContextType = {
  board: ChessSquareState[][];
  movePiece: (
    from: { row: number; column: number },
    to: { row: number; column: number }
  ) => void;
};

export const ChessBoardContext = React.createContext<ChessBoardContextType>({
  board: [],
  movePiece: () => {},
});

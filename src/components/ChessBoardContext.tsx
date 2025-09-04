import React from "react";
import type { ChessSquareState } from "./ChessGrid";

export type ChessBoardContextType = {
  board: ChessSquareState[][];
  movePiece: (
    from: { row: number; col: number },
    to: { row: number; col: number }
  ) => void;
};

export const ChessBoardContext = React.createContext<ChessBoardContextType>({
  board: [],
  movePiece: () => {},
});

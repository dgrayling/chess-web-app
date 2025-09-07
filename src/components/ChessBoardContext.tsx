import React from "react";
import type { ChessSquareState, ChessSquareStatus } from "../types/chess";

export type ChessBoardContextType = {
  board: ChessSquareStatus[][];
  movePiece: (
    from: { row: number; column: number },
    to: { row: number; column: number }
  ) => void;
  trackClick: (chessSquareState: ChessSquareState) => void;
};

export const ChessBoardContext = React.createContext<ChessBoardContextType>({
  board: [],
  movePiece: () => {},
  trackClick: () => {},
});

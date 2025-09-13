import React from "react";
import type {
  ChessSquareState,
  ChessSquareStatus,
} from "../../../common/types/chess";

export type ChessBoardContextType = {
  board: ChessSquareStatus[];
  movePiece: (from: ChessSquareState, to: ChessSquareState) => void;
  resetBoard: () => void;
  trackClick: (chessSquareState: ChessSquareState) => void;
};

export const ChessBoardContext = React.createContext<ChessBoardContextType>({
  board: [],
  movePiece: () => {},
  resetBoard: () => {},
  trackClick: () => {},
});

export const boardSize = 8;

export type PieceType =
  | "Pawn"
  | "Rook"
  | "Knight"
  | "Bishop"
  | "Queen"
  | "King";
export type PieceColor = "White" | "Black";

export type ChessSquareStatus =
  | { occupied: false }
  | { occupied: true; piece: { type: PieceType; color: PieceColor } };

export type BoardState = ChessSquareStatus[][];

export type ChessSquareState = {
  row: number;
  column: number;
  status: ChessSquareStatus;
};

export interface ChessBoardContextType {
  board: BoardState;
  updateBoard: (updater: (draft: BoardState) => void) => void;
  movePiece: (
    from: { row: number; column: number },
    to: { row: number; column: number }
  ) => void;
}

export const initialBoard: BoardState = Array(boardSize)
  .fill(null)
  .map(() => Array(8).fill({ status: "empty" } as const));

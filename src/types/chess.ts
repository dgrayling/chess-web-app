export type PieceType = "Pawn" | "Rook" | "Knight" | "Bishop" | "Queen" | "King";
export type PieceColor = "White" | "Black";

export type ChessSquareState =
  | { status: "empty" }
  | { status: "occupied"; piece: { type: PieceType; color: PieceColor } };

export type BoardState = ChessSquareState[][];

export interface ChessBoardContextType {
  board: BoardState;
  updateBoard: (updater: (draft: BoardState) => void) => void;
  movePiece: (
    from: { row: number; column: number },
    to: { row: number; column: number }
  ) => void;
}

export const initialBoard: BoardState = Array(8).fill(null).map(() => 
  Array(8).fill({ status: 'empty' } as const)
);

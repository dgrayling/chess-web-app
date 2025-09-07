import { useState } from "react";
import { ChessBoardContext } from "../components/ChessBoardContext";
import {
  boardSize,
  type ChessSquareState,
  type ChessSquareStatus,
  type PieceColor,
  type PieceType,
} from "../types/chess";

const positionState: [number, number, PieceColor, PieceType][] = [
  [7, 0, "White", "Rook"],
  [7, 7, "White", "Rook"],
  [0, 0, "Black", "Rook"],
  [0, 7, "Black", "Rook"],
  [7, 1, "White", "Knight"],
  [7, 6, "White", "Knight"],
  [0, 1, "Black", "Knight"],
  [0, 6, "Black", "Knight"],
  [7, 2, "White", "Bishop"],
  [7, 5, "White", "Bishop"],
  [0, 2, "Black", "Bishop"],
  [0, 5, "Black", "Bishop"],
  [7, 3, "White", "Queen"],
  [0, 3, "Black", "Queen"],
  [7, 4, "White", "King"],
  [0, 4, "Black", "King"],
  [6, 0, "White", "Pawn"],
  [6, 1, "White", "Pawn"],
  [6, 2, "White", "Pawn"],
  [6, 3, "White", "Pawn"],
  [6, 4, "White", "Pawn"],
  [6, 5, "White", "Pawn"],
  [6, 6, "White", "Pawn"],
  [6, 7, "White", "Pawn"],
  [1, 0, "Black", "Pawn"],
  [1, 1, "Black", "Pawn"],
  [1, 2, "Black", "Pawn"],
  [1, 3, "Black", "Pawn"],
  [1, 4, "Black", "Pawn"],
  [1, 5, "Black", "Pawn"],
  [1, 6, "Black", "Pawn"],
  [1, 7, "Black", "Pawn"],
];

const generateBoard = () => {
  const stateMatrix: ChessSquareStatus[][] = Array.from(
    { length: boardSize },
    () =>
      Array.from({ length: boardSize }, () => ({
        occupied: false,
      }))
  );

  positionState.forEach(([row, column, color, type]) => {
    stateMatrix[row][column] = {
      occupied: true,
      piece: { type, color },
    };
  });

  return stateMatrix;
};

const initialBoard = generateBoard();

export const ChessBoardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [board, setBoard] = useState(initialBoard);

  const movePiece = (
    from: { row: number; column: number },
    to: { row: number; column: number }
  ): boolean => {
    let success = false;

    setBoard((currentBoard) => {
      const boardClone = currentBoard.map((row) => [...row]);
      const fromPiece = boardClone[from.row][from.column];

      if (fromPiece.occupied) {
        boardClone[from.row][from.column] = { occupied: false };
        boardClone[to.row][to.column] = fromPiece;
        success = true;
      }

      return boardClone;
    });

    return success;
  };

  const [previous, setLastClicked] = useState<ChessSquareState | null>(null);

  const trackClick = (current: ChessSquareState) => {
    if (current.status.occupied) {
      setLastClicked(current);
    } else if (!current.status.occupied && previous) {
      movePiece(previous, current);
      setLastClicked(null);
    } else {
      setLastClicked(current);
    }
  };

  return (
    <ChessBoardContext.Provider value={{ board, movePiece, trackClick }}>
      {children}
    </ChessBoardContext.Provider>
  );
};

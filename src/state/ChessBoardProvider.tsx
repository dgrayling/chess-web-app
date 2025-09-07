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

const validateMove = (from: ChessSquareState, to: ChessSquareState) => {
  // Only move a piece if there is a piece to move
  if (!from.status.occupied) return false;

  // Don't kill your own team
  if (to.status.occupied && from.status.piece?.color === to.status.piece?.color)
    return false;

  const dx = from.column - to.column;
  const dy = from.row - to.row;

  console.log(dx, dy);

  switch (from.status.piece?.type) {
    case "Rook":
      return (dx === 0 && dy !== 0) || (dy === 0 && dx !== 0);

    case "Bishop":
      return Math.abs(dx) === Math.abs(dy) && dx !== 0;

    case "Queen":
      return (
        (dx === 0 && dy !== 0) ||
        (dy === 0 && dx !== 0) ||
        (Math.abs(dx) === Math.abs(dy) && dx !== 0)
      );

    case "Knight":
      return (
        (Math.abs(dx) === 2 && Math.abs(dy) === 1) ||
        (Math.abs(dx) === 1 && Math.abs(dy) === 2)
      );

    case "King":
      return Math.max(Math.abs(dx), Math.abs(dy)) === 1;

    // Move forward for white, backward for black, 2 steps on first move
    case "Pawn":
      if (from.status.piece?.color === "White") {
        return (
          (dy === 1 && dx === 0) || (dy === 2 && dx === 0 && from.row === 6)
        );
      } else {
        return (
          (dy === -1 && dx === 0) || (dy === -2 && dx === 0 && from.row === 1)
        );
      }
  }
};

export const ChessBoardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [board, setBoard] = useState(initialBoard);

  const movePiece = (from: ChessSquareState, to: ChessSquareState): boolean => {
    let success = false;

    setBoard((currentBoard) => {
      const boardClone = [...currentBoard];

      if (validateMove(from, to)) {
        boardClone[from.row][from.column] = { occupied: false };
        boardClone[to.row][to.column] = from.status;
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
    } else if (previous) {
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

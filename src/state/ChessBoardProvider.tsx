import { useCallback, useState } from "react";
import { ChessBoardContext } from "../components/ChessBoardContext";

const size = 8;

type PieceType = "Pawn" | "Rook" | "Knight" | "Bishop" | "Queen" | "King";
type PieceColor = "White" | "Black";
export type ChessSquareStatus =
  | { status: "empty" }
  | { status: "occupied"; piece: { type: PieceType; color: PieceColor } };

type ChessSquareState = {
  row: number;
  column: number;
  status: ChessSquareStatus;
};

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
  const stateMatrix: ChessSquareStatus[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      status: "empty",
    }))
  );

  positionState.forEach(([row, column, color, type]) => {
    stateMatrix[row][column] = {
      status: "occupied",
      piece: { type, color },
    };
  });

  return stateMatrix;
};

const initialBoard = generateBoard();

function calculateValidityOfMove(
  fromState: ChessSquareState,
  toState: ChessSquareState
) {
  if (fromState.status.status === "empty") {
    return false;
  }

  if (toState.status.status === "occupied") {
    return false;
  }

  // Rooks can move horizontally and vertically
  if (fromState.status.piece.type === "Rook") {
    if (fromState.row !== toState.row && fromState.column !== toState.column) {
      return false;
    }
  }

  return true;
}

export const ChessBoardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [board, setBoard] = useState(initialBoard);

  const movePiece = useCallback(
    (from: ChessSquareState, to: ChessSquareState) => {
      setBoard((currentBoard) => {
        const boardClone = currentBoard.map((row) => [...row]);

        boardClone[from.row][from.column] = { status: "empty" };
        boardClone[to.row][to.column] = from.status;

        return boardClone;
      });
    },
    []
  );

  const [clickedSquare, setClickedSquare] = useState<ChessSquareState | null>(
    null
  );

  const trackClick = (row: number, column: number) => {
    if (clickedSquare) {
      movePiece(clickedSquare, { row, column, status: board[row][column] });
      setClickedSquare(null);
    } else if (board[row][column].status === "occupied") {
      setClickedSquare({ row, column, status: board[row][column] });
    }
  };

  return (
    <ChessBoardContext.Provider value={{ board, movePiece, trackClick }}>
      {children}
    </ChessBoardContext.Provider>
  );
};

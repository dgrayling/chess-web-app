import { useCallback, useEffect, useReducer, useState } from "react";
import { ChessBoardContext } from "../components/ChessBoardContext";

const size = 8;

type PieceType = "Pawn" | "Rook" | "Knight" | "Bishop" | "Queen" | "King";
type PieceColor = "White" | "Black";
export type ChessSquareState =
  | { status: "empty" }
  | { status: "occupied"; piece: { type: PieceType; color: PieceColor } };

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
  const stateMatrix: ChessSquareState[][] = Array.from({ length: size }, () =>
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

export const ChessBoardProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [board, setBoard] = useState(initialBoard);

  const movePiece = useCallback(
    (
      from: { row: number; column: number },
      to: { row: number; column: number }
    ) => {
      setBoard((currentBoard) => {
        const boardClone = currentBoard.map((row) => [...row]);
        const fromState = boardClone[from.row][from.column];
        const toState = boardClone[to.row][to.column];

        if (fromState.status === "empty") {
          return currentBoard;
        }

        if (toState.status === "occupied") {
          return currentBoard;
        }

        boardClone[from.row][from.column] = { status: "empty" };
        boardClone[to.row][to.column] = {
          status: "occupied",
          piece: fromState.piece,
        };

        return boardClone;
      });
    },
    []
  );

  interface SquarePosition {
    row: number;
    column: number;
  }

  type Action =
    | { type: "click"; row: number; column: number }
    | { type: "reset" };

  const [previousSquares, dispatch] = useReducer(
    (state: SquarePosition[], action: Action): SquarePosition[] => {
      switch (action.type) {
        case "click":
          return [...state, { row: action.row, column: action.column }];
        case "reset":
          return [];
        default:
          return state;
      }
    },
    [] as SquarePosition[]
  );

  useEffect(() => {
    console.log("previousSquares", previousSquares);
    if (previousSquares.length === 2) {
      movePiece(previousSquares[0], previousSquares[1]);
      dispatch({ type: "reset" });
    }
  }, [previousSquares, movePiece]);

  const trackClick = (row: number, column: number) => {
    dispatch({ type: "click", row, column });
  };

  return (
    <ChessBoardContext.Provider value={{ board, movePiece, trackClick }}>
      {children}
    </ChessBoardContext.Provider>
  );
};

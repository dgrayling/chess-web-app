import ChessSquare from "./ChessSquare";

const size = 8;

type ChessSquareImmutable = {
  row: number;
  column: number;
  id: string;
};

type PieceType = "Pawn" | "Rook" | "Knight" | "Bishop" | "Queen" | "King";
type PieceColor = "White" | "Black";
export type ChessSquareState =
  | { status: "empty" }
  | { status: "occupied"; piece: { type: PieceType; color: PieceColor } };

const boardMatrix: ChessSquareImmutable[][] = Array.from(
  { length: size },
  (_, rowIndex) =>
    Array.from({ length: size }, (_, colIndex) => ({
      row: rowIndex,
      column: colIndex,
      id: `${rowIndex}${colIndex}`,
    }))
);

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

const generateStateMatrix = () => {
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

export default function ChessGrid() {
  const stateMatrix = generateStateMatrix();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size}, 100px)`,
        gridTemplateRows: `repeat(${size}, 100px)`,
      }}
    >
      {boardMatrix.map((row) =>
        row.map((cell) => (
          <ChessSquare
            key={cell.id}
            {...cell}
            state={stateMatrix[cell.row][cell.column]}
          />
        ))
      )}
    </div>
  );
}

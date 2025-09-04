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

type ChessSquare = ChessSquareImmutable & {
  state: ChessSquareState;
};

const matrix: ChessSquare[][] = Array.from({ length: size }, (_, rowIndex) =>
  Array.from({ length: size }, (_, colIndex) => ({
    row: rowIndex,
    column: colIndex,
    id: `${rowIndex}${colIndex}`,
    state: { status: "empty" },
  }))
);

matrix[6][0].state = {
  status: "occupied",
  piece: { type: "Pawn", color: "White" },
};
matrix[6][1].state = {
  status: "occupied",
  piece: { type: "Pawn", color: "White" },
};
matrix[6][2].state = {
  status: "occupied",
  piece: { type: "Pawn", color: "White" },
};
matrix[6][3].state = {
  status: "occupied",
  piece: { type: "Pawn", color: "White" },
};
matrix[6][4].state = {
  status: "occupied",
  piece: { type: "Pawn", color: "White" },
};
matrix[6][5].state = {
  status: "occupied",
  piece: { type: "Pawn", color: "White" },
};
matrix[6][6].state = {
  status: "occupied",
  piece: { type: "Pawn", color: "White" },
};
matrix[6][7].state = {
  status: "occupied",
  piece: { type: "Pawn", color: "White" },
};

matrix[1][0].state = {
  status: "occupied",
  piece: { type: "Pawn", color: "Black" },
};
matrix[1][1].state = {
  status: "occupied",
  piece: { type: "Pawn", color: "Black" },
};
matrix[1][2].state = {
  status: "occupied",
  piece: { type: "Pawn", color: "Black" },
};
matrix[1][3].state = {
  status: "occupied",
  piece: { type: "Pawn", color: "Black" },
};
matrix[1][4].state = {
  status: "occupied",
  piece: { type: "Pawn", color: "Black" },
};
matrix[1][5].state = {
  status: "occupied",
  piece: { type: "Pawn", color: "Black" },
};
matrix[1][6].state = {
  status: "occupied",
  piece: { type: "Pawn", color: "Black" },
};
matrix[1][7].state = {
  status: "occupied",
  piece: { type: "Pawn", color: "Black" },
};

matrix[0][0].state = {
  status: "occupied",
  piece: { type: "Rook", color: "White" },
};
matrix[0][1].state = {
  status: "occupied",
  piece: { type: "Knight", color: "White" },
};
matrix[0][2].state = {
  status: "occupied",
  piece: { type: "Bishop", color: "White" },
};
matrix[0][3].state = {
  status: "occupied",
  piece: { type: "Queen", color: "White" },
};
matrix[0][4].state = {
  status: "occupied",
  piece: { type: "King", color: "White" },
};
matrix[0][5].state = {
  status: "occupied",
  piece: { type: "Bishop", color: "White" },
};
matrix[0][6].state = {
  status: "occupied",
  piece: { type: "Knight", color: "White" },
};
matrix[0][7].state = {
  status: "occupied",
  piece: { type: "Rook", color: "White" },
};

matrix[7][0].state = {
  status: "occupied",
  piece: { type: "Rook", color: "Black" },
};
matrix[7][1].state = {
  status: "occupied",
  piece: { type: "Knight", color: "Black" },
};
matrix[7][2].state = {
  status: "occupied",
  piece: { type: "Bishop", color: "Black" },
};
matrix[7][3].state = {
  status: "occupied",
  piece: { type: "Queen", color: "Black" },
};
matrix[7][4].state = {
  status: "occupied",
  piece: { type: "King", color: "Black" },
};
matrix[7][5].state = {
  status: "occupied",
  piece: { type: "Bishop", color: "Black" },
};
matrix[7][6].state = {
  status: "occupied",
  piece: { type: "Knight", color: "Black" },
};
matrix[7][7].state = {
  status: "occupied",
  piece: { type: "Rook", color: "Black" },
};

export default function ChessGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size}, 100px)`,
        gridTemplateRows: `repeat(${size}, 100px)`,
      }}
    >
      {matrix.map((row) =>
        row.map((cell) => (
          <ChessSquare key={cell.id} {...cell} state={cell.state} />
        ))
      )}
    </div>
  );
}

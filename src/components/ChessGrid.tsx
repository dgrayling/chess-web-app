import ChessSquare from "./ChessSquare";

const size = 10;

type Cell = {
  row: number;
  column: number;
  id: string;
};

const matrix: Cell[][] = Array.from({ length: size }, (_, rowIndex) =>
  Array.from({ length: size }, (_, colIndex) => ({
    row: rowIndex, // rows 1..10
    column: colIndex, // cols 1..10
    id: `${rowIndex}${colIndex}`,
  }))
);

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
        row.map((cell) => <ChessSquare key={cell.id} {...cell} />)
      )}
    </div>
  );
}

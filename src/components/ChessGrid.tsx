import ChessSquare from "./ChessSquare";

const size = 8;

type Cell = {
  row: number;
  column: number;
  id: string;
};

const matrix: Cell[][] = Array.from({ length: size }, (_, rowIndex) =>
  Array.from({ length: size }, (_, colIndex) => ({
    row: rowIndex,
    column: colIndex,
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

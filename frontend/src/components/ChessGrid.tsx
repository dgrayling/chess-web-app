import ChessSquare from "./ChessSquare";

export type ChessSquareImmutable = {
  row: number;
  column: number;
  id: string;
};

const size = 8;

const boardMatrix: ChessSquareImmutable[] = Array.from(
  { length: size * size },
  (_, i) => ({ row: Math.floor(i / size), column: i % size, id: i.toString() })
);

export default function ChessGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size}, 100px)`,
        gridTemplateRows: `repeat(${size}, 100px)`,
        gap: "2px",
        background: "black",
      }}
    >
      {boardMatrix.map((cell, id) => (
        <ChessSquare key={id} {...cell} />
      ))}
    </div>
  );
}

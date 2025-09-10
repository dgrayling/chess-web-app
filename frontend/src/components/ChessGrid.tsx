import { ChessBoardProvider } from "../state/ChessBoardProvider";
import ChessSquare from "./ChessSquare";

export type ChessSquareImmutable = {
  row: number;
  column: number;
  id: string;
};

const size = 8;

const boardMatrix: ChessSquareImmutable[][] = Array.from(
  { length: size },
  (_, rowIndex) =>
    Array.from({ length: size }, (_, colIndex) => ({
      row: rowIndex,
      column: colIndex,
      id: `${rowIndex}${colIndex}`,
    }))
);

export default function ChessGrid() {
  return (
    <ChessBoardProvider>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${size}, 100px)`,
          gridTemplateRows: `repeat(${size}, 100px)`,
          gap: "2px",
          background: "black",
        }}
      >
        {boardMatrix.map((row) =>
          row.map((cell) => <ChessSquare key={cell.id} {...cell} />)
        )}
      </div>
    </ChessBoardProvider>
  );
}

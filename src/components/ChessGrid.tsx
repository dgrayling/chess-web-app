import { squareGenerator } from "../utils/squareGenerator";
import ChessSquare from "./ChessSquare.tsx";

const generateSquares = () => {
  const squares: Record<string, { row: number; column: number }> = {};

  Array.from({ length: 100 }, (_, i) => {
    const square = squareGenerator().next().value;
    const index = i.toString();
    squares[index] = square;
  });

  return squares;
};

const squares = generateSquares();

export default function ChessGrid() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(10, 100px)",
        gridTemplateRows: "repeat(10, 100px)",
      }}
    >
      {Object.entries(squares).map(([key, value]) => (
        <ChessSquare key={key} row={value.row} column={value.column} />
      ))}
    </div>
  );
}

export default function ChessSquare({
  row,
  column,
}: {
  row: number;
  column: number;
}) {
  return (
    <div>
      <p>Row:{row}</p>
      <p>Column:{column}</p>
    </div>
  );
}

export function* squareGenerator(): Generator<{ row: number; column: number }> {
  let row = -1;
  let column = -1;

  while (true) {
    row++;
    column++;

    yield {
      row,
      column,
    };
  }
}

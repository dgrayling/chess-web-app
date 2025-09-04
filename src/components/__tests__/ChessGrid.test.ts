import { squareGenerator } from '../../utils/squareGenerator';

describe('squareGenerator', () => {
  it("should generate sequential square coordinates", () => {
    const generator = squareGenerator();

    // Test first few values
    expect(generator.next().value).toEqual({ row: 0, column: 0 });
    expect(generator.next().value).toEqual({ row: 1, column: 1 });
    expect(generator.next().value).toEqual({ row: 2, column: 2 });
    expect(generator.next().value).toEqual({ row: 3, column: 3 });
  });

  it("should be an infinite generator", () => {
    const generator = squareGenerator();

    // Test that we can get many values
    for (let i = 0; i < 100; i++) {
      const { value, done } = generator.next();
      expect(value).toEqual({ row: i, column: i });
      expect(done).toBe(false);
    }
  });
});

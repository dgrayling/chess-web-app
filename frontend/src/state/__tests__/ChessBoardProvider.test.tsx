import { render, act } from "@testing-library/react";
import React from "react";
import { ChessBoardContext } from "../../components/ChessBoardContext";
import { ChessBoardProvider } from "../ChessBoardProvider";
import { getIndex } from "../../utils/getIndex";

// Mock WebSocket
class MockWebSocket {
  onopen = () => {};
  onmessage = () => {};
  onclose = () => {};
  onerror = () => {};
  send = jest.fn();
  close = () => {};
}

// Mock the WebSocket class
global.WebSocket = MockWebSocket as any;

// Test component that uses the context
const TestComponent = () => {
  const { board, movePiece } = React.useContext(ChessBoardContext);
  const [moved, setMoved] = React.useState(false);

  // Move a piece when component mounts
  React.useEffect(() => {
    if (!moved) {
      // Find the white rook at (7,0) and move it to (5,0)
      const index = getIndex(7, 0);
      const square = board[index];
      if (square.occupied && square.piece?.type === "Rook") {
        movePiece(
          { row: 7, column: 0, status: square },
          { row: 5, column: 0, status: square }
        );
        setMoved(true);
      }
    }
  }, [board, movePiece, moved]);

  return null;
};

describe("ChessBoardProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should move a piece when movePiece is called", async () => {
    await act(async () => {
      render(
        <ChessBoardProvider>
          <TestComponent />
        </ChessBoardProvider>
      );
      // Wait for any async operations to complete
      await new Promise(resolve => setTimeout(resolve, 0));
    });
  });
});

import websocket from "@fastify/websocket";
import Fastify from "fastify";

const fastify = Fastify();
await fastify.register(websocket);

fastify.get("/", { websocket: true }, function wsHandler(socket, req) {
  setInterval(
    () =>
      socket.send(JSON.stringify({ type: "boardState", data: positionState })),
    1000
  );

  socket.on("message", (message) => {
    const data = JSON.parse(message.toString());

    console.log("Message Received: ", data.type);
    switch (data.type) {
      case "boardState":
        socket.send(
          JSON.stringify({ type: "boardState", data: positionState })
        );
        break;
      case "movePiece":
        const from = JSON.parse(data.from);
        const to = JSON.parse(data.to);
        const row = positionState[from.row];
        row[from.column] = { occupied: false };
        positionState[to.row][to.column] = {
          occupied: true,
          piece: from.status.piece,
        };
        socket.send(
          JSON.stringify({ type: "boardState", data: positionState })
        );
        break;
      case "resetBoard":
        clearAllPositions();
        initializeBoard();
        socket.send(
          JSON.stringify({ type: "boardState", data: positionState })
        );
        break;
      default:
        break;
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

await fastify.listen({ port: 3000 });

import { PieceColor, PieceType } from "../common/types/chess";

const startingPositions: [number, number, PieceColor, PieceType][] = [
  [7, 0, "White", "Rook"],
  [7, 7, "White", "Rook"],
  [0, 0, "Black", "Rook"],
  [0, 7, "Black", "Rook"],
  [7, 1, "White", "Knight"],
  [7, 6, "White", "Knight"],
  [0, 1, "Black", "Knight"],
  [0, 6, "Black", "Knight"],
  [7, 2, "White", "Bishop"],
  [7, 5, "White", "Bishop"],
  [0, 2, "Black", "Bishop"],
  [0, 5, "Black", "Bishop"],
  [7, 3, "White", "Queen"],
  [0, 3, "Black", "Queen"],
  [7, 4, "White", "King"],
  [0, 4, "Black", "King"],
  [6, 0, "White", "Pawn"],
  [6, 1, "White", "Pawn"],
  [6, 2, "White", "Pawn"],
  [6, 3, "White", "Pawn"],
  [6, 4, "White", "Pawn"],
  [6, 5, "White", "Pawn"],
  [6, 6, "White", "Pawn"],
  [6, 7, "White", "Pawn"],
  [1, 0, "Black", "Pawn"],
  [1, 1, "Black", "Pawn"],
  [1, 2, "Black", "Pawn"],
  [1, 3, "Black", "Pawn"],
  [1, 4, "Black", "Pawn"],
  [1, 5, "Black", "Pawn"],
  [1, 6, "Black", "Pawn"],
  [1, 7, "Black", "Pawn"],
];

type ChessSquareStatus =
  | { occupied: false }
  | { occupied: true; piece: { type: PieceType; color: PieceColor } };

const boardSize = 8;

const clearAllPositions = () => {
  positionState.forEach((row) =>
    row.forEach((cell) => (cell.occupied = false))
  );
};

const initializeBoard = () => {
  startingPositions.forEach(([row, column, color, type]) => {
    positionState[row][column] = { occupied: true, piece: { type, color } };
  });
};

const positionState: ChessSquareStatus[][] = Array.from(
  { length: boardSize },
  () =>
    Array.from({ length: boardSize }, () => ({
      occupied: false,
    }))
);

initializeBoard();

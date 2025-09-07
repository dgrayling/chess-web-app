import { useContext } from "react";
import type { ChessSquareStatus } from "../types/chess";
import {
  ChessBoardContext,
  type ChessBoardContextType,
} from "./ChessBoardContext";
import type { ChessSquareImmutable } from "./ChessGrid";

// Using public directory for assets to ensure they're copied as-is during build
const filePathPrefix = "/chess-web-app/chess-pieces/";

const pieceImages = {
  White: {
    Pawn: "wP.svg",
    Rook: "wR.svg",
    Knight: "wN.svg",
    Bishop: "wB.svg",
    Queen: "wQ.svg",
    King: "wK.svg",
  },
  Black: {
    Pawn: "bP.svg",
    Rook: "bR.svg",
    Knight: "bN.svg",
    Bishop: "bB.svg",
    Queen: "bQ.svg",
    King: "bK.svg",
  },
} as const;

function convertChessSquareStateToImage(state: ChessSquareStatus) {
  if (!state.occupied) return undefined;

  const color = state.piece.color as keyof typeof pieceImages;
  const type = state.piece.type as keyof (typeof pieceImages)[typeof color];
  return filePathPrefix + pieceImages[color][type];
}

const style = {
  background: "#f0d9b5",
};

export default function ChessSquare({ row, column }: ChessSquareImmutable) {
  const context = useContext<ChessBoardContextType>(ChessBoardContext);

  const imageSrc = convertChessSquareStateToImage(context.board[row][column]);

  return (
    <div style={style} onClick={() => context.trackClick(row, column)}>
      {imageSrc ? <img src={imageSrc} alt=""></img> : null}
    </div>
  );
}

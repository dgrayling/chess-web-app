import { useContext } from "react";
import type { ChessSquareState } from "../types/chess";
import {
  ChessBoardContext,
  type ChessBoardContextType,
} from "./ChessBoardContext";
import type { ChessSquareImmutable } from "./ChessGrid";

const filePathPrefix = "/src/assets/chess-pieces/";

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

function convertChessSquareStateToImage(state: ChessSquareState) {
  switch (state.status) {
    case "occupied": {
      const color = state.piece.color as keyof typeof pieceImages;
      const type = state.piece.type as keyof (typeof pieceImages)[typeof color];
      return filePathPrefix + pieceImages[color][type];
    }
    default:
      return undefined;
  }
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

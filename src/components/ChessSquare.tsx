import { useContext } from "react";
import {
  ChessBoardContext,
  type ChessBoardContextType,
} from "./ChessBoardContext";
import type { ChessSquareImmutable, ChessSquareState } from "./ChessGrid";

const filePathPrefix = "/src/assets/chess-pieces/";

const pieceImages = {
  WhitePawn: "wP.svg",
  WhiteRook: "wR.svg",
  WhiteKnight: "wN.svg",
  WhiteBishop: "wB.svg",
  WhiteQueen: "wQ.svg",
  WhiteKing: "wK.svg",
  BlackPawn: "bP.svg",
  BlackRook: "bR.svg",
  BlackKnight: "bN.svg",
  BlackBishop: "bB.svg",
  BlackQueen: "bQ.svg",
  BlackKing: "bK.svg",
} as const;

function convertChessSquareStateToImage(state: ChessSquareState) {
  switch (state.status) {
    case "occupied":
      return (
        filePathPrefix + pieceImages[`${state.piece.color}${state.piece.type}`]
      );
    default:
      return undefined;
  }
}

export default function ChessSquare({ row, column }: ChessSquareImmutable) {
  const context = useContext<ChessBoardContextType>(ChessBoardContext);

  const imageSrc = convertChessSquareStateToImage(context.board[row][column]);

  if (!imageSrc) {
    return <div>Status: {context.board[row][column].status}</div>;
  }

  return <div>{imageSrc ? <img src={imageSrc} alt=""></img> : null}</div>;
}

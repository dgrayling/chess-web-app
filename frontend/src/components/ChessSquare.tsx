import { useContext, type JSX } from "react";
import type { ChessSquareStatus } from "../../../common/types/chess";
import {
  ChessBoardContext,
  type ChessBoardContextType,
} from "./ChessBoardContext";
import type { ChessSquareImmutable } from "./ChessGrid";

import black_bishop from "../assets/chess_pieces/black_bishop.svg";
import black_king from "../assets/chess_pieces/black_king.svg";
import black_knight from "../assets/chess_pieces/black_knight.svg";
import black_pawn from "../assets/chess_pieces/black_pawn.svg";
import black_queen from "../assets/chess_pieces/black_queen.svg";
import black_rook from "../assets/chess_pieces/black_rook.svg";
import white_bishop from "../assets/chess_pieces/white_bishop.svg";
import white_king from "../assets/chess_pieces/white_king.svg";
import white_knight from "../assets/chess_pieces/white_knight.svg";
import white_pawn from "../assets/chess_pieces/white_pawn.svg";
import white_queen from "../assets/chess_pieces/white_queen.svg";
import white_rook from "../assets/chess_pieces/white_rook.svg";

const pieceStyle = {
  width: "80%",
  height: "80%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  userSelect: "none",
  pointerEvents: "none",
} as const;

const PieceSVG = ({ piece }: { piece: string }) => {
  const pieces: Record<string, JSX.Element> = {
    black_pawn: <img src={black_pawn} alt="Black Pawn" style={pieceStyle} />,
    black_rook: <img src={black_rook} alt="Black Rook" style={pieceStyle} />,
    black_knight: (
      <img src={black_knight} alt="Black Knight" style={pieceStyle} />
    ),
    black_bishop: (
      <img src={black_bishop} alt="Black Bishop" style={pieceStyle} />
    ),
    black_queen: <img src={black_queen} alt="Black Queen" style={pieceStyle} />,
    black_king: <img src={black_king} alt="Black King" style={pieceStyle} />,
    white_pawn: <img src={white_pawn} alt="White Pawn" style={pieceStyle} />,
    white_rook: <img src={white_rook} alt="White Rook" style={pieceStyle} />,
    white_knight: (
      <img src={white_knight} alt="White Knight" style={pieceStyle} />
    ),
    white_bishop: (
      <img src={white_bishop} alt="White Bishop" style={pieceStyle} />
    ),
    white_queen: <img src={white_queen} alt="White Queen" style={pieceStyle} />,
    white_king: <img src={white_king} alt="White King" style={pieceStyle} />,
  };

  return pieces[piece] || null;
};

function getPieceKey(color: string, type: string): string {
  return `${color.toLowerCase()}_${type.toLowerCase()}`;
}

function getPieceComponent(state: ChessSquareStatus) {
  if (!state.occupied) return null;
  const pieceKey = getPieceKey(state.piece.color, state.piece.type);
  return <PieceSVG piece={pieceKey} />;
}

export default function ChessSquare({ row, column }: ChessSquareImmutable) {
  const context = useContext<ChessBoardContextType>(ChessBoardContext);

  return (
    <div
      style={{
        background: "#f0d9b5",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        position: "relative",
      }}
      onClick={() =>
        context.trackClick({
          row,
          column,
          status: context.board[row][column],
        })
      }
    >
      {context.board[row][column] &&
        getPieceComponent(context.board[row][column])}
    </div>
  );
}

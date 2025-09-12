import { useContext } from "react";
import "./App.css";
import { ChessBoardContext } from "./components/ChessBoardContext";
import ChessGrid from "./components/ChessGrid.tsx";

function ResetButton() {
  const { resetBoard } = useContext(ChessBoardContext);

  return <button onClick={resetBoard}>Reset Board</button>;
}

function App() {
  const isProduction = import.meta.env.PROD;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 2fr",
        columnGap: "10px",
      }}
    >
      <div style={{ gridColumnStart: 1, gridColumnEnd: 2 }}>
        <div
          style={{
            backgroundColor: isProduction ? "#4CAF50" : "#FF9800",
            color: "white",
            textAlign: "center",
            padding: "10px",
            fontWeight: "bold",
            fontSize: "1.2em",
            marginBottom: "1rem",
          }}
        >
          Environment: {isProduction ? "PRODUCTION" : "DEVELOPMENT"}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          Commit: {process.env.GIT_COMMIT_MESSAGE}
        </div>
        <ResetButton />
      </div>
      <div style={{ gridColumnStart: 2, gridColumnEnd: 3 }}>
        <ChessGrid />
      </div>
    </div>
  );
}

export default App;

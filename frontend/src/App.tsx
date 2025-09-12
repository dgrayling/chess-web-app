import "./App.css";
import ChessGrid from "./components/ChessGrid.tsx";
import { ChessBoardProvider } from "./state/ChessBoardProvider";

function App() {
  const isProduction = import.meta.env.PROD;

  return (
    <ChessBoardProvider>
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
            }}
          >
            Environment: {isProduction ? "PRODUCTION" : "DEVELOPMENT"}
          </div>
          <div>Commit: {process.env.GIT_COMMIT_MESSAGE}</div>
        </div>
        <div style={{ gridColumnStart: 2, gridColumnEnd: 3 }}>
          <ChessGrid />
        </div>
      </div>
    </ChessBoardProvider>
  );
}

export default App;

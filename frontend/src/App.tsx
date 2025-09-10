import "./App.css";
import ChessGrid from "./components/ChessGrid.tsx";

function App() {
  const isProduction = import.meta.env.PROD;

  return (
    <div>
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
        {isProduction ? "PRODUCTION" : "DEVELOPMENT"} MODE
      </div>
      <div>Commit: {process.env.GIT_COMMIT_MESSAGE}</div>
      <ChessGrid />
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import Board from "./components/board";
import StatusBar from "./components/StatusBar";

function App() {
  // User inputs
  const [boardSize, setBoardSize] = useState(3);
  const [winLength, setWinLength] = useState(3);

  // Game state
  const [board, setBoard] = useState(createEmptyBoard(3));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState(null);

  // Update board when boardSize changes (reset game)
  useEffect(() => {
    setBoard(createEmptyBoard(boardSize));
    setWinner(null);
    setCurrentPlayer("X");

    // Adjust winLength if greater than new boardSize
    if (winLength > boardSize) {
      setWinLength(boardSize);
    }
  }, [boardSize]);

  // Helper to create empty board of given size
  function createEmptyBoard(size) {
    return Array(size)
      .fill(null)
      .map(() => Array(size).fill(null));
  }

  // Handle click on a cell
  const handleCellClick = (row, col) => {
    if (board[row][col] || winner) return;

    const newBoard = board.map((r) => r.slice());
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);

    if (checkWinner(newBoard, currentPlayer, winLength)) {
      setWinner(currentPlayer);
    } else {
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  // Reset the game with current boardSize
  const handleReset = () => {
    setBoard(createEmptyBoard(boardSize));
    setWinner(null);
    setCurrentPlayer("X");
  };

  // Winner check function with dynamic winLength
  function checkWinner(board, player, winLength) {
    const size = board.length;

    // Horizontal check
    for (let i = 0; i < size; i++) {
      for (let j = 0; j <= size - winLength; j++) {
        let count = 0;
        for (let k = 0; k < winLength; k++) {
          if (board[i][j + k] === player) count++;
        }
        if (count === winLength) return true;
      }
    }

    // Vertical check
    for (let j = 0; j < size; j++) {
      for (let i = 0; i <= size - winLength; i++) {
        let count = 0;
        for (let k = 0; k < winLength; k++) {
          if (board[i + k][j] === player) count++;
        }
        if (count === winLength) return true;
      }
    }

    // Diagonal check (top-left to bottom-right)
    for (let i = 0; i <= size - winLength; i++) {
      for (let j = 0; j <= size - winLength; j++) {
        let count = 0;
        for (let k = 0; k < winLength; k++) {
          if (board[i + k][j + k] === player) count++;
        }
        if (count === winLength) return true;
      }
    }

    // Anti-diagonal check (top-right to bottom-left)
    for (let i = 0; i <= size - winLength; i++) {
      for (let j = winLength - 1; j < size; j++) {
        let count = 0;
        for (let k = 0; k < winLength; k++) {
          if (board[i + k][j - k] === player) count++;
        }
        if (count === winLength) return true;
      }
    }

    return false;
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        backgroundColor: "rgba(108, 160, 220, 0.6)",
      }}
    >
      {/* Add this heading */}
      <h1 style={{ marginBottom: "10px" }}>Tic Tac Toe</h1>

      {/* Inputs for board size and win length */}
      <div>
        <label>
          Board Size (3 - 10):{" "}
          <input
            type="number"
            min={3}
            max={10}
            value={boardSize}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= 3 && val <= 10) setBoardSize(val);
            }}
          />
        </label>

        <label style={{ marginLeft: "20px" }}>
          Win Length (3 - {boardSize}):{" "}
          <input
            type="number"
            min={3}
            max={boardSize}
            value={winLength}
            onChange={(e) => {
              const val = Number(e.target.value);
              if (val >= 3 && val <= boardSize) setWinLength(val);
            }}
          />
        </label>
      </div>

      <StatusBar currentPlayer={currentPlayer} winner={winner} />
      <Board board={board} onCellClick={handleCellClick} />

      <button
        onClick={handleReset}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Reset Game
      </button>
    </div>
  );
}

export default App;

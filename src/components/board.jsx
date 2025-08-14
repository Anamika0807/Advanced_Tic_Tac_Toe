import Cell from "./Cell";

const Board = ({ board, onCellClick }) => {
  const size = board.length;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${size}, 60px)`,
        gridTemplateRows: `repeat(${size}, 60px)`,
        gap: "5px",
        justifyContent: "center",
        margin: "20px auto",
      }}
    >
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            value={cell}
            onClick={() => onCellClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};

export default Board;

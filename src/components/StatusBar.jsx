const StatusBar = ({ currentPlayer, winner }) => {
  return (
    <div style={{ marginBottom: 20, fontWeight: "bold" }}>
      {winner
        ? `Player ${winner} wins! 🎉`
        : `Current Player: ${currentPlayer}`}
    </div>
  );
};

export default StatusBar;

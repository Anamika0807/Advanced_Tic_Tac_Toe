const Cell = ({ value, onClick }) => {
  // Function to assign color based on value
  const getTextColor = () => {
    if (value === "X") return "red";
    if (value === "O") return "blue";
    return "#000";
  };

  return (
    <button
      onClick={onClick}
      style={{
        width: "60px",
        height: "60px",
        fontSize: "24px",
        fontWeight: "bold",
        border: "2px solid #555",
        borderRadius: "8px",
        cursor: "pointer",
        backgroundColor: "#fff",
        color: getTextColor(), //  Apply dynamic color
        transition: "background-color 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e0e0e0")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
    >
      {value}
    </button>
  );
};

export default Cell;

import classes from "./cell.module.css";

const Cell = ({ id, ch, clickHandler }) => {
  return (
    <div
      className={classes.cell}
      style={{
        borderLeft:
          id === "1" || id === "4" || id === "7"
            ? "3px solid #fff"
            : "3px solid #ffe79e",
        borderTop:
          id === "1" || id === "2" || id === "3"
            ? "3px solid #fff"
            : "3px solid #ffe79e",
        borderRight:
          id === "3" || id === "6" || id === "9"
            ? "3px solid #fff"
            : "3px solid #ffe79e",
        borderBottom:
          id === "7" || id === "8" || id === "9"
            ? "3px solid #fff"
            : "3px solid #ffe79e",
        color: ch === "X" ? "#2C8DFF" : "#FF4F4F",
      }}
      onClick={ clickHandler }
      id={id}
    >
        {ch}
    </div>
  );
};

export default Cell;

import Board from "../UI/board";
import classes from "./ticTacToe.module.css";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const TicTacToe = () => {
  const roomId: string = useLocation().state.roomId;
  const message: string = useLocation().state.message;
  const player : string = useLocation().state.player;
  const player1 : string = useLocation().state.player1;
  const player2 : string = useLocation().state.player2;
  const userName : string = useSelector((state: any) => state.userName);
  const turn : string = useLocation().state.turn;
  const board : string[] = useLocation().state.board;
  return (
    <div className={classes.ticTacToe}>
      <div className={classes.header}>
        <h1 className={classes.heading}>Game with {player} </h1>
        <h3 className={classes.subHeading}>Your Piece </h3>
        <div className={classes.yourPiece} style={{color: userName === player1 ? "#2C8DFF" : "#FF4F4F"}}>
        { userName === player1 ? "X" : "O" } </div>
      </div>
      <div className={classes.main}>
        <Board roomId ={roomId} message={message} turn={turn} player1={player1} player2={player2} board={board} />
      </div>
    </div>
  );
};

export default TicTacToe;

import classes from "./room.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Button from "./button";
import { changeTurn,changeIsGameActive,changeBoard } from "../store/turnSlice";

const Room = (props: any) => {
  const roomId = props.roomId;
  const createdAtDate = new Date(props.createdAt).toDateString();
  const createdAtTime = new Date(props.createdAt).toLocaleTimeString();
  const userName = useSelector((state: any) => state.userName);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const startGameHandler = () => {
    dispatch(changeBoard(props.board));
    if (props.player1 === userName) {
        dispatch(changeTurn('X'));
        dispatch(changeIsGameActive(true));
      } else {
        dispatch(changeTurn("O"));
      }
    navigate("/start", {
      state: {
        roomId: roomId,
        message: props.message,
        player: props.player,
        player1: props.player1,
        player2: props.player2,
        turn: props.turn,
        board: props.board,
      },
    });
  };
  return (
    <div className={classes.room}>
      <p className={classes.title}> Game with {props.player} </p>
      <p className={classes.text}> {props.message} </p>
      <p className={classes.text}>
        {" "}
        {createdAtDate} , {createdAtTime}{" "}
      </p>
      <Button
        title="Play Game"
        clickHandler={startGameHandler}
        color="#F2C94C"
      />
    </div>
  );
};

export default Room;

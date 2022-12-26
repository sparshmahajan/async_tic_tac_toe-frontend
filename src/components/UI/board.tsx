import Cell from "./cell";
import classes from "./board.module.css";
import { useState, useEffect } from "react";
import Div from "./div";
import { useSelector, useDispatch } from "react-redux";
import { changeIsGameActive } from "../store/turnSlice";
import io from "socket.io-client";
const socket = io("http://localhost:5000");


const Board = (props: any) => {
  const userName = useSelector((state: any) => state.userName);
  const turn = useSelector((state: any) => state.turn);
  //eslint-disable-next-line
  const [winner, setWinner] = useState("");
  const dispatch = useDispatch();
  const [board, setBoard] = useState(props.board);
  const isGameActive = useSelector((state: any) => state.isGameActive);
  const [msg, setMsg] = useState(
    props.player1 === userName ? "Your Turn" : "Opponent's Turn"
    );
    
    const handleClick = (e: any) => {
      if (board[e.target.id - 1] !== "" || isGameActive === false) {
      return;
    }
    setBoard((prev: string[]) => {
      const newBoard = [...prev];
      newBoard[e.target.id - 1] = turn;
      return newBoard;
    });

    socket.emit("play", {
      id: e.target.id - 1,
      ch: turn,
      roomCode: props.roomId,
    });
    const checkWinner = () => {
      console.log("checking winner");
      console.log(board);
      const win = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < win.length; i++) {
        const [a, b, c] = win[i];
        if (
          board[a] !== "" &&
          board[a] === board[b] &&
          board[a] === board[c]
          ) {
            console.log(board[a] + " won the game");
            setWinner(board[a] === "X" && turn === "X" ? "You" : props.player2);
            dispatch(changeIsGameActive(false));
            return;
          }
        }
        
        if (board.every((el: string) => el !== "")) {
          setWinner("Draw");
          dispatch(changeIsGameActive(false));
          return;
        }
      };
      checkWinner();
    dispatch(changeIsGameActive(false));
    setMsg("Opponent's Turn");
  };

  useEffect(() => {
    socket.emit("joinRoom", props.roomId);
    socket.on("updateGame", (id: number, turn: string) => {
      setBoard((prev: string[]) => {
        const newBoard = [...prev];
        newBoard[id] = turn;
        return newBoard;
      });
      console.log( "id: " + id + " turn: " + turn);
      const checkWinner = () => {
        console.log("checking winner");
        console.log(board);
        const win = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < win.length; i++) {
          const [a, b, c] = win[i];
          if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
            ) {
              console.log(board[a] + " won the game");
              setWinner(board[a] === "X" && turn === "X" ? "You" : props.player2);
              dispatch(changeIsGameActive(false));
              return;
            }
          }
          
          if (board.every((el: string) => el !== "")) {
            setWinner("Draw");
            dispatch(changeIsGameActive(false));
            return;
          }
        };
        checkWinner();
        dispatch(changeIsGameActive(true));
        setMsg("Your Turn");
      });
      //eslint-disable-next-line
    }, []);

  return (
    <>
      <Div
        data={winner === "" ? msg : winner + " Won the Game! "}
        backgroundColor="#FFE79E"
      />
      <div className={classes.board}>
        <Cell id="1" ch={board[0]} clickHandler={handleClick} />
        <Cell id="2" ch={board[1]} clickHandler={handleClick} />
        <Cell id="3" ch={board[2]} clickHandler={handleClick} />
        <Cell id="4" ch={board[3]} clickHandler={handleClick} />
        <Cell id="5" ch={board[4]} clickHandler={handleClick} />
        <Cell id="6" ch={board[5]} clickHandler={handleClick} />
        <Cell id="7" ch={board[6]} clickHandler={handleClick} />
        <Cell id="8" ch={board[7]} clickHandler={handleClick} />
        <Cell id="9" ch={board[8]} clickHandler={handleClick} />
      </div>
    </>
  );
};

export default Board;

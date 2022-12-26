import classes from "./homeLogin.module.css";
import Button from "../UI/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Room from "../UI/room";
import { useSelector } from "react-redux";

const HomeLogin = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const startGameHandler = () => {
    console.log("Start Game");
    navigate("/challenge");
  };

  const userName = useSelector((state: any) => state.userName);
  useEffect(() => {
    const token = localStorage.getItem("token");
    try {
      const fetchRooms = async () => {
        const response = await axios.get(
          "http://localhost:5000/api/users/rooms",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRooms(response.data.rooms);
      };
      fetchRooms();
    } catch (error: any) {
      console.log(error.response.data);
    }
  }, []);

  return (
    <div className={classes.homeLogin}>
      <div className={classes.box}>
        <h3> Your Games </h3>
        <div className={classes.games}>
          {rooms.length === 0 ? (
            <h1 className={classes.title}> No Games Found </h1>
          ) : (
            rooms.map((room: any) => (
              <Room
                key={room._id}
                roomId={room.roomId}
                player={room.player1 === userName ? room.player2 : room.player1}
                player1={room.player1}
                player2={room.player2}
                message={room.message}
                createdAt={room.createdAt}
                turn = {room.turn}
                board = {room.board}
              />
            ))
          )}
          <Button
            title="Start a New Game"
            clickHandler={startGameHandler}
            color="#F2C94C"
          />
        </div>
      </div>
    </div>
  );
};

export default HomeLogin;

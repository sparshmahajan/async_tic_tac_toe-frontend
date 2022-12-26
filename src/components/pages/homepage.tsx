import classes from "./homepage.module.css";
import Button from "./../UI/button";
import { useNavigate } from "react-router-dom";


const Homepage = () => {
  const navigate = useNavigate();
  const loginClickHandler = (event: React.FormEvent) => {
    navigate("/login");
  };

  const registerClickHandler = (event: React.FormEvent) => {
    navigate("/register");
  };
  return (
    <div className={classes.homepage}>
      <span className={classes.title}>Async Tic Tac Toe</span>
      <Button title="Login" clickHandler={loginClickHandler} color='#F2C94C' />
      <Button title="Register" clickHandler={registerClickHandler} color='#2F80ED' />
    </div>
  );
};

export default Homepage;

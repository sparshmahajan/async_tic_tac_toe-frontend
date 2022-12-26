import classes from "./challenge.module.css";
import Button from "../UI/button";
import FormInput from "../UI/formInput";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Challenge = () => {
  const navigate = useNavigate();
  const startGameHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const email = (document.getElementById("Email") as HTMLInputElement)
      .value as string;
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post( 'http://localhost:5000/api/users/challenge', { email }, { headers: { Authorization: `Bearer ${token}` } } );
      console.log(response.data);
      if(response.status === 201) {
        navigate('/');
      }
    } catch (error : any) {
      console.log(error.response.data);
    }
  };

  return (
    <div className={classes.challenge}>
      <div className={classes.box}>
        <h5 className={classes.subHeading}>Start a New Game</h5>
        <h1 className={classes.heading}>Whom do you want to play with ?</h1>
        <form className={classes.form}>
          <FormInput
            label="Email"
            type="text"
            placeholder="Type email of your friend here"
            id="Email"
          />
          <Button
            title="Start Game"
            clickHandler={startGameHandler}
            color="#F2C94C"
          />
        </form>
      </div>
    </div>
  );
};

export default Challenge;

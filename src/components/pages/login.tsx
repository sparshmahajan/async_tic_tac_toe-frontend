import Button from "../UI/button";
import FormInput from "./../UI/formInput";
import classes from "./signup.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserName,changeIsLoggedin } from "../store/turnSlice";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      formInput: any;
    }
  }
}

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginHandler = async(event: React.FormEvent) => {
    event.preventDefault();
    const userName = (document.getElementById("username") as HTMLInputElement)
    .value as string;
    const password = (document.getElementById("password") as HTMLInputElement)
    .value as string;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          userName,
          password
        }
        );
        console.log(response);
        if(response.status === 200) {
          dispatch(setUserName(response.data.userName));
          dispatch(changeIsLoggedin(true));
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userName", response.data.userName);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <div className={classes.signup}>
      <div className={classes.box}>
        <h5 className={classes.subHeading}>Login</h5>
        <h1 className={classes.heading}>Please Enter Your Details</h1>
        <form className={classes.form}>
          <FormInput
            label="Username or Email"
            type="text"
            placeholder="Type your username or email here"
            id="username"
          />
          <FormInput
            label="Password"
            type="password"
            placeholder="Type your password here"
            id="password"
          />
          {/* <Button title="Error" clickHandler={() => {}} color='#F2C94C' /> */}
          <Button title="Login" clickHandler={loginHandler} color="#F2C94C" />
        </form>
      </div>
    </div>
  );
};

export default Login;

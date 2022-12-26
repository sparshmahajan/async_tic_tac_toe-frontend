import Button from "../UI/button";
import FormInput from "./../UI/formInput";
import classes from "./signup.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      FormInput: any;
    }
  }
}

const Signup = () => {
  const navigate = useNavigate();
  const signupHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const name = (document.getElementById("name") as HTMLInputElement)
      .value as string;
    const userName = (document.getElementById("username") as HTMLInputElement)
      .value as string;
    const email = (document.getElementById("email") as HTMLInputElement)
      .value as string;
    const password = (document.getElementById("password") as HTMLInputElement)
      .value as string;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        {
          name,
          userName,
          email,
          password,
        }
      );
      console.log(response.data);
      if(response.status === 201) {
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      }
    } catch (error : any) {
      console.log(error.response.data);
    }
  };
  return (
    <div className={classes.signup}>
      <div className={classes.box}>
        <h5 className={classes.subHeading}>Create Account</h5>
        <h1 className={classes.heading}>Let's get to know you better</h1>
        <form className={classes.form}>
          <FormInput
            label="Your Name"
            type="text"
            placeholder="Type your name here"
            id="name"
          />
          <FormInput
            label="Username"
            type="text"
            placeholder="Type your username here"
            id="username"
          />
          <FormInput
            label="Email"
            type="email"
            placeholder="Type your email here"
            id="email"
          />
          <FormInput
            label="Password"
            type="password"
            placeholder="Type your password here"
            id="password"
          />
          {/* <Button title="Error" clickHandler={() => {}} color='#F2C94C' /> */}
          <Button title="Register" clickHandler={signupHandler} color="#F2C94C" />
        </form>
      </div>
    </div>
  );
};

export default Signup;

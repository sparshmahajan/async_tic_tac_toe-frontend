import classes from "./formInput.module.css";
import { useState } from "react";

interface FormInputProps {
  label: string;
  type: string;
  placeholder: string;
  id: string;
}

const FormInput = (props: FormInputProps) => {
  const [value, setValue] = useState("");

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className={classes.FormInput}>
      <label className={classes.label}>{props.label}</label>
      <input
        className={classes.input}
        type={props.type}
        value={value}
        placeholder={props.placeholder}
        onChange={changeHandler}
        id={props.id}
      />
    </div>
  );
};

export default FormInput;
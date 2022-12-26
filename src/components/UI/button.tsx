import classes from "./button.module.css";
interface ButtonProps {
    title: string;
    color: string;
    clickHandler: (event: React.FormEvent) => void;
}

const Button = ( props : ButtonProps) => {
    return (
        <button className={classes.button} onClick={ props.clickHandler }
         style={
            {
                backgroundColor: props.color,
                outline: props.color
            }
        }>
            {props.title}
        </button>
    )
}

export default Button
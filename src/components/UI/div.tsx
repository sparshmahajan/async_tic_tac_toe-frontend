import classes from './div.module.css'; 

const Div = (props: any) => {
    return(
        <div  className={classes.div} 
                style={ 
                    { backgroundColor: props.backgroundColor ? props.backgroundColor : '#fff' ,
                    color: props.color ? props.color : '#000' }
                }>
            {props.data ? props.data : null}
        </div>
    );
}

export default Div;
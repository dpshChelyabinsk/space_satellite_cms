import classes from "./styles/CancelButton.module.css"

const CancelButton = ({children, onClick}) => {
    return (
        <button className={classes.container} onClick={onClick}>
            {children}
        </button>
    );
};

export default CancelButton;
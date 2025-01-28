import classes from "./styles/CommonButton.module.css"

const CommonButton = ({children}) => {
    return (
        <button className={classes.container}>
            {children}
        </button>
    );
};

export default CommonButton;
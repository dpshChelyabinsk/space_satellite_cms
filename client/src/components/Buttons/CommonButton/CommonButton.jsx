import classes from "./styles/CommonButton.module.css"

const CommonButton = ({children, ...props}) => {
    return (
        <button className={classes.container} {...props}>
            {children}
        </button>
    );
};

export default CommonButton;
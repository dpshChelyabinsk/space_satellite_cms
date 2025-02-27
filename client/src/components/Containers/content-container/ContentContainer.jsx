import classes from "./styles/ContentContainer.module.css"

const ContentContainer = ({ children }) => {
    return (
        <div className={classes.container}>
            {children}
        </div>
    );
};

export default ContentContainer;
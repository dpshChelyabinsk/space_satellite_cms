import classes from "./style/ContentContainer.module.css"

const ContentContainer = ({ children }) => {
    return (
        <div className={classes.container}>
            {children}
        </div>
    );
};

export default ContentContainer;
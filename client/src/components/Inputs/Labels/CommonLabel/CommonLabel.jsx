import React from 'react';
import classes from "./styles/CommonLabel.module.css"

const CommonLabel = ({children, toward}) => {
    return (
        <label className={classes.container} htmlFor={toward}>
            {children}
        </label>
    );
};

export default CommonLabel;
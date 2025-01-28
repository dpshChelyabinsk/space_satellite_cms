import React from 'react';
import classes from "./styles/CommonHeader.module.css";

const CommonHeader = ({children}) => {
    return (
        <h1 className={classes.container}>
            {children}
        </h1>
    );
};

export default CommonHeader;
import React from 'react';
import classes from "./styles/ModalWrapper.module.css"

const ModalWrapper = ({children}) => {
    return (
        <div className={classes.container}>
            <div className={classes.content}>
                {children}
            </div>
        </div>
    );
};

export default ModalWrapper;
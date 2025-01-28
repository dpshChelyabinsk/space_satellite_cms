import React from 'react';
import classes from './style/Wrapper.module.css';

const MainWrapper = ({ children }) => {
    return (
        <div className={classes.container}>
            {children}
        </div>
    );
};

export default MainWrapper;
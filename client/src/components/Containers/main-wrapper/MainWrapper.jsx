import React from 'react';
import classes from './styles/Wrapper.module.css';

const MainWrapper = ({ children }) => {
    return (
        <div className={classes.container}>
            <div className={`${classes.image} ${classes.leftImage}`}></div>
                {children}
            <div className={`${classes.image} ${classes.rightImage}`}></div>
        </div>
    );
};

export default MainWrapper;
import React from 'react';
import {MoonSvg} from "./assets";
import classes from "./styles/Moon.module.css"

const Moon = () => {
    return (
        <img src={MoonSvg} alt="Moon" className={classes.container} />
    );
};

export default Moon;
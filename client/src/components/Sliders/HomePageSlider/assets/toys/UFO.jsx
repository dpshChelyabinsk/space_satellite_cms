import React from 'react';
import {UFOSvg} from "./assets";
import classes from "./styles/UFO.module.css";

const Ufo = () => {
    return (
        <img src={UFOSvg} alt="UFO" className={classes.container} />
    );
};

export default Ufo;
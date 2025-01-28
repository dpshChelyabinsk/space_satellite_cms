import React from 'react';
import {SpaceMarineSvg} from './assets';
import classes from "./styles/SpaceMarine.module.css";

const SpaceMarine = () => {
    return (
        <img src={SpaceMarineSvg} alt="Space Marine" className={classes.container}/>
    );
};

export default SpaceMarine;
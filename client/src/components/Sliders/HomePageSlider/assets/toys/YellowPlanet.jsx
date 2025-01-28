import React from 'react';
import {YellowPlanetSvg} from './assets';
import classes from "./styles/YellowPlanet.module.css";

const YellowPlanet = () => {
    return (
        <img src={YellowPlanetSvg} alt="Yellow Planet" className={classes.container}/>
    );
};

export default YellowPlanet;
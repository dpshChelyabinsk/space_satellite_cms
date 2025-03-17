import React from 'react';
import {OrangePlanetSvg} from "./assets";
import classes from "./styles/OrangePlanet.module.css";

const OrangePlanet = () => {
    return (
        <img src={OrangePlanetSvg} alt="OrangePlanet" className={classes.container}/>
    );
};

export default OrangePlanet;
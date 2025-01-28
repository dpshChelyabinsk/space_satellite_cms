import React from 'react';
import {BluePlanetSvg} from './assets';
import classes from "./styles/BluePlanet.module.css";

const BluePlanet = () => {
    return (
        <img src={BluePlanetSvg} alt="BluePlanet" className={classes.container} />
    );
};

export default BluePlanet;
import React from 'react';
import {StantionSvg} from './assets';
import classes from "./styles/Stantion.module.css";

const Station = () => {
    return (
        <img src={StantionSvg} alt={'Station'} className={classes.container}/>
    );
};

export default Station;
import React from 'react';
import classes from "./styles/MainLogo.module.css"
import LogoSVG from "./assets/LogoSVG";

const MainLogo = () => {
    return (
        <div className={classes.container}>
            <span className={classes.logo}><LogoSVG /></span>
            <span className={classes.text}>Главная</span>
        </div>
    );
};

export default MainLogo;
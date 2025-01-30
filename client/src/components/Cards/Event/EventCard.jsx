import React from 'react';
import classes from './styles/EventModal.module.css';
import {Link} from "react-router-dom";
import GeoBox from "./assets/Geo.svg"

const EventCard = ({image, type, event, link, startDate, endDate, title, place}) => {
    return (
        <div
            className={classes.container}
            style={{backgroundImage: `url(${image})`}}
        >
            <div
                className={classes.containerImage}
            >
                <div className={classes.content}>
                    <div className={classes.contentTop}>
                        <div className={classes.chipBox}>
                            <div className={classes.typeChip}>
                                #{type.toUpperCase()}
                            </div>
                        </div>
                        <div className={classes.buttonsBox}>
                            <div className={classes.buttonWrapper}>
                                <button className={`${classes.contentButton} ${classes.record}`}
                                        onClick={event}>Записаться
                                </button>
                            </div>
                            <div className={classes.buttonWrapper}>
                                <Link to={link}>
                                    <button className={`${classes.contentButton} ${classes.detail}`}>Подробнее</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={classes.contentBottom}>
                        <p className={classes.date}>{startDate}{endDate}</p>
                        <h3 className={classes.title}>{title}</h3>
                        <div className={classes.placeBox}>
                            <img src={GeoBox} alt="geo"/>
                            <p className={classes.place}>{place}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
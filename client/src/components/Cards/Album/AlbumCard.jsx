import React from 'react';
import classes from './styles/AlbumCard.module.css';
import CommonButton from "../../Buttons/CommonButton/CommonButton";
import {Link} from "react-router-dom";

const AlbumCard = ({ name, description, begining, ending, link, quantity, photos }) => {

    const options = {
        year: 'numeric', month: '2-digit', day: '2-digit'
    };
    const startDate = new Date(begining).toLocaleString('ru-RU', options);
    const endDate = ending ? ` - ${new Date(ending).toLocaleString('ru-RU', options)}` : '';

    return (
        <div className={classes.container}>
            <div className={classes.photoBox}>
                <div
                    className={`${classes.image} ${classes.mainImage}`}
                    style={{backgroundImage: `url(${photos[0]})`}}
                />
                {photos.length > 1 && photos.slice(1, 4).map((photo, index) => (
                    <div
                        key={`side-${index}`}
                        className={`${classes.image} ${classes.sideImage}`}
                        style={{backgroundImage: `url(${photo})`}}
                    />
                ))}
            </div>
            <div className={classes.aside}>
                <div className={classes.text}>
                    <h3 className={classes.title}>{name}</h3>
                    <h4 className={classes.date}>{startDate} {endDate}</h4>
                    <p className={classes.description}>{quantity} фото</p>
                    <div className={classes.separator}/>
                    <p className={classes.description}>
                        {description}
                    </p>
                </div>
                <div className={classes.button}>
                    <Link to={link}>
                        <CommonButton>
                            Посмотреть альбом
                        </CommonButton>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AlbumCard;
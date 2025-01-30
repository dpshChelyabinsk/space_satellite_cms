import React from 'react';
import classes from "./styles/NewsCard.module.css"
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const NewsCard = ({children, image, alt, title, description}) => {
    return (
        <div className={classes.container}>
            <Zoom>
                <img className={classes.image} src={image} alt={alt}/>
            </Zoom>
            <h3>{title}</h3>
            <p>{description}</p>
            {children}
        </div>
    );
};

export default NewsCard;
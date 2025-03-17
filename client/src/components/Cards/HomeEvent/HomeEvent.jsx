import classes from "./styles/HomeEvent.module.css";
import {Link} from "react-router-dom";
import CommonButton from "../../Buttons/CommonButton/CommonButton";

const HomeEvent = ({ link, title, type, description }) => {

    return (
        <div className={classes.container}>
            <div className={classes.rowHeader}>
                <h3 className={classes.header}>{title}</h3>
                <div className={classes.typeChip}>#{type.toUpperCase()}</div>
            </div>
            <p className={classes.description}>
                {description}
            </p>
            <div className={classes.buttonsWrap}>
                <Link to={link ? `/events/${link}` : `#`}>
                    <CommonButton>
                        Подробнее
                    </CommonButton>
                </Link>
            </div>
        </div>
    );
};

export default HomeEvent;
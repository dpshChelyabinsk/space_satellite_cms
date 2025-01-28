import React, {useEffect, useState} from 'react';
import classes from "./styles/HomeEvent.module.css";
import {getEvents} from "../../../services/eventService";
import {Link} from "react-router-dom";
import CommonButton from "../../Buttons/CommonButton/CommonButton";

const HomeEvent = () => {
    const [mainEvents, setMainEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getEvents();
            const sortedData = data.sort((a, b) => new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt));
            setMainEvents(sortedData);
        };
        fetchData()
            .then(r => console.log('End operation'));
    }, []);

    let chip = "событие"

    return (
        <div className={classes.container}>
            <div className={classes.rowHeader}>
                <h3 className={classes.header}>Событие</h3>
                <div className={classes.typeChip}>#{chip.toUpperCase()}</div>
            </div>
            <p className={classes.description}>
                lorem ipsum Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci atque blanditiis dicta doloribus ducimus et excepturi fuga iusto, maiores modi nihil non praesentium quaerat, ratione similique, suscipit ullam. Aspernatur!
            </p>
            <div className={classes.buttonsWrap}>
                <Link to={`/events`}>
                    <CommonButton>
                        Подробнее
                    </CommonButton>
                </Link>
            </div>
        </div>
    );
};

export default HomeEvent;
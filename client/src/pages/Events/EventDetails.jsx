import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import Loader from '../../components/Loaders/Loader';
import classes from './styles/EventDetails.module.css';

import Back from '../../assets/Common/arrow-back.svg'
import GonnaEvent from "../../components/Forms/GonnaEvent/GonnaEvent";
import MainWrapper from "../../components/Containers/main-wrapper/MainWrapper";
import ContentContainer from "../../components/Containers/content-container/ContentContainer";
import CommonButton from "../../components/Buttons/CommonButton/CommonButton";
import eventService from "../../api/services/EventService";
import dateManipulator from "../../utils/services/DateManipulator";

const EventDetails = () => {
    const {id} = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        eventService.getEventById(id).then(event => {
            if (event) {
                setLoading(false);
                setEvent(event);
            }
        });
        // eslint-disable-next-line
    }, []);

    if (loading) {
        return <Loader/>;
    }

    if (!event) {
        return <div className={classes.errorBox}>Event not found</div>;
    }

    const eventStartDate = dateManipulator.format(event.begining);
    const eventEndDate = event.ending ? dateManipulator.format(event.ending) : null;

    return (
        <MainWrapper>
            <div className={classes.eventPhoto} style={{backgroundImage: `url("${event.image}")`}} />
            <ContentContainer>
                <div className={classes.container}>
                    <div className={classes.titleBox}>
                        <div className={classes.buttonWrapper}>
                            <Link to={`/events`}>
                                <CommonButton
                                    style={{
                                        minWidth: '112px',
                                        maxHeight: '52px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <img src={Back} alt='back arrow'/>
                                </CommonButton>
                            </Link>
                        </div>
                        <h2 className={classes.titleBoxHeader}>{event.title}</h2>
                    </div>
                    <div className={classes.eventDetailContent}>
                        <div className={classes.details}>
                            <div className={classes.details__container}>
                                <h3 className={classes.details__header}>
                                    место и время
                                </h3>
                                <p className={classes.date__line}>
                                    Место: {event.place}
                                </p>
                                <div className={classes.date}>
                                    <div style={{textAlign: 'left'}}>
                                        <p className={classes.date__line}>
                                            Начало: {eventStartDate}
                                        </p>
                                        <p className={classes.date__line}>
                                            {eventEndDate ? `Конец: ${eventEndDate}` : ''}
                                        </p>
                                    </div>
                                </div>
                                <p className={classes.date__line}>
                                    Примечание: {event.notice}
                                </p>
                            </div>
                            <div className={classes.details__container}>
                                <h3 className={classes.details__header}>
                                    о мероприятии
                                </h3>
                                <div className={classes.date__line}>
                                    {event.description}
                                </div>
                            </div>
                        </div>
                        <div className={classes.event__form}>
                            <GonnaEvent eventId={id} eventName={event.title}/>
                        </div>
                    </div>
                </div>
            </ContentContainer>
        </MainWrapper>
    );
};

export default EventDetails;

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

    const eventName = event.title;
    const eventDescription = event.description;
    const eventStartDate = new Date(event.begining).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });
    const eventEndDate = event.ending ? new Date(event.ending).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }) : false;
    const eventPlace = event.place;
    const eventNotice = event.notice;
    const eventPhotoUrl = event.image;

    return (
        <MainWrapper>
            <div className={classes.eventPhoto} style={{backgroundImage: `url("${eventPhotoUrl}")`}} />
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
                        <h2 className={classes.titleBoxHeader}>{eventName}</h2>
                    </div>
                    <div className={classes.eventDetailContent}>
                        <div className={classes.details}>
                            <div className={classes.details__container}>
                                <h3 className={classes.details__header}>
                                    место и время
                                </h3>
                                <p className={classes.date__line}>
                                    Место: {eventPlace}
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
                                    Примечание: {eventNotice}
                                </p>
                            </div>
                            <div className={classes.details__container}>
                                <h3 className={classes.details__header}>
                                    о мероприятии
                                </h3>
                                <div className={classes.date__line}>
                                    {eventDescription}
                                </div>
                            </div>
                        </div>
                        <div className={classes.event__form}>
                            <GonnaEvent eventId={id} eventName={eventName}/>
                        </div>
                    </div>
                </div>
            </ContentContainer>
        </MainWrapper>
    );
};

export default EventDetails;

import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {getEventById} from '../../services/eventService';
import Loader from '../../components/Loaders/Loader';
import {API_URL} from '../../config/API_CONFIG';
import classes from './styles/EventDetails.module.css';

import Back from '../../assets/Common/arrow-back.svg'
import GonnaEvent from "../../components/Forms/GonnaEvent/GonnaEvent";
import MainWrapper from "../../components/Containers/main-wrapper/MainWrapper";
import ContentContainer from "../../components/Containers/content-container/ContentContainer";
import CommonButton from "../../components/Buttons/CommonButton/CommonButton";

const EventDetails = () => {
    const {id} = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvent = async () => {
            const data = await getEventById(id, 'photo');
            setEvent(data);
            setLoading(false);
        };
        fetchEvent();
    }, [id]);

    if (loading) {
        return <Loader/>;
    }

    if (!event) {
        return <div className={classes.errorBox}>Event not found</div>;
    }

    const eventName = event.attributes.title;
    const eventDescription = event.attributes.description;
    const eventStartDate = new Date(event.attributes.date_start).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    });
    const eventEndDate = event.attributes.date_finish ? new Date(event.attributes.date_finish).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    }) : false;
    const eventPlace = event.attributes.place;
    const eventNotice = event.attributes.notice;
    const eventPhotoUrl = event.attributes.photo?.data ? `${API_URL}${event.attributes.photo.data.attributes.url}` : null;

    console.log("Event Data:", event);

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
                                    адрес и время
                                </h3>
                                <p className={classes.date__line}>
                                    Адрес: {eventPlace}
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

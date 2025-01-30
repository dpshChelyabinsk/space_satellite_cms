import React, {useEffect, useState} from 'react';
import classes from "./styles/EventDetails.module.css"
import {Link, useParams} from 'react-router-dom';
import {getEventById} from '../../services/eventService';
import Loader from '../../components/Loaders/Loader';
import styled from 'styled-components';
import {API_URL} from '../../config/API_CONFIG';
import Button from "../../components/UI/Button";
import Back from '../../assets/Common/arrow-back.svg'
import GonnaEvent from "../../components/Forms/GonnaEvent/GonnaEvent";

const EventErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: absolute;
  z-index: 200;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const EventDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  width: 100%;
  height: 100%;
`;

const EventPhoto = styled.div`
  display: flex;
  justify-content: center;
  top: 160px;
  width: 100%;
  height: 30.09259259259259%;
  min-height: 325px;
  margin-top: 160px;
  object-fit: cover;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.$background});
`;

const EventDetailsPageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  max-width: 1400px;
  height: 39.25925925925926%;
  min-height: 545px;
`;

const AboutEvent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  width: 49.07142857142857%;
  height: fit-content;
  min-height: 348px;
  font-family: var(--font-family);
  color: var(--dark-night);
`;

const RecordWrapper = styled.div`
  width: 49.07142857142857%;
  max-width: 687px;
  height: 100%;
  min-height: 424px;
`

const DateEventBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: 48.27586206896552%;
  min-height: 160px;
`;

const DescriptionEventBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  height: fit-content;
  min-height: 120px;
`;

const AboutHeader = styled.h2`
  text-transform: uppercase;
  font-size: 32px;
  font-weight: 400;
`;

const TitleBox = styled.div`
  display: flex;
  gap: 150px;
`;

const Title = styled.p`
  font-size: 20px;
  font-weight: 400;
`;

const DateBox = styled.div`
  text-align: left;
`;

const EventTitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 75%;
  max-width: 1400px;
  height: 100%;
  padding: 15px 0;
`;

const TitleHeader = styled.h2`
  color: white;
  font-size: 48px;
  font-family: var(--font-family);
`;

const ButtonWrapper = styled.div`
  width: 18.57142857142857%;
  max-width: 120px;
  height: 16%;
`

const BackImage = styled.img`
`

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
        return <EventErrorWrapper>Event not found</EventErrorWrapper>;
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
    }) : 'N/A';
    const eventPlace = event.attributes.place;
    const eventPrice = event.attributes.price || 'Бесплатно';
    const eventNotice = event.attributes.notice;
    const eventPhotoUrl = event.attributes.photo?.data ? `${API_URL}${event.attributes.photo.data.attributes.url}` : null;

    console.log("Event Data:", event);

    return (
        <EventDetailsWrapper>
            <EventPhoto $background={eventPhotoUrl}>
                <EventTitleBox>
                    <ButtonWrapper>
                        <Link to={`/events`}>
                            <Button
                                $color={'var(--royal-lilac)'}
                                $hoverColor={'var(--sunset-orange)'}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <BackImage src={Back} alt='image'/>
                            </Button>
                        </Link>
                    </ButtonWrapper>
                    <TitleHeader>{eventName}</TitleHeader>
                </EventTitleBox>
            </EventPhoto>
            <div className={classes.container}>
                <EventDetailsPageWrapper>
                    <AboutEvent>
                        <DateEventBox>
                            <AboutHeader>
                                адрес и время
                            </AboutHeader>
                            <Title>
                                Адрес: {eventPlace}
                            </Title>
                            <TitleBox>
                                <DateBox>
                                    <Title>
                                        Начало: {eventStartDate}
                                    </Title>
                                    <Title>
                                        Конец: {eventEndDate}
                                    </Title>
                                </DateBox>
                                <Title>
                                    Цена: {eventPrice}
                                </Title>
                            </TitleBox>
                            <Title>
                                Примечание: {eventNotice}
                            </Title>
                        </DateEventBox>
                        <DescriptionEventBox>
                            <AboutHeader>
                                о мероприятии
                            </AboutHeader>
                            <Title>
                                {eventDescription}
                            </Title>
                        </DescriptionEventBox>
                    </AboutEvent>
                    <RecordWrapper>
                        <GonnaEvent eventId={id} eventName={eventName}/>
                    </RecordWrapper>
                </EventDetailsPageWrapper>
            </div>
        </EventDetailsWrapper>
    );
};

export default EventDetails;

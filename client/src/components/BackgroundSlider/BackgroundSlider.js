import React, {useEffect, useState} from 'react';
import Carousel from './Carousel';
import { BackgroundItem, BackgroundImage } from "./SliderStyles";

import FullBackground from "../../assets/Background/BackgroundFull.svg";
import Button from "../UI/Button";
import {useCarousel} from "../../contexts/CarouselContext";
import {Link} from "react-router-dom";
import {getEvents} from "../../services/eventService";
import Loader from "../Loaders/Loader";
import {
    ButtonWrap,
    Description,
    EventHeader,
    MainNewsHead,
    RowHeader,
    ShortEvent,
    TypeChip
} from "./elements/CardStyle";



const BackgroundSlider = () => {
    const { currentIndex, handleChangeColor} = useCarousel();
    const darkColor = currentIndex === 0;

    const [mainEvents, setMainEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getEvents();
            const sortedData = data.sort((a, b) => new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt));
            setMainEvents(sortedData);
        };
        fetchData();
    }, []);

    return (
        <Carousel>
            <BackgroundItem>
                {mainEvents.length > 0 ? (
                    mainEvents.slice(0, 11).map((event, index) => (
                        <ShortEvent key={event.id} $top={calculateTop(index)} $left={calculateLeft(index)}>
                            <RowHeader>
                                <EventHeader $darkColor={darkColor}>{event.attributes.title}</EventHeader>
                                <TypeChip>событие</TypeChip>
                            </RowHeader>
                            <Description $darkColor={darkColor}>
                                {event.attributes.description}
                            </Description>
                            <ButtonWrap>
                                <Link to={`/events/${event.id}`}>
                                    <Button
                                        $color={`var(--royal-lilac)`}
                                        $hoverColor={`var(--sunset-orange)`}
                                        onClick={() => handleChangeColor()}
                                    >
                                        Подробнее
                                    </Button>
                                </Link>
                            </ButtonWrap>
                        </ShortEvent>
                    ))
                ) : (
                    <Loader />
                )}
            </BackgroundItem>
        </Carousel>
    );
};

const calculateTop = (index) => {
    // Функция для вычисления значения $top на основе индекса
    const positions = [27.31481481481481, 45.64814814814815, 22.59259259259259, 44.35185185185185, 23.59259259259259, 46.64814814814815, 22.59259259259259, 47.64814814814815, 24.44444444444444, 53.27777777777778, 29.59259259259259];
    return positions[index % positions.length];
};

const calculateLeft = (index) => {
    // Функция для вычисления значения $left на основе индекса
    const positions = [13.54166666666667, 13.54166666666667, 132.58333333333333, 132.58333333333333, 165.625, 165.625, 206.64583333333333, 206.64583333333333, 235.58333333333333, 236.58333333333333, 265.625];
    return positions[index % positions.length];
};

export default BackgroundSlider;

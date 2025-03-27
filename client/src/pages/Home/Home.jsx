import React, {useEffect, useState} from 'react';
import HomePageSlider from "../../components/Sliders/HomePageSlider/HomePageSlider";
import {
    BluePlanet,
    Moon,
    OrangePlanet,
    SpaceMarine,
    Stantion, UFO,
    YellowPlanet
} from "../../components/Sliders/HomePageSlider/assets/toys";
import CommonHeader from "../../components/Headers/CommonHeader/CommonHeader";
import HomeEvent from "../../components/Cards/HomeEvent/HomeEvent";
import EmptyArr from "../../assets/PreloadData/HomePage/Cards";
import satteliteArrow from "../../assets/Home/sattelite-arrow.svg";
import sattelite from "../../assets/Home/sat290k.svg";

import eventService from "../../api/services/EventService";

const Home = () => {

    const emptyArr = EmptyArr;
    const [mainEvents, setMainEvents] = useState([]);

    useEffect(() => {
        eventService.getShortEventList().then(events => {
            setMainEvents(events);
        });
    }, []);

    return (
        <HomePageSlider>
            <div className="slide__one">
                <div className="slide__toys">
                    <OrangePlanet/>
                    <Moon/>
                    <div className="slide__content">
                        <CommonHeader>Наши новости:</CommonHeader>
                        <div className="slide__cards-container">
                            {mainEvents.length > 0 ? (
                                mainEvents.slice(0, 2).map((event, index) => (
                                    <HomeEvent
                                        key={event.documentId}
                                        title={event.title}
                                        type={event.type}
                                        description={event.description}
                                        link={event.documentId}
                                    />
                                ))
                            ) : (
                                emptyArr.slice(0, 2).map((item, index) => (
                                    <HomeEvent
                                        key={item.documentId}
                                        title={item.title}
                                        type={item.type}
                                        description={item.description}
                                        link={false}
                                    />))
                            )}
                            <div className="slide__satellite-container">
                                <div className="satellite-container__bundle">
                                    <img className="satellite-container__satellite" src={sattelite} alt="sattelite"/>
                                    <img className="satellite-container__arrow" src={satteliteArrow} alt="arrow"/>
                                </div>
                                <p className="satellite-container__text">
                                    СЛЕДИТЕ ЗА
                                    ПОЛОЖЕНИЕМ СПУТНИКА
                                    В РЕАЛЬНОМ ВРЕМЕНИ
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="slide__mobile-content">
                        <div className="slide__satellite-container">
                            <div className="satellite-container__bundle">
                                <img className="satellite-container__satellite" src={sattelite} alt="sattelite"/>
                                <img className="satellite-container__arrow" src={satteliteArrow} alt="arrow"/>
                            </div>
                            <p className="satellite-container__text">
                                СЛЕДИТЕ ЗА
                                ПОЛОЖЕНИЕМ СПУТНИКА
                                В РЕАЛЬНОМ ВРЕМЕНИ
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="slide__two">
                <div className="slide__toys">
                    <Stantion/>
                    <SpaceMarine/>
                    <YellowPlanet/>
                    <UFO/>
                    <div className="slide__content">
                        <div className="slide__cards-container">
                            {mainEvents.length > 0 ? (
                                mainEvents.slice(2, 6).map((event, index) => (
                                    <HomeEvent
                                        key={event.documentId}
                                        title={event.title}
                                        type={event.type}
                                        description={event.description}
                                        link={event.documentId}
                                    />
                                ))
                            ) : (
                                emptyArr.slice(2, 6).map((item, index) => (
                                    <HomeEvent
                                        key={item.documentId || index}
                                        title={item.title}
                                        type={item.type}
                                        description={item.description}
                                        link={false}
                                    />))
                            )}
                        </div>
                    </div>
                    <div className="slide__mobile-content">
                        <div className="slide__satellite-container">
                            <p className="satellite-container__text-secondary">
                                ПРОВЕРЬТЕ АКТУАЛЬНЫЕ МЕРОПРИЯТИЯ
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="slide__three">
                <div className="slide__toys">
                    <BluePlanet/>
                    <div className="slide__content">
                        <div className="slide__cards-container">
                            {mainEvents.length > 0 ? (
                                mainEvents.slice(6, 10).map((event, index) => (
                                    <HomeEvent
                                        key={event.documentId}
                                        title={event.title}
                                        type={event.type}
                                        description={event.description}
                                        link={event.documentId}
                                    />
                                ))
                            ) : (
                                emptyArr.slice(6, 10).map((item, index) => (
                                    <HomeEvent
                                        key={item.documentId || index}
                                        title={item.title}
                                        type={item.type}
                                        description={item.description}
                                        link={false}
                                    />))
                            )}
                        </div>
                    </div>
                    <div className="slide__mobile-content">
                        <div className="slide__satellite-container">
                            <p className="satellite-container__text-secondary" style={{width:'175px'}}>
                                ЗАГЛЯНИТЕ В ГАЛЕРЕЮ
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </HomePageSlider>
    );
};

export default Home;

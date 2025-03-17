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
import {getEvents} from "../../services/eventService";
import satteliteArrow from "../../assets/Home/sattelite-arrow.svg";
import sattelite from "../../assets/Home/sat290k.svg";

const Home = () => {

    const emptyArr = EmptyArr;
    const [mainEvents, setMainEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEvents();
                const sortedData = data.sort((a, b) => new Date(b.attributes.createdAt) - new Date(a.attributes.createdAt));
                setMainEvents(sortedData);
            } catch (e) {
                console.error(`Error reason: \n ${e}`);
            }
        };
        fetchData();
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
                                        key={event.id}
                                        title={event.attributes.title}
                                        type={event.attributes.type}
                                        description={event.attributes.description}
                                        link={event.id}
                                    />
                                ))
                            ) : (
                                emptyArr.slice(0, 2).map((item, index) => (
                                    <HomeEvent
                                        key={item.id}
                                        title={item.attributes.title}
                                        type={item.attributes.type}
                                        description={item.attributes.description}
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
                                        key={event.id}
                                        title={event.attributes.title}
                                        type={event.attributes.type}
                                        description={event.attributes.description}
                                        link={event.id}
                                    />
                                ))
                            ) : (
                                emptyArr.slice(2, 6).map((item, index) => (
                                    <HomeEvent
                                        key={item.id}
                                        title={item.attributes.title}
                                        type={item.attributes.type}
                                        description={item.attributes.description}
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
                                        key={event.id}
                                        title={event.attributes.title}
                                        type={event.attributes.type}
                                        description={event.attributes.description}
                                        link={event.id}
                                    />
                                ))
                            ) : (
                                emptyArr.slice(6, 10).map((item, index) => (
                                    <HomeEvent
                                        key={item.id}
                                        title={item.attributes.title}
                                        type={item.attributes.type}
                                        description={item.attributes.description}
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

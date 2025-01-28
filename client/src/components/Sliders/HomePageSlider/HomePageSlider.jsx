import React, {useEffect, useState} from 'react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import './Slider.css'
import {OrangePlanet, Moon, Stantion, SpaceMarine, YellowPlanet, UFO, BluePlanet} from "./assets/toys/";
import CommonHeader from "../../Headers/CommonHeader/CommonHeader";
import HomeEvent from "../../Cards/HomeEvent/HomeEvent";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const HomePageSlider = () => {
    return (
        <>
            <AutoplaySlider
                bullets={false}
                organicArrows={true}
                play={true}
                cancelOnInteraction={false}
                interval={0}
            >
                <div className="slide__one">
                    <div className="slide__toys">
                        <OrangePlanet/>
                        <Moon/>
                        <div className="slide__content">
                            <CommonHeader>Наши новости:</CommonHeader>
                            <HomeEvent/>
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

                        </div>
                    </div>
                </div>
                <div className="slide__three">
                    <div className="slide__toys">
                        <BluePlanet/>
                        <div className="slide__content">

                        </div>
                    </div>
                </div>
            </AutoplaySlider>
        </>
    );
};

export default HomePageSlider;
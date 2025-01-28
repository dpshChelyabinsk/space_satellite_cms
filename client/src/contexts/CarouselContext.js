import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { startAutoSwitching, handleRightArrowClick, handleLeftArrowClick } from '../utils/CarouselUtils';
import {useLocation} from "react-router-dom";

const SWITCHING_TIME = 20000;
const PAGE_WIDTH = 100;

const CarouselContext = createContext();

export const useCarousel = () => {
    return useContext(CarouselContext);
};

export const CarouselProvider = ({ children }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState('forward');
    const totalWidth = 300;
    const totalSlides = Math.ceil(totalWidth / PAGE_WIDTH);
    const intervalRef = useRef(null);
    const location = useLocation();
    const homeDir = location.pathname === '/';
    const [allDarkColor, setAllDarkColor] = useState(!homeDir);

    useEffect(() => {
        if (homeDir) {
            startAutoSwitching(setCurrentIndex, setDirection, direction, totalSlides, intervalRef, SWITCHING_TIME);
            // eslint-disable-next-line
            return () => clearInterval(intervalRef.current);
        } else {
            clearInterval(intervalRef.current);
        }

    }, [homeDir, direction, totalSlides, setCurrentIndex, setDirection, intervalRef]);

    const autoSwich = () => {
        startAutoSwitching(setCurrentIndex, setDirection, direction, totalSlides, intervalRef);
    };

    const moveLeft = () => {
        handleLeftArrowClick(currentIndex, direction, totalSlides, setCurrentIndex, setDirection, () => autoSwich(), intervalRef);
    };

    const moveRight = () => {
        handleRightArrowClick(currentIndex, direction, totalSlides, setCurrentIndex, setDirection, () => autoSwich(), intervalRef);
    };

    const handleChangeColor = () => {
        setCurrentIndex(0);
        setAllDarkColor(true);
    };

    const reverseChangeColor = () => {
        setCurrentIndex(0);
        setAllDarkColor(false);
    };

    return (
        <CarouselContext.Provider value={{ currentIndex, setCurrentIndex, moveLeft, moveRight, totalSlides, PAGE_WIDTH, handleChangeColor, reverseChangeColor, allDarkColor }}>
            {children}
        </CarouselContext.Provider>
    );
};

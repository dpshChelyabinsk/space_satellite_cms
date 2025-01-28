import React from 'react';
import {
    MainContainer,
    Window,
    AllPagesContainer,
    LeftSlideButton,
    RightSlideButton,
    ArrowImage
} from "./SliderStyles";
import LeftArrow from "../../assets/Background/LeftArrow.svg"
import RightArrow from "../../assets/Background/RightArrow.svg"
import {useCarousel} from "../../contexts/CarouselContext";


const Carousel = ({ children }) => {

    const { currentIndex, moveLeft, moveRight, totalSlides, PAGE_WIDTH } = useCarousel();

    return (
        <MainContainer>
            <Window>
                <LeftSlideButton onClick={moveLeft} disabled={currentIndex === 0}><ArrowImage src={LeftArrow} /></LeftSlideButton>
                <AllPagesContainer $translate={-currentIndex * PAGE_WIDTH}>
                    {children}
                </AllPagesContainer>
                <RightSlideButton onClick={moveRight} disabled={currentIndex === totalSlides - 1}><ArrowImage src={RightArrow}/></RightSlideButton>
            </Window>
        </MainContainer>
    );
};

export default Carousel;

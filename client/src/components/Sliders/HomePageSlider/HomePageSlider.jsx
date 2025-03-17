import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import './Slider.css'

const AutoplaySlider = withAutoplay(AwesomeSlider);

const HomePageSlider = ({children}) => {
    return (
        <>
            <AutoplaySlider
                bullets={false}
                organicArrows={true}
                play={true}
                cancelOnInteraction={false}
                interval={15000}
            >
                {children}
            </AutoplaySlider>
        </>
    );
};

export default HomePageSlider;
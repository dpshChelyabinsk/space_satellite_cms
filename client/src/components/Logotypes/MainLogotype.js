import React, {useState, useEffect} from 'react';
import LogoSVG from "./MainLogo/assets/LogoSVG";

const MainLogotype = ({active}) => {
    const color = active ? 'var(--sunset-orange)' : 'var(--dark-night)';
    const hoverColor = 'var(--sunset-orange)';

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1200);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 820);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <StyledLogo $hoverColor={hoverColor}>
            <LogoSVG/>
        </StyledLogo>
    );
};

export default MainLogotype;

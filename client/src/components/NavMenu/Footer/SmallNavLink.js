import React from 'react';
import {StyledSmallLink} from "./FooterStyles";
import {scrollToTop} from "../../../utils/ScrollToTop";

const SmallNavLink = ({ dir, children, location }) => {
    const isActive = location.pathname === dir;
    return (
        <StyledSmallLink to={dir} active={isActive ? 1 : 0} onClick={scrollToTop}>
            {children}
        </StyledSmallLink>
    );
};

export default SmallNavLink;
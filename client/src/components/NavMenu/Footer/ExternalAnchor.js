import React from 'react';
import {StyledAnchor} from "./FooterStyles";

const ExternalAnchor = ({ children, hovered, ...props }) => {
    return (
        <StyledAnchor $hovered={hovered} {...props}>
            {children}
        </StyledAnchor>
    );
};

export default ExternalAnchor;
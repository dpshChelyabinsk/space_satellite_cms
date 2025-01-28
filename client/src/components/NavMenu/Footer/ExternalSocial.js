import React from 'react';
import {StyledAnchorIcon} from "./FooterStyles";

const ExternalSocial = ({ children, hovered, ...props }) => {
    return (
        <StyledAnchorIcon $hovered={hovered} {...props}>
            {children}
        </StyledAnchorIcon>
    );
};

export default ExternalSocial;
import React from 'react';
import WhatsAppSVG from "../../assets/WhatsAppSVG";
import styled from "styled-components";

const StyledLogo = styled.div`
  width: 48px;
  height: 48px;

  &:hover {
    svg path {
      fill: ${props => props.$hoverColor};
    }
  }
`;

const WhatsAppLogotype = () => {
    const color = 'var(--pure-white)';
    const hoverColor = 'var(--sunset-orange)';

    return (
        <StyledLogo $hoverColor={hoverColor}>
            <WhatsAppSVG color={color} />
        </StyledLogo>
    );
};

export default WhatsAppLogotype;
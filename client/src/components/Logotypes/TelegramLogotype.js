import React from 'react';
import styled from "styled-components";
import TelegramSVG from "../../assets/TelegramSVG";

const StyledLogo = styled.div`
  width: 48px;
  height: 48px;

  &:hover {
    svg path {
      fill: ${props => props.$hoverColor};
    }
  }
`;

const TelegramLogotype = () => {
    const color = 'var(--pure-white)';
    const hoverColor = 'var(--sunset-orange)';

    return (
        <StyledLogo $hoverColor={hoverColor}>
            <TelegramSVG color={color} />
        </StyledLogo>
    );
};

export default TelegramLogotype;
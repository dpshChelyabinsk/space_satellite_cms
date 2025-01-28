import React from 'react';
import styled from "styled-components";
import YouTubeSVG from "../../assets/YouTubeSVG";

const StyledLogo = styled.div`
  width: 48px;
  height: 48px;

  &:hover {
    svg path {
      fill: ${props => props.$hoverColor};
    }
  }
`;

const YouTubeLogotype = () => {
    const color = 'var(--pure-white)';
    const hoverColor = 'var(--sunset-orange)';

    return (
        <StyledLogo $hoverColor={hoverColor}>
            <YouTubeSVG color={color} />
        </StyledLogo>
    );
};

export default YouTubeLogotype;
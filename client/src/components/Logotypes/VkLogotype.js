import React from 'react';
import styled from "styled-components";
import VkSVG from "../../assets/VkSVG";

const StyledLogo = styled.div`
  width: 48px;
  height: 48px;

  &:hover {
    svg path {
      fill: ${props => props.$hoverColor};
    }
  }
`;

const VkLogotype = () => {
    const color = 'var(--pure-white)';
    const hoverColor = 'var(--sunset-orange)';

    return (
        <StyledLogo $hoverColor={hoverColor}>
            <VkSVG color={color} />
        </StyledLogo>
    );
};

export default VkLogotype;
import React from 'react';
import styled from "styled-components";

const SpaceButton = styled.button`
  width: 100%;
  height: 100%;
  background-color: ${props => props.$color};
  color: var(--pure-white);
  font-family: var(--font-family);
  font-weight: 400;
  font-size: 16px;
  border: none;
  border-radius: 40px;
  transition: background-color 0.5s ease-in-out;
  
  &:hover {
    background-color: ${props => props.$hoverColor};
  }
`;

const Button = ({children, $color, $hoverColor, ...props}) => {
    return (
        <SpaceButton $color={$color} $hoverColor={$hoverColor} {...props}>
            {children}
        </SpaceButton>
    );
};

export default Button;
import React from 'react';
import styled from "styled-components";
import Load from '../../assets/loader.svg'

const SatteliteLoader = styled.img`
  position: absolute;
  z-index: 200;
  left: 50%;
  top: 50%;
  width: 150px;
  height: 150px;
  transform: translate(-50%, -50%);
  animation: rotateReverse 1s linear infinite;

  @keyframes rotateReverse {
    from {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    to {
      transform: translate(-50%, -50%) rotate(-360deg);
    }
  }
`;

const Loader = () => {
    return (
        <SatteliteLoader src={Load}/>
    );
};

export default Loader;
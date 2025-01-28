import styled, {keyframes} from "styled-components";

const rotatePlanet = keyframes`
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(0deg);
  }
`;

const movePlanet = (translateXStart, translateYStart, translateXMid, translateYMid, translateXEnd, translateYEnd) => keyframes`
  0% {
    transform: translate(${translateXStart}px, ${translateYStart}px);
  }
  50% {
    transform: translate(${translateXMid}px, ${translateYMid}px);
  }
  100% {
    transform: translate(${translateXEnd}px, ${translateYEnd}px);
  }
`;

export const OrangePlanetBox = styled.img`
  position: absolute;
  z-index: 2;
  width: 21.1515625%;
  height: 11.75648148148148%;
  top: 10.26666666666667%;
  left: 73.9640625%;
  transform-origin: 61% 50%;
  animation: ${rotatePlanet} 8s ease-in-out infinite;
`;

export const MoonBox = styled.img`
  position: absolute;
  z-index: 2;
  width: 5.72916666666667%;
  height: 10.18518518518519%;
  top: 35.02314814814815%;
  left: 90.46875%;
  animation: ${movePlanet(0, 0, 0, 15, 0, 0)} 4s ease-in-out infinite;
`;

export const StantionBox = styled.img`
  position: absolute;
  z-index: 2;
  width: 18.85416666666667%;
  height: 35.55555555555556%;
  top: 14.16666666666667%;
  left: 7.34375%;
  animation: ${movePlanet(0, 0, 7, 15, 0, 0)} 12s ease-in-out infinite;
`;

export const SpaceMarineBox = styled.img`
  position: absolute;
  z-index: 2;
  width: 9.12708333333333%;
  height: 15.43055555555556%;
  top: 28.61111111111111%;
  left: 21.875%;
  animation: ${rotatePlanet} 7s ease-in-out infinite;
`;

export const YellowPlanetBox = styled.img`
  position: absolute;
  z-index: 2;
  width: 8.81041666666667%;
  height: 6.52037037037037%;
  top: 51.66111111111111%;
  left: 28.4921875%;
  animation: ${movePlanet(0, 0, -20, 12, 0, 0)} 9s ease-in-out infinite;
`;

export const UFOBox = styled.img`
  position: absolute;
  z-index: 2;
  width: 4.32552083333333%;
  height: 3.49074074074074%;
  top: 76.41203703703704%;
  left: 84.6875%;
  animation: ${rotatePlanet} 4s ease-in-out infinite;
`;

export const BluePlanetBox = styled.img`
  position: absolute;
  z-index: 2;
  width: 12.44791666666667%;
  height: 10.91851851851852%;
  top: 61.78240740740741%;
  left: 61.51041666666667%;
  transform-origin: 61% 50%;
  animation: ${rotatePlanet} 8s ease-in-out infinite;
`;
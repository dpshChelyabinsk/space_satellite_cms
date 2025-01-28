import styled, { keyframes, css } from "styled-components";

export const MainContainer = styled.div`
  left: 0;
  top: 0;
  width: 100%;
  z-index: 0;
`;

export const Window = styled.div`  
  width: 100%;
  overflow: hidden;
  position: relative;
  z-index: 1;
`;

export const AllPagesContainer = styled.div`
  width: 100%;
  transition: transform 0.3s ease-in-out;
  transform: translateX(${props => props.$translate}%);
`;

const moveLeft = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-10px);
  }
  100% {
    transform: translateX(0);
  }
`;

const moveRight = keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(10px);
  }
  100% {
    transform: translateX(0);
  }
`;

const animationLeft = css`
  animation: ${moveLeft} 2s ease-in-out infinite;
`;

const animationRight = css`
  animation: ${moveRight} 2s ease-in-out infinite;
`;

export const LeftSlideButton = styled.button`
  position: absolute;
  top: 75.48148148148148%;
  left: 6.14583333333333%;

  border: none;
  background-color: rgba(255, 255, 255, 0);
  z-index: 5;

  ${({ disabled }) => !disabled && animationLeft}

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const RightSlideButton = styled.button`
  position: absolute;
  top: 75.48148148148148%;
  left: 91.71875%;

  border: none;
  background-color: rgba(255, 255, 255, 0);
  z-index: 5;

  ${({ disabled }) => !disabled && animationRight}

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const ArrowImage = styled.img`
  width: fit-content;
  height: 40px;
`;

export const BackgroundItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  user-select: none;
  width: fit-content;
  min-width: 300%;
  max-width: 5760px;
`;


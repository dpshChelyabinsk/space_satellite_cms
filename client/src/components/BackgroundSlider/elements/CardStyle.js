import styled from "styled-components";

export const MainNewsHead = styled.h1`
      position: absolute;
      width: 18.80208333333333%;
      top: 17.59259259259259%;
      left: 13.54166666666667%;      
      color: var(--sunset-orange);
      font-family: var(--font-family);
      font-weight: bold;
`;

export const ShortEvent = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: absolute;
      z-index: 6;
      top: ${props => props.$top}%;
      left: ${props => props.$left}%;
      width: 25%;
      height: 15%;   
      color: var(--pure-white);
`;

export const RowHeader = styled.div`
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 15px;
`;

export const TypeChip = styled.div`
      display: flex;
      align-items: center;
      width: fit-content;
      height: 60%;
      padding: 5px 10px;
      border-radius: 20px;
      font-size: 12px;
      font-family: var(--font-family);
      font-weight: 400;
      color: var(--pure-white);
      background-color: var(--sunset-orange);
`;

export const EventHeader = styled.h2`
      font-family: var(--font-family);
      font-weight: 400;
      font-size: 32px;
      color: ${props => props.$darkColor ? `var(--dark-night)`: `var(--pure-white)`};
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
`;

export const Description = styled.p`
      font-family: var(--font-family);
      font-weight: 200;
      font-size: 16px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      color: ${props => props.$darkColor ? `var(--dark-night)`: `var(--pure-white)`};
`;

export const ButtonWrap = styled.div`
      position: relative;
      width: 100%;
      height: 28.57142857142857%;
`;
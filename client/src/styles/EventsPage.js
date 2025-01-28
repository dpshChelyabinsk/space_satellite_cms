import styled from "styled-components";

export const FilterBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  margin-bottom: 60px;
`;

export const Select = styled.select`
  width: 200px;
  height: 28px;
  border-radius: 5px;
  border: none;
  font-size: 20px;
  outline: none;
  font-family: var(--font-family);

  &:focus {
    border-color: var(--royal-lilac);
    box-shadow: 0 0 5px var(--royal-lilac);
  }
`;

export const ResetButton = styled.button`
  background-color: rgba(0, 0, 0, 0);
  color: var(--royal-lilac);
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: color 0.3s;
  font-family: var(--font-family);

  &:hover {
    color: var(--sunset-orange);
  }
`;

export const EventsBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 3.92857142857143%;
  width: 100%;
  height: 71.1864406779661%;
  min-height: 600px;
`;

export const PaginationBox = styled.div`
  display: flex;
  width: fit-content;
  max-width: 900px;
  height: 4.2%;
  margin-top: 3%;
`;

export const PaginationItem = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  background-color: rgba(0, 0, 0, 0);
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: ${props => props.$active ? '2px solid var(--dark-night)' : '2px solid rgba(0, 0, 0, 0)'};
  font-size: 24px;
  font-family: var(--font-family);
  font-weight: bold;

  &:hover {
    cursor: pointer;
  }
`;

export const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30.71428571428571%;
  height: 47.61904761904762%;
  min-height: 270px;
  padding: 20px 0;
  border-radius: 10px;
  background-image: url(${props => props.$background});
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4); // Черный цвет с прозрачностью 40%
    border-radius: 10px;
  }
`;

export const CardItems = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
  font-family: var(--font-family);
  color: var(--pure-white);
  z-index: 1;
  width: 100%;
  height: 100%;
`;

export const ButtonChipWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90.69767441860465%;
  height: 21.26333333333333%;
`;

export const ChipWrapper = styled.div`
  width: 17.69230769230769%;
  height: 21.26333333333333%;
`;

export const TypeChip = styled.div`
  width: fit-content;
  height: fit-content;
  background-color: var(--honey-glow);
  padding: 6px 8px;
  font-size: 12px;
  border-radius: 12px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 35.12820512820513%;
  height: 100%;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  height: 43.75293933218373%;
`;

export const InfoWrapper = styled.div`
  width: 90.69767441860465%;
  height: 44.07274964432653%;
`;

export const InfoDate = styled.p``;

export const InfoTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
  line-height: 140%;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const InfoPlaceBox = styled.div`
  position: absolute;
  bottom: 0;
  width: 90%;
  display: flex;
  margin-top: 2.04309893561333%;
`;

export const InfoGeoIcon = styled.img``;

export const InfoPlace = styled.p`
  height: 18.42105263157895%;
  margin-left: 4%;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;



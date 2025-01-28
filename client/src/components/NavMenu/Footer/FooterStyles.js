import styled from 'styled-components';
import {Link} from "react-router-dom";

export const StyledSmallLink = styled(Link)`
  width: fit-content;
  height: 12.72727272727273%;
  margin: 3% 0;
  color: ${props => (props.active ? 'var(--sunset-orange)' : 'var(--pure-white)')};
  font-family: var(--font-family);
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
  transition: ease-in-out 250ms;

  &:hover {
    color: var(--sunset-orange);
  }
`;

export const StyledAnchor = styled.a`
  width: fit-content;
  height: 12.72727272727273%;
  margin: 3% 0;
  color: ${'var(--pure-white)'};
  font-family: var(--font-family);
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
  transition: ease-in-out 250ms;

  &:hover {
    color: ${props => (props.$hovered ? 'var(--sunset-orange)' : 'var(--pure-white)')};
    cursor: ${props => (props.$hovered ? 'pointer' : 'default')};
  }
`;

export const StyledAnchorIcon = styled.a`
  width: 48px;
  height: 48px;
  margin: 3% 0;
  color: ${'var(--pure-white)'};
  font-family: var(--font-family);
  font-weight: bold;
  font-size: 20px;
  text-decoration: none;
  transition: ease-in-out 250ms;

  &:hover {
    color: ${props => (props.$hovered ? 'var(--sunset-orange)' : 'var(--pure-white)')};
    cursor: ${props => (props.$hovered ? 'pointer' : 'default')};
  }
`;

export const StyledWrapperFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 1000px;
  max-height: 700px;
  background-color: var(--dark-night);
`;

export const StyledMenuFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 72.91666666666667%;
  max-width: 1400px;
  height: 100%;
  max-height: 600px;
  background-color: var(--dark-night);
  padding-top: 45px;
`;

export const StyledWrapperAll = styled.div`
  width: 100%;
  height: fit-content;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
  padding: 0 4px;

  @media (max-width: 1020px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledWrapperBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  @media (max-width: 1020px) {
    &:nth-child(1) {
      grid-column: 1;
    }

    &:nth-child(2) {
      grid-column: 2;
    }

    &:nth-child(3) {
      grid-column: span 1;
    }
  }

  @media (max-width: 768px) {
    &:nth-child(1) {
      grid-column: 1;
      grid-row: 2;
    }

    &:nth-child(2) {
      grid-column: 1;
      grid-row: 1;
    }

    &:nth-child(3) {
      grid-row: 1;
      grid-column: 2;
    }
  }
`;

export const HeaderContacts = styled(StyledAnchor) `
  @media (max-width: 768px) {
    display: none;
  }
`;

export const SlyledContacts = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 240px;
  height: 14.51044776119403%;
  
  @media (max-width: 768px) {
    display: grid;
    grid-gap: 16px;
    grid-template-rows: none;
    grid-template-columns: none;
  }
`

export const StyledWrapperCredits = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 18px 0;
  
  font-family: var(--font-family);
  font-weight: bold;
  font-size: 16px;
  color: var(--royal-lilac);
`;
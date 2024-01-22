import styled from 'styled-components';

export const StyledButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  background-color: #AA8497;
  color: #F6EDF1; 
  font-size: 14px;
  transition: background-color 0.1s, color 0.1s;
  font-family: 'Tenor Sans', sans-serif;
  cursor: pointer;
  margin: 50px 0;
  letter-spacing: 1px;
 
  &:hover {
    background-color: #B493A4;
    color: #F6EDF1;
  }

  // Responsive tablet
  @media (min-width: 768px) {
    width: 170px;
    height: 60px;
  }

  // Responsive desktop
  @media (min-width: 1024px) {
    width: 260px;
    height: 70px;
  }
`;

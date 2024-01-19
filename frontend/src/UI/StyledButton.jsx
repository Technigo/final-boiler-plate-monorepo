import styled from 'styled-components';

// Define your base StyledButton with base styles
export const StyledButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  background-color: #DBC6B6; // Example background color
  color: #1D1C25; // Example text color
  font-size: 14px;
  transition: background-color 0.1s, color 0.1s;
  font-family: 'Tenor Sans', sans-serif;
  cursor: pointer;
  margin: 100px 0;
  letter-spacing: 1px;
  &:hover {
    color: #5a493b;
  }
`;

// StyledButton to create InternalStyledButton with additional styles
export const InternalStyledButton = styled(StyledButton)`
  border-radius: 30px;
  width: 92px;
  height: 53px;
  background-color: #DBC6B6;
  color: #1D1C25;
  // You can add or override more styles here

  &:hover {
    background-color: #dbc6b6cf;
    color: #5a493b;
  }

  // Responsive tablet
  @media (min-width: 768px) {
    width: 140px;
    height: 60px;
  }

  // Responsive desktop
  @media (min-width: 1024px) {
    width: 260px;
    height: 70px;
  }
`;

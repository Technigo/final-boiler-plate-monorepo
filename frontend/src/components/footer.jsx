import React from 'react';
import styled from 'styled-components';

// Create a styled component for the footer
const FooterContainer = styled.footer`
  background-color: #B6244F; 
  color: #504746; 
  padding: 10px; 
  text-align: center; 
`;

const FooterParagraph = styled.p`
  font-size: 16px; 
  font-family: Arial, sans-serif; 
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterParagraph>Copyright by Malin Lunde, Ulrika Gålnander, and Alexandra Meija</FooterParagraph>
    </FooterContainer>
  );
};

export default Footer;



import React from "react";
import styled from "styled-components";

// Create a styled component for the footer
const FooterContainer = styled.footer`
  background-color: #01999a;
  color: #504746;
  padding: 10px;
  text-align: center;
  margin-top: 40px;
`;

const FooterParagraph = styled.p`
  font-size: 16px;
  font-family: "Mercusuar";
  color: white;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterParagraph>
        (C) Malin Lunde, Ulrika Gålnander and Alexandra Meija
      </FooterParagraph>
    </FooterContainer>
  );
};

export default Footer;

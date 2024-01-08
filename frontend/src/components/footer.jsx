import React from "react";
import styled from "styled-components";

const tablet = `(min-width: 640px)`;
const desktop = `(min-width: 1007px)`;

const FooterContainer = styled.footer`
  background-color: #01999a;
  padding: 2px;
  text-align: center;
  margin-top: 40px;
  border-radius: 5px;

  @media ${tablet} {
    background-color: #01999a;
    padding: 5px;
    text-align: center;
    margin-top: 40px;
    border-radius: 5px;
  }
  @media ${desktop} {
    background-color: #01999a;
    padding: 5px;
    text-align: center;
    margin-top: 40px;
    border-radius: 5px;
  }
`;

const FooterParagraph = styled.p`
  font-size: 10px;
  font-family: "JosefinSans";
  color: white;

  @media ${tablet} {
    font-size: 16px;
    font-family: "JosefinSans";
    color: white;
  }
  @media ${desktop} {
    font-size: 16px;
    font-family: "JosefinSans";
    color: white;
  }

  a {
    color: inherit; /* Inherit the color from the parent element */
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterParagraph>
        (C) &nbsp;
        <a href="https://www.linkedin.com/in/malin-lunde-9a4558297/">
          Malin Lunde
        </a>
        , &nbsp;
        <a href="https://www.linkedin.com/in/ulrika-gålnander-076563134">
          Ulrika Gålnander
        </a>
        &nbsp;and &nbsp;
        <a href="https://www.linkedin.com/in/alexandra-meija-0757403b">
          Alexandra Meija
        </a>
      </FooterParagraph>
    </FooterContainer>
  );
};

export default Footer;

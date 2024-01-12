import { SocialMediaLinks } from "./SocialMediaLinks";
import styled from "styled-components";

// Styling for the footer
const StyledFooter = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 20px 0;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
  background: -webkit-linear-gradient(45deg, #633d57, #9b6489, #633d57);

  a {
    font-size: 20px;
  }
`;

const FooterText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(lighttext);
  font-size: 16px;

  @media screen and (min-width: 800px) {
    .contact-wrapper {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      gap: 50px;
    }
  }
`;

const Contact = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
`;

// Define the Footer component as a functional component.
export const Footer = () => {
  return (
    <StyledFooter>
      <FooterText>
        <div className="contact-wrapper">
          <div className="anna-wrapper">
            <Contact>
              <p>Anna Robertsson</p>
              <SocialMediaLinks person="Anna" />
            </Contact>
          </div>
          <div className="susanne-wrapper">
            <Contact>
              <p>Susanne Ekenheim</p>
              <SocialMediaLinks person="Susanne" />
            </Contact>
          </div>
        </div>
        <p>
          Final project at Technigo | Web Development Bootcamp, January 2024
        </p>
      </FooterText>
    </StyledFooter>
  );
};

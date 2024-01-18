import { SocialMediaLinks } from "./SocialMediaLinks";
import { BodyText } from "./Typography/BodyText";
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
`;

const ContactWrapper = styled.div`
  @media screen and (min-width: 800px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 50px;
  }
`;

const Contact = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
`;

const AnnaWrapper = styled.div``;

const SusanneWrapper = styled.div``;

// Define the Footer component as a functional component.
export const Footer = () => {
  return (
    <StyledFooter>
      <FooterText>
        <ContactWrapper>
          <AnnaWrapper>
            <Contact>
              <BodyText
                className={"bodytext-footer"}
                text={"Anna Robertsson"}
              />
              <SocialMediaLinks person="Anna" />
            </Contact>
          </AnnaWrapper>
          <SusanneWrapper>
            <Contact>
              <BodyText
                className={"bodytext-footer"}
                text={"Susanne Ekenheim"}
              />
              <SocialMediaLinks person="Susanne" />
            </Contact>
          </SusanneWrapper>
        </ContactWrapper>
        <BodyText
          className={"bodytext-footer"}
          text={
            "Final project at Technigo | Web Development Bootcamp, January 2024"
          }
        />
      </FooterText>
    </StyledFooter>
  );
};

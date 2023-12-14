import { SocialMediaLinks } from "../components/SocialMediaLinks";
import styled from "styled-components";

const AboutLinks = styled.div`
  display: flex;
  gap: 32px;
  margin-top: 64px;
`;

export const About = () => {
  return (
    <AboutLinks>
      <SocialMediaLinks
        annaLinks={{
          linkedin: "https://www.linkedin.com/in/anna-robertsson-829967272/",
          github: "https://github.com/AnnaRobertsson",
          // ... other Anna links
        }}
        susanneLinks={{
          linkedin: "https://www.linkedin.com/in/susanne-ekenheim-123456789/",
          github: "https://github.com/SusanneEkenheim",
          // ... other Susanne links
        }}
      />
    </AboutLinks>
  );
};

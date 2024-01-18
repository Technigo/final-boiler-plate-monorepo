import { SocialMediaLinks } from "../components/SocialMediaLinks";
import { ProfilePhotoFounder } from "../components/ProfilePhoto/ProfilePhotoFounder";
import { Heading1 } from "../components/Typography/Heading1";
import { Heading2 } from "../components/Typography/Heading2";
import { Heading3 } from "../components/Typography/Heading3";
import { BodyText } from "../components/Typography/BodyText";
import styled from "styled-components";

const StyledAbout = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 64px;
`;

const StyledVision = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 20px;
`;

const StyledFounderSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const StyledFounders = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;

  @media screen and (min-width: 1100px) {
    flex-direction: row;
    gap: 100px;
  }

  @media screen and (min-width: 1400px) {
    gap: 200px;
  }
`;

const StyledFounderInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const About = () => {
  return (
    <StyledAbout>
      <StyledVision>
        <Heading1 className={"heading1-about"} text={"Our vision"} />
        <BodyText
          className={"bodytext-about"}
          text={
            "The inspiration to creating this site rose from the needs that emerged during the COVID-19 pandemic, where individuals were unable to leave their houses due to illness or age. At the time, communities aiming to helping those in need arose. As the pandemic subsided, the help did too. But the people who needs help remains. This realization fueled our desire to create a platform where this spirit of assistance could continue thriving even after the pandemic subsided."
          }
        />
        <BodyText
          className={"bodytext-about"}
          text={
            "As two compassionate women, we see the importance of providing assistance beyond the challenges posed by the pandemic. While the initial focus during the pandemic was on helping with groceries, we now see that there are ongoing needs for various tasks, such as garden work or small repairs. Simultaneously, there are individuals eager to lend a helping hand."
          }
        />
        <BodyText
          className={"bodytext-about"}
          text={
            "Today, we aspire for this school project to serve as a catalyst, inspiring the community to actively engage in meaningful efforts to assist others. We envision this initiative sparking a collective spirit of compassion and community involvement. Through collaborative endeavors, we aim to make a tangible and positive impact on the lives of those who may need a helping hand. Together, let&apos;s turn this project into a source of inspiration for genuine acts of kindness within our community."
          }
        />
      </StyledVision>
      <StyledFounderSection>
        <Heading2 className={"heading2-about"} text={"Founders"} />
        <StyledFounders>
          <StyledFounderInfo>
            <ProfilePhotoFounder person="Susanne" />
            <Heading3 className={"heading3-about"} text={"Susanne Ekenheim"} />
            <SocialMediaLinks person="Susanne" />
          </StyledFounderInfo>
          <StyledFounderInfo>
            <ProfilePhotoFounder person="Anna" />
            <Heading3 className={"heading3-about"} text={"Anna Robertsson"} />
            <SocialMediaLinks person="Anna" />
          </StyledFounderInfo>
        </StyledFounders>
      </StyledFounderSection>
    </StyledAbout>
  );
};

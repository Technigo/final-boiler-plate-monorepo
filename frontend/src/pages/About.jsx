import { SocialMediaLinks } from "../components/SocialMediaLinks";
import { ProfilePhotoFounder } from "../components/ProfilePhoto/ProfilePhotoFounder";
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

  p {
    text-align: left;
  }
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
        <h2>Our vision</h2>
        <p>
          The inspiration to creating this site rose from the needs that emerged
          during the COVID-19 pandemic, where individuals were unable to leave
          their houses due to illness or age. At the time, communities aiming to
          helping those in need arose. As the pandemic subsided, the help did
          too. But the people who needs help remains. This realization fueled
          our desire to create a platform where this spirit of assistance could
          continue thriving even after the pandemic subsided.
        </p>
        <p>
          As two compassionate women, we see the importance of providing
          assistance beyond the challenges posed by the pandemic. While the
          initial focus during the pandemic was on helping with groceries, we
          now see that there are ongoing needs for various tasks, such as garden
          work or small repairs. Simultaneously, there are individuals eager to
          lend a helping hand.
        </p>
        <p>
          Today, we aspire for this school project to serve as a catalyst,
          inspiring the community to actively engage in meaningful efforts to
          assist others. We envision this initiative sparking a collective
          spirit of compassion and community involvement. Through collaborative
          endeavors, we aim to make a tangible and positive impact on the lives
          of those who may need a helping hand. Together, let&apos;s turn this
          project into a source of inspiration for genuine acts of kindness
          within our community.
        </p>
      </StyledVision>
      <StyledFounderSection>
        <h2>Founders</h2>
        <StyledFounders>
          <StyledFounderInfo>
            <ProfilePhotoFounder person="Susanne" />
            <h3>Susanne Ekenheim</h3>
            <SocialMediaLinks person="Susanne" />
          </StyledFounderInfo>
          <StyledFounderInfo>
            <ProfilePhotoFounder person="Anna" />
            <h3>Anna Robertsson</h3>
            <SocialMediaLinks person="Anna" />
          </StyledFounderInfo>
        </StyledFounders>
      </StyledFounderSection>
    </StyledAbout>
  );
};

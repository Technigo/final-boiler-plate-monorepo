import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import styled from "styled-components";
import alexandra from "../assets/alexandra.jpg";
import ulrika from "../assets/ulrika.png";
import malin from "../assets/newmalin.png";
import Techlogo from "../assets/technigologosmall.png";

const tablet = `(min-width: 768px)`;
const desktop = `(min-width: 1024px)`;

const AboutWrapper = styled.div`
  margin: 0 auto;
  padding: 20px;
  background-color: white; /* Your chosen color */
  min-height: 100vh; /* Make sure it covers the full height of the viewport */
`;

const IntroParagraph = styled.p`
  font-size: 20px;
  margin-bottom: 30px;
  color: #01999a;
  text-align: center;
  font-family: "JosefinSans";

  @media ${tablet} {
    font-size: 24px;
    margin-bottom: 25px;
    color: #01999a;
    text-align: center;
    font-family: "JosefinSans";
  }
  @media ${desktop} {
    font-size: 24px;
    margin-bottom: 25px;
    color: #01999a;
    text-align: center;
    font-family: "JosefinSans";
  }
`;

const TeamSection = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  @media ${tablet} {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  @media ${desktop} {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

const TeamMember = styled.div`
  flex-basis: calc(33.33% - 20px);
  margin-bottom: 20px;
  text-align: center;
  color: #01999a;
  font-family: Montserrat, sans-serif;
`;

const TeamMemberPhoto = styled.img`
  max-width: 100%;
  border-radius: 5px;
  height: 150px;
  width: auto;
  @media ${tablet} {
    max-width: 100%;
    border-radius: 5px;
    height: 190px;
    width: 120px;
  }
  @media ${desktop} {
    max-width: 100%;
    border-radius: 5px;
    height: 190px;
    width: 120px;
  }
`;

const TeamMemberName = styled.h3`
  font-size: 30px;
  font-family: "JosefinSans";
  margin: 10px 10px;
  margin-top: 30px;
  text-decoration: none;
`;

const TeamMemberDescription = styled.p`
  font-size: 20px;
  margin-bottom: 10px;
`;

const PortfolioLink = styled.a`
  font-size: 16px;
  text-decoration: none;
  color: #0e6e6e;
`;

const TechnigoLogo = styled.img`
  height: 40px;
  width: auto;
`;

// AboutPage component
const AboutPage = () => {
  return (
    <>
      <Navbar />
      <AboutWrapper>
        <IntroParagraph>
          Final project made for the <br></br>
          <br></br>&nbsp;
          <a
            href="https://www.technigo.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TechnigoLogo src={Techlogo} alt="Technigo Logo" />
          </a>
          &nbsp;<br></br>
          Web Developer Bootcamp of Fall 2023 <br></br>
          <br></br>This is a labour of sweat, tired knuckles and love - please
          feel free to reach out to any of us!
        </IntroParagraph>
        <TeamSection>
          <TeamMember>
            <a
              href="https://www.linkedin.com/in/malin-lunde-9a4558297/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TeamMemberPhoto src={malin} alt="Malin Lundhe" />{" "}
            </a>
            <TeamMemberName>Malin Lunde</TeamMemberName>
            <TeamMemberDescription>
              Malin has an incredible brain comparable to a filing cabinet, she
              can bring out any comment made on a subject from three weeks ago
              and deliver it with a "I think I heard something about that.." and
              then explain the whole thing in detail via excellent notes. Malin
              is an integral part of the team and this page would not exist
              without her!
            </TeamMemberDescription>
            <PortfolioLink
              href="portfolio1-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio
            </PortfolioLink>
          </TeamMember>

          <TeamMember>
            <a
              href="https://www.linkedin.com/in/ulrika-gålnander-076563134"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TeamMemberPhoto src={ulrika} alt="Ulrika Gålnander" />
            </a>
            <a
              href="https://www.linkedin.com/in/ulrika-gålnander-076563134"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TeamMemberName>Ulrika Gålnander</TeamMemberName>
            </a>
            <TeamMemberDescription>
              The wrong enviroment or "mood" can kill any gourmet meal.<br></br>{" "}
              As soon as Alexandra mentioned her idea I was onboard as I
              instantly felt "I would use that". <br></br>We have a plethora of
              restaurants in Stockholm, but very little info to go on for the
              vibe, apart from looking through endless reviews - this changes
              that!
            </TeamMemberDescription>
            <PortfolioLink
              href="https://github.com/Shiqwan"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </PortfolioLink>
          </TeamMember>
          <TeamMember>
            <a
              href="https://www.linkedin.com/in/alexandra-meija-0757403b"
              target="_blank"
              rel="noopener noreferrer"
            >
              <TeamMemberPhoto src={alexandra} alt="Alexandra Meija" />
            </a>
            <TeamMemberName>Alexandra Meija</TeamMemberName>
            <TeamMemberDescription>
              For me a foodie is someone who really loves food, and not just the
              high- end fancy pants restaurants, but just plain good food,
              either it is an amazing fishcake you buy for 10 bahts from a
              street vendor or having a seven course meal at Ekstedt. And for me
              the experience is enhanced when you find that perfect spot that
              suits you and the people you are with, that you can hold a
              conversation and that it's cozy. I always look for dogfriendly
              places so I can take with me my furrycompanion. I have a lot of
              favorites, but if I had to pick one place it's Bar Doma, it works
              for everything, and yes, it's dog friendly. An extra neat feature
              is the dessertcart which gets rolled out after every meal.
            </TeamMemberDescription>
            <PortfolioLink
              href="https://alexandrameijaportfolio.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portfolio
            </PortfolioLink>
          </TeamMember>
        </TeamSection>
      </AboutWrapper>
      <Footer />
    </>
  );
};

export default AboutPage;

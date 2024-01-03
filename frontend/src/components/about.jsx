import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import styled from "styled-components";
import alexandra from '../assets/alexandra.jpg'

const AboutWrapper = styled.div`
  margin: 0 auto;
  padding: 20px;
  background-color: #fff0f3; /* Your chosen color */
  min-height: 100vh; /* Make sure it covers the full height of the viewport */
`;

const IntroParagraph = styled.p`
  font-size: 24px;
  margin-bottom: 20px;
  color: #800f2f;
  font-family: "Mercusuar";
`;

const TeamSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const TeamMember = styled.div`
  flex-basis: calc(33.33% - 20px);
  margin-bottom: 20px;
  text-align: center;
  color: #800f2f;
  font-family: Mercusuar;
`;

const TeamMemberPhoto = styled.img`
  max-width: 100%;
  border-radius: 50%;
  height: 120px;
  width: 120px;
`;

const TeamMemberName = styled.h3`
  font-size: 20px;
  margin: 10px 0;
`;

const TeamMemberDescription = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const PortfolioLink = styled.a`
  font-size: 16px;
  text-decoration: none;
  color: #007bff;
`;

// AboutPage component
const AboutPage = () => {
  return (
    <>
      <Navbar />
      <AboutWrapper>
        <IntroParagraph>
          {/* Your intro paragraph content */}
          We are three coders who teamed up during our final sprint of the 
          <a href="https://www.technigo.io/" target="_blank" rel="noopener noreferrer">Technigo</a>
web developer bootcamp to bring you the Foodie moodie app. 
        </IntroParagraph>
        <TeamSection>
          <TeamMember>
            <TeamMemberPhoto src="placeholder1.jpg" alt="The Brains" />
            <TeamMemberName>Malin Lunde</TeamMemberName>
            <TeamMemberDescription>Description here</TeamMemberDescription>
            <PortfolioLink href="portfolio1-link">Portfolio</PortfolioLink>
          </TeamMember>

          <TeamMember>
            <TeamMemberPhoto src="placeholder2.jpg" alt="The Floof" />
            <TeamMemberName>Ulrika Galnander</TeamMemberName>
            <TeamMemberDescription>Description here </TeamMemberDescription>
            <PortfolioLink href="portfolio2-link">Portfolio</PortfolioLink>
          </TeamMember>

          <TeamMember>
            <TeamMemberPhoto src="placeholder3.jpg" alt="The Genius" />
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
            <PortfolioLink href="portfolio3-link">Portfolio</PortfolioLink>
          </TeamMember>
        </TeamSection>
      </AboutWrapper>
      <Footer />
    </>
  );
};

export default AboutPage;

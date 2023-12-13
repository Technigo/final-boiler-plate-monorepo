import React from 'react';
import Navbar from './navbar';
import Footer from './footer';
import styled from 'styled-components';

// Styled-components definitions
const AboutWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const IntroParagraph = styled.p`
  font-size: 24px;
  margin-bottom: 20px;
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
`;

const TeamMemberPhoto = styled.img`
  max-width: 100%;
  border-radius: 50%;
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
  color: #007BFF;
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
          <a href="https://www.technigo.io/">Technigo</a> web developer bootcamp to bring you the Foodie moodie app. 
        </IntroParagraph>
        <TeamSection>
          <TeamMember>
            <TeamMemberPhoto src="placeholder1.jpg" alt="Team Member 1" />
            <TeamMemberName>Malin Lunde</TeamMemberName>
            <TeamMemberDescription>
              Brief description of Team Member 1 goes here.
            </TeamMemberDescription>
            <PortfolioLink href="portfolio1-link">Portfolio</PortfolioLink>
          </TeamMember>

          <TeamMember>
          <TeamMemberPhoto src="placeholder2.jpg" alt="Team Member 2" />
          <TeamMemberName>Ulrika Gålnander</TeamMemberName>
          <TeamMemberDescription>
            Brief description of Team Member 2 goes here.
          </TeamMemberDescription>
          <PortfolioLink href="portfolio2-link">Portfolio</PortfolioLink>
        </TeamMember>

        <TeamMember>
          <TeamMemberPhoto src="placeholder3.jpg" alt="Team Member 3" />
          <TeamMemberName>Alexandra Meija</TeamMemberName>
          <TeamMemberDescription>
            Brief description of Team Member 3 goes here.
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


import React from 'react';
import styled from 'styled-components';


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

const AboutPage = () => {
  return (
    <AboutWrapper>
      <IntroParagraph>
        We are three coders who teamed up during or final sprint of the <a href="https://www.technigo.io/">Technigo</a> webdeveloper bootcamp to bring you the Foodie moodie app. 
        Are you tired of never knowing where to go for dinner? Have you ever been on a really hot date and ended up at a restaurant with kids hanging in the chandeliers or the opposite, 
        taking your kids out to a nice dinner only to find your self at a place that is stiffer than a job interview. We want to give you the best experience depending on the occasion and the mood you want to set, 
        whether it's a nice date, a family dinner, catching up with friends or ending a relationship. We got you covered,  just go to the startpage and start to tailor your perfect occasion!
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

        {/* Team Member 3 */}
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
  );
};

export default AboutPage;

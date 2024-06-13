import styled from "styled-components";
import logo from "/src/assets/Logo.png";
import linkedin from "/src/assets/linkedin.png"
import portfolio from "/src/assets/portfolio.png"
import github from "/src/assets/github.png"
import frida from "/src/assets/FridaForser.png"
import erika from "/src/assets/ErikaWernbro.png"
import pernilla from "/src/assets/PernillaSterner.png"
import katarina from "/src/assets/KatarinaSjolin.png"


export const OmOss = () => {
    return (
      <AboutContainer>
      <AboutTitle>Om oss</AboutTitle>
      <Description>Teamet bakom Pluggin'</Description>
      <PeopleDiv>
        <PersonDiv>
            <PersonImg src={erika} width="150" alt="Erika-Wernbro"/>
            <Person>Erika Wernbro</Person>
            <City>Kalmar</City>
            <LinksDiv>
                <LinkedIn href="https://www.linkedin.com/in/erika-wernbro/">
                    <LinkedInIcon src={linkedin} alt="linkedinlogo" width="25"/>
                </LinkedIn>
                <Portfolio href="https://tejpex.com/">
                    <PortfolioIcon src={portfolio} alt="portfoliologo" width="45"/>
                </Portfolio>
                <GitHub href="https://github.com/Tejpex">
                    <GitHubIcon src={github} alt="githublogo" width="25"/>
                </GitHub>
            </LinksDiv>
        </PersonDiv>
        <PersonDiv>
            <PersonImg src={pernilla} width="150" alt="Pernilla-Sterner"/>
            <Person>Pernilla Sterner</Person>
            <City>Stockholm</City>
            <LinksDiv>
                <LinkedIn href="https://www.linkedin.com/in/pernilla-sterner/">
                    <LinkedInIcon src={linkedin} alt="linkedinlogo" width="25"/>
                </LinkedIn>
                <Portfolio href="https://pernillasterner.netlify.app/">
                    <PortfolioIcon src={portfolio} alt="portfoliologo" width="45"/>
                </Portfolio>
                <GitHub href="https://github.com/pernillasterner">
                    <GitHubIcon src={github} alt="githublogo" width="25"/>
                </GitHub>
            </LinksDiv>
        </PersonDiv>
        <PersonDiv>
            <PersonImg src={frida} width="150" alt="Frida-Forser"/>
            <Person>Frida Forser</Person>
            <City>Stockholm</City>
            <LinksDiv>
                <LinkedIn href="https://www.linkedin.com/in/frida-forser/">
                    <LinkedInIcon src={linkedin} alt="linkedinlogo" width="25"/>
                </LinkedIn>
                <GitHub href="https://github.com/fridaforser">
                    <GitHubIcon src={github} alt="githublogo" width="25"/>
                </GitHub>
            </LinksDiv>
        </PersonDiv>
        <PersonDiv>
            <PersonImg src={katarina} width="150" alt="Katarina-Sjölin"/>
            <Person>Katarina Sjölin</Person>
            <City>Malmö</City>
            <LinksDiv>
                <GitHub href="https://github.com/katsjolin">
                    <GitHubIcon src={github} alt="githublogo" width="25"/>
                </GitHub>
            </LinksDiv>
        </PersonDiv>
      </PeopleDiv>
      </AboutContainer>
    );
};

const AboutContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  margin: 0 auto;

   @media (min-width: 500px) {
    padding: 0 30px;
  }
`;

const AboutTitle = styled.h1`
    margin: 20px;
    font-size: 50px;

    @media (min-width: 500px) AND (max-width: 800px){
    padding: 25px 0 0;
    }

    @media (min-width: 800px) {
    padding: 30px 0 0;
    font-size: 60px;
}
`;

const Description = styled.h3`
    margin: 0 0 30px;


    @media (min-width: 800px) {
    margin: 0 0 70px;
  }

`;

const PeopleDiv = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr 1fr 1fr;
    grid-template-columns: 1fr;

    @media (min-width: 500px) AND (max-width: 800px){
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 800px) {
    grid-template-rows: 1fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    }
`;

const PersonDiv = styled.div`
    padding: 20px 0;

    @media (min-width: 500px) AND (max-width: 800px){
    padding: 20px 0;
    }

    @media (min-width: 800px) {
    padding: 0;
    }
    
`;

const PersonImg = styled.img`
`;

const Person = styled.h2`
    margin: 15px 0 -5px;
`;

const City = styled.p`
    margin: 5px;
`;

const LinksDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 15px;
    padding: 10px;
`;

const LinkedIn = styled.a`
`;

const LinkedInIcon = styled.img`
    cursor: pointer;
`;

const Portfolio = styled.a`
`;

const PortfolioIcon = styled.img`
    cursor: pointer;
`;

const GitHub = styled.a`
`;

const GitHubIcon = styled.img`
    cursor: pointer;
`;


 



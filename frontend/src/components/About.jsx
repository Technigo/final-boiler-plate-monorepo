import styled from "styled-components";
import logo from "/src/assets/Logo.png";
import linkedin from "/src/assets/linkedin.png"
import github from "/src/assets/github.png"

export const OmOss = () => {
    return (
      <AboutContainer>
      <AboutTitle>Om oss</AboutTitle>
      <Description>Teamet bakom Pluggin'</Description>
      <PeopleDiv>
        <PersonDiv>
            <PersonImg src={logo} width="150" alt="Erika-Wernbro"/>
            <Person>Erika Wernbro</Person>
            <City>Kalmar</City>
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
            <PersonImg src={logo} width="150" alt="Pernilla-Sterner"/>
            <Person>Pernilla Sterner</Person>
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
            <PersonImg src={logo} width="150" alt="Frida-Forser"/>
            <Person>Frida Forser</Person>
            <City>Strängnäs/Stockholm</City>
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
            <PersonImg src={logo} width="150" alt="Katarina-Sjölin"/>
            <Person>Katarina Sjölin</Person>
            <City>Malmö</City>
            <LinksDiv>
                <LinkedIn href="https://www.linkedin.com/in/frida-forser/">
                    <LinkedInIcon src={linkedin} alt="linkedinlogo" width="25"/>
                </LinkedIn>
                <GitHub href="https://github.com/fridaforser">
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
`;

const Description = styled.h3`
    margin: 0 0 30px;

     @media (min-width: 700px) {
    margin: 0 0 60px;
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
    padding: 10px 0;

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

const GitHub = styled.a`
`;

const GitHubIcon = styled.img`
    cursor: pointer;
`;
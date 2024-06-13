import styled from 'styled-components';
import { Link } from "react-router-dom";
import { FaCircleInfo } from "react-icons/fa6";

export const Footer = () => {
    return (
      <FooterContainer>
        <FooterDiv>
          <p>© Technigo Web Development Bootcamp 2024</p>
          <Link to={`/om-oss`}>
            <About><FaCircleInfo />Om oss</About>
          </Link>
          </FooterDiv>
      </FooterContainer>
    );
};

const FooterContainer = styled.div`
  padding: 14px 20px;
  background-color: var(--daffodil);
  width: 100%;
  display: flex;
  flex-direction: row;
  position: fixed;
  bottom: 0;
  margin: auto;
  justify-content: center;
  align-items: center;

    @media (min-width: 1025px) {
    padding: 20px 30px;
    position: fixed;
  
  }
`;

const FooterDiv = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  position: absolute;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;

    @media (min-width: 1025px) {
    font-size: 15px;
  
  }
`;


const About = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  color: black;
  font-size: 15px;

  @media (min-width: 1025px) {
    font-size: 17px;
  
  }
`;
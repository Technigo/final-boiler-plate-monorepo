import styled from 'styled-components';
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
      <FooterContainer>
        <p>© Technigo Web Development Bootcamp 2024</p>
        <Link to={`/om-oss`}>
          <p>Om oss</p>
        </Link>
      </FooterContainer>
    );
};

const FooterContainer = styled.div`
  padding: 20px;
  background-color: var(--daffodil);
  width: 100%;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

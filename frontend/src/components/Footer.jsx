import styled from 'styled-components';

export const Footer = () => {
    return (
      <FooterContainer>
        <p>Technigo Web Development Bootcamp spring 2024</p>
      </FooterContainer>
    );
};

const FooterContainer = styled.footer`
  padding: 20px;
  text-align: center;
  background-color: var(--daffodil);
`;

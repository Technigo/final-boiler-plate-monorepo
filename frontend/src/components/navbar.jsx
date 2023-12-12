import React from 'react';
import styled from 'styled-components';

const navbarContainer = styled.navbar`
  background-color: #B6244F; 
  color: #504746; 
  padding: 10px; 
  text-align: center; 
`;

const navbarNav = styled.nav`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const navbarLink = styled.a`
  font-size: 16px;
  font-family: Arial, sans-serif;
  text-decoration: none;
  color: #504746;
  &:hover {
    text-decoration: underline;
  }
`;

const navbar = () => {
  return (
    <navbarContainer>
      <navbarNav>
   //Add routes here!!//
      </navbarNav>
    </navbarContainer>
  );
};

export default navbar;

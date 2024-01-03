import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const NavbarContainer = styled.nav`
  background-color: #FFCCD5; 
  color: #504746;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

const NavbarNav = styled.ul`
  list-style: none;
  display: flex;
  margin: 20px;
  padding: 10px;
`;

const NavItem = styled.li`
  margin: 0 1rem;
`;

const NavbarLink = styled(Link)`
  color: #800F2F;
  font-size: 16px; 
  font-family: Montserrat, sans-serif; 
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavbarNav>
        <NavItem>
          <NavbarLink to="/">Home</NavbarLink>
        </NavItem>
        <NavItem>
          <NavbarLink to="/about">About</NavbarLink>
        </NavItem>
        <NavItem>
        <NavItem>
          <NavbarLink to="/addrestaurant">Add a new restaurant</NavbarLink>
        </NavItem>
        </NavItem> 
      </NavbarNav>
    </NavbarContainer>
  );
};

export default Navbar;

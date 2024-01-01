import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const tablet = `(min-width: 768px)`;
const desktop = `(min-width: 1024px)`;

const FMLogo = styled.img`
  height: 40px;
  width: auto;
  @media ${tablet} {
    height: 80px;
    width: auto;
  }
`;

const NavbarContainer = styled.nav`
  background-color: #01999a;
  color: #66feff;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  @media ${tablet} {
    display: flex;
    justify-content: space-between;
  }
  @media ${desktop} {
    display: flex;
    justify-content: space-between;
  }
`;

const NavbarNav = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  margin: 20px;
  padding: 10px;
`;

const NavItem = styled.li`
  margin: 0 1rem;
`;

const NavbarLink = styled(Link)`
  color: #66feff;
  font-size: 45px;
  font-family: "Mercusuar";
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <FMLogo src="/public/Logo2.jpg" alt="Logo" />
      <NavbarNav>
        <NavItem>
          <NavbarLink to="/">Home</NavbarLink>
        </NavItem>
        <NavItem>
          <NavbarLink to="/about">About </NavbarLink>
        </NavItem>
        {/* <NavItem>
          <NavbarLink to="/addrestaurant">Add a new restaurant</NavbarLink>
        </NavItem> */}
      </NavbarNav>
    </NavbarContainer>
  );
};

export default Navbar;

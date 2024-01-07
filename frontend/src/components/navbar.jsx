import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const tablet = `(min-width: 717px)`;
const desktop = `(min-width: 1007px)`;

const FMLogo = styled.img`
  height: 50px;
  width: auto;
  @media ${tablet} {
    height: 90px;
    width: auto;
  }
  @media ${desktop} {
    height: 90px;
    width: auto;
  }
  /* &:hover { Ändra till annan logga vid hover
    content: url('')
  } */
`;

const NavbarContainer = styled.nav`
  background-color: #01999a;
  color: #66feff;
  border-radius: 5px;
  display: flex;
  justify-content: flex-start;
  padding: 10px 5px 0.1px 5px;

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
  margin: 2px;
  display: none;
  @media ${tablet} {
    color: #66feff;
    font-size: 35px;
    font-family: "JosefinSans";
    display: inline-block;
    justify-content: flex-end;
    margin-right: 15px;
    text-decoration: none;
    &:hover {
      text-decoration: none;
      color: yellow;
    }
  }
  @media ${desktop} {
    color: #66feff;
    font-size: 35px;
    font-family: "JosefinSans";
    text-decoration: none;
    &:hover {
      text-decoration: none;
      color: yellow;
    }
  }
`;

const NavbarLink = styled(Link)`
  display: none;
  @media ${tablet} {
    color: #66feff;
    font-size: 35px;
    font-family: "JosefinSans";
    display: inline-block;
    justify-content: space-around;
    text-decoration: none;
    &:hover {
      text-decoration: none;
      color: yellow;
    }
  }
  @media ${desktop} {
    color: #66feff;
    font-size: 35px;
    font-family: "JosefinSans";
    text-decoration: none;
    &:hover {
      text-decoration: none;
      color: yellow;
    }
  }
`;

const AboutLink = styled(NavbarLink)`
  color: yellow;
`;

const RestaurantLink = styled(NavbarLink)`
  color: #fcabe3;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <a href="/" target="_blank" rel="noopener noreferrer">
        <FMLogo src="src/assets/LogoNew.png" alt="Logo" />
      </a>
      <NavbarNav>
        <NavItem>
          <NavbarLink to="/">Home</NavbarLink>
        </NavItem>
        <NavItem>
          <AboutLink to="/about">About</AboutLink>
        </NavItem>
        <NavItem>
          <RestaurantLink to="/addrestaurant">Add Restaurant</RestaurantLink>
        </NavItem>
      </NavbarNav>
    </NavbarContainer>
  );
};

export default Navbar;

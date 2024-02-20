import { Link } from "react-router-dom";
// IMPORT COMPONENTS
import { Accordion } from "../accordion/Accordion";
// IMPORT STYLESHEETS
import "./Footer.css";

// Accordion items
const accordionItems = [
  {
    title: "Plants",
    content: [
      { text: "All plants", url: "/plants/all-plants" },
      { text: "Most popular", url: "/plants/all-plants/popular" },
      { text: "Shade lovers", url: "/plants/all-plants/shade-loving" },
      { text: "Easy care", url: "/plants/all-plants/easy" },
      { text: "Pet-friendly", url: "/plants/all-plants/pet-friendly" },
      { text: "Hanging & climbing", url: "/plants/all-plants/climbing" },
      { text: "Inspiration", url: "/inspo" },
    ],
  },
  {
    title: "My account",
    content: [
      { text: "Dashboard", url: "/dashboard" },
      { text: "Login", url: "/login" },
      { text: "Register", url: "/register" },
    ],
  },
  {
    title: "Customer Service",
    content: (
      <p>
        This is not a real web shop, but if it was, it'd probably have the best
        Custumer Service in the world.
      </p>
    ),
  },
  {
    title: "About us",
    content: (
      <div>
        <p>
          This page was developed by Julia Holm and Vera Witting for our final
          project of the Web Development Bootcamp at Technigo.
        </p>
        <p>
          Visit our{" "}
          <Link to="/about">
            <b>about page</b>
          </Link>{" "}
          to read more about us and this project!
        </p>
      </div>
    ),
  },
];

const content = {
  logoUrl: "../../big-logo-sand.svg",
  logoAlt: "Plants by Holm and Witting logotype",
  copyright: "Copyright 2024 © Julia H & Vera W",
  bootcampP: "Technigo Bootcamp Final Project",
};

export const Footer = () => {
  return (
    <footer>
      <Accordion items={accordionItems} showButtons={false} />
      <div className="logo-container">
        <Link to="/">
          <img
            className="menu-logo"
            src={content.logoUrl}
            alt={content.logoAlt}
          />
        </Link>
      </div>
      <div>
        <p className="copyright">{content.copyright}</p>
        <p className="copyright">{content.bootcampP}</p>
      </div>
    </footer>
  );
};

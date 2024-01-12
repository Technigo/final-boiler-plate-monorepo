import "./Footer.css";
import Accordion from "../Accordion";
import { Link } from "react-router-dom";

import { FaLinkedin } from "react-icons/fa6";

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
    ],
  },
  {
    title: "My account",
    content: [
      { text: "Profile", url: "" },
      { text: "Wishlist", url: "/wishlist" },
      { text: "Login", url: "/login" },
      { text: "Register", url: "/register" },
    ],
  },
  {
    title: "Customer Service",
    content: <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>,
  },
  {
    title: "About us",
    content: (
      <div>
        <p>This is a custom React component.</p>
        <p>You can include paragraphs, formatting, etc.</p>
      </div>
    ),
  },
];

export const Footer = () => {
  return (
    <footer>
      <Accordion items={accordionItems} />
      <div className="logo-container">
        <Link to="/">
          <img
            className="menu-logo"
            src="./big-logo-sand.svg"
            alt="Plants by Holm and Witting logotype"
          />
        </Link>
      </div>
      <div>
        <p className="copyright">Copyright 2024 © Julia H & Vera W</p>
        <p className="copyright">Technigo Bootcamp Final Project</p>
      </div>
    </footer>
  );
};

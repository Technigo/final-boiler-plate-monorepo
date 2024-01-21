import "./Footer.css";
import Accordion from "../accordion/Accordion";
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
    content: <p>This is not a real web shop, but if it was, it'd probably have the best Custumer Service in the world.</p>,
  },
  {
    title: "About us",
    content: (
      <div>
        <p>This page was developed by Julia Holm and Vera Witting</p>
        <p>Do visit our <Link to="/about"><b>about page</b></Link> to see more about us and this project!</p>
      </div>
    ),
  },
];

export const Footer = () => {
  return (
    <footer>
      <Accordion items={accordionItems} showButtons={false}/>
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

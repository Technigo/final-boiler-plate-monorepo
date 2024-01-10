import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LoginBtn } from "./LoginBtn";
import { LogoutBtn } from "./LogoutBtn";
import { useAuth0 } from "@auth0/auth0-react";
import { Trips } from "./Trips";

export const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const onMobileNavClick = () => {
    setOpenMobileNav(!openMobileNav);
  };

  const navlinks = [
    // { linkName: "Search", linkRoute: "/search" },
    { linkName: "Create trip", linkRoute: "/createtrip" },
    { linkName: "Trips", linkRoute: "/trips" },
    { linkName: "About", linkRoute: "/about" },
    // { linkName: "Register", linkRoute: "/register" },
  ];

  const navlinksLoggedIn = [
    // { linkName: "Search", linkRoute: "/search" },
    { linkName: "Messages", linkRoute: "/messages" },
    { linkName: "Create trip", linkRoute: "/createtrip" },
    { linkName: "Trips", linkRoute: "/trips" },
    { linkName: "My Account", linkRoute: "/account" },
    { linkName: "About", linkRoute: "/about" },
  ];

  const renderMenuItems = () =>
    isAuthenticated ? (
      <ul className="bg-gray-100 absolute top-15 w-full mt-4 left-0 p-2 space-y-2">
        {navlinksLoggedIn.map((link) => (
          <li key={link.linkName}>
            <Link to={link.linkRoute}>{link.linkName}</Link>
          </li>
        ))}
      </ul>
    ) : (
      <ul className="bg-gray-100 absolute top-15 w-full mt-4 left-0 p-2 space-y-2">
        {navlinks.map((link) => (
          <li key={link.linkName}>
            <Link to={link.linkRoute}>{link.linkName}</Link>
          </li>
        ))}
      </ul>
    );

  const handleScroll = () => {
    // Check if the user has scrolled down more than 50 pixels
    setIsScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    // Add a scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`bg-gray-800 p-4 z-10 sticky top-0 ${isScrolled ? "" : ""}`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div
          onClick={() => navigate("/")}
          className="text-white font-bold text-xl cursor-pointer"
        >
          Piggyback
        </div>
        {!isAuthenticated && (
          <ul className="hidden md:flex space-x-4">
            {navlinks.map((link) => (
              <li className="text-white pt-2" key={link.linkName}>
                <Link to={link.linkRoute}>{link.linkName}</Link>
              </li>
            ))}
            <li>
              <LoginBtn />
            </li>
            <li>
              <LogoutBtn />
            </li>
          </ul>
        )}
        {isAuthenticated && (
          <ul className="hidden md:flex space-x-4">
            {navlinksLoggedIn.map((link) => (
              <li className="text-white pt-2" key={link.linkName}>
                <Link to={link.linkRoute}>{link.linkName}</Link>
              </li>
            ))}
            <li>
              <LoginBtn />
            </li>
            <li>
              <LogoutBtn />
            </li>
          </ul>
        )}

        {/* Add a responsive menu button for smaller screens */}
        <div className="md:hidden">
          <LoginBtn />
          <button className="text-white pl-5" onClick={onMobileNavClick}>
            {/* Add a responsive menu icon, e.g., a hamburger icon */}
            {openMobileNav ? <>&#x2715;</> : <>&#9776; </>}
          </button>
          {/* Display the menu if openMobileNav is true */}
          {openMobileNav && renderMenuItems()}
        </div>
      </div>
    </nav>
  );
};

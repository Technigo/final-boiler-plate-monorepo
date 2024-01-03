import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoginBtn } from "./LoginBtn";
import { LogoutBtn } from "./LogoutBtn";
import { useAuth0 } from "@auth0/auth0-react";

export const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [openMobileNav, setOpenMobileNav] = useState(false);

  const onMobileNavClick = () => {
    setOpenMobileNav(!openMobileNav);
  };

  const navlinks = [
    { linkName: "About", linkRoute: "/about" },
    { linkName: "Search", linkRoute: "/search" },
    { linkName: "Post Trip", linkRoute: "/posttrip" },
    { linkName: "Register", linkRoute: "/register" },
  ];

  const navlinksLoggedIn = [
    { linkName: "About", linkRoute: "/about" },
    { linkName: "Search", linkRoute: "/search" },
    { linkName: "Messages", linkRoute: "/messages" },
    { linkName: "Post Trip", linkRoute: "/posttrip" },
    { linkName: "My Account", linkRoute: "/account" },
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

  return (
    <nav className="bg-gray-800 p-4">
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

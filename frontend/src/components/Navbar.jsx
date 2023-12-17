import { Link } from "react-router-dom";
import { useState } from "react";
import { LoginBtn } from "./LoginBtn";

export const Navbar = () => {
  const [openMobileNav, setOpenMobileNav] = useState(false);

  const onMobileNavClick = () => {
    setOpenMobileNav(!openMobileNav);
  };

  const navlinks = [
    { linkName: "Carpool", linkRoute: "/carpool" },
    { linkName: "Long Distance", linkRoute: "/longdistance" },
    { linkName: "Post Trip", linkRoute: "/posttrip" },
    { linkName: "Register", linkRoute: "/register" },
    // { linkName: "Log in", linkRoute: "/login" },
  ];

  const renderMenuItems = () => (
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
        <div className="text-white font-bold text-xl">Piggyback</div>
        <ul className="hidden md:flex space-x-4">
          {navlinks.map((link) => (
            <li className="text-white pt-2" key={link.linkName}>
              <Link to={link.linkRoute}>{link.linkName}</Link>
            </li>
          ))}
          <li>
            <LoginBtn />
          </li>
        </ul>

        {/* Add a responsive menu button for smaller screens */}
        <div className="md:hidden">
          <LoginBtn />
          <button className="text-white pl-4" onClick={onMobileNavClick}>
            {/* Add a responsive menu icon, e.g., a hamburger icon */}
            &#9776;
          </button>
          {/* Display the menu if openMobileNav is true */}
          {openMobileNav && renderMenuItems()}
        </div>
      </div>
    </nav>
  );
};

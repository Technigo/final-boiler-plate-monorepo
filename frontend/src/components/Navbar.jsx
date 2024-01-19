import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { LoginBtn } from "./LoginBtn";
import { LogoutBtn } from "./LogoutBtn";
import { useAuth0 } from "@auth0/auth0-react";

export const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const onMobileNavClick = () => {
    setOpenMobileNav(!openMobileNav);
  };

  const navlinks = [
    { linkName: "Trips", linkRoute: "/trips" },
    { linkName: "About", linkRoute: "/about" },
  ];

  const navlinksLoggedIn = [
    { linkName: "Messages", linkRoute: "/messages" },
    { linkName: "Create trip", linkRoute: "/createtrip" },
    { linkName: "Trips", linkRoute: "/trips" },
    { linkName: "My Trips", linkRoute: "/mytrips" },
    { linkName: "About", linkRoute: "/about" },
  ];

  const renderMenuItems = () => (
    <ul className="bg-tertiary text-white absolute top-14 left-0 w-full mt-2 p-2 space-y-2 text-center">
      {isAuthenticated
        ? navlinksLoggedIn.map((link) => (
            <li key={link.linkName} className="text-white">
              <Link to={link.linkRoute} onClick={onMobileNavClick}>
                {link.linkName}
              </Link>
            </li>
          ))
        : navlinks.map((link) => (
            <li key={link.linkName}>
              <Link to={link.linkRoute} onClick={onMobileNavClick}>
                {link.linkName}
              </Link>
            </li>
          ))}
    </ul>
  );

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`bg-tertiary p-4 z-20 sticky top-0 ${isScrolled ? "" : ""}`}>
      <div className="container mx-auto flex items-center justify-between">
        <div
          onClick={() => navigate("/")}
          className="text-white font-bold text-xl cursor-pointer">
          Piggyback
        </div>
        {!isAuthenticated && (
          <ul className="hidden md:flex space-x-4">
            {navlinks.map((link) => (
              <li className="text-white pt-2" key={link.linkName}>
                <Link to={link.linkRoute} onClick={onMobileNavClick}>
                  {link.linkName}
                </Link>
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
                <Link to={link.linkRoute} onClick={onMobileNavClick}>
                  {link.linkName}
                </Link>
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
        <div className="md:hidden flex items-center">
          <LoginBtn />
          <LogoutBtn />
          <button
            className="text-white text-2xl pl-2 w-8"
            onClick={onMobileNavClick}>
            {openMobileNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-8 h-8">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>

          {openMobileNav && renderMenuItems()}
        </div>
      </div>
    </nav>
  );
};

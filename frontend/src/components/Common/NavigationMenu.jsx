import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

//import relevant media
import logo from '../../assets/logo.png';
import "../../../src/font.css";
import '../../../src/logo.css';

export const NavigationMenu = () => {
    // State to manage mobile menu visibility
    const [isNavOpen, setIsNavOpen] = useState(false);

    // State to manage logo spinning animation
    const [isLogoSpinning, setIsLogoSpinning] = useState(false);

    // State to store the last scroll position for detecting scroll direction
    const [lastScrollY, setLastScrollY] = useState(0);

    // Get current location using React Router's useLocation hook
    const location = useLocation();

    // Toggle mobile menu visibility
    const handleToggleNav = () => {
        setIsNavOpen((prev) => !prev);
    };

    // Handle scroll events to trigger logo spinning animation
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const scrollThreshold = 100;

            // Determine the scrolling direction
            const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';

            // Adjust the condition based on your preference
            setIsLogoSpinning(scrollY > scrollThreshold && scrollDirection === 'down');

            // Update the last scroll position
            setLastScrollY(scrollY);
        };

        // Add scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div className={`h-24 font-josefin-sans text-lg bg-customPink bg-opacity-70 flex items-center justify-between px-8 sticky top-0 z-10`}>
            {/* Logo */}
            <a href="/home">
                <img className={`w-24 h-24 ${isLogoSpinning ? 'spin' : ''}`} src={logo} alt="logo" />
            </a>

            {/* Navigation */}
            <nav>
                {/* Mobile Menu */}
                <section className="mobile-menu flex lg:hidden">
                    {/* Hamburger Icon */}
                    <div className="hamburger-icon space-y-2" onClick={handleToggleNav}>
                        <span className="block h-0.5 w-8 animate-pulse bg-black"></span>
                        <span className="block h-0.5 w-8 animate-pulse bg-black"></span>
                        <span className="block h-0.5 w-8 animate-pulse bg-black"></span>
                    </div>

                    {/* Mobile Menu Content */}
                    <div className={`menu-nav ${isNavOpen ? 'show-menu' : 'hide-menu'}`}>
                        <div
                            className="bg-customPink rounded-full absolute top-0 right-0 px-8 py-8"
                            onClick={() => setIsNavOpen(false)}
                        >
                            {/* Close Icon */}
                            <svg
                                className="h-8 w-8 text-black"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </div>

                        {/* Mobile Menu Items */}
                        <ul className="flex flex-col items-center justify-between min-h-[250px]">
                            <NavItem to="/" label="Home" />
                            <NavItem to="/WhoAreWe" label="Who Are We?" />
                            <NavItem to="/SurfLessons" label="Surf lessons" />
                            <NavItem to="/BookNow" label="Book Now" />
                            <NavItem to="/ContactUs" label="Contact Us" />
                        </ul>
                    </div>
                </section>

                {/* Desktop Menu */}
                <ul className="text-pink-500 desktop-menu hidden space-x-8 lg:flex">
                    <NavItem to="/" label="Home" />
                    <NavItem to="/WhoAreWe" label="Who Are We?" />
                    <NavItem to="/SurfLessons" label="Surf lessons" />
                    <NavItem to="/BookNow" label="Book Now" />
                    <NavItem to="/ContactUs" label="Contact Us" />
                </ul>
            </nav>

            {/* Custom Styles */}
            <style>{`
                .hide-menu {
                    display: none;
                }
                .show-menu {
                    display: flex;
                    position: absolute;
                    width: 100%;
                    height: 100vh;
                    top: 0;
                    left: 0;
                    background: white;
                    z-index: 10;
                    flex-direction: column;
                    justify-content: space-evenly;
                    align-items: center;
                }
            `}</style>
        </div>
    );

    // Nested NavItem component for navigation links
    function NavItem({ to, label }) {
        const isCurrentPage = location.pathname === to;

        return (
            <li className={`p-8 ${isCurrentPage ? 'text-pink-500 underline decoration-4' : 'hover:text-pink-600'} transition-all duration-500`}>
                <Link to={to}>{label}</Link>
            </li>
        );
    }
};

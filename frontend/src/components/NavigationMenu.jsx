import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../font.css';
import '../logo.css';

export const NavigationMenu = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isLogoSpinning, setIsLogoSpinning] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    const location = useLocation();

    const handleToggleNav = () => {
        setIsNavOpen((prev) => !prev);
    };

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

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <div className={`h-24 font-josefin-sans text-lg bg-customPink bg-opacity-70 flex items-center justify-between px-8 sticky top-0 z-10`}>
            <a href="/home">
                <img className={`w-24 ${isLogoSpinning ? 'spin' : ''}`} src={logo} alt="logo" />
            </a>
            <nav>
                <section className="mobile-menu flex lg:hidden">
                    <div className="hamburger-icon space-y-2" onClick={handleToggleNav}>
                        <span className="block h-0.5 w-8 animate-pulse bg-black"></span>
                        <span className="block h-0.5 w-8 animate-pulse bg-black"></span>
                        <span className="block h-0.5 w-8 animate-pulse bg-black"></span>
                    </div>
                    <div className={`menu-nav ${isNavOpen ? 'show-menu' : 'hide-menu'}`}>
                        <div
                            className="bg-customPink rounded-full absolute top-0 right-0 px-8 py-8"
                            onClick={() => setIsNavOpen(false)}
                        >
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
                        <ul className="flex flex-col items-center justify-between min-h-[250px]">
                            <NavItem to="/" label="Home" />
                            <NavItem to="/WhoAreWe" label="Who Are We?" />
                            <NavItem to="/SurfLessons" label="Surf lessons" />
                            <NavItem to="/BookNow" label="Book Now" />
                            <NavItem to="/ContactUs" label="Contact Us" />
                        </ul>
                    </div>
                </section>
                <ul className="desktop-menu hidden space-x-8 lg:flex">
                    <NavItem to="/" label="Home" />
                    <NavItem to="/WhoAreWe" label="Who Are We?" />
                    <NavItem to="/SurfLessons" label="Surf lessons" />
                    <NavItem to="/BookNow" label="Book Now" />
                    <NavItem to="/ContactUs" label="Contact Us" />
                </ul>
            </nav>
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

    function NavItem({ to, label }) {
        const isCurrentPage = location.pathname === to;

        return (
            <li className={`p-8 ${isCurrentPage ? 'bg-pink-500 bg-opacity-70 border-11 border-amber-300 rounded-full text-amber-200' : 'hover:bg-pink-500 hover:bg-opacity-70 hover:border-11 hover:rounded-full hover:text-amber-200'} transition-all duration-500`}>
                <Link to={to}>{label}</Link>
            </li>

        );
    }
};

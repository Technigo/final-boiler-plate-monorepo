import React, { useState, useEffect } from "react";
import logo from '../../assets/logo.webp';

export const AnimatedLogo = () => {
    // State to manage logo spinning animation
    const [isLogoSpinning, setIsLogoSpinning] = useState(false);

    // State to store the last scroll position for detecting scroll direction
    const [lastScrollY, setLastScrollY] = useState(0);

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

        // Remove scroll event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);

    return (
        <img className={`w-24 h-24 ${isLogoSpinning ? 'spin' : ''}`} src={logo} alt="logo" />
    );
};



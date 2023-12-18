import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import "./css/notfoundpage.css";
import lottie from 'lottie-web';
import notFoundAnimationData from '../data/notfound.json';

const NotFoundPage = () => {
    useEffect(() => {
        const container = document.getElementById('not-found-lottie-container');

        if (container) {
            const animation = lottie.loadAnimation({
                container,
                animationData: notFoundAnimationData,
                renderer: 'svg',
                loop: true,
                autoplay: true,
            });

            // Cleanup the animation on component unmount
            return () => {
                animation.destroy();
            };
        }
    }, [notFoundAnimationData]);

    return (
        <div className="not-found">
            <div id="not-found-lottie-container" className="not-found-lottie-container" />
            <h2>Sorry, this page does not exist. Back to start-page:</h2>
            <Link to="/"><button className="start-page">Start</button></Link>
        </div>
    );
};

export default NotFoundPage;

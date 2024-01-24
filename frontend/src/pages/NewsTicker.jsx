import React from 'react';
import styles from './NewsTicker.module.css';

export const NewsTicker = () => {
    const text = "Next get-together: February 7th - Disney-themed mocktail night";

    return (
        <div className={styles.wrapper}>
            <div className={styles.ticker} onMouseEnter={pauseScroll} onMouseLeave={resumeScroll}>
                <div type="SbodyText" className={styles.ticker}>
                    {text}
                </div>
            </div>
        </div>
    );
}

// pause scrolling on hover
const pauseScroll = (e) => {
    e.currentTarget.style.animationPlayState = 'paused';
};

// resume scrolling
const resumeScroll = (e) => {
    e.currentTarget.style.animationPlayState = 'running';
};

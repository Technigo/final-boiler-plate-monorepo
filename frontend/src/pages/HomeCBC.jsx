import React, { useState, useEffect, useRef } from 'react';
import styles from './HomeCBC.module.css';
import { Text } from '../UI/Typography';
import { Link } from 'react-router-dom'; //for SinCoctail (had troubble yesterday and moved sinCocktails from pages to src)
import lottie from 'lottie-web';

export const HomeCBC = () => {
    const [featuredCocktails, setFeaturedCocktails] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Loading state
    const animationContainer = useRef(null); // Ref for the Lottie container
    const featuredIds = ['65a087deecc12fc758756500', '65a08126ecc12fc7587564fd', '659ffc6700633fc348dba0cb', '659ffa2400633fc348dba090', '659ffaa600633fc348dba096', '659ffa2c00633fc348dba093'];

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: animationContainer.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            path: '/animations/Animation - 1705760771667.json' // The path to the JSON file
        });

        return () => anim.destroy(); // Cleanup
    }, []);

    useEffect(() => {
        setIsLoading(true); // Start loading

        fetch('https://cbc-uvko.onrender.com/cocktails')
            .then(response => response.json())
            .then(data => {
                const selectedCocktails = data.filter(cocktail => featuredIds.includes(cocktail._id));
                setFeaturedCocktails(selectedCocktails);
                setIsLoading(false); // Data fetched, stop loading
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                setIsLoading(false); // Error occurred, stop loading
            });
    }, []);

    return (
        <div className={styles.wrapper}>
            {isLoading ? (
                <div>
                    <div ref={animationContainer} className={styles.lottieContainer}></div>
                    <Text type="H3" className={styles.h3Load}>PLEASE WAIT WHILE LOADING PAGE</Text>
                </div>
            ) : (
                <>
                    <Text type="H1" className={styles.h1}>OUR CURRENT FAVOURITES</Text>
                    <div className={styles.gridContainer}>
                        {featuredCocktails.map(cocktail => (
                            <Link to={`/cocktail/${cocktail._id}`} key={cocktail._id} className={styles.cocktailLink}>
                                <div>
                                    {cocktail.imageUrl && (
                                        <img src={cocktail.imageUrl} alt={cocktail.name} className={styles.cocktailImage} />
                                    )}
                                    {cocktail.name && <Text type="H4" className={styles.h3}>{cocktail.name}</Text>}
                                    <Text type="SbodyText" className={styles.SbodyText}>⏲️: {cocktail.prepTime} | 🌟: {cocktail.strength}</Text>
                                    <Text type="SbodyText" className={styles.SbodyText}>⚡: {cocktail.strength} | 🏷️ : {cocktail.tags.join(', ')}</Text>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default HomeCBC;

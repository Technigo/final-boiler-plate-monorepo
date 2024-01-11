import styles from './HomeCBC.module.css';
import { Text } from '../UI/Typography';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; //for SinCoctail (had troubble yesterday and moved sinCocktails from pages to src)

export const HomeCBC = () => {
    const [featuredCocktails, setFeaturedCocktails] = useState([]);
    const featuredIds = ['659d4d45faca05d6df658656', '659fefe600633fc348db9f71', '659ffc6700633fc348dba0cb', '659ffa2400633fc348dba090', '659ffaa600633fc348dba096', '659ffa2c00633fc348dba093'];

    useEffect(() => {
        fetch('https://cbc-uvko.onrender.com/cocktails')
            .then(response => response.json())
            .then(data => {
                const selectedCocktails = data.filter(cocktail => featuredIds.includes(cocktail._id));
                setFeaturedCocktails(selectedCocktails);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    return (
        <div className={styles.wrapper}>
            <Text type="H1" className={styles.h1}>OUR CURRENT FAVOURITES</Text>
            <div className={styles.gridContainer}>
                {featuredCocktails.map(cocktail => (
                    <Link to={`/cocktail/${cocktail._id}`} key={cocktail._id} className={styles.cocktailLink}>
                        <div>
                            {cocktail.imageUrl && (
                                <img src={`https://cbc-uvko.onrender.com/${cocktail.imageUrl}`} alt={cocktail.name} className={styles.cocktailImage} />
                            )}
                            {cocktail.name && <Text type="H3" className={styles.h3}>{cocktail.name}</Text>}
                            <Text type="SbodyText" className={styles.SbodyText}>⏲️: {cocktail.prepTime} | 🌟: {cocktail.strength}</Text>
                            <Text type="SbodyText" className={styles.SbodyText}>⚡: {cocktail.strength} | 🏷️ : {cocktail.tags.join(', ')}</Text>
                        </div>
                    </Link>
                ))}
            </div>
        </div >
    );
};

export default HomeCBC;

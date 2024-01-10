import styles from './HomeCBC.module.css';
import { Text } from '../UI/Typography';
import React, { useState, useEffect } from 'react';

export const HomeCBC = () => {
    const [featuredCocktails, setFeaturedCocktails] = useState([]);
    // Replace with the actual IDs of the cocktails you want to feature
    const featuredIds = ['659d4d45faca05d6df658656', '6597a5cc65dea63aba7e1999'];

    useEffect(() => {
        fetch('https://cbc-uvko.onrender.com/cocktails')
            .then(response => response.json())
            .then(data => {
                // Filter the cocktails to only include those with IDs in featuredIds
                const selectedCocktails = data.filter(cocktail => featuredIds.includes(cocktail._id));
                setFeaturedCocktails(selectedCocktails);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                // Optionally, handle the error state in the UI
            });
    }, []); // Empty dependency array ensures this effect runs once after the initial render

    return (
        <div className={styles.wrapper}>
            <Text type="H1" className={styles.h1}>Featured Cocktails</Text>
            {featuredCocktails.map(cocktail => (
                <div key={cocktail._id} className={styles.cocktail}>
                    {cocktail.imageUrl && (
                        <img src={`https://cbc-uvko.onrender.com/${cocktail.imageUrl}`} alt={cocktail.name} className={styles.cocktailImage} />
                    )}
                    <h2>{cocktail.name}</h2>
                    <p>⏲️: {cocktail.prepTime}</p>
                    <p>🌟: {cocktail.strength}</p>
                    <p>⚡: {cocktail.strength}</p>
                    <p>🏷️ : {cocktail.tags}</p>
                </div>
            ))}
        </div>
    );
};

export default HomeCBC;

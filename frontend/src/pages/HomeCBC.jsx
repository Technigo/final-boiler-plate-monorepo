import styles from './HomeCBC.module.css';
import { Text } from '../UI/Typography';
import React, { useState, useEffect } from 'react';

export const HomeCBC = () => {
    const [featuredCocktails, setFeaturedCocktails] = useState([]);
    const featuredIds = ['659d4d45faca05d6df658656', '6597a5cc65dea63aba7e1999', '5f50c31e1234567890123456', '659f0a2fa8a230958c153963', '659f09a1a8a230958c15395a', '659f0a08a8a230958c153960'];

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
                    <div key={cocktail._id} className={styles.cocktail}>
                        {cocktail.imageUrl && (
                            <img src={`https://cbc-uvko.onrender.com/${cocktail.imageUrl}`} alt={cocktail.name} className={styles.cocktailImage} />
                        )}
                        {cocktail.name && <Text type="H3" className={styles.h3}>{cocktail.name}</Text>}
                        <Text type="SbodyText" className={styles.SbodyText}>⏲️: {cocktail.prepTime} | 🌟: {cocktail.strength}</Text>
                        <Text type="SbodyText" className={styles.SbodyText}>⚡: {cocktail.strength} | 🏷️ : {cocktail.tags.join(', ')}</Text>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default HomeCBC;

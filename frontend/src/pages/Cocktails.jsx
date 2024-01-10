import styles from './Cocktails.module.css';
import { Text } from '../UI/Typography';
import React, { useState, useEffect } from 'react';

export const Cocktails = () => {
    const [cocktails, setCocktails] = useState([]);

    useEffect(() => {
        fetch('https://cbc-uvko.onrender.com/cocktails')
            .then(response => response.json())
            .then(data => {
                const recentCocktails = data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);
                setCocktails(recentCocktails);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, []);

    return (
        <div className={styles.wrapper}>
            <Text type="H1" className={styles.h1}>LATEST COCKTAILS</Text>
            <div className={styles.gridContainer}>
                {cocktails.map(cocktail => (
                    <div key={cocktail._id}>
                        {cocktail.imageUrl && (
                            <img src={`https://cbc-uvko.onrender.com/${cocktail.imageUrl}`} alt={cocktail.name} className={styles.cocktailImage} />
                        )}
                        <Text type="H3" className={styles.h3}>{cocktail.name}</Text>
                        <Text type="SbodyText" className={styles.SbodyText}>⏲️: {cocktail.prepTime} | 🌟: {cocktail.strength}</Text>
                        <Text type="SbodyText" className={styles.SbodyText}>⚡: {cocktail.strength} | 🏷️ : {cocktail.tags.join(', ')}</Text>
                    </div>
                ))}
            </div>
        </div>
    );
};
